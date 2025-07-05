import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import database from '../db/connection';
import { logger } from '../utils/logger';
import { 
  User, 
  CreateUserData, 
  LoginCredentials, 
  AuthResponse, 
  JWTPayload,
  UserWithProgress 
} from '../types/user';

class UserService {
  private readonly saltRounds = 12;
  private readonly jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
  private readonly jwtExpiry = process.env.JWT_EXPIRY || '7d';

  async createUser(userData: CreateUserData): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = await this.findByEmailOrUsername(userData.email, userData.username);
      if (existingUser) {
        throw new Error('User with this email or username already exists');
      }

      // Hash password
      const passwordHash = await bcrypt.hash(userData.password, this.saltRounds);

      // Insert user
      const query = `
        INSERT INTO users (email, username, password_hash, first_name, last_name)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, email, username, first_name, last_name, profile_picture, 
                 created_at, updated_at, is_active, last_login
      `;

      const values = [
        userData.email,
        userData.username,
        passwordHash,
        userData.firstName || null,
        userData.lastName || null
      ];

      const result = await database.query(query, values);
      const user = this.mapRowToUser(result.rows[0]);

      logger.info(`User created successfully: ${user.email}`);
      return user;
    } catch (error) {
      logger.error('Error creating user:', error);
      throw error;
    }
  }

  async authenticateUser(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Find user by email
      const query = `
        SELECT id, email, username, password_hash, first_name, last_name, 
               profile_picture, created_at, updated_at, is_active, last_login
        FROM users 
        WHERE email = $1 AND is_active = true
      `;

      const result = await database.query(query, [credentials.email]);
      
      if (result.rows.length === 0) {
        throw new Error('Invalid email or password');
      }

      const userRow = result.rows[0];
      
      // Verify password
      const isPasswordValid = await bcrypt.compare(credentials.password, userRow.password_hash);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Update last login
      await this.updateLastLogin(userRow.id);

      // Generate JWT token
      const token = this.generateToken({
        userId: userRow.id,
        email: userRow.email,
        username: userRow.username
      });

      const user = this.mapRowToUser(userRow);

      logger.info(`User authenticated successfully: ${user.email}`);
      
      return {
        user,
        token
      };
    } catch (error) {
      logger.error('Error authenticating user:', error);
      throw error;
    }
  }

  async findById(id: number): Promise<User | null> {
    try {
      const query = `
        SELECT id, email, username, first_name, last_name, profile_picture, 
               created_at, updated_at, is_active, last_login
        FROM users 
        WHERE id = $1 AND is_active = true
      `;

      const result = await database.query(query, [id]);
      
      if (result.rows.length === 0) {
        return null;
      }

      return this.mapRowToUser(result.rows[0]);
    } catch (error) {
      logger.error('Error finding user by ID:', error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const query = `
        SELECT id, email, username, first_name, last_name, profile_picture, 
               created_at, updated_at, is_active, last_login
        FROM users 
        WHERE email = $1 AND is_active = true
      `;

      const result = await database.query(query, [email]);
      
      if (result.rows.length === 0) {
        return null;
      }

      return this.mapRowToUser(result.rows[0]);
    } catch (error) {
      logger.error('Error finding user by email:', error);
      throw error;
    }
  }

  async getUserWithProgress(userId: number): Promise<UserWithProgress | null> {
    try {
      const query = `
        SELECT 
          u.id, u.email, u.username, u.first_name, u.last_name, u.profile_picture,
          u.created_at, u.updated_at, u.is_active, u.last_login,
          COUNT(DISTINCT e.id) as total_exercises,
          COUNT(DISTINCT CASE WHEN up.status = 'completed' THEN up.exercise_id END) as completed_exercises,
          COALESCE(SUM(up.time_spent), 0) as total_time_spent
        FROM users u
        LEFT JOIN exercises e ON e.is_active = true
        LEFT JOIN user_progress up ON up.user_id = u.id
        WHERE u.id = $1 AND u.is_active = true
        GROUP BY u.id, u.email, u.username, u.first_name, u.last_name, u.profile_picture,
                 u.created_at, u.updated_at, u.is_active, u.last_login
      `;

      const result = await database.query(query, [userId]);
      
      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      const user = this.mapRowToUser(row);

      return {
        ...user,
        totalExercises: parseInt(row.total_exercises) || 0,
        completedExercises: parseInt(row.completed_exercises) || 0,
        currentStreak: 0, // TODO: Implement streak calculation
        totalTimeSpent: parseInt(row.total_time_spent) || 0
      };
    } catch (error) {
      logger.error('Error getting user with progress:', error);
      throw error;
    }
  }

  async updateProfile(userId: number, updates: Partial<Pick<User, 'firstName' | 'lastName' | 'profilePicture'>>): Promise<User> {
    try {
      const updateFields = [];
      const values = [];
      let paramCount = 1;

      if (updates.firstName !== undefined) {
        updateFields.push(`first_name = $${paramCount++}`);
        values.push(updates.firstName);
      }

      if (updates.lastName !== undefined) {
        updateFields.push(`last_name = $${paramCount++}`);
        values.push(updates.lastName);
      }

      if (updates.profilePicture !== undefined) {
        updateFields.push(`profile_picture = $${paramCount++}`);
        values.push(updates.profilePicture);
      }

      if (updateFields.length === 0) {
        throw new Error('No valid fields to update');
      }

      updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
      values.push(userId);

      const query = `
        UPDATE users 
        SET ${updateFields.join(', ')}
        WHERE id = $${paramCount} AND is_active = true
        RETURNING id, email, username, first_name, last_name, profile_picture, 
                 created_at, updated_at, is_active, last_login
      `;

      const result = await database.query(query, values);
      
      if (result.rows.length === 0) {
        throw new Error('User not found');
      }

      return this.mapRowToUser(result.rows[0]);
    } catch (error) {
      logger.error('Error updating user profile:', error);
      throw error;
    }
  }

  verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, this.jwtSecret) as JWTPayload;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  private generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    const jwtPayload = {
      userId: payload.userId,
      email: payload.email,
      username: payload.username
    };
    return (jwt as any).sign(jwtPayload, this.jwtSecret, { expiresIn: this.jwtExpiry });
  }

  private async findByEmailOrUsername(email: string, username: string): Promise<User | null> {
    const query = `
      SELECT id, email, username, first_name, last_name, profile_picture, 
             created_at, updated_at, is_active, last_login
      FROM users 
      WHERE (email = $1 OR username = $2) AND is_active = true
    `;

    const result = await database.query(query, [email, username]);
    
    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToUser(result.rows[0]);
  }

  private async updateLastLogin(userId: number): Promise<void> {
    const query = 'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1';
    await database.query(query, [userId]);
  }

  private mapRowToUser(row: any): User {
    return {
      id: row.id,
      email: row.email,
      username: row.username,
      firstName: row.first_name,
      lastName: row.last_name,
      profilePicture: row.profile_picture,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      isActive: row.is_active,
      lastLogin: row.last_login
    };
  }
}

export default new UserService();

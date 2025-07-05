import { Router } from 'express';
import { authenticateToken } from '../../middleware/auth';
import userService from '../../services/userService';
import { logger } from '../../utils/logger';
import { CreateUserData, LoginCredentials } from '../../types/user';

const router = Router();

// Register new user
router.post('/register', async (req, res, next) => {
  try {
    const userData: CreateUserData = req.body;
    
    // Basic validation
    if (!userData.email || !userData.username || !userData.password) {
      return res.status(400).json({ error: 'Email, username, and password are required' });
    }

    if (userData.password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const user = await userService.createUser(userData);
    return res.status(201).json({ message: 'User created successfully', user });
  } catch (error: any) {
    logger.error('Registration error:', error);
    if (error.message && error.message.includes('already exists')) {
      return res.status(409).json({ error: error.message });
    } else {
      return res.status(400).json({ error: 'Failed to create user' });
    }
  }
});
// Login user
router.post('/login', async (req, res, next) => {
  try {
    const credentials: LoginCredentials = req.body;
    
    if (!credentials.email || !credentials.password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const authResponse = await userService.authenticateUser(credentials);
    return res.json(authResponse);
  } catch (error: any) {
    logger.error('Login error:', error);
    return res.status(401).json({ error: 'Invalid email or password' });
  }
});

// Get current user profile (protected route)
router.get('/me', authenticateToken, async (req, res, next) => {
  try {
    const userId = (req as any).user.id;
    const userWithProgress = await userService.getUserWithProgress(userId);
    
    if (!userWithProgress) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    return res.json(userWithProgress);
  } catch (error: any) {
    logger.error('Profile retrieval error:', error);
    return res.status(500).json({ error: 'Failed to retrieve profile' });
  }
});

// Update user profile (protected route)
router.put('/profile', authenticateToken, async (req, res, next) => {
  try {
    const userId = (req as any).user.id;
    const updates = req.body;
    
    const updatedUser = await userService.updateProfile(userId, updates);
    return res.json(updatedUser);
  } catch (error: any) {
    logger.error('Profile update error:', error);
    return res.status(400).json({ error: error.message });
  }
});

// Logout endpoint (client-side token removal)
router.post('/logout', async (req, res) => {
  return res.json({ message: 'Logged out successfully' });
});

// Verify token endpoint
router.get('/verify', authenticateToken, async (req, res) => {
  return res.json({ valid: true, user: (req as any).user });
});

export default router;

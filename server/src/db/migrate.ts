import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import database from './connection';
import { logger } from '../utils/logger';

dotenv.config();

async function migrate() {
  try {
    logger.info('Starting database migration...');
    
    // Test database connection
    const connected = await database.testConnection();
    if (!connected) {
      throw new Error('Cannot connect to database');
    }

    // Read and execute schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    // Split by semicolon and execute each statement
    const statements = schemaSql.split(';').filter(stmt => stmt.trim().length > 0);
    
    for (const statement of statements) {
      if (statement.trim()) {
        await database.query(statement);
      }
    }
    
    logger.info('Database migration completed successfully');
  } catch (error) {
    logger.error('Database migration failed:', error);
    throw error;
  }
}

if (require.main === module) {
  migrate().catch(err => {
    process.exit(1);
  });
}

export { migrate };

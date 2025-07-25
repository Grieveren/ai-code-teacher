import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import database from './connection';
import { logger } from '../utils/logger';

interface Migration {
  name: string;
  sql: string;
}

dotenv.config();

async function migrate() {
  try {
    logger.info('Starting database migration...');

    // Test database connection
    const connected = await database.testConnection();
    if (!connected) {
      throw new Error('Cannot connect to database');
    }

    await database.query(
      `CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        run_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    );

    const migrations: Migration[] = [];

    // Include main schema.sql as initial migration
    const schemaPath = path.join(__dirname, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      migrations.push({ name: 'schema.sql', sql: schemaSql });
    }

    const migrationsDir = path.join(__dirname, 'migrations');
    if (fs.existsSync(migrationsDir)) {
      const files = fs.readdirSync(migrationsDir)
        .filter((f) => f.endsWith('.sql'))
        .sort();
      for (const file of files) {
        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
        migrations.push({ name: file, sql });
      }
    }

    for (const migration of migrations) {
      const exists = await database.query('SELECT 1 FROM migrations WHERE name = $1', [migration.name]);
      if (exists.rows.length > 0) {
        continue;
      }

      logger.info(`Applying migration: ${migration.name}`);
      const statements = migration.sql.split(';').filter((s) => s.trim().length > 0);
      for (const statement of statements) {
        await database.query(statement);
      }
      await database.query('INSERT INTO migrations(name) VALUES($1)', [migration.name]);
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

import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const migrationsDir = path.join(__dirname, 'migrations');
    const files = fs.readdirSync(migrationsDir).sort();

    for (const file of files) {
      if (file.endsWith('.sql')) {
        logger.info(`Running migration: ${file}`);
        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
        await client.query(sql);
      }
    }

    await client.query('COMMIT');
    logger.info('Database migrations completed successfully.');
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error running migrations:', error);
    throw error;
  } finally {
    client.release();
  }
}

if (require.main === module) {
  migrate().catch(err => {
    process.exit(1);
  });
}

export { migrate };

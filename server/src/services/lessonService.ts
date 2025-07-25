import database from '../db/connection';
import { logger } from '../utils/logger';
import { Lesson } from '../types/lesson';

class LessonService {
  async getAllLessons(): Promise<Lesson[]> {
    const result = await database.query('SELECT id, title, description, created_at FROM lessons ORDER BY id');
    return result.rows.map(this.mapRow);
  }

  async getLessonById(id: number): Promise<Lesson | null> {
    const result = await database.query('SELECT id, title, description, created_at FROM lessons WHERE id=$1', [id]);
    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async getExercisesForLesson(id: number) {
    const result = await database.query(
      `SELECT e.* FROM exercises e
       JOIN lesson_exercises le ON le.exercise_id = e.id
       WHERE le.lesson_id=$1
       ORDER BY le.order_index`,
      [id]
    );
    return result.rows;
  }

  private mapRow(row: any): Lesson {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      createdAt: row.created_at,
    };
  }
}

export default new LessonService();

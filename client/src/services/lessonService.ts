import axios from 'axios';
import { Lesson } from '../types/lesson';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class LessonService {
  private axiosInstance;
  constructor() {
    this.axiosInstance = axios.create({ baseURL: API_BASE_URL });
  }

  async getAllLessons(): Promise<Lesson[]> {
    const res = await this.axiosInstance.get('/lessons');
    return res.data.lessons;
  }

  async getLesson(id: number): Promise<Lesson> {
    const res = await this.axiosInstance.get(`/lessons/${id}`);
    return res.data;
  }

  async getExercises(id: number): Promise<any[]> {
    const res = await this.axiosInstance.get(`/lessons/${id}/exercises`);
    return res.data.exercises;
  }
}

export default new LessonService();

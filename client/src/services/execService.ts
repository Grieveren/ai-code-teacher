import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ExecService {
  private axiosInstance;
  constructor() {
    this.axiosInstance = axios.create({ baseURL: API_BASE_URL });
  }

  async runCode(language: string, code: string): Promise<{ output: string; error?: string }> {
    const res = await this.axiosInstance.post('/exec', { language, code });
    return res.data;
  }
}

export default new ExecService();

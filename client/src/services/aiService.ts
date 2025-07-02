import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface ExplainCodeRequest {
  code: string;
  language: string;
}

export interface DebugCodeRequest {
  code: string;
  error: string;
  language: string;
}

export interface GenerateHintRequest {
  exerciseId: string;
  currentCode: string;
  attemptCount: number;
}

export interface ReviewCodeRequest {
  code: string;
  language: string;
  context?: string;
}

export interface CodeExplanation {
  explanation: string;
  concepts: string[];
  examples?: string[];
}

export interface DebugSuggestion {
  issue: string;
  suggestion: string;
  fixedCode?: string;
  explanation: string;
}

export interface CodeReview {
  summary: string;
  issues: Array<{
    line?: number;
    severity: 'error' | 'warning' | 'info';
    message: string;
    suggestion?: string;
  }>;
  improvements: string[];
}

class AIService {
  private axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000, // 30 seconds timeout for AI requests
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add auth token to requests if available
    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async explainCode(request: ExplainCodeRequest): Promise<CodeExplanation> {
    const response = await this.axiosInstance.post<CodeExplanation>('/ai/explain', request);
    return response.data;
  }

  async debugCode(request: DebugCodeRequest): Promise<DebugSuggestion> {
    const response = await this.axiosInstance.post<DebugSuggestion>('/ai/debug', request);
    return response.data;
  }

  async generateHint(request: GenerateHintRequest): Promise<{ hint: string; level: number }> {
    const response = await this.axiosInstance.post('/ai/hint', request);
    return response.data;
  }

  async reviewCode(request: ReviewCodeRequest): Promise<CodeReview> {
    const response = await this.axiosInstance.post<CodeReview>('/ai/review', request);
    return response.data;
  }
}

export default new AIService();
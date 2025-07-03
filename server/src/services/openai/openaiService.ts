import OpenAI from 'openai';
import { logger } from '../../utils/logger';
import { PromptBuilder } from './promptBuilder';

export interface OpenAIRequest {
  prompt: string;
  context?: string;
  maxTokens?: number;
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

class OpenAIService {
  private client: OpenAI;
  private promptBuilder: PromptBuilder;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
    this.promptBuilder = new PromptBuilder();
  }

  async explainCode(code: string, language: string): Promise<CodeExplanation> {
    try {
      const prompt = this.promptBuilder.buildExplainPrompt(code, language);
      
      const response = await this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: prompt,
        }],
      });

      const content = response.choices[0].message.content || '';
      
      return {
        explanation: content,
        concepts: this.extractConcepts(content),
        examples: this.extractExamples(content),
      };
    } catch (error) {
      logger.error('OpenAI API error:', error);
      throw new Error('Failed to explain code');
    }
  }

  async debugCode(code: string, error: string, language: string): Promise<DebugSuggestion> {
    try {
      const prompt = this.promptBuilder.buildDebugPrompt(code, error, language);
      
      const response = await this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: prompt,
        }],
      });

      const content = response.choices[0].message.content || '';
      
      return {
        issue: 'Issue identified from error',
        suggestion: content,
        explanation: content,
      };
    } catch (error) {
      logger.error('OpenAI API error:', error);
      throw new Error('Failed to debug code');
    }
  }

  async generateHint(exerciseContext: string, studentCode: string, attemptCount: number): Promise<string> {
    try {
      const prompt = this.promptBuilder.buildHintPrompt(exerciseContext, studentCode, attemptCount);
      
      const response = await this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        max_tokens: 512,
        messages: [{
          role: 'user',
          content: prompt,
        }],
      });

      return response.choices[0].message.content || '';
    } catch (error) {
      logger.error('OpenAI API error:', error);
      throw new Error('Failed to generate hint');
    }
  }

  async reviewCode(code: string, language: string, context?: string): Promise<CodeReview> {
    try {
      const prompt = this.promptBuilder.buildReviewPrompt(code, language, context);
      
      const response = await this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: prompt,
        }],
      });

      const content = response.choices[0].message.content || '';
      
      return {
        summary: content,
        issues: [],
        improvements: [],
      };
    } catch (error) {
      logger.error('OpenAI API error:', error);
      throw new Error('Failed to review code');
    }
  }

  private extractConcepts(text: string): string[] {
    const concepts: string[] = [];
    const conceptPatterns = [
      /concept[s]?:\s*([^.]+)/gi,
      /key topic[s]?:\s*([^.]+)/gi,
    ];
    
    conceptPatterns.forEach(pattern => {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        concepts.push(...match[1].split(',').map(c => c.trim()));
      }
    });
    
    return concepts;
  }

  private extractExamples(text: string): string[] {
    const examples: string[] = [];
    const codeBlockPattern = /```[\w]*\n([\s\S]*?)```/g;
    const matches = text.matchAll(codeBlockPattern);
    
    for (const match of matches) {
      examples.push(match[1].trim());
    }
    
    return examples;
  }
}

export default new OpenAIService();

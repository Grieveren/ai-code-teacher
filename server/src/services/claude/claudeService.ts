import Anthropic from '@anthropic-ai/sdk';
import { logger } from '../../utils/logger';
import { PromptBuilder } from './promptBuilder';

export interface ClaudeRequest {
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

class ClaudeService {
  private client: Anthropic;
  private promptBuilder: PromptBuilder;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || '',
    });
    this.promptBuilder = new PromptBuilder();
  }

  async explainCode(code: string, language: string): Promise<CodeExplanation> {
    try {
      const prompt = this.promptBuilder.buildExplainPrompt(code, language);
      
      const message = await this.client.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: prompt,
        }],
      });

      // Parse the response (in production, this would be more sophisticated)
      const response = message.content[0].type === 'text' ? message.content[0].text : '';
      
      return {
        explanation: response,
        concepts: this.extractConcepts(response),
        examples: this.extractExamples(response),
      };
    } catch (error) {
      logger.error('Claude API error:', error);
      throw new Error('Failed to explain code');
    }
  }

  async debugCode(code: string, error: string, language: string): Promise<DebugSuggestion> {
    try {
      const prompt = this.promptBuilder.buildDebugPrompt(code, error, language);
      
      const message = await this.client.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: prompt,
        }],
      });

      const response = message.content[0].type === 'text' ? message.content[0].text : '';
      
      // Parse debug response (simplified for now)
      return {
        issue: 'Issue identified from error',
        suggestion: response,
        explanation: response,
      };
    } catch (error) {
      logger.error('Claude API error:', error);
      throw new Error('Failed to debug code');
    }
  }

  async generateHint(exerciseContext: string, studentCode: string, attemptCount: number): Promise<string> {
    try {
      const prompt = this.promptBuilder.buildHintPrompt(exerciseContext, studentCode, attemptCount);
      
      const message = await this.client.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 512,
        messages: [{
          role: 'user',
          content: prompt,
        }],
      });

      return message.content[0].type === 'text' ? message.content[0].text : '';
    } catch (error) {
      logger.error('Claude API error:', error);
      throw new Error('Failed to generate hint');
    }
  }

  async reviewCode(code: string, language: string, context?: string): Promise<CodeReview> {
    try {
      const prompt = this.promptBuilder.buildReviewPrompt(code, language, context);
      
      const message = await this.client.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: prompt,
        }],
      });

      const response = message.content[0].type === 'text' ? message.content[0].text : '';
      
      // Parse review response (simplified)
      return {
        summary: response,
        issues: [],
        improvements: [],
      };
    } catch (error) {
      logger.error('Claude API error:', error);
      throw new Error('Failed to review code');
    }
  }

  private extractConcepts(text: string): string[] {
    // Simple concept extraction - in production, this would be more sophisticated
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
    // Extract code examples from the response
    const examples: string[] = [];
    const codeBlockPattern = /```[\w]*\n([\s\S]*?)```/g;
    const matches = text.matchAll(codeBlockPattern);
    
    for (const match of matches) {
      examples.push(match[1].trim());
    }
    
    return examples;
  }
}

export default new ClaudeService();
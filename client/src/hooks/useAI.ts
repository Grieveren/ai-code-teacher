import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import aiService, {
  ExplainCodeRequest,
  DebugCodeRequest,
  GenerateHintRequest,
  ReviewCodeRequest,
  CodeExplanation,
  DebugSuggestion,
  CodeReview,
} from '@/services/aiService';

export const useExplainCode = () => {
  return useMutation<CodeExplanation, Error, ExplainCodeRequest>({
    mutationFn: (request) => aiService.explainCode(request),
    onError: (error) => {
      toast.error('Failed to explain code. Please try again.');
      console.error('Explain code error:', error);
    },
  });
};

export const useDebugCode = () => {
  return useMutation<DebugSuggestion, Error, DebugCodeRequest>({
    mutationFn: (request) => aiService.debugCode(request),
    onError: (error) => {
      toast.error('Failed to debug code. Please try again.');
      console.error('Debug code error:', error);
    },
  });
};

export const useGenerateHint = () => {
  return useMutation<{ hint: string; level: number }, Error, GenerateHintRequest>({
    mutationFn: (request) => aiService.generateHint(request),
    onError: (error) => {
      toast.error('Failed to generate hint. Please try again.');
      console.error('Generate hint error:', error);
    },
  });
};

export const useReviewCode = () => {
  return useMutation<CodeReview, Error, ReviewCodeRequest>({
    mutationFn: (request) => aiService.reviewCode(request),
    onError: (error) => {
      toast.error('Failed to review code. Please try again.');
      console.error('Review code error:', error);
    },
  });
};
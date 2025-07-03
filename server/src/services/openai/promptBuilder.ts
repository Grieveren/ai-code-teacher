export class PromptBuilder {
  buildExplainPrompt(code: string, language: string): string {
    return `You are an AI coding teacher helping a student understand code. Please explain the following ${language} code in a clear, educational manner.

Code to explain:
\`\`\`${language}
${code}
\`\`\`

Please provide:
1. A clear explanation of what this code does
2. Break down key concepts used in the code
3. Explain any important syntax or patterns
4. If relevant, mention common use cases

Keep your explanation beginner-friendly but thorough. Use analogies where helpful.`;
  }

  buildDebugPrompt(code: string, error: string, language: string): string {
    return `You are an AI coding teacher helping a student debug their code. The student has encountered an error.

Language: ${language}

Student's code:
\`\`\`${language}
${code}
\`\`\`

Error message:
${error}

Please:
1. Identify what's causing the error
2. Explain why this error occurs
3. Provide a clear suggestion to fix it
4. If possible, show the corrected code
5. Explain the underlying concept to prevent similar errors

Be encouraging and educational in your response.`;
  }

  buildHintPrompt(exerciseContext: string, studentCode: string, attemptCount: number): string {
    const hintLevel = attemptCount <= 1 ? 'subtle' : attemptCount <= 3 ? 'moderate' : 'direct';
    
    return `You are an AI coding teacher providing hints to a student working on an exercise.

Exercise context:
${exerciseContext}

Student's current code:
\`\`\`
${studentCode}
\`\`\`

This is attempt #${attemptCount}. Please provide a ${hintLevel} hint:
- Subtle: Guide them to think about the problem differently
- Moderate: Point out what area needs attention
- Direct: Give more specific guidance

Do not give away the complete solution. Help them learn by discovering the answer themselves.`;
  }

  buildReviewPrompt(code: string, language: string, context?: string): string {
    return `You are an AI coding teacher reviewing a student's code. Provide constructive feedback.

Language: ${language}
${context ? `Context: ${context}` : ''}

Code to review:
\`\`\`${language}
${code}
\`\`\`

Please provide:
1. Overall assessment of the code
2. Identify any issues (bugs, inefficiencies, or style problems)
3. Suggest improvements with explanations
4. Highlight what the student did well
5. Recommend next learning steps

Be encouraging while providing honest, constructive feedback.`;
  }

  buildChatPrompt(message: string, context?: string): string {
    return `You are an AI coding teacher having a conversation with a student learning to program.

${context ? `Current context: ${context}` : ''}

Student's question: ${message}

Provide a helpful, educational response. Use examples where appropriate and maintain an encouraging, patient tone. If the student seems stuck, guide them toward understanding rather than just giving answers.`;
  }
}
import { useState } from 'react'
import CodeEditor from '@/components/CodeEditor'
import { motion } from 'framer-motion'

const PracticePage = () => {
  const [code, setCode] = useState(`function fibonacci(n) {
  // Your code here
  // Return the nth Fibonacci number
  
}`);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleRunCode = () => {
    // Simulate running code (in production, this would call a code execution API)
    try {
      setError('');
      // Simple simulation - in reality, this would be sandboxed execution
      const result = `Code execution simulation:\nYour function has been defined. Try calling fibonacci(5) to test it!`;
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setOutput('');
    }
  };

  const exercises = [
    {
      id: 1,
      title: 'Fibonacci Sequence',
      difficulty: 'Easy',
      description: 'Write a function that returns the nth Fibonacci number.',
    },
    {
      id: 2,
      title: 'Array Reversal',
      difficulty: 'Easy',
      description: 'Reverse an array without using built-in methods.',
    },
    {
      id: 3,
      title: 'Binary Search',
      difficulty: 'Medium',
      description: 'Implement binary search for a sorted array.',
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Practice Coding</h1>
      <p className="text-gray-400 text-lg mb-8">
        Sharpen your skills with AI-guided coding exercises
      </p>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Exercise List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Exercises</h2>
          {exercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-morphism p-4 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors"
            >
              <h3 className="font-medium mb-1">{exercise.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{exercise.description}</p>
              <span className={`text-xs px-2 py-1 rounded ${
                exercise.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                exercise.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {exercise.difficulty}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Code Editor Area */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Code Editor</h2>
          <CodeEditor
            value={code}
            onChange={setCode}
            language="javascript"
            height="500px"
            onRun={handleRunCode}
            output={output}
            error={error}
          />
          
          <div className="mt-4 p-4 glass-morphism rounded-lg">
            <p className="text-sm text-gray-400">
              <strong>Tip:</strong> Select any part of your code and press Ctrl+E (Cmd+E on Mac) to get an AI explanation, 
              or use the context menu. If you encounter an error, use the "Debug with AI" button for help!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PracticePage
import { useRef, useEffect } from 'react';
import Editor, { OnMount, Monaco } from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { useExplainCode, useDebugCode } from '@/hooks/useAI';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  height?: string;
  readOnly?: boolean;
  onRun?: () => void;
  output?: string;
  error?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language,
  height = '400px',
  readOnly = false,
  onRun,
  output,
  error,
}) => {
  const editorRef = useRef<any>(null);
  const explainCode = useExplainCode();
  const debugCode = useDebugCode();

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Add custom actions
    editor.addAction({
      id: 'explain-code',
      label: 'Explain Code',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyE],
      contextMenuGroupId: 'ai',
      contextMenuOrder: 1,
      run: () => handleExplainCode(),
    });

    if (error) {
      editor.addAction({
        id: 'debug-code',
        label: 'Debug with AI',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyD],
        contextMenuGroupId: 'ai',
        contextMenuOrder: 2,
        run: () => handleDebugCode(),
      });
    }
  };

  const handleExplainCode = async () => {
    const selectedText = editorRef.current?.getModel()?.getValueInRange(
      editorRef.current.getSelection()
    );
    const codeToExplain = selectedText || value;
    
    if (codeToExplain) {
      await explainCode.mutate({
        code: codeToExplain,
        language,
      });
    }
  };

  const handleDebugCode = async () => {
    if (error && value) {
      await debugCode.mutate({
        code: value,
        error,
        language,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="glass-morphism rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
          <span className="text-sm font-medium text-gray-400">{language}</span>
          <div className="flex items-center space-x-2">
            {error && (
              <button
                onClick={handleDebugCode}
                className="px-3 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors"
                disabled={debugCode.isPending}
              >
                {debugCode.isPending ? 'Debugging...' : 'Debug with AI'}
              </button>
            )}
            <button
              onClick={handleExplainCode}
              className="px-3 py-1 text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded transition-colors"
              disabled={explainCode.isPending}
            >
              {explainCode.isPending ? 'Explaining...' : 'Explain Code'}
            </button>
            {onRun && (
              <button
                onClick={onRun}
                className="px-3 py-1 text-xs bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded transition-colors"
              >
                Run Code
              </button>
            )}
          </div>
        </div>
        
        <Editor
          height={height}
          language={language}
          value={value}
          onChange={(newValue) => onChange(newValue || '')}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            readOnly,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>

      {/* Output/Error Display */}
      {(output || error) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-morphism rounded-lg p-4"
        >
          <h3 className={`text-sm font-medium mb-2 ${error ? 'text-red-400' : 'text-green-400'}`}>
            {error ? 'Error Output' : 'Output'}
          </h3>
          <pre className="text-sm font-mono whitespace-pre-wrap">
            {error || output}
          </pre>
        </motion.div>
      )}

      {/* AI Explanation Display */}
      {explainCode.data && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-morphism rounded-lg p-4 space-y-4"
        >
          <h3 className="text-lg font-medium text-blue-400">AI Explanation</h3>
          <p className="text-gray-300">{explainCode.data.explanation}</p>
          
          {explainCode.data.concepts.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Key Concepts:</h4>
              <div className="flex flex-wrap gap-2">
                {explainCode.data.concepts.map((concept, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* AI Debug Suggestion Display */}
      {debugCode.data && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-morphism rounded-lg p-4 space-y-4"
        >
          <h3 className="text-lg font-medium text-red-400">AI Debug Assistant</h3>
          <div className="space-y-2">
            <p className="text-gray-300">
              <strong>Issue:</strong> {debugCode.data.issue}
            </p>
            <p className="text-gray-300">
              <strong>Suggestion:</strong> {debugCode.data.suggestion}
            </p>
            {debugCode.data.fixedCode && (
              <div>
                <p className="text-sm font-medium text-gray-400 mb-2">Fixed Code:</p>
                <pre className="bg-gray-900/50 p-3 rounded text-sm font-mono">
                  {debugCode.data.fixedCode}
                </pre>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CodeEditor;
import { useEffect, useRef, useState } from 'react'

interface ChatMessage {
  sender: 'user' | 'ai'
  text: string
}

const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const wsUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3001/api')
      .replace('http', 'ws')
      .replace(/\/api$/, '') + '/ws/chat'
    const ws = new WebSocket(wsUrl)
    ws.onmessage = (event) => {
      setMessages((m) => [...m, { sender: 'ai', text: event.data }])
    }
    wsRef.current = ws
    return () => ws.close()
  }, [])

  const sendMessage = () => {
    if (input.trim() && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(input)
      setMessages((m) => [...m, { sender: 'user', text: input }])
      setInput('')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">AI Chat</h1>
      <div className="h-96 overflow-y-auto glass-morphism p-4 space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
            <span className="block text-xs text-gray-400 mb-1">{msg.sender === 'user' ? 'You' : 'AI'}</span>
            <span className="inline-block bg-gray-800/50 px-3 py-2 rounded-lg max-w-xs">
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 glass-morphism p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button className="bg-blue-500 px-4 rounded" onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default ChatPage

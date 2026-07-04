import { useState, useRef, useEffect } from 'react'
import { useMegaStore } from '../store'
import { Send, ArrowLeft, Loader } from 'lucide-react'

export function ASTRA() {
  const { aiModels, setCurrentModule } = useMegaStore()
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    setMessages(prev => [...prev, {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date(),
    }])
    setInput('')
    setIsProcessing(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      setMessages(prev => [...prev, {
        id: `msg-${Date.now() + 1}`,
        role: 'ai',
        content: `ASTRA analisou: "${input}"\n\n📊 Distribuição:\n${aiModels.map(m => `${m.icon} ${m.name} - ${m.specialties.join(', ')}`).join('\n')}\n\nTodas as IAs estão trabalhando em paralelo!`,
        timestamp: new Date(),
        aiModels: aiModels.map(m => m.name)
      }])
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-bg via-cosmic-dark to-cosmic-bg flex flex-col">
      {/* Header */}
      <div className="border-b border-cosmic-cyan/20 bg-cosmic-dark/50 backdrop-blur px-4 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentModule('home')}
            className="p-2 hover:bg-cosmic-cyan/10 rounded-lg transition"
          >
            <ArrowLeft size={20} className="text-cosmic-cyan" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cosmic-cyan to-cosmic-purple">
              ASTRA 208
            </h1>
            <p className="text-xs text-cosmic-cyan/60">AI Operating System</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-4">🌌</div>
            <h2 className="text-2xl font-bold text-cosmic-cyan mb-2">ASTRA 208</h2>
            <p className="text-cosmic-cyan/70 max-w-sm">
              Descreva sua tarefa e ASTRA distribuirá entre 7 IAs especializadas
            </p>
          </div>
        ) : (
          <>
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-cosmic-cyan/30 to-cosmic-purple/30 text-cosmic-cyan border border-cosmic-cyan/50'
                    : 'bg-cosmic-card border border-cosmic-cyan/20 text-cosmic-cyan/90'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-cosmic-card border border-cosmic-cyan/20 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Loader className="animate-spin text-cosmic-cyan" size={16} />
                    <span className="text-sm text-cosmic-cyan">Consultando especialistas...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-cosmic-cyan/20 bg-cosmic-dark/50 backdrop-blur p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Descreva sua tarefa..."
            className="cosmic-input flex-1"
            disabled={isProcessing}
          />
          <button
            onClick={handleSendMessage}
            disabled={isProcessing || !input.trim()}
            className="cosmic-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <Loader className="animate-spin" size={20} />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

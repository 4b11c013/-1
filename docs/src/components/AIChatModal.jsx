import { useState, useRef, useEffect } from 'react'

function AIChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { type: 'ai', text: '您好！我是 AI 助手，有什麼問題都可以問我。我會盡力幫助您。' }
  ])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const chatRef = useRef(null)

  useEffect(() => {
    if (isOpen && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, isOpen])

  const getAIResponse = (question) => {
    const lowerQuestion = question.toLowerCase()
    if (lowerQuestion.includes('如何') || lowerQuestion.includes('怎麼') || lowerQuestion.includes('怎樣')) {
      return '請按照系統提示的步驟進行操作。每個步驟都有詳細的說明，請仔細閱讀並按照指示執行。'
    } else if (lowerQuestion.includes('步驟') || lowerQuestion.includes('流程')) {
      return '系統會引導您完成整個醫療照護流程。請按照頁面上的步驟指示，逐步完成各項操作。'
    } else if (lowerQuestion.includes('問題') || lowerQuestion.includes('錯誤')) {
      return '如果遇到問題，請檢查是否按照步驟正確操作。如有緊急情況，請立即聯繫醫療人員。'
    } else if (lowerQuestion.includes('幫助') || lowerQuestion.includes('說明')) {
      return '我可以幫助您了解系統的使用方法。請告訴我您想了解哪個部分，我會為您詳細說明。'
    } else {
      return '感謝您的問題。關於「' + question + '」，我建議您按照系統提示的步驟進行操作。如有其他問題，歡迎繼續詢問。'
    }
  }

  const sendMessage = () => {
    if (!input.trim()) return

    const userMessage = { type: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsThinking(true)

    setTimeout(() => {
      const aiResponse = { type: 'ai', text: getAIResponse(input) }
      setMessages(prev => [...prev, aiResponse])
      setIsThinking(false)
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 hidden flex items-center justify-center bg-black/50 backdrop-blur-sm"
      style={{ display: isOpen ? 'flex' : 'none' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-xl">psychology</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">AI 助手</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-xl">close</span>
          </button>
        </div>
        <div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-4 min-h-[300px] max-h-[400px]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex items-start gap-3 ${msg.type === 'user' ? 'justify-end' : ''}`}>
              {msg.type === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
                </div>
              )}
              <div className={`flex-1 rounded-2xl p-4 max-w-[80%] ${
                msg.type === 'user'
                  ? 'bg-primary text-white ml-auto'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
              }`}>
                <p>{msg.text}</p>
              </div>
              {msg.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-sm">person</span>
                </div>
              )}
            </div>
          ))}
          {isThinking && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
              </div>
              <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-2xl p-4">
                <p className="text-slate-700 dark:text-slate-200">正在思考...</p>
              </div>
            </div>
          )}
        </div>
        <div className="p-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="輸入您的問題..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              onClick={sendMessage}
              className="px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">send</span>
              <span>發送</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIChatModal


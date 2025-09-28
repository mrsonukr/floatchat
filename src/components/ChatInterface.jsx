import { useState, useRef, useEffect } from 'react'

const ChatInterface = ({ user }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI assistant. I can help you analyze data, answer questions, and provide insights about your selected areas and heat levels. What would you like to know?',
      timestamp: new Date().toISOString()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage.trim())
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000 + Math.random() * 2000)
  }

  const generateAIResponse = (userInput) => {
    const responses = [
      "Based on the data analysis, I can see some interesting patterns emerging. The temperature variations in your selected area show significant correlation with the heat levels you've chosen.",
      "That's a great question! Looking at the historical data, I notice that similar conditions have occurred before, and here's what we can learn from those patterns...",
      "I've analyzed the data you're referring to. The metrics show some fascinating insights that could be valuable for your analysis. Let me break this down for you.",
      "Excellent observation! The data points you've highlighted align with several key indicators I've been tracking. Here's my analysis...",
      "I understand your concern. Based on the current data patterns and historical trends, I can provide some recommendations for how to proceed.",
      "That's an interesting perspective! The data supports your hypothesis, and I can see additional correlations that might be relevant to your analysis.",
      "I've processed your request and found some compelling insights in the dataset. The patterns suggest several possible explanations for what you're observing.",
      "Great question! Let me analyze this from multiple angles using the available data. Here's what I've discovered...",
      "Based on my analysis of the current conditions and historical data, I can provide you with some actionable insights and recommendations.",
      "I see what you're getting at! The data reveals some fascinating patterns that could significantly impact your analysis. Let me explain..."
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'assistant',
        content: 'Hello! I\'m your AI assistant. I can help you analyze data, answer questions, and provide insights about your selected areas and heat levels. What would you like to know?',
        timestamp: new Date().toISOString()
      }
    ])
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <span className="mr-3">💬</span>
          AI Chat Assistant
        </h1>
        <p className="text-gray-600">
          Ask me anything about your data, areas, heat levels, or get insights and analysis.
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-gray-900">AI Assistant</h3>
                <p className="text-sm text-gray-500">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              title="Clear chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="text-sm">{message.content}</div>
                <div
                  className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={1}
                style={{ minHeight: '40px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-sm text-gray-500">Quick actions:</span>
            {[
              "Analyze temperature data",
              "Show heat level trends",
              "Compare areas",
              "Export current data"
            ].map((action, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(action)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Stats */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h3 className="font-medium text-gray-900 mb-4">Chat Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{messages.length}</div>
            <div className="text-sm text-gray-600">Total Messages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {messages.filter(m => m.type === 'user').length}
            </div>
            <div className="text-sm text-gray-600">Your Messages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {messages.filter(m => m.type === 'assistant').length}
            </div>
            <div className="text-sm text-gray-600">AI Responses</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface

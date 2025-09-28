import { useState, useRef, useEffect } from 'react'
import { ArrowUp, ThumbsUp, ThumbsDown, Copy, Check, Download } from 'lucide-react'
import { Link } from 'react-router-dom'

const ChatInterface = ({ user }) => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [copiedMessageId, setCopiedMessageId] = useState(null)
  const [likedMessages, setLikedMessages] = useState(new Set())
  const [dislikedMessages, setDislikedMessages] = useState(new Set())
  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem('floatchat_chatHistory')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (error) {
        console.error('Error parsing saved chat history:', error)
      }
    }
    return [
      {
        id: 1,
        title: 'New Chat',
        preview: 'Start a new conversation...',
        timestamp: new Date().toISOString(),
        messageCount: 0
      },
      {
        id: 2,
        title: 'Temperature Analysis',
        preview: 'Can you analyze the temperature trends?',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        messageCount: 8
      },
      {
        id: 3,
        title: 'Heat Level Discussion',
        preview: 'What are the different heat levels?',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        messageCount: 12
      }
    ]
  })
  const [currentChatId, setCurrentChatId] = useState(() => {
    const saved = localStorage.getItem('floatchat_currentChatId')
    return saved ? parseInt(saved) : 1
  })
  const [chatMessages, setChatMessages] = useState(() => {
    const saved = localStorage.getItem('floatchat_chatMessages')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (error) {
        console.error('Error parsing saved chat messages:', error)
      }
    }
    return {
      1: [], // New Chat starts empty
      2: [
        {
          id: 1,
          type: 'user',
          content: 'Can you analyze the temperature trends?',
          timestamp: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 2,
          type: 'assistant',
          content: 'Based on the data analysis, I can see some interesting patterns emerging. The temperature variations in your selected area show significant correlation with the heat levels you\'ve chosen.',
          timestamp: new Date(Date.now() - 86400000 + 2000).toISOString()
        }
      ],
      3: [
        {
          id: 1,
          type: 'user',
          content: 'What are the different heat levels?',
          timestamp: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: 2,
          type: 'assistant',
          content: 'That\'s a great question! Looking at the historical data, I notice that similar conditions have occurred before, and here\'s what we can learn from those patterns...',
          timestamp: new Date(Date.now() - 172800000 + 2000).toISOString()
        }
      ]
    }
  })
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    // Only scroll to bottom if there are messages and user is likely at bottom
    if (messages.length > 0) {
      // Check if user is near bottom of scroll area
      const messagesContainer = document.querySelector('.overflow-y-auto')
      if (messagesContainer) {
        const isNearBottom = messagesContainer.scrollTop + messagesContainer.clientHeight >= messagesContainer.scrollHeight - 100
        if (isNearBottom || messages.length === 1) {
          scrollToBottom()
          setTimeout(() => {
            scrollToBottom()
          }, 50)
        }
      }
    }
  }, [messages])

  // Additional effect to scroll during typing - more frequent
  useEffect(() => {
    const typingMessage = messages.find(msg => msg.isTyping)
    if (typingMessage) {
      // Scroll to bottom more frequently during typing
      const scrollInterval = setInterval(() => {
        const messagesContainer = document.querySelector('.overflow-y-auto')
        if (messagesContainer) {
          const isNearBottom = messagesContainer.scrollTop + messagesContainer.clientHeight >= messagesContainer.scrollHeight - 200
          if (isNearBottom) {
            scrollToBottom()
          }
        }
      }, 100) // Scroll every 100ms during typing
      
      return () => clearInterval(scrollInterval)
    }
  }, [messages])

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('floatchat_chatHistory', JSON.stringify(chatHistory))
  }, [chatHistory])

  // Save current chat ID to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('floatchat_currentChatId', currentChatId.toString())
  }, [currentChatId])

  // Save chat messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('floatchat_chatMessages', JSON.stringify(chatMessages))
  }, [chatMessages])

  // Load messages for current chat on component mount and when currentChatId changes
  useEffect(() => {
    setMessages(chatMessages[currentChatId] || [])
  }, [currentChatId, chatMessages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString()
    }

    // Update chat history if this is the first message in a blank chat
    const currentChat = chatHistory.find(chat => chat.id === currentChatId)
    if (currentChat && currentChat.messageCount === 0) {
      const firstMessage = inputMessage.trim()
      const chatTitle = firstMessage.length > 30 ? firstMessage.substring(0, 30) + '...' : firstMessage
      setChatHistory(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { 
              ...chat, 
              messageCount: 1, 
              title: chatTitle,
              preview: firstMessage.substring(0, 50) + (firstMessage.length > 50 ? '...' : '') 
            }
          : chat
      ))
    }

    // Update current messages and save to chatMessages
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setChatMessages(prev => ({
      ...prev,
      [currentChatId]: updatedMessages
    }))
    
    // Scroll to bottom immediately after user message
    setTimeout(() => {
      scrollToBottom()
    }, 50)
    
    setInputMessage('')
    setUploadedFiles([]) // Clear uploaded files when sending message
    setIsLoading(true)

    // Simulate AI response with typewriter effect
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage.trim())
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: '',
        timestamp: new Date().toISOString(),
        isTyping: true
      }
      
      // Add empty message first
      const messagesWithEmpty = [...updatedMessages, assistantMessage]
      setMessages(messagesWithEmpty)
      
      // Type out the response letter by letter
      let currentText = ''
      let index = 0
      const typeInterval = setInterval(() => {
        if (index < aiResponse.length) {
          currentText += aiResponse[index]
          const updatedMessage = {
            ...assistantMessage,
            content: currentText,
            isTyping: index < aiResponse.length - 1
          }
          
          const finalMessages = [...updatedMessages, updatedMessage]
          setMessages(finalMessages)
          setChatMessages(prev => ({
            ...prev,
            [currentChatId]: finalMessages
          }))
          
          // Scroll on each character only if near bottom
          setTimeout(() => {
            const messagesContainer = document.querySelector('.overflow-y-auto')
            if (messagesContainer) {
              const isNearBottom = messagesContainer.scrollTop + messagesContainer.clientHeight >= messagesContainer.scrollHeight - 150
              if (isNearBottom) {
                scrollToBottom()
              }
            }
          }, 10)
          
          index++
        } else {
          clearInterval(typeInterval)
          
          // Clear loading state immediately when typing finishes
          setTimeout(() => {
            setIsLoading(false)
          }, 10)
          
          // Update message count after AI response is complete
          if (currentChat && currentChat.messageCount === 1) {
            setChatHistory(prev => prev.map(chat => 
              chat.id === currentChatId 
                ? { ...chat, messageCount: 2 }
                : chat
            ))
          }
        }
      }, 15) // 15ms delay between each character (faster typing)
      
    }, 300 + Math.random() * 500) // Faster initial response (300-800ms)
  }

  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase()
    
    // Context-aware responses based on user input
    if (input.includes('temperature') || input.includes('temp')) {
      return "I can help you analyze temperature data! Temperature analysis typically involves looking at trends, patterns, and correlations with other environmental factors. What specific temperature data are you interested in? Are you looking at daily averages, seasonal patterns, or comparing different locations?"
    }
    
    if (input.includes('heat') || input.includes('level')) {
      return "Heat levels are a crucial part of environmental analysis. They're usually categorized into different intensity levels based on temperature ranges and duration. Would you like me to explain the different heat level classifications, or are you looking for analysis of heat level patterns in your data?"
    }
    
    if (input.includes('humidity') || input.includes('moisture')) {
      return "Humidity analysis is fascinating! It's closely related to temperature and can significantly impact environmental conditions. I can help you understand humidity patterns, its relationship with temperature, and how it affects different areas. What aspect of humidity data interests you most?"
    }
    
    if (input.includes('wind') || input.includes('speed')) {
      return "Wind speed data analysis can reveal important patterns about atmospheric conditions and their impact on environmental factors. Wind patterns often correlate with temperature and humidity changes. Are you looking to analyze wind speed trends, patterns, or their relationship with other environmental data?"
    }
    
    if (input.includes('pattern') || input.includes('trend')) {
      return "Pattern analysis is one of the most valuable aspects of environmental data! I can help identify trends, seasonal patterns, anomalies, and correlations between different environmental factors. What type of patterns are you most interested in discovering?"
    }
    
    if (input.includes('analyze') || input.includes('analysis')) {
      return "I'd be happy to help with your analysis! Environmental data analysis can involve many different approaches - from statistical analysis to pattern recognition. What specific data are you working with, and what kind of analysis are you hoping to perform?"
    }
    
    if (input.includes('compare') || input.includes('comparison')) {
      return "Comparative analysis is a great way to understand environmental differences! I can help you compare data between different areas, time periods, or environmental factors. What would you like to compare - different locations, time periods, or environmental variables?"
    }
    
    if (input.includes('north') || input.includes('zone') || input.includes('area')) {
      return "Geographic analysis is important for understanding regional environmental patterns! Different zones often have unique characteristics. I can help analyze data for specific areas, compare zones, or identify regional patterns. What specific zone or area are you interested in?"
    }
    
    // General helpful responses
    const generalResponses = [
      "That's a great question! I'm here to help you with environmental data analysis, temperature trends, heat level insights, and pattern discovery. Could you tell me more about what specific data or analysis you're working with?",
      "I'd be happy to help! Environmental data analysis can cover many areas - from temperature and humidity patterns to heat level classifications and geographic comparisons. What would you like to explore?",
      "Interesting! I can assist with various aspects of environmental analysis including data interpretation, pattern recognition, and trend analysis. What specific information are you looking for?",
      "That's a fascinating topic! I specialize in environmental data analysis and can help with temperature studies, heat level analysis, humidity patterns, and more. What would you like to dive into?",
      "Great question! I'm designed to help with environmental data analysis and insights. Whether you're looking at temperature data, heat patterns, humidity trends, or geographic comparisons, I'm here to assist. What specific area interests you?"
    ]
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)]
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  const startNewChat = () => {
    // Always find the first blank chat (messageCount === 0)
    const existingBlankChat = chatHistory.find(chat => chat.messageCount === 0)
    
    if (existingBlankChat) {
      // Switch to existing blank chat
      setCurrentChatId(existingBlankChat.id)
      setMessages([])
    } else {
      // Only create new chat if absolutely no blank chat exists
      const newChat = {
        id: Date.now(),
        title: 'New Chat',
        preview: 'Start a new conversation...',
        timestamp: new Date().toISOString(),
        messageCount: 0
      }
      setChatHistory(prev => [newChat, ...prev])
      setCurrentChatId(newChat.id)
      setMessages([])
      setChatMessages(prev => ({
        ...prev,
        [newChat.id]: []
      }))
    }
  }

  const selectChat = (chatId) => {
    setCurrentChatId(chatId)
    // Load messages for the selected chat
    setMessages(chatMessages[chatId] || [])
  }

  const deleteChat = (chatId) => {
    // Don't delete if it's the only chat or if it's the current chat
    if (chatHistory.length <= 1) return
    
    // Remove from chat history
    const updatedHistory = chatHistory.filter(chat => chat.id !== chatId)
    setChatHistory(updatedHistory)
    
    // Remove messages for this chat
    const updatedMessages = { ...chatMessages }
    delete updatedMessages[chatId]
    setChatMessages(updatedMessages)
    
    // If we deleted the current chat, switch to the first remaining chat
    if (currentChatId === chatId) {
      const firstChat = updatedHistory[0]
      if (firstChat) {
        setCurrentChatId(firstChat.id)
        setMessages(updatedMessages[firstChat.id] || [])
      }
    }
  }

  const exportChat = () => {
    if (messages.length === 0) return
    
    const currentChat = chatHistory.find(chat => chat.id === currentChatId)
    const chatTitle = currentChat?.title || 'Chat Export'
    
    // Create export content
    let exportContent = `# ${chatTitle}\n\n`
    exportContent += `Exported on: ${new Date().toLocaleString()}\n\n`
    
    messages.forEach((message, index) => {
      const timestamp = new Date(message.timestamp).toLocaleString()
      const sender = message.type === 'user' ? 'User' : 'FloatChat'
      exportContent += `## ${sender} (${timestamp})\n\n`
      exportContent += `${message.content}\n\n`
    })
    
    // Create and download file
    const blob = new Blob([exportContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${chatTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_export.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = async (text, messageId) => {
    try {
      await navigator.clipboard.writeText(text)
      // Show checkmark for 2 seconds
      setCopiedMessageId(messageId)
      setTimeout(() => {
        setCopiedMessageId(null)
      }, 2000)
      console.log('Text copied to clipboard')
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      // Show checkmark for 2 seconds
      setCopiedMessageId(messageId)
      setTimeout(() => {
        setCopiedMessageId(null)
      }, 2000)
      console.log('Text copied to clipboard (fallback)')
    }
  }

  const handleLike = (messageId) => {
    setLikedMessages(prev => {
      const newSet = new Set(prev)
      if (newSet.has(messageId)) {
        newSet.delete(messageId)
      } else {
        newSet.add(messageId)
        // Remove from disliked if it was disliked
        setDislikedMessages(prevDisliked => {
          const newDislikedSet = new Set(prevDisliked)
          newDislikedSet.delete(messageId)
          return newDislikedSet
        })
      }
      return newSet
    })
  }

  const handleDislike = (messageId) => {
    setDislikedMessages(prev => {
      const newSet = new Set(prev)
      if (newSet.has(messageId)) {
        newSet.delete(messageId)
      } else {
        newSet.add(messageId)
        // Remove from liked if it was liked
        setLikedMessages(prevLiked => {
          const newLikedSet = new Set(prevLiked)
          newLikedSet.delete(messageId)
          return newLikedSet
        })
      }
      return newSet
    })
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="h-screen flex bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 text-gray-900 flex-shrink-0">
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-4">
            <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="px-3 pb-3">
            <button
              onClick={startNewChat}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              New chat
            </button>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-200 mx-3"></div>

          {/* Additional Navigation */}
          <div className="px-3 py-3">
            <Link 
              to="/dashboard"
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
              Dashboard
            </Link>
            
            <Link 
              to="/patterns"
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Pattern
            </Link>
            
            <Link 
              to="/about"
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About
            </Link>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-200 mx-3"></div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto px-3 py-3">
            <div className="text-xs text-gray-500 font-medium mb-2 px-3">Chats</div>
                <div className="space-y-1">
                  {chatHistory.map((chat) => (
                    <div
                      key={chat.id}
                      className={`group flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                        currentChatId === chat.id
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <button
                        onClick={() => selectChat(chat.id)}
                        className="flex-1 text-left truncate"
                      >
                        {chat.title}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteChat(chat.id)
                        }}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-200 ml-2"
                        title="Delete chat"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-200 mx-3"></div>

          {/* User Account */}
          <div className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">SK</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{user?.name || 'Sonu Kumar'}</div>
                  <div className="text-xs text-gray-500">Free</div>
                </div>
              </div>
              <button className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md transition-colors">
                Upgrade
              </button>
            </div>
            <div className="mt-2 flex justify-end">
              <button className="text-gray-500 hover:text-gray-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

       {/* Main Chat Area */}
       <div className="flex-1 flex flex-col h-screen relative">
             {/* Chat Header */}
             <div className="bg-white px-4 py-3 flex-shrink-0">
               <div className="flex items-center justify-between">
                 {/* Left side - Export Chat (only when messages exist) */}
                 <div className="flex items-center">
                   {messages.length > 0 && (
                     <button
                       onClick={exportChat}
                       className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                     >
                       <Download className="w-4 h-4" />
                       <span>Export Chat</span>
                     </button>
                   )}
                 </div>
                 
                 {/* Right side - Header Actions */}
                 <div className="flex items-center space-x-2">
                   <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                   </button>
                   <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                     </svg>
                   </button>
                   <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                     </svg>
                   </button>
                 </div>
               </div>
             </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 pb-48">
          {messages.length === 0 ? (
            /* Welcome Screen */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-2xl">
                <h1 className="text-4xl font-semibold text-gray-900 mb-8">FloatChat</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="text-left">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">💬 Chat Assistant</h3>
                    <p className="text-gray-600 text-sm">Ask questions about environmental data, temperature analysis, and heat level insights.</p>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">📊 Data Analysis</h3>
                    <p className="text-gray-600 text-sm">Get detailed analysis of temperature trends, humidity patterns, and area comparisons.</p>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">🔍 Pattern Discovery</h3>
                    <p className="text-gray-600 text-sm">Discover hidden patterns and anomalies in your environmental data.</p>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">📈 Insights</h3>
                    <p className="text-gray-600 text-sm">Receive AI-powered insights and recommendations for your data analysis.</p>
                  </div>
                </div>
                    <div className="space-y-3">
                      <p className="text-xs text-gray-500 font-medium mb-4 px-3">Try asking:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        {[
                          "Analyze temperature data for North Zone",
                          "What are the different heat levels?",
                          "Compare humidity between areas",
                          "Show me patterns in wind speed data"
                        ].map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => setInputMessage(suggestion)}
                            className="block w-full text-left px-3 py-2 rounded-md text-sm transition-colors text-gray-700 hover:bg-gray-50"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
              </div>
            </div>
          ) : (
            /* Chat Messages */
            <>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-6`}
                    >
                      <div className="max-w-3xl">
                        <div className="flex items-start">
                          <div className="flex-1 group">
                            <div className={`prose prose-sm max-w-none ${
                              message.type === 'user' ? 'text-gray-900' : 'text-gray-800'
                            }`}>
                              <p className={`mb-0 ${message.type === 'user' ? 'bg-gray-100 px-3 py-2 rounded-lg' : ''}`}>
                                {message.content}
                              </p>
                            </div>
                            {/* Action buttons for AI messages */}
                            {message.type === 'assistant' && message.content && !message.isTyping && (
                              <div className="mt-2 flex items-center space-x-1">
                                {/* Copy button */}
                                <button
                                  onClick={() => copyToClipboard(message.content, message.id)}
                                  className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800 transition-all duration-200"
                                  title="Copy message"
                                >
                                  {copiedMessageId === message.id ? (
                                    <Check className="w-4 h-4" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </button>
                                
                                {/* Like button */}
                                <button
                                  onClick={() => handleLike(message.id)}
                                  className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800 transition-all duration-200"
                                  title="Like this response"
                                >
                                  <ThumbsUp className={`w-4 h-4 ${likedMessages.has(message.id) ? 'fill-current' : ''}`} />
                                </button>
                                
                                {/* Dislike button */}
                                <button
                                  onClick={() => handleDislike(message.id)}
                                  className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-800 transition-all duration-200"
                                  title="Dislike this response"
                                >
                                  <ThumbsDown className={`w-4 h-4 ${dislikedMessages.has(message.id) ? 'fill-current' : ''}`} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              
              {isLoading && !messages.some(msg => msg.isTyping) && (
                <div className="flex justify-start mb-6">
                  <div className="max-w-3xl">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - Fixed at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
          <div className="max-w-3xl mx-auto px-4 py-4">
            
            {/* Uploaded Files Display */}
            {uploadedFiles.length > 0 && (
              <div className="mb-3">
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="relative flex-shrink-0">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg border-2 border-gray-200 overflow-hidden hover:bg-gray-200 transition-colors">
                        {/* Image Preview or File Icon */}
                        {file.type.startsWith('image/') ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-2">
                            {/* File Icon */}
                            <div className="flex-1 flex items-center justify-center">
                              {file.type.includes('pdf') ? (
                                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                              ) : file.type.includes('word') || file.type.includes('document') ? (
                                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              ) : file.type.includes('sheet') || file.type.includes('excel') ? (
                                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              ) : (
                                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              )}
                            </div>
                            {/* File Name */}
                            <div className="text-xs text-gray-600 text-center truncate w-full mt-1">
                              {file.name.length > 8 ? file.name.substring(0, 8) + '...' : file.name}
                            </div>
                          </div>
                        )}
                        {/* Remove Button - Inside Top Right */}
                        <button
                          onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                          className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm"
                        >
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Message FloatChat..."
                    className="w-full px-12 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:border-gray-500 resize-none bg-white shadow-sm"
                    rows={1}
                    style={{ minHeight: '52px', maxHeight: '200px' }}
                  />
              
              {/* File attachment button */}
              <button
                onClick={() => {
                  // Handle file attachment
                  const input = document.createElement('input')
                  input.type = 'file'
                  input.multiple = true
                  input.accept = '.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.csv,.xlsx'
                  input.onchange = (e) => {
                    const files = Array.from(e.target.files)
                    console.log('Files selected:', files)
                    // Store uploaded files
                    setUploadedFiles(prev => [...prev, ...files])
                  }
                  input.click()
                }}
                className="absolute left-2 top-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-xl transition-colors"
                title="Attach files"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="absolute right-2 top-2 bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-colors"
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <ArrowUp className="w-4 h-4" />
                    )}
                  </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              FloatChat can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface

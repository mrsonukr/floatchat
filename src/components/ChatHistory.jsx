import { useState } from 'react'

const ChatHistory = ({ user }) => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDate, setFilterDate] = useState('all')

  // Mock chat history data
  const chatHistory = [
    {
      id: 1,
      title: 'Temperature Analysis Discussion',
      preview: 'Can you analyze the temperature trends in the North Zone?',
      timestamp: '2024-01-15T10:30:00Z',
      messageCount: 12,
      area: 'North Zone',
      heatLevel: 'High Heat',
      tags: ['temperature', 'analysis', 'trends']
    },
    {
      id: 2,
      title: 'Heat Level Comparison',
      preview: 'How do the different heat levels affect humidity?',
      timestamp: '2024-01-14T15:45:00Z',
      messageCount: 8,
      area: 'Central Zone',
      heatLevel: 'Medium Heat',
      tags: ['heat', 'humidity', 'comparison']
    },
    {
      id: 3,
      title: 'Data Export Request',
      preview: 'I need to export the current data for my report',
      timestamp: '2024-01-13T09:20:00Z',
      messageCount: 5,
      area: 'South Zone',
      heatLevel: 'Low Heat',
      tags: ['export', 'data', 'report']
    },
    {
      id: 4,
      title: 'Pattern Discovery Session',
      preview: 'Are there any anomalies in the pressure readings?',
      timestamp: '2024-01-12T14:15:00Z',
      messageCount: 15,
      area: 'East Zone',
      heatLevel: 'Extreme Heat',
      tags: ['patterns', 'anomalies', 'pressure']
    },
    {
      id: 5,
      title: 'Wind Speed Analysis',
      preview: 'What factors influence wind speed variations?',
      timestamp: '2024-01-11T11:30:00Z',
      messageCount: 10,
      area: 'West Zone',
      heatLevel: 'Medium Heat',
      tags: ['wind', 'analysis', 'factors']
    }
  ]

  const filteredChats = chatHistory.filter(chat => {
    const matchesSearch = chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chat.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chat.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesDate = filterDate === 'all' || 
                       (filterDate === 'today' && isToday(chat.timestamp)) ||
                       (filterDate === 'week' && isThisWeek(chat.timestamp)) ||
                       (filterDate === 'month' && isThisMonth(chat.timestamp))
    
    return matchesSearch && matchesDate
  })

  const isToday = (timestamp) => {
    const today = new Date()
    const chatDate = new Date(timestamp)
    return chatDate.toDateString() === today.toDateString()
  }

  const isThisWeek = (timestamp) => {
    const today = new Date()
    const chatDate = new Date(timestamp)
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    return chatDate >= weekAgo
  }

  const isThisMonth = (timestamp) => {
    const today = new Date()
    const chatDate = new Date(timestamp)
    return chatDate.getMonth() === today.getMonth() && chatDate.getFullYear() === today.getFullYear()
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  const exportChatHistory = () => {
    const data = {
      user: user.name,
      exportDate: new Date().toISOString(),
      chats: filteredChats
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chat-history-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const deleteChat = (chatId) => {
    if (window.confirm('Are you sure you want to delete this chat?')) {
      // In a real app, this would make an API call
      console.log('Deleting chat:', chatId)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <span className="mr-3">📚</span>
          Chat History
        </h1>
        <p className="text-gray-600">
          Browse and manage your previous conversations with the AI assistant.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chat List */}
        <div className="lg:col-span-2">
          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                <button
                  onClick={exportChatHistory}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                >
                  <span className="mr-2">📥</span>
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Chat List */}
          <div className="space-y-4">
            {filteredChats.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No chats found</h3>
                <p className="text-gray-600">
                  {searchTerm ? 'Try adjusting your search terms' : 'Start a new conversation to see it here'}
                </p>
              </div>
            ) : (
              filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all hover:shadow-lg ${
                    selectedChat?.id === chat.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-gray-900 text-lg">{chat.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{formatDate(chat.timestamp)}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteChat(chat.id)
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete chat"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{chat.preview}</p>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-1">📍</span>
                      {chat.area}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-1">🔥</span>
                      {chat.heatLevel}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-1">💬</span>
                      {chat.messageCount} messages
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {chat.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Details */}
        <div className="lg:col-span-1">
          {selectedChat ? (
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="font-medium text-gray-900 mb-4">Chat Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Title</label>
                  <p className="text-gray-900">{selectedChat.title}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Preview</label>
                  <p className="text-gray-600">{selectedChat.preview}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Area</label>
                  <p className="text-gray-900">{selectedChat.area}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Heat Level</label>
                  <p className="text-gray-900">{selectedChat.heatLevel}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Message Count</label>
                  <p className="text-gray-900">{selectedChat.messageCount} messages</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Created</label>
                  <p className="text-gray-900">{new Date(selectedChat.timestamp).toLocaleString()}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Tags</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedChat.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Continue Chat
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
                  View Full Chat
                </button>
                <button className="w-full bg-green-100 hover:bg-green-200 text-green-700 py-2 px-4 rounded-lg font-medium transition-colors">
                  Export This Chat
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <div className="text-gray-400 text-4xl mb-4">💬</div>
                <h3 className="font-medium text-gray-900 mb-2">Select a Chat</h3>
                <p className="text-gray-600 text-sm">
                  Click on a chat from the list to view its details and options.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="font-medium text-gray-900 mb-4">History Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{chatHistory.length}</div>
            <div className="text-sm text-gray-600">Total Chats</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {chatHistory.reduce((sum, chat) => sum + chat.messageCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Messages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(chatHistory.map(chat => chat.area)).size}
            </div>
            <div className="text-sm text-gray-600">Areas Covered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {new Set(chatHistory.map(chat => chat.heatLevel)).size}
            </div>
            <div className="text-sm text-gray-600">Heat Levels</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatHistory


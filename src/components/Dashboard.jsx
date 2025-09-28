import { useState } from 'react'
import { MessageCircle, Home, Info } from 'lucide-react'

const Dashboard = ({ user }) => {
  const [selectedArea, setSelectedArea] = useState('')
  const [selectedHeat, setSelectedHeat] = useState('')
  const [dataType, setDataType] = useState('temperature')

  const areas = [
    { id: 'north', name: 'North Zone', description: 'Northern region data analysis' },
    { id: 'south', name: 'South Zone', description: 'Southern region data analysis' },
    { id: 'east', name: 'East Zone', description: 'Eastern region data analysis' },
    { id: 'west', name: 'West Zone', description: 'Western region data analysis' },
    { id: 'central', name: 'Central Zone', description: 'Central region data analysis' }
  ]

  const heatLevels = [
    { id: 'low', name: 'Low Heat', color: 'bg-green-500', description: 'Below 30°C' },
    { id: 'medium', name: 'Medium Heat', color: 'bg-yellow-500', description: '30-50°C' },
    { id: 'high', name: 'High Heat', color: 'bg-orange-500', description: '50-70°C' },
    { id: 'extreme', name: 'Extreme Heat', color: 'bg-red-500', description: 'Above 70°C' }
  ]

  const dataTypes = [
    { id: 'temperature', name: 'Temperature', icon: '🌡️' },
    { id: 'humidity', name: 'Humidity', icon: '💧' },
    { id: 'pressure', name: 'Pressure', icon: '📊' },
    { id: 'wind', name: 'Wind Speed', icon: '💨' },
    { id: 'precipitation', name: 'Precipitation', icon: '🌧️' }
  ]

  const mockData = {
    temperature: { value: '42.5°C', trend: '+2.3°C', status: 'rising' },
    humidity: { value: '68%', trend: '-5%', status: 'falling' },
    pressure: { value: '1013.2 hPa', trend: '+0.8 hPa', status: 'rising' },
    wind: { value: '12.4 km/h', trend: '+1.2 km/h', status: 'rising' },
    precipitation: { value: '0.0 mm', trend: '0.0 mm', status: 'stable' }
  }

  const handleAreaSelect = (areaId) => {
    setSelectedArea(areaId)
    // Simulate data loading
  }

  const handleHeatSelect = (heatId) => {
    setSelectedHeat(heatId)
  }

  const handleDataTypeChange = (type) => {
    setDataType(type)
  }

  const exportData = () => {
    const data = {
      area: selectedArea,
      heatLevel: selectedHeat,
      dataType: dataType,
      timestamp: new Date().toISOString(),
      user: user.name
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `floatchat-data-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              Welcome back, {user?.name || 'User'}! 👋
            </h1>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <a 
              href="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </a>
            <div className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 bg-gray-100 flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </div>
            <a 
              href="/patterns"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Patterns
            </a>
            <a 
              href="/about"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center"
            >
              <Info className="w-4 h-4 mr-2" />
              About
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600 mb-8">
            Select an area and heat level to analyze data and start chatting with our AI assistant.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Area Selection */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📍</span>
                  Select Area
                </h2>
                <div className="space-y-3">
                  {areas.map((area) => (
                    <button
                      key={area.id}
                      onClick={() => handleAreaSelect(area.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        selectedArea === area.id
                          ? 'border-gray-400 bg-gray-100'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium text-gray-900">{area.name}</div>
                      <div className="text-sm text-gray-600">{area.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Heat Level Selection */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🔥</span>
                  Heat Level
                </h2>
                <div className="space-y-3">
                  {heatLevels.map((heat) => (
                    <button
                      key={heat.id}
                      onClick={() => handleHeatSelect(heat.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        selectedHeat === heat.id
                          ? 'border-gray-400 bg-gray-100'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${heat.color} mr-3`}></div>
                        <div>
                          <div className="font-medium text-gray-900">{heat.name}</div>
                          <div className="text-sm text-gray-600">{heat.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Type Selection */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📊</span>
                  Data Type
                </h2>
                <div className="space-y-3">
                  {dataTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleDataTypeChange(type.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        dataType === type.id
                          ? 'border-gray-400 bg-gray-100'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{type.icon}</span>
                        <div className="font-medium text-gray-900">{type.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Data Display */}
          {selectedArea && selectedHeat && (
            <div className="mt-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="mr-2">📈</span>
                    Current Data Analysis
                  </h2>
                  <button
                    onClick={exportData}
                    className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                  >
                    <span className="mr-2">📥</span>
                    Export Data
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {dataTypes.map((type) => {
                    const data = mockData[type.id]
                    return (
                      <div key={type.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <span className="text-xl mr-2">{type.icon}</span>
                          <span className="font-medium text-gray-900">{type.name}</span>
                        </div>
                        <div className="text-xl font-bold text-gray-900 mb-1">{data.value}</div>
                        <div className={`text-sm flex items-center ${
                          data.status === 'rising' ? 'text-red-600' : 
                          data.status === 'falling' ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          <span className="mr-1">
                            {data.status === 'rising' ? '↗️' : 
                             data.status === 'falling' ? '↘️' : '➡️'}
                          </span>
                          {data.trend}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Analysis Summary</h3>
                  <p className="text-gray-700 text-sm">
                    Based on the selected {areas.find(a => a.id === selectedArea)?.name} area and {heatLevels.find(h => h.id === selectedHeat)?.name} level, 
                    the current {dataTypes.find(d => d.id === dataType)?.name} readings show {mockData[dataType].status} trends. 
                    This data can be used for further analysis and AI-powered insights.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">⚡</span>
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="/" className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
                  <div className="font-medium text-gray-900 mb-1">💬 Start New Chat</div>
                  <div className="text-sm text-gray-600">Begin a conversation with AI assistant</div>
                </a>
                <a href="/history" className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
                  <div className="font-medium text-gray-900 mb-1">📚 View History</div>
                  <div className="text-sm text-gray-600">Browse previous conversations</div>
                </a>
                <a href="/patterns" className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left">
                  <div className="font-medium text-gray-900 mb-1">🔍 Pattern Analysis</div>
                  <div className="text-sm text-gray-600">Discover data patterns and anomalies</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard


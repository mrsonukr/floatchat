import { useState } from 'react'
import { MessageCircle, Home, Info, X, MapPin, Thermometer, BarChart3, Droplets, Gauge, Wind, CloudRain, History, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from './Header'

const Dashboard = ({ user }) => {
  const [selectedArea, setSelectedArea] = useState(null)
  const [selectedHeatLevel, setSelectedHeatLevel] = useState(null)
  const [selectedDataType, setSelectedDataType] = useState(null)
  const [selectedAction, setSelectedAction] = useState(null)

  const areas = [
    { id: 'north', name: 'North Zone', description: 'Northern region data analysis', icon: MapPin },
    { id: 'south', name: 'South Zone', description: 'Southern region data analysis', icon: MapPin },
    { id: 'east', name: 'East Zone', description: 'Eastern region data analysis', icon: MapPin },
    { id: 'west', name: 'West Zone', description: 'Western region data analysis', icon: MapPin },
    { id: 'central', name: 'Central Zone', description: 'Central region data analysis', icon: MapPin }
  ]

  const heatLevels = [
    { id: 'low', name: 'Low Heat', description: 'Below 30°C', icon: Thermometer },
    { id: 'medium', name: 'Medium Heat', description: '30-50°C', icon: Thermometer },
    { id: 'high', name: 'High Heat', description: '50-70°C', icon: Thermometer },
    { id: 'extreme', name: 'Extreme Heat', description: 'Above 70°C', icon: Thermometer }
  ]

  const dataTypes = [
    { id: 'temperature', name: 'Temperature', icon: Thermometer },
    { id: 'humidity', name: 'Humidity', icon: Droplets },
    { id: 'pressure', name: 'Pressure', icon: BarChart3 },
    { id: 'wind', name: 'Wind Speed', icon: Wind },
    { id: 'precipitation', name: 'Precipitation', icon: CloudRain }
  ]

  const quickActions = [
    { id: 'chat', name: 'Start New Chat', description: 'Begin a conversation with AI assistant', icon: MessageCircle },
    { id: 'history', name: 'View History', description: 'Browse previous conversations', icon: History },
    { id: 'patterns', name: 'Pattern Analysis', description: 'Discover data patterns and anomalies', icon: Search }
  ]

  return (
    <div className="h-screen bg-gray-50">
      <Header currentPage="dashboard" />

      {/* Main Dashboard Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">

          {/* Main Content */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Select an area and heat level to analyze data and start chatting with our AI assistant.</h1>
            
            {/* Select Area */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <MapPin className="w-5 h-5 text-gray-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Select Area</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {areas.map((area) => {
                  const IconComponent = area.icon
                  return (
                    <div
                      key={area.id}
                      onClick={() => setSelectedArea(area)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedArea?.id === area.id 
                          ? 'border-gray-800 bg-gray-50' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <IconComponent className="w-5 h-5 text-gray-600 mr-2" />
                        <h3 className="font-medium text-gray-900">{area.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{area.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Heat Level */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Thermometer className="w-5 h-5 text-gray-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Heat Level</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {heatLevels.map((heat) => {
                  const IconComponent = heat.icon
                  return (
                    <div
                      key={heat.id}
                      onClick={() => setSelectedHeatLevel(heat)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedHeatLevel?.id === heat.id 
                          ? 'border-gray-800 bg-gray-50' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <IconComponent className="w-5 h-5 text-gray-600 mr-2" />
                        <h3 className="font-medium text-gray-900">{heat.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{heat.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Data Type */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <BarChart3 className="w-5 h-5 text-gray-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Data Type</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {dataTypes.map((data) => {
                  const IconComponent = data.icon
                  return (
                    <div
                      key={data.id}
                      onClick={() => setSelectedDataType(data)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedDataType?.id === data.id 
                          ? 'border-gray-800 bg-gray-50' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <IconComponent className="w-6 h-6 text-gray-600 mb-2" />
                        <h3 className="font-medium text-gray-900 text-sm">{data.name}</h3>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center mb-4">
              <MessageCircle className="w-5 h-5 text-gray-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action) => {
                const IconComponent = action.icon
                return (
                  <div
                    key={action.id}
                    onClick={() => setSelectedAction(action)}
                    className="p-4 rounded-lg border border-gray-200 hover:border-gray-400 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center mb-2">
                      <IconComponent className="w-5 h-5 text-gray-600 mr-2" />
                      <h3 className="font-medium text-gray-900">{action.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Action Popup */}
      {selectedAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{selectedAction.name}</h3>
              <button
                onClick={() => setSelectedAction(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="text-center">
              <div className="mb-4">
                {(() => {
                  const IconComponent = selectedAction.icon
                  return <IconComponent className="w-12 h-12 text-gray-600 mx-auto" />
                })()}
              </div>
              <p className="text-gray-600 mb-6">{selectedAction.description}</p>
              
              {selectedAction.id === 'chat' && (
                <Link
                  to="/"
                  className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Start Chatting
                </Link>
              )}
              
              {selectedAction.id === 'history' && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500">View your previous conversations</p>
                  <button className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors">
                    View History
                  </button>
                </div>
              )}
              
              {selectedAction.id === 'patterns' && (
                <Link
                  to="/patterns"
                  className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Analyze Patterns
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
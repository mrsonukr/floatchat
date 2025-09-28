import { useState, useEffect } from 'react'
import { MessageCircle, Home, Info, Activity, AlertTriangle, TrendingUp, BarChart3, X, Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from './Header'

const PatternDiscovery = ({ user }) => {
  const [showDiscovery, setShowDiscovery] = useState(false)
  const [showAnomalies, setShowAnomalies] = useState(false)
  const [selectedPattern, setSelectedPattern] = useState(null)

  const patterns = [
    {
      id: 'temperature',
      name: 'Temperature Patterns',
      description: 'Analyze temperature trends and cycles',
      type: 'trend',
      confidence: 85,
      lastDetected: '2 hours ago'
    },
    {
      id: 'humidity',
      name: 'Humidity Cycles',
      description: 'Identify humidity fluctuation patterns',
      type: 'cycle',
      confidence: 92,
      lastDetected: '1 hour ago'
    },
    {
      id: 'pressure',
      name: 'Pressure Variations',
      description: 'Detect atmospheric pressure changes',
      type: 'variation',
      confidence: 78,
      lastDetected: '30 minutes ago'
    }
  ]

  const anomalies = [
    {
      id: 'spike-1',
      type: 'Temperature Spike',
      severity: 'High',
      region: 'North Zone',
      time: '2 hours ago',
      description: 'Unusual temperature increase detected',
      impact: 'High'
    },
    {
      id: 'drop-1',
      type: 'Humidity Drop',
      severity: 'Medium',
      region: 'South Zone',
      time: '4 hours ago',
      description: 'Significant humidity decrease observed',
      impact: 'Medium'
    },
    {
      id: 'pressure-1',
      type: 'Pressure Anomaly',
      severity: 'Low',
      region: 'East Zone',
      time: '6 hours ago',
      description: 'Minor pressure fluctuation detected',
      impact: 'Low'
    }
  ]

  const discoveries = [
    {
      id: 'peak-hours',
      name: 'Peak Usage Hours',
      description: 'Data shows highest activity between 2:00 PM - 4:00 PM',
      confidence: 95,
      type: 'usage'
    },
    {
      id: 'seasonal-trend',
      name: 'Seasonal Temperature Trend',
      description: 'Temperature patterns follow seasonal variations',
      confidence: 88,
      type: 'seasonal'
    },
    {
      id: 'correlation',
      name: 'Humidity-Pressure Correlation',
      description: 'Strong correlation between humidity and pressure changes',
      confidence: 82,
      type: 'correlation'
    }
  ]

  return (
    <div className="h-screen bg-gray-50">
      <Header currentPage="patterns" />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pattern Discovery & Analysis</h1>
            <p className="text-gray-600">Discover patterns and anomalies in your data to gain valuable insights.</p>
          </div>

          {/* Pattern Analysis Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-gray-600" />
              Pattern Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {patterns.map((pattern) => (
                <div
                  key={pattern.id}
                  onClick={() => setSelectedPattern(pattern)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-400 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{pattern.name}</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {pattern.confidence}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{pattern.description}</p>
                  <p className="text-xs text-gray-500">Last detected: {pattern.lastDetected}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Optional Sections Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setShowDiscovery(!showDiscovery)}
              className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                showDiscovery 
                  ? 'border-gray-800 bg-gray-50 text-gray-900' 
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              {showDiscovery ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
              Discovery Section
            </button>
            <button
              onClick={() => setShowAnomalies(!showAnomalies)}
              className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                showAnomalies 
                  ? 'border-gray-800 bg-gray-50 text-gray-900' 
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              {showAnomalies ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
              Anomaly Section
            </button>
          </div>

          {/* Discovery Section - Optional */}
          {showDiscovery && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-gray-600" />
                  Data Discoveries
                </h2>
                <button
                  onClick={() => setShowDiscovery(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {discoveries.map((discovery) => (
                  <div key={discovery.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{discovery.name}</h3>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        {discovery.confidence}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{discovery.description}</p>
                    <div className="mt-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {discovery.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Anomaly Section - Optional */}
          {showAnomalies && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-gray-600" />
                  Anomaly Detection
                </h2>
                <button
                  onClick={() => setShowAnomalies(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {anomalies.map((anomaly) => (
                  <div key={anomaly.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <AlertTriangle className={`w-5 h-5 mr-4 ${
                      anomaly.severity === 'High' ? 'text-gray-800' : 
                      anomaly.severity === 'Medium' ? 'text-gray-600' : 'text-gray-400'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-900">{anomaly.type}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          anomaly.severity === 'High' 
                            ? 'bg-gray-800 text-white' 
                            : anomaly.severity === 'Medium'
                            ? 'bg-gray-600 text-white'
                            : 'bg-gray-400 text-white'
                        }`}>
                          {anomaly.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{anomaly.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{anomaly.region}</span>
                        <span className="mx-2">•</span>
                        <span>{anomaly.time}</span>
                        <span className="mx-2">•</span>
                        <span>Impact: {anomaly.impact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pattern Detail Popup */}
      {selectedPattern && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{selectedPattern.name}</h3>
              <button
                onClick={() => setSelectedPattern(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">{selectedPattern.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Confidence Level</span>
                  <span className="font-medium text-gray-900">{selectedPattern.confidence}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Pattern Type</span>
                  <span className="font-medium text-gray-900 capitalize">{selectedPattern.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Last Detected</span>
                  <span className="font-medium text-gray-900">{selectedPattern.lastDetected}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors">
                  Analyze Further
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Export Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PatternDiscovery
import { useState, useEffect } from 'react'
import { MessageCircle, Home, Info } from 'lucide-react'

const PatternDiscovery = ({ user }) => {
  const [selectedArea, setSelectedArea] = useState('')
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')
  const [analysisType, setAnalysisType] = useState('patterns')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)

  const areas = [
    { id: 'north', name: 'North Zone', color: 'bg-blue-500' },
    { id: 'south', name: 'South Zone', color: 'bg-green-500' },
    { id: 'east', name: 'East Zone', color: 'bg-yellow-500' },
    { id: 'west', name: 'West Zone', color: 'bg-purple-500' },
    { id: 'central', name: 'Central Zone', color: 'bg-red-500' }
  ]

  const timeframes = [
    { id: '1d', name: 'Last 24 Hours', description: 'Recent patterns and immediate anomalies' },
    { id: '7d', name: 'Last 7 Days', description: 'Weekly trends and cyclical patterns' },
    { id: '30d', name: 'Last 30 Days', description: 'Monthly patterns and seasonal trends' },
    { id: '90d', name: 'Last 3 Months', description: 'Quarterly analysis and long-term trends' }
  ]

  const analysisTypes = [
    { id: 'patterns', name: 'Pattern Recognition', icon: '🔍', description: 'Identify recurring patterns in data' },
    { id: 'anomalies', name: 'Anomaly Detection', icon: '⚠️', description: 'Detect unusual data points and outliers' },
    { id: 'correlations', name: 'Correlation Analysis', icon: '📊', description: 'Find relationships between variables' },
    { id: 'predictions', name: 'Predictive Analysis', icon: '🔮', description: 'Forecast future trends and values' }
  ]

  const mockResults = {
    patterns: {
      title: 'Pattern Recognition Results',
      summary: 'Identified 3 significant patterns in the selected data',
      patterns: [
        {
          id: 1,
          name: 'Daily Temperature Cycle',
          confidence: 94,
          description: 'Clear daily temperature variation with peak at 2 PM and minimum at 6 AM',
          impact: 'High',
          trend: 'Stable'
        },
        {
          id: 2,
          name: 'Weekly Humidity Pattern',
          confidence: 87,
          description: 'Humidity increases consistently on weekends, possibly due to reduced industrial activity',
          impact: 'Medium',
          trend: 'Increasing'
        },
        {
          id: 3,
          name: 'Pressure System Correlation',
          confidence: 91,
          description: 'Atmospheric pressure shows inverse correlation with wind speed',
          impact: 'High',
          trend: 'Stable'
        }
      ]
    },
    anomalies: {
      title: 'Anomaly Detection Results',
      summary: 'Found 5 anomalies requiring attention',
      anomalies: [
        {
          id: 1,
          timestamp: '2024-01-15T14:30:00Z',
          type: 'Temperature Spike',
          severity: 'High',
          value: '45.2°C',
          normalRange: '35-40°C',
          description: 'Temperature exceeded normal range by 5.2°C',
          possibleCause: 'Equipment malfunction or extreme weather event'
        },
        {
          id: 2,
          timestamp: '2024-01-14T08:15:00Z',
          type: 'Humidity Drop',
          severity: 'Medium',
          value: '15%',
          normalRange: '40-60%',
          description: 'Humidity dropped significantly below normal levels',
          possibleCause: 'Sensor calibration issue or environmental change'
        },
        {
          id: 3,
          timestamp: '2024-01-13T22:45:00Z',
          type: 'Pressure Fluctuation',
          severity: 'Low',
          value: '980.5 hPa',
          normalRange: '1010-1020 hPa',
          description: 'Atmospheric pressure showed unusual fluctuation',
          possibleCause: 'Weather system transition or measurement error'
        }
      ]
    },
    correlations: {
      title: 'Correlation Analysis Results',
      summary: 'Identified 4 significant correlations between variables',
      correlations: [
        {
          id: 1,
          variables: 'Temperature ↔ Humidity',
          correlation: -0.78,
          strength: 'Strong Negative',
          description: 'Temperature and humidity show strong inverse relationship',
          significance: 'High'
        },
        {
          id: 2,
          variables: 'Pressure ↔ Wind Speed',
          correlation: -0.65,
          strength: 'Moderate Negative',
          description: 'Lower pressure correlates with higher wind speeds',
          significance: 'Medium'
        },
        {
          id: 3,
          variables: 'Time of Day ↔ Temperature',
          correlation: 0.72,
          strength: 'Strong Positive',
          description: 'Temperature follows predictable daily cycle',
          significance: 'High'
        }
      ]
    },
    predictions: {
      title: 'Predictive Analysis Results',
      summary: 'Generated forecasts for next 7 days',
      predictions: [
        {
          id: 1,
          variable: 'Temperature',
          currentValue: '38.5°C',
          predictedValue: '42.1°C',
          confidence: 89,
          trend: 'Increasing',
          timeframe: 'Next 24 hours'
        },
        {
          id: 2,
          variable: 'Humidity',
          currentValue: '55%',
          predictedValue: '48%',
          confidence: 76,
          trend: 'Decreasing',
          timeframe: 'Next 48 hours'
        },
        {
          id: 3,
          variable: 'Wind Speed',
          currentValue: '12 km/h',
          predictedValue: '18 km/h',
          confidence: 82,
          trend: 'Increasing',
          timeframe: 'Next 72 hours'
        }
      ]
    }
  }

  const runAnalysis = async () => {
    if (!selectedArea) {
      alert('Please select an area first')
      return
    }

    setIsAnalyzing(true)
    
    // Simulate analysis time
    setTimeout(() => {
      setResults(mockResults[analysisType])
      setIsAnalyzing(false)
    }, 2000 + Math.random() * 3000)
  }

  const exportResults = () => {
    if (!results) return

    const data = {
      analysisType,
      area: selectedArea,
      timeframe: selectedTimeframe,
      timestamp: new Date().toISOString(),
      user: user.name,
      results
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pattern-analysis-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100'
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <span className="mr-3">🔍</span>
          Pattern Discovery & Anomaly Detection
        </h1>
        <p className="text-gray-600">
          Discover hidden patterns, detect anomalies, and analyze correlations in your environmental data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          {/* Area Selection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Area</h2>
            <div className="space-y-3">
              {areas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setSelectedArea(area.id)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    selectedArea === area.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${area.color} mr-3`}></div>
                    <span className="font-medium text-gray-900">{area.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Timeframe Selection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeframe</h2>
            <div className="space-y-3">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe.id}
                  onClick={() => setSelectedTimeframe(timeframe.id)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    selectedTimeframe === timeframe.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium text-gray-900">{timeframe.name}</div>
                  <div className="text-sm text-gray-600">{timeframe.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Analysis Type */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Analysis Type</h2>
            <div className="space-y-3">
              {analysisTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setAnalysisType(type.id)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    analysisType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-xl mr-3">{type.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">{type.name}</div>
                      <div className="text-sm text-gray-600">{type.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Run Analysis */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <button
              onClick={runAnalysis}
              disabled={!selectedArea || isAnalyzing}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <span className="mr-2">🚀</span>
                  Run Analysis
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {isAnalyzing ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Data...</h3>
              <p className="text-gray-600 mb-6">
                Our AI is processing your data to discover patterns and anomalies. This may take a few moments.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          ) : results ? (
            <div className="space-y-6">
              {/* Results Header */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">{results.title}</h2>
                  <button
                    onClick={exportResults}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                  >
                    <span className="mr-2">📥</span>
                    Export Results
                  </button>
                </div>
                <p className="text-gray-600">{results.summary}</p>
              </div>

              {/* Results Content */}
              {analysisType === 'patterns' && (
                <div className="space-y-4">
                  {results.patterns.map((pattern) => (
                    <div key={pattern.id} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-900">{pattern.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(pattern.confidence)}`}>
                          {pattern.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">{pattern.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Impact:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-sm ${getSeverityColor(pattern.impact)}`}>
                            {pattern.impact}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Trend:</span>
                          <span className="ml-2 text-gray-900">{pattern.trend}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {analysisType === 'anomalies' && (
                <div className="space-y-4">
                  {results.anomalies.map((anomaly) => (
                    <div key={anomaly.id} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-900">{anomaly.type}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(anomaly.severity)}`}>
                          {anomaly.severity} Severity
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Timestamp:</span>
                          <p className="text-gray-900">{new Date(anomaly.timestamp).toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Value:</span>
                          <p className="text-gray-900">{anomaly.value}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Normal Range:</span>
                          <p className="text-gray-900">{anomaly.normalRange}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Possible Cause:</span>
                          <p className="text-gray-900">{anomaly.possibleCause}</p>
                        </div>
                      </div>
                      <p className="text-gray-700">{anomaly.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {analysisType === 'correlations' && (
                <div className="space-y-4">
                  {results.correlations.map((correlation) => (
                    <div key={correlation.id} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-900">{correlation.variables}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(Math.abs(correlation.correlation) * 100)}`}>
                          {correlation.correlation.toFixed(2)} correlation
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">{correlation.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Strength:</span>
                          <span className="ml-2 text-gray-900">{correlation.strength}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Significance:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-sm ${getSeverityColor(correlation.significance)}`}>
                            {correlation.significance}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {analysisType === 'predictions' && (
                <div className="space-y-4">
                  {results.predictions.map((prediction) => (
                    <div key={prediction.id} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-900">{prediction.variable}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(prediction.confidence)}`}>
                          {prediction.confidence}% confidence
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Current Value:</span>
                          <p className="text-gray-900">{prediction.currentValue}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Predicted Value:</span>
                          <p className="text-gray-900">{prediction.predictedValue}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Timeframe:</span>
                          <p className="text-gray-900">{prediction.timeframe}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-600 mr-2">Trend:</span>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          prediction.trend === 'Increasing' ? 'text-red-600 bg-red-100' : 
                          prediction.trend === 'Decreasing' ? 'text-green-600 bg-green-100' : 
                          'text-gray-600 bg-gray-100'
                        }`}>
                          {prediction.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Analyze</h3>
              <p className="text-gray-600">
                Select an area and analysis type, then click "Run Analysis" to discover patterns and anomalies in your data.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PatternDiscovery


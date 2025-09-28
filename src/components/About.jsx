import { useState } from 'react'

const About = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'datasets', label: 'Datasets', icon: '📊' },
    { id: 'team', label: 'Team', icon: '👥' }
  ]

  const datasetSources = [
    {
      name: 'National Weather Service',
      description: 'Real-time weather data including temperature, humidity, pressure, and wind speed measurements',
      coverage: 'Global',
      updateFrequency: 'Every 15 minutes',
      reliability: '99.9%',
      icon: '🌤️'
    },
    {
      name: 'Environmental Monitoring Network',
      description: 'Comprehensive environmental data from ground-based sensors and satellite observations',
      coverage: 'North America',
      updateFrequency: 'Every 5 minutes',
      reliability: '99.8%',
      icon: '🛰️'
    },
    {
      name: 'Heat Mapping Consortium',
      description: 'Specialized heat level data and thermal imaging from urban heat island studies',
      coverage: 'Major Cities',
      updateFrequency: 'Hourly',
      reliability: '99.5%',
      icon: '🔥'
    },
    {
      name: 'Atmospheric Research Institute',
      description: 'Advanced atmospheric data including pressure systems, air quality, and climate patterns',
      coverage: 'Continental',
      updateFrequency: 'Every 30 minutes',
      reliability: '99.7%',
      icon: '🌍'
    }
  ]

  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Lead Data Scientist',
      expertise: 'Machine Learning, Climate Analysis',
      avatar: '👩‍🔬',
      description: 'PhD in Atmospheric Sciences with 10+ years in climate data analysis and AI model development.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Senior Software Engineer',
      expertise: 'Full-Stack Development, AI Integration',
      avatar: '👨‍💻',
      description: 'Expert in React, Node.js, and AI system architecture with focus on real-time data processing.'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Environmental Analyst',
      expertise: 'Environmental Science, Data Visualization',
      avatar: '👩‍🌾',
      description: 'Specialist in environmental monitoring and data interpretation with extensive field experience.'
    },
    {
      name: 'Alex Kim',
      role: 'UX/UI Designer',
      expertise: 'User Experience, Interface Design',
      avatar: '👨‍🎨',
      description: 'Passionate about creating intuitive interfaces that make complex data accessible to everyone.'
    },
    {
      name: 'Dr. James Thompson',
      role: 'AI Research Director',
      expertise: 'Artificial Intelligence, Pattern Recognition',
      avatar: '👨‍🔬',
      description: 'Leading researcher in AI applications for environmental monitoring and anomaly detection.'
    }
  ]


  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">About FloatChat</h3>
              <p className="text-gray-700 leading-relaxed">
                FloatChat is an advanced AI-powered chatbot platform designed to help users analyze and understand 
                environmental data, particularly focusing on temperature, heat levels, and atmospheric conditions. 
                Our platform combines cutting-edge artificial intelligence with comprehensive data sources to provide 
                real-time insights and analysis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">🎯</span>
                  Mission
                </h4>
                <p className="text-gray-700">
                  To democratize access to environmental data analysis through intuitive AI-powered conversations, 
                  making complex climate information accessible to everyone from researchers to concerned citizens.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">🚀</span>
                  Vision
                </h4>
                <p className="text-gray-700">
                  To become the leading platform for environmental data analysis, empowering users to make 
                  informed decisions about climate and environmental challenges through AI-assisted insights.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Key Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Real-time data analysis and visualization',
                  'AI-powered pattern recognition and anomaly detection',
                  'Multi-area environmental monitoring',
                  'Comprehensive heat level analysis',
                  'Interactive chat interface with natural language processing',
                  'Data export and reporting capabilities',
                  'Historical data analysis and trend identification',
                  'Customizable dashboard and user preferences'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'datasets':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Sources</h3>
              <p className="text-gray-700">
                Our platform integrates data from multiple trusted sources to provide comprehensive and accurate 
                environmental information. All data sources are regularly validated and updated to ensure reliability.
              </p>
            </div>

            <div className="space-y-4">
              {datasetSources.map((source, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start">
                    <div className="text-3xl mr-4">{source.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{source.name}</h4>
                      <p className="text-gray-700 mb-4">{source.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Coverage:</span>
                          <p className="text-gray-900">{source.coverage}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Update Frequency:</span>
                          <p className="text-gray-900">{source.updateFrequency}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Reliability:</span>
                          <p className="text-gray-900">{source.reliability}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Data Quality Assurance</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Validation Process</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Real-time data validation algorithms</li>
                    <li>• Cross-reference with multiple sources</li>
                    <li>• Automated anomaly detection</li>
                    <li>• Manual review of flagged data</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Quality Metrics</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 99.5%+ data accuracy rate</li>
                    <li>• &lt;1% missing data points</li>
                    <li>• Real-time error correction</li>
                    <li>• Continuous monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )

      case 'team':
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Team</h3>
              <p className="text-gray-700">
                Our diverse team of experts brings together decades of experience in environmental science, 
                artificial intelligence, software development, and user experience design.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start">
                    <div className="text-4xl mr-4">{member.avatar}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{member.name}</h4>
                      <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                      <p className="text-sm text-gray-600 mb-3">{member.expertise}</p>
                      <p className="text-gray-700 text-sm">{member.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Team Values</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🔬</div>
                  <h5 className="font-medium text-gray-900 mb-2">Scientific Excellence</h5>
                  <p className="text-sm text-gray-700">Rigorous methodology and evidence-based analysis</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🤝</div>
                  <h5 className="font-medium text-gray-900 mb-2">Collaboration</h5>
                  <p className="text-sm text-gray-700">Cross-disciplinary teamwork and knowledge sharing</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🌱</div>
                  <h5 className="font-medium text-gray-900 mb-2">Sustainability</h5>
                  <p className="text-sm text-gray-700">Commitment to environmental responsibility</p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <span className="mr-3">ℹ️</span>
          About FloatChat
        </h1>
        <p className="text-gray-600">
          Learn more about our platform, data sources, team, and technology.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {renderContent()}
      </div>

      {/* Contact Information */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Get in Touch</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-2">📧</div>
            <p className="font-medium text-gray-900">Email</p>
            <p className="text-sm text-gray-600">contact@floatchat.com</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🌐</div>
            <p className="font-medium text-gray-900">Website</p>
            <p className="text-sm text-gray-600">www.floatchat.com</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">💬</div>
            <p className="font-medium text-gray-900">Support</p>
            <p className="text-sm text-gray-600">support@floatchat.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

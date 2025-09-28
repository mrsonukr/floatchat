import { useState } from 'react'
import { MessageCircle, Home, Info, Database, Users, Mail, Github, Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from './Header'

const About = ({ user }) => {
  const [selectedMember, setSelectedMember] = useState(null)

  const dataSources = [
    {
      id: 'support-logs',
      name: 'Customer Support Logs',
      type: 'Text Data',
      size: '2.3TB',
      description: 'Historical customer support interactions and resolutions',
      format: 'JSON/CSV',
      updateFrequency: 'Real-time'
    },
    {
      id: 'behavior-analytics',
      name: 'User Behavior Analytics',
      type: 'Analytics Data',
      size: '1.8TB',
      description: 'User interaction patterns and engagement metrics',
      format: 'JSON',
      updateFrequency: 'Hourly'
    },
    {
      id: 'chat-transcripts',
      name: 'Chat Transcripts',
      type: 'Conversation Data',
      size: '3.1TB',
      description: 'Complete chat conversations and AI responses',
      format: 'Text/JSON',
      updateFrequency: 'Real-time'
    },
    {
      id: 'performance-metrics',
      name: 'Performance Metrics',
      type: 'Time Series Data',
      size: '890GB',
      description: 'System performance and response time data',
      format: 'Time Series',
      updateFrequency: 'Every 5 minutes'
    },
    {
      id: 'environmental-data',
      name: 'Environmental Data',
      type: 'Sensor Data',
      size: '1.2TB',
      description: 'Temperature, humidity, pressure, and weather data',
      format: 'JSON/CSV',
      updateFrequency: 'Every minute'
    }
  ]

  const teamMembers = [
    {
      id: 'sarah',
      name: 'Sarah Johnson',
      role: 'Lead Data Scientist',
      avatar: 'SJ',
      bio: 'Expert in machine learning and pattern recognition with 8+ years experience',
      email: 'sarah.johnson@floatchat.com',
      github: 'sarah-johnson',
      linkedin: 'sarah-johnson-ds'
    },
    {
      id: 'mike',
      name: 'Mike Chen',
      role: 'ML Engineer',
      avatar: 'MC',
      bio: 'Specializes in AI model deployment and optimization',
      email: 'mike.chen@floatchat.com',
      github: 'mike-chen-ml',
      linkedin: 'mike-chen-engineer'
    },
    {
      id: 'emily',
      name: 'Emily Rodriguez',
      role: 'Frontend Developer',
      avatar: 'ER',
      bio: 'UI/UX expert focused on creating intuitive user experiences',
      email: 'emily.rodriguez@floatchat.com',
      github: 'emily-rodriguez',
      linkedin: 'emily-rodriguez-dev'
    },
    {
      id: 'david',
      name: 'David Kim',
      role: 'Backend Developer',
      avatar: 'DK',
      bio: 'Full-stack developer with expertise in scalable systems',
      email: 'david.kim@floatchat.com',
      github: 'david-kim-dev',
      linkedin: 'david-kim-backend'
    },
    {
      id: 'alex',
      name: 'Alex Thompson',
      role: 'DevOps Engineer',
      avatar: 'AT',
      bio: 'Infrastructure specialist ensuring reliable and secure deployments',
      email: 'alex.thompson@floatchat.com',
      github: 'alex-thompson',
      linkedin: 'alex-thompson-devops'
    }
  ]

  return (
    <div className="h-screen bg-gray-50">
      <Header currentPage="about" />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">About FloatChat</h1>
            <p className="text-gray-600">Learn about our data sources, team, and mission to provide intelligent chat assistance.</p>
          </div>

          {/* Dataset Sources Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="flex items-center mb-6">
              <Database className="w-6 h-6 text-gray-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Dataset Sources</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dataSources.map((source) => (
                <div key={source.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">{source.name}</h3>
                    <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {source.size}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Type:</span>
                      <span className="text-gray-900">{source.type}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Format:</span>
                      <span className="text-gray-900">{source.format}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Update:</span>
                      <span className="text-gray-900">{source.updateFrequency}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">{source.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 text-gray-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Our Team</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-400 cursor-pointer transition-colors"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-gray-700">{member.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{member.bio}</p>
                  <div className="flex space-x-2">
                    <button className="flex items-center text-xs text-gray-500 hover:text-gray-700">
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </button>
                    <button className="flex items-center text-xs text-gray-500 hover:text-gray-700">
                      <Github className="w-3 h-3 mr-1" />
                      GitHub
                    </button>
                    <button className="flex items-center text-xs text-gray-500 hover:text-gray-700">
                      <Linkedin className="w-3 h-3 mr-1" />
                      LinkedIn
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Member Detail Popup */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{selectedMember.name}</h3>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-medium text-gray-700">{selectedMember.avatar}</span>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">{selectedMember.role}</h4>
              <p className="text-sm text-gray-600">{selectedMember.bio}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Email</span>
                <span className="text-sm text-gray-900">{selectedMember.email}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">GitHub</span>
                <span className="text-sm text-gray-900">@{selectedMember.github}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">LinkedIn</span>
                <span className="text-sm text-gray-900">/{selectedMember.linkedin}</span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <button className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors">
                Contact
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default About
import { useState, useEffect } from 'react'
import { MessageCircle, Home, Info } from 'lucide-react'
import { Link } from 'react-router-dom'

const PatternDiscovery = ({ user }) => {
  return (
    <div className="h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </h1>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Link>
            <Link 
              to="/dashboard"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
            <div className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 bg-gray-100 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Patterns
            </div>
            <Link 
              to="/about"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center"
            >
              <Info className="w-4 h-4 mr-2" />
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatternDiscovery
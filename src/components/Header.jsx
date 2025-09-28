import { MessageCircle, Home, Info } from 'lucide-react'
import { Link } from 'react-router-dom'

const Header = ({ currentPage }) => {
  return (
    <div className="bg-white px-4 py-3 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <svg className="w-8 h-8 text-gray-900 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <h1 className="text-xl font-semibold text-gray-900">FloatChat</h1>
        </div>
        
        {/* Navigation */}
        <div className="flex items-center space-x-4">
          <Link 
            to="/"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
              currentPage === 'chat' 
                ? 'text-gray-900 bg-gray-100' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat
          </Link>
          <Link 
            to="/dashboard"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
              currentPage === 'dashboard' 
                ? 'text-gray-900 bg-gray-100' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Home className="w-4 h-4 mr-2" />
            Dashboard
          </Link>
          <Link 
            to="/patterns"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
              currentPage === 'patterns' 
                ? 'text-gray-900 bg-gray-100' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Patterns
          </Link>
          <Link 
            to="/about"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
              currentPage === 'about' 
                ? 'text-gray-900 bg-gray-100' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Info className="w-4 h-4 mr-2" />
            About
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header

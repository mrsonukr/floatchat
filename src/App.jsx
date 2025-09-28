import { useState } from 'react'
import LoginSignup from './components/LoginSignup'
import Dashboard from './components/Dashboard'
import ChatInterface from './components/ChatInterface'
import ChatHistory from './components/ChatHistory'
import About from './components/About'
import PatternDiscovery from './components/PatternDiscovery'
import Navigation from './components/Navigation'

function App() {
  const [currentView, setCurrentView] = useState('login')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    setCurrentView('dashboard')
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setCurrentView('login')
  }

  const renderCurrentView = () => {
    if (!isAuthenticated) {
      return <LoginSignup onLogin={handleLogin} />
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard user={user} />
      case 'chat':
        return <ChatInterface user={user} />
      case 'history':
        return <ChatHistory user={user} />
      case 'about':
        return <About />
      case 'patterns':
        return <PatternDiscovery user={user} />
      default:
        return <Dashboard user={user} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && (
        <Navigation 
          currentView={currentView} 
          onViewChange={setCurrentView}
          onLogout={handleLogout}
          user={user}
        />
      )}
      <main className={isAuthenticated ? 'pt-16' : ''}>
        {renderCurrentView()}
      </main>
    </div>
  )
}

export default App

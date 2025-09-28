import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import LoginSignup from './components/LoginSignup'
import Dashboard from './components/Dashboard'
import ChatInterface from './components/ChatInterface'
import About from './components/About'
import PatternDiscovery from './components/PatternDiscovery'

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

  // Check for stored authentication on page load
  useEffect(() => {
    const storedUser = localStorage.getItem('floatchat_user')
    const storedAuth = localStorage.getItem('floatchat_authenticated')
    
    if (storedUser && storedAuth === 'true') {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        setIsAuthenticated(true)
      } catch (error) {
        // If there's an error parsing stored data, clear it
        localStorage.removeItem('floatchat_user')
        localStorage.removeItem('floatchat_authenticated')
      }
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    
    // Store authentication data
    localStorage.setItem('floatchat_user', JSON.stringify(userData))
    localStorage.setItem('floatchat_authenticated', 'true')
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    
    // Clear stored authentication data
    localStorage.removeItem('floatchat_user')
    localStorage.removeItem('floatchat_authenticated')
    localStorage.removeItem('floatchat_remembered_email')
    localStorage.removeItem('floatchat_remembered_password')
  }

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    }
    return isAuthenticated ? children : <Navigate to="/login" replace />
  }

  // Public Route Component (redirect to chat if already authenticated)
  const PublicRoute = ({ children }) => {
    if (isLoading) {
      return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    }
    return !isAuthenticated ? children : <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginSignup onLogin={handleLogin} />
              </PublicRoute>
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <ChatInterface user={user} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard user={user} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/about" 
            element={
              <ProtectedRoute>
                <About user={user} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patterns" 
            element={
              <ProtectedRoute>
                <PatternDiscovery user={user} />
              </ProtectedRoute>
            } 
          />
          
          {/* Default redirects */}
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

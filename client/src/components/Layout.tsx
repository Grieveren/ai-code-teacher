import { Outlet, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Layout = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/learn', label: 'Learn', icon: '📚' },
    { path: '/practice', label: 'Practice', icon: '💻' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass-morphism sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">🤖</span>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                AI Code Teacher
              </span>
            </Link>

            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-4 py-2 rounded-lg transition-colors"
                >
                  <span className="flex items-center space-x-2">
                    <span>{item.icon}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                  </span>
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-blue-500/20 rounded-lg -z-10"
                      transition={{ type: 'spring', bounce: 0.25 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm hover:text-blue-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="glass-morphism mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-400">
          <p>© 2024 AI Code Teacher. Built with AI to teach coding with AI.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
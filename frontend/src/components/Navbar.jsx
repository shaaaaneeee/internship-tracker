import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Sun, Moon, LogOut } from 'lucide-react'

function Navbar({ darkMode, toggleDarkMode }) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const username = user?.email
    ? user.email.split('@')[0]
    : null

  const formattedName = username
    ? username.charAt(0).toUpperCase() + username.slice(1)
    : null

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-8 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
            Internship Tracker
          </span>
          {formattedName && (
            <span className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
              Hello, {formattedName}
            </span>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-2 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
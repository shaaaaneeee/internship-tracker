import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Sun, Moon, LogOut } from 'lucide-react'

function Navbar({ darkMode, toggleDarkMode }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 px-8 py-4 flex items-center justify-between bg-white dark:bg-zinc-950">
      <span className="text-sm font-semibold text-zinc-900 dark:text-white tracking-tight">Internship Tracker app by Shane Lee</span>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleDarkMode}
          className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition"
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BarChart2, Search, Shield, Moon, Sun } from 'lucide-react'
import { useState } from 'react'

const features = [
  {
    icon: BarChart2,
    title: 'Track everything',
    desc: 'Log every application with status, role, company and notes in one place.'
  },
  {
    icon: Search,
    title: 'Search and filter',
    desc: 'Find any application instantly by company, role, or status.'
  },
  {
    icon: Shield,
    title: 'Your data only',
    desc: 'Every account is isolated. Only you can see your applications.'
  },
  {
    icon: Moon,
    title: 'Dark mode',
    desc: 'Easy on the eyes. Your preference is saved across sessions.'
  },
]

function Landing() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true')

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    if (newMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">

      {/* Navbar */}
      <div className="border-b border-zinc-100 dark:border-zinc-800 px-8 py-4 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-tight">Internship Tracker</span>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link
            to="/login"
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="text-sm px-3 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-md hover:opacity-90 transition"
          >
            Get started
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-8 pt-24 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
            Free · No ads · Open source
          </p>
          <h1 className="text-5xl font-semibold tracking-tight leading-tight mb-6">
            Stop losing track of<br />your applications
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-10 max-w-xl mx-auto">
            A clean, minimal app to track every internship and job application. Know where you stand at a glance.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/signup"
              className="px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-md hover:opacity-90 transition"
            >
              Get started for free
            </Link>
            <Link
              to="/login"
              className="px-5 py-2.5 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-400 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
            >
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Features */}
      <div className="max-w-4xl mx-auto px-8 pb-24">
        <div className="border-t border-zinc-100 dark:border-zinc-800 pt-16">
          <div className="grid grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="p-2 rounded-md border border-zinc-100 dark:border-zinc-800">
                  <feature.icon size={16} className="text-zinc-500 dark:text-zinc-400" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">{feature.title}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-100 dark:border-zinc-800 px-8 py-6 text-center">
        <p className="text-xs text-zinc-400">Built by Shane Lee</p>
      </div>

    </div>
  )
}

export default Landing
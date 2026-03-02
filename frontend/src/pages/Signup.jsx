import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import api from '../api/axios'

const rules = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'One number', test: (p) => /[0-9]/.test(p) },
]

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showRules, setShowRules] = useState(false)
  const navigate = useNavigate()

  const allValid = rules.every(r => r.test(password))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!allValid) {
      setError('Please meet all password requirements')
      return
    }
    setLoading(true)
    setError('')
    try {
      await api.post('/auth/signup', { email, password })
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm px-8 py-10 border border-zinc-200 dark:border-zinc-800 rounded-lg"
      >
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-1">Create account</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">Start tracking your applications</p>

        {error && (
          <p className="text-sm text-red-500 mb-5">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setShowRules(true)}
              className="w-full px-3 py-2.5 text-sm rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition"
              placeholder="••••••••"
              required
            />
            <br />
            {showRules && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 space-y-1.5"
              >
                {rules.map((rule) => {
                  const passed = rule.test(password)
                  return (
                    <div key={rule.label} className="flex items-center gap-2">
                      {passed
                        ? <Check size={12} className="text-green-500" />
                        : <X size={12} className="text-zinc-300 dark:text-zinc-600" />
                      }
                      <span className={`text-xs transition-colors ${passed ? 'text-green-500' : 'text-zinc-400 dark:text-zinc-500'}`}>
                        {rule.label}
                      </span>
                    </div>
                  )
                })}
              </motion.div>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || !allValid}
            className="w-full py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-md hover:opacity-90 transition disabled:opacity-50 mt-2"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </motion.button>
        </form>

        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-zinc-900 dark:text-white font-medium hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Signup

// This file implements the Signup page, allowing users to create a new account.
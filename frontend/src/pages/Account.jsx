import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import api from '../api/axios'
import toast from 'react-hot-toast'

function Account() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true')

  const [passwordForm, setPasswordForm] = useState({ current_password: '', new_password: '', confirm_password: '' })
  const [changingPassword, setChangingPassword] = useState(false)

  const [deletingAccount, setDeletingAccount] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      toast.error('New passwords do not match')
      return
    }
    if (passwordForm.new_password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    setChangingPassword(true)
    try {
      await api.put('/auth/change-password', {
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password,
      })
      toast.success('Password changed')
      setPasswordForm({ current_password: '', new_password: '', confirm_password: '' })
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Something went wrong')
    } finally {
      setChangingPassword(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'delete my account') {
      toast.error('Please type the confirmation text exactly')
      return
    }
    setDeletingAccount(true)
    try {
      await api.delete('/auth/delete-account')
      logout()
      navigate('/')
      toast.success('Account deleted')
    } catch (err) {
      toast.error('Something went wrong')
    } finally {
      setDeletingAccount(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-200">
      <Navbar darkMode={darkMode} toggleDarkMode={() => {
        const newMode = !darkMode
        setDarkMode(newMode)
        if (newMode) {
          document.documentElement.classList.add('dark')
          localStorage.setItem('darkMode', 'true')
        } else {
          document.documentElement.classList.remove('dark')
          localStorage.setItem('darkMode', 'false')
        }
      }} />

      <div className="max-w-lg mx-auto px-4 sm:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-sm font-medium text-zinc-900 dark:text-white mb-1">Account settings</h1>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-10">Manage your password and account</p>

          {/* Change password */}
          <div className="mb-10">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-6">Change password</p>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">Current password</label>
                <input
                  type="password"
                  value={passwordForm.current_password}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 transition"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">New password</label>
                <input
                  type="password"
                  value={passwordForm.new_password}
                  onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 transition"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">Confirm new password</label>
                <input
                  type="password"
                  value={passwordForm.confirm_password}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 transition"
                  placeholder="••••••••"
                  required
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={changingPassword}
                className="w-full py-2 text-sm bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-md hover:opacity-90 transition disabled:opacity-50"
              >
                {changingPassword ? 'Saving...' : 'Change password'}
              </motion.button>
            </form>
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-800 mb-10" />

          {/* Delete account */}
          <div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-6">Danger zone</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
              Deleting your account is permanent. All your applications and data will be removed immediately and cannot be recovered.
            </p>
            <div className="mb-3">
              <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">
                Type <span className="font-medium text-zinc-900 dark:text-white">delete my account</span> to confirm
              </label>
              <input
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-md border border-red-200 dark:border-red-900 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-red-400 transition"
                placeholder="delete my account"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleDeleteAccount}
              disabled={deletingAccount || deleteConfirm !== 'delete my account'}
              className="w-full py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition disabled:opacity-50"
            >
              {deletingAccount ? 'Deleting...' : 'Delete account'}
            </motion.button>
          </div>

        </motion.div>
      </div>
    </div>
  )
}

export default Account
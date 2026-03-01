import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Briefcase, Pencil, Trash2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import api from '../api/axios'

const statusConfig = {
  applied: { label: 'Applied', dot: 'bg-blue-500' },
  interview: { label: 'Interview', dot: 'bg-yellow-500' },
  rejected: { label: 'Rejected', dot: 'bg-red-500' },
  offer: { label: 'Offer', dot: 'bg-green-500' },
}

function Dashboard() {
  const [applications, setApplications] = useState([])
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true')
  const [showModal, setShowModal] = useState(false)
  const [editingApp, setEditingApp] = useState(null)
  const [form, setForm] = useState({ company: '', role: '', status: 'applied', notes: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchApplications() }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [darkMode])

  const fetchApplications = async () => {
    try {
      const res = await api.get('/applications/')
      setApplications(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingApp) {
        await api.put(`/applications/${editingApp.id}`, form)
      } else {
        await api.post('/applications/', form)
      }
      fetchApplications()
      closeModal()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/applications/${id}`)
      setApplications(applications.filter(app => app.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const openEdit = (app) => {
    setEditingApp(app)
    setForm({ company: app.company, role: app.role, status: app.status, notes: app.notes || '' })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingApp(null)
    setForm({ company: '', role: '', status: 'applied', notes: '' })
  }

  const stats = [
    { label: 'Total', value: applications.length },
    { label: 'Interviews', value: applications.filter(a => a.status === 'interview').length },
    { label: 'Offers', value: applications.filter(a => a.status === 'offer').length },
    { label: 'Rejected', value: applications.filter(a => a.status === 'rejected').length },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-200">
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

      <div className="max-w-4xl mx-auto px-8 py-12">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-3xl font-semibold text-zinc-900 dark:text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-zinc-100 dark:border-zinc-800 mb-8" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium text-zinc-900 dark:text-white">Applications</h2>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm rounded-md hover:opacity-90 transition"
          >
            <Plus size={14} />
            Add
          </motion.button>
        </div>

        {/* List */}
        {loading ? (
          <p className="text-sm text-zinc-400 py-12 text-center">Loading...</p>
        ) : applications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Briefcase size={32} className="mx-auto mb-3 text-zinc-300 dark:text-zinc-700" />
            <p className="text-sm text-zinc-400">No applications yet</p>
          </motion.div>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            <AnimatePresence>
              {applications.map((app) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center justify-between py-4 group"
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">{app.company}</p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{app.role}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[app.status]?.dot}`} />
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">{statusConfig[app.status]?.label}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => openEdit(app)}
                        className="p-1.5 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="p-1.5 rounded text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 dark:bg-black/60 flex items-center justify-center z-50 px-4"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 w-full max-w-md"
            >
              <h2 className="text-sm font-medium text-zinc-900 dark:text-white mb-5">
                {editingApp ? 'Edit application' : 'Add application'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">Company</label>
                  <input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 transition"
                    placeholder="Google"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">Role</label>
                  <input
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 transition"
                    placeholder="Software Engineer Intern"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 transition"
                  >
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="rejected">Rejected</option>
                    <option value="offer">Offer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">Notes</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 transition resize-none"
                    placeholder="Any notes..."
                    rows={3}
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-2 text-sm rounded-md border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 py-2 text-sm bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-md hover:opacity-90 transition"
                  >
                    {editingApp ? 'Save' : 'Add'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dashboard

// This file defines the Dashboard component, which is the main page of the application where users can view, add, edit, and delete their internship applications. It also includes a dark mode toggle and displays some basic statistics about the applications.
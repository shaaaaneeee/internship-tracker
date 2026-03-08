import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  FunnelChart, Funnel
} from 'recharts'
import { useState } from 'react'
import { Info } from 'lucide-react'

const COLORS = {
  applied: '#3b82f6',
  interview: '#eab308',
  offer: '#22c55e',
  rejected: '#ef4444',
}

function InfoTooltip({ text }) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="relative inline-block ml-1.5">
      <button
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="text-zinc-300 dark:text-zinc-600 hover:text-zinc-500 dark:hover:text-zinc-400 transition"
      >
        <Info size={12} />
      </button>
      {visible && (
        <div className="absolute left-5 top-0 z-50 w-48 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-md">
          {text}
        </div>
      )}
    </div>
  )
}

function StatsChart({ applications, darkMode }) {
  const axisColor = darkMode ? '#52525b' : '#d4d4d8'
  const labelColor = darkMode ? '#71717a' : '#a1a1aa'
  const strokeColor = darkMode ? '#09090b' : '#ffffff'

  const data = [
    { name: 'Applied', value: applications.filter(a => a.status === 'applied').length, key: 'applied' },
    { name: 'Interview', value: applications.filter(a => a.status === 'interview').length, key: 'interview' },
    { name: 'Offer', value: applications.filter(a => a.status === 'offer').length, key: 'offer' },
    { name: 'Rejected', value: applications.filter(a => a.status === 'rejected').length, key: 'rejected' },
  ].filter(d => d.value > 0)

  const weeklyMap = {}
  applications.forEach(app => {
    const date = new Date(app.date_applied.endsWith('Z') ? app.date_applied : app.date_applied + 'Z')
    const weekStart = new Date(date)
    weekStart.setDate(date.getDate() - date.getDay())
    const key = weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    weeklyMap[key] = (weeklyMap[key] || 0) + 1
  })
  const barData = Object.entries(weeklyMap)
    .map(([week, count]) => ({ week, count }))
    .slice(-8)

  const total = applications.length
  const interviews = applications.filter(a => a.status === 'interview' || a.status === 'offer').length
  const offers = applications.filter(a => a.status === 'offer').length
  const interviewRate = total > 0 ? Math.round((interviews / total) * 100) : 0
  const offerRate = total > 0 ? Math.round((offers / total) * 100) : 0

  const funnelData = [
    { name: 'Applied', value: total, fill: '#3b82f6' },
    { name: 'Interview', value: interviews, fill: '#eab308' },
    { name: 'Offer', value: offers, fill: '#22c55e' },
  ].filter(d => d.value > 0)

  if (data.length === 0) return null

  return (
    <div className="mb-12">
      <div className="border-t border-zinc-100 dark:border-zinc-800 mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Donut chart */}
        <div>
          <div className="flex items-center mb-6">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Breakdown</p>
            <InfoTooltip text="Shows how your applications are distributed across each status." />
          </div>
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={32}
                    outerRadius={50}
                    paddingAngle={3}
                    dataKey="value"
                    stroke={strokeColor}
                    strokeWidth={2}
                  >
                    {data.map((entry) => (
                      <Cell key={entry.key} fill={COLORS[entry.key]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5">
              {data.map((entry) => (
                <div key={entry.key} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[entry.key] }} />
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">{entry.name}</span>
                  <span className="text-xs font-medium text-zinc-900 dark:text-white">{entry.value}</span>
                  <span className="text-xs text-zinc-400">({Math.round((entry.value / total) * 100)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success rate */}
        <div>
          <div className="flex items-center mb-6">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Success rate</p>
            <InfoTooltip text="Interview rate = how many applications led to an interview. Offer rate = how many led to an offer." />
          </div>
          <div className="space-y-4 pt-1">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Interview rate</span>
                <span className="text-xs font-medium text-zinc-900 dark:text-white">{interviewRate}%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 rounded-full transition-all duration-700"
                  style={{ width: `${interviewRate}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Offer rate</span>
                <span className="text-xs font-medium text-zinc-900 dark:text-white">{offerRate}%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-700"
                  style={{ width: `${offerRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Funnel */}
        {funnelData.length > 1 && (
          <div>
            <div className="flex items-center mb-6">
              <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Pipeline</p>
              <InfoTooltip text="Shows the drop-off at each stage — from applied to interview to offer. Wider = more applications at that stage." />
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Tooltip
                    contentStyle={{
                      background: darkMode ? '#18181b' : '#ffffff',
                      border: `1px solid ${darkMode ? '#27272a' : '#e4e4e7'}`,
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: darkMode ? '#ffffff' : '#09090b',
                    }}
                  />
                  <Funnel
                    dataKey="value"
                    data={funnelData}
                    isAnimationActive
                    stroke={strokeColor}
                    strokeWidth={2}
                  />
                </FunnelChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-4 mt-3">
              {funnelData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.fill }} />
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">{entry.name}</span>
                  <span className="text-xs font-medium text-zinc-900 dark:text-white">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Bar chart */}
      {barData.length > 1 && (
        <div className="mt-10">
          <div className="border-t border-zinc-100 dark:border-zinc-800 mb-8" />
          <div className="flex items-center mb-6">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Applications per week</p>
            <InfoTooltip text="Shows how many applications you submitted each week. Use this to track your activity over time." />
          </div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barSize={24}>
                <CartesianGrid vertical={false} stroke={axisColor} />
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 11, fill: labelColor }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: labelColor }}
                  axisLine={false}
                  tickLine={false}
                  width={24}
                />
                <Tooltip
                  contentStyle={{
                    background: darkMode ? '#18181b' : '#ffffff',
                    border: `1px solid ${darkMode ? '#27272a' : '#e4e4e7'}`,
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: darkMode ? '#ffffff' : '#09090b',
                  }}
                  cursor={{ fill: darkMode ? '#27272a' : '#f4f4f5' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[3, 3, 0, 0]} name="Applications" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

    </div>
  )
}

export default StatsChart
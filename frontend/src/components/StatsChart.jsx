import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = {
  applied: '#3b82f6',
  interview: '#eab308',
  offer: '#22c55e',
  rejected: '#ef4444',
}

function StatsChart({ applications, darkMode }) {
  const data = [
    { name: 'Applied', value: applications.filter(a => a.status === 'applied').length, key: 'applied' },
    { name: 'Interview', value: applications.filter(a => a.status === 'interview').length, key: 'interview' },
    { name: 'Offer', value: applications.filter(a => a.status === 'offer').length, key: 'offer' },
    { name: 'Rejected', value: applications.filter(a => a.status === 'rejected').length, key: 'rejected' },
  ].filter(d => d.value > 0)

  if (data.length === 0) return null

  return (
    <div className="mb-12">
      <div className="border-t border-zinc-100 dark:border-zinc-800 mb-8" />
      <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-6">Breakdown</p>
      <div className="flex items-center gap-8">
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={3}
                dataKey="value"
                stroke={darkMode ? '#09090b' : '#ffffff'}
                strokeWidth={2}
            >
                {data.map((entry) => (
                  <Cell key={entry.key} fill={COLORS[entry.key]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          {data.map((entry) => (
            <div key={entry.key} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[entry.key] }} />
              <span className="text-xs text-zinc-500 dark:text-zinc-400">{entry.name}</span>
              <span className="text-xs font-medium text-zinc-900 dark:text-white ml-1">{entry.value}</span>
              <span className="text-xs text-zinc-400">
                ({Math.round((entry.value / applications.length) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatsChart
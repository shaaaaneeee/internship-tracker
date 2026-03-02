import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const COLORS = {
  applied: '#3b82f6',
  interview: '#eab308',
  offer: '#22c55e',
  rejected: '#ef4444',
}

const RADIAN = Math.PI / 180

function renderCustomShape(props) {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props
  const gapAngle = 2
  const adjustedStart = startAngle + gapAngle / 2
  const adjustedEnd = endAngle - gapAngle / 2

  const x1 = cx + outerRadius * Math.cos(-adjustedStart * RADIAN)
  const y1 = cy + outerRadius * Math.sin(-adjustedStart * RADIAN)
  const x2 = cx + outerRadius * Math.cos(-adjustedEnd * RADIAN)
  const y2 = cy + outerRadius * Math.sin(-adjustedEnd * RADIAN)
  const x3 = cx + innerRadius * Math.cos(-adjustedEnd * RADIAN)
  const y3 = cy + innerRadius * Math.sin(-adjustedEnd * RADIAN)
  const x4 = cx + innerRadius * Math.cos(-adjustedStart * RADIAN)
  const y4 = cy + innerRadius * Math.sin(-adjustedStart * RADIAN)

  const largeArc = adjustedEnd - adjustedStart > 180 ? 1 : 0

  return (
    <path
      d={`
        M ${x1} ${y1}
        A ${outerRadius} ${outerRadius} 0 ${largeArc} 0 ${x2} ${y2}
        L ${x3} ${y3}
        A ${innerRadius} ${innerRadius} 0 ${largeArc} 1 ${x4} ${y4}
        Z
      `}
      fill={fill}
    />
  )
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
                dataKey="value"
                stroke="none"
                customizedShape={renderCustomShape}
                shape={renderCustomShape}
              >
                {data.map((entry) => (
                  <Cell key={entry.key} fill={COLORS[entry.key]} />
                ))}
              </Pie>
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
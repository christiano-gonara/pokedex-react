import '../css/StatBar.css'

function StatBar({ label, value, color }) {
  const percent = Math.min(100, (value / 255) * 100)
  return (
    <div className="stat-bar">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      <div className="stat-track">
        <div className="stat-fill" style={{ width: `${percent}%`, background: color }} />
      </div>
    </div>
  )
}

export default StatBar

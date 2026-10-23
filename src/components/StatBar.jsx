import '../css/StatBar.css'

function StatBar({ label, value }) {
  const percent = Math.min(100, (value / 160) * 100)
  return (
    <div className="stat-bar">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      <div className="stat-track">
        <div className="stat-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

export default StatBar

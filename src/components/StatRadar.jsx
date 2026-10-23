import '../css/StatRadar.css'
import { STAT_SHORT } from '../utils'

// Mesma ordem dos jogos: HP no topo, sentido horário
const AXES = ['hp', 'attack', 'defense', 'speed', 'specialDefense', 'specialAttack']
const MAX = 160
const RADIUS = 80
// O anel externo vem primeiro porque é preenchido e não pode cobrir os internos
const RINGS = [1, 0.75, 0.5, 0.25]

const point = (index, ratio) => {
  const angle = (Math.PI / 3) * index - Math.PI / 2
  return [Math.cos(angle) * RADIUS * ratio, Math.sin(angle) * RADIUS * ratio]
}

const polygon = (ratios) => ratios.map((r, i) => point(i, r).join(',')).join(' ')

function StatRadar({ stats }) {
  const ratios = AXES.map((key) => Math.min(1, stats[key] / MAX))

  return (
    <svg className="stat-radar" viewBox="-125 -112 250 224" role="img" aria-label="Gráfico de atributos">
      {RINGS.map((r) => (
        <polygon key={r} className={r === 1 ? 'radar-ring outer' : 'radar-ring'} points={polygon(AXES.map(() => r))} />
      ))}
      {AXES.map((key, i) => {
        const [x, y] = point(i, 1)
        return <line key={key} className="radar-axis" x1="0" y1="0" x2={x} y2={y} />
      })}

      <polygon className="radar-shape" points={polygon(ratios)} />
      {ratios.map((r, i) => {
        const [x, y] = point(i, r)
        return <circle key={AXES[i]} className="radar-dot" cx={x} cy={y} r="3" />
      })}

      {AXES.map((key, i) => {
        const [x, y] = point(i, 1.24)
        const anchor = Math.abs(x) < 1 ? 'middle' : x > 0 ? 'start' : 'end'
        return (
          <text key={key} x={x} y={y} textAnchor={anchor} dominantBaseline="middle">
            <tspan className="radar-label">{STAT_SHORT[key]} </tspan>
            <tspan className="radar-value">{stats[key]}</tspan>
          </text>
        )
      })}
    </svg>
  )
}

export default StatRadar

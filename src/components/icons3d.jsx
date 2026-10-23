// Ícones em flat 3D, no mesmo estilo da Pokébola do menu: cores chapadas, contorno escuro
// (currentColor), uma face de sombra e a profundidade sólida aplicada via CSS em .icon3d
import Logo from './Logo'

const STROKE = { stroke: 'currentColor', strokeWidth: 1.8, strokeLinejoin: 'round', strokeLinecap: 'round' }

function Svg({ size = 22, className, children, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className ? `icon3d ${className}` : 'icon3d'}
      aria-hidden={props['aria-label'] ? undefined : true}
      {...props}
    >
      {children}
    </svg>
  )
}

// Estrela de 5 pontas calculada uma vez
const starPoints = Array.from({ length: 10 }, (_, k) => {
  const r = k % 2 === 0 ? 9.8 : 4.4
  const a = ((-90 + k * 36) * Math.PI) / 180
  return [12 + r * Math.cos(a), 12.8 + r * Math.sin(a)]
})
const STAR = starPoints.map((p) => p.map((n) => n.toFixed(2)).join(',')).join(' ')
const STAR_SHADE = [...starPoints.slice(0, 6), [12, 12.8]].map((p) => p.map((n) => n.toFixed(2)).join(',')).join(' ')

export function Star({ on = true, ...props }) {
  return (
    <Svg {...props}>
      <polygon points={STAR} fill={on ? '#facc15' : '#ffffff'} />
      <polygon points={STAR_SHADE} fill={on ? '#eab308' : '#e5e1d8'} />
      <polygon points={STAR} fill="none" {...STROKE} />
      <circle cx="8.6" cy="10.4" r="1.1" fill="#fff" opacity={on ? 0.8 : 0} />
    </Svg>
  )
}

export function Pokeball({ size = 22, className }) {
  return <Logo size={size} className={className ? `icon3d ${className}` : 'icon3d'} />
}

export function Cap(props) {
  return (
    <Svg {...props}>
      <path d="M4 15A8 8 0 0 1 20 15Z" fill="#6366f1" />
      <path d="M12 7A8 8 0 0 1 20 15H12Z" fill="#4f46e5" />
      <path d="M8 15Q8 9.2 12 8.2Q16 9.2 16 15Z" fill="#fff" {...STROKE} strokeWidth={1.4} />
      <circle cx="12" cy="12" r="1.7" fill="#ef4444" />
      <path d="M4 15A8 8 0 0 1 20 15Z" fill="none" {...STROKE} />
      <path d="M3 15H17Q21.2 15 21.2 17.8H5.2Q3 17.8 3 15Z" fill="#4338ca" {...STROKE} />
    </Svg>
  )
}

export function Search(props) {
  return (
    <Svg {...props}>
      <path d="M15 15L20 20" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M15.2 15.2L19.6 19.6" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="10" cy="10" r="6.6" fill="#bae6fd" {...STROKE} />
      <path d="M13.2 7.2A4.6 4.6 0 0 1 12.6 14" fill="none" stroke="#7dd3fc" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M6.8 9A3.6 3.6 0 0 1 9.4 6.5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  )
}

export function Funnel(props) {
  return (
    <Svg {...props}>
      <path d="M3.5 4.5H20.5L14 12.5V18.5L10 20.5V12.5Z" fill="#a78bfa" />
      <path d="M12 4.5H20.5L14 12.5V18.5L12 19.5Z" fill="#8b5cf6" />
      <path d="M3.5 4.5H20.5L14 12.5V18.5L10 20.5V12.5Z" fill="none" {...STROKE} />
      <path d="M6.5 6.5H11" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </Svg>
  )
}

export function Sort(props) {
  return (
    <Svg {...props}>
      <path d="M7.5 3L12.2 8.4H9.5V20.5H5.5V8.4H2.8Z" fill="#34d399" {...STROKE} />
      <path d="M16.5 21L21.2 15.6H18.5V3.5H14.5V15.6H11.8Z" fill="#60a5fa" {...STROKE} />
    </Svg>
  )
}

export function Dice(props) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="#fff" />
      <path d="M3.5 15H20.5V16.5A4 4 0 0 1 16.5 20.5H7.5A4 4 0 0 1 3.5 16.5Z" fill="#e5e1d8" />
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="none" {...STROKE} />
      {[
        [8, 8],
        [16, 8],
        [12, 12],
        [8, 16],
        [16, 16],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" fill="#ef4444" />
      ))}
    </Svg>
  )
}

export function Grid(props) {
  const tiles = [
    [3.5, 3.5, '#f87171'],
    [12.8, 3.5, '#fbbf24'],
    [3.5, 12.8, '#60a5fa'],
    [12.8, 12.8, '#34d399'],
  ]
  return (
    <Svg {...props}>
      {tiles.map(([x, y, fill]) => (
        <rect key={fill} x={x} y={y} width="7.7" height="7.7" rx="2" fill={fill} {...STROKE} />
      ))}
    </Svg>
  )
}

export function Table(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="4" width="18" height="16" rx="3" fill="#fff" />
      <path d="M3 7A3 3 0 0 1 6 4H18A3 3 0 0 1 21 7V9H3Z" fill="#60a5fa" />
      <rect x="3" y="4" width="18" height="16" rx="3" fill="none" {...STROKE} />
      <path d="M6.5 13H17.5M6.5 16.5H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  )
}

export function Moon(props) {
  return (
    <Svg {...props}>
      <path d="M15 3.2A8.8 8.8 0 1 0 20.8 15A6.6 6.6 0 0 1 15 3.2Z" fill="#fde047" {...STROKE} />
      <circle cx="9" cy="13" r="1.4" fill="#eab308" />
      <circle cx="12.5" cy="17.4" r="1" fill="#eab308" />
    </Svg>
  )
}

export function Sun(props) {
  const rays = Array.from({ length: 8 }, (_, k) => {
    const a = (k * Math.PI) / 4
    return [12 + 7.6 * Math.cos(a), 12 + 7.6 * Math.sin(a), 12 + 9.8 * Math.cos(a), 12 + 9.8 * Math.sin(a)]
  })
  return (
    <Svg {...props}>
      {rays.map(([x1, y1, x2, y2], k) => (
        <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ))}
      <circle cx="12" cy="12" r="5.2" fill="#fbbf24" />
      <path d="M15.7 8.3A5.2 5.2 0 0 1 8.3 15.7Z" fill="#f59e0b" />
      <circle cx="12" cy="12" r="5.2" fill="none" {...STROKE} />
    </Svg>
  )
}

export function Close(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.6" fill="#fecaca" {...STROKE} />
      <path d="M9 9L15 15M15 9L9 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </Svg>
  )
}

export function ChevronDown(props) {
  return (
    <Svg {...props}>
      <path d="M6.5 9.5H17.5L12 15.5Z" fill="currentColor" {...STROKE} />
    </Svg>
  )
}

export function Check(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.6" fill="#4ade80" {...STROKE} />
      <path d="M8.2 12.4L10.9 15.1L16 9.4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

// Insígnia: medalha com fita; apagada quando ainda não foi conquistada
export function Medal({ on = true, ...props }) {
  return (
    <Svg {...props} className={on ? 'medal on' : 'medal'}>
      <path d="M7.5 2.5H11L13 8.5H9.5Z" fill={on ? '#ef4444' : '#c9c3b8'} {...STROKE} strokeWidth={1.5} />
      <path d="M16.5 2.5H13L11 8.5H14.5Z" fill={on ? '#3b82f6' : '#ddd8cf'} {...STROKE} strokeWidth={1.5} />
      <circle cx="12" cy="15" r="6.3" fill={on ? '#facc15' : '#e9e5dc'} />
      <path d="M12 8.7A6.3 6.3 0 0 1 12 21.3Z" fill={on ? '#eab308' : '#d6d0c4'} />
      <circle cx="12" cy="15" r="6.3" fill="none" {...STROKE} />
      <circle cx="12" cy="15" r="3.1" fill="none" stroke={on ? '#fef9c3' : '#f4f1ea'} strokeWidth="1.5" />
    </Svg>
  )
}

export function Bolt(props) {
  return (
    <Svg {...props}>
      <path d="M13.8 2.5L4.8 13.5H11L9.6 21.5L19.2 9.6H13Z" fill="#facc15" />
      <path d="M13 9.6H19.2L9.6 21.5L11 13.5H12Z" fill="#eab308" />
      <path d="M13.8 2.5L4.8 13.5H11L9.6 21.5L19.2 9.6H13Z" fill="none" {...STROKE} />
    </Svg>
  )
}

export function Flame({ on = true, ...props }) {
  return (
    <Svg {...props}>
      <path
        d="M12 2.5C13.2 6 17.6 8.2 17.6 13.8A5.6 5.6 0 0 1 6.4 13.8C6.4 10.8 8.4 9.2 9 7C10.4 8.8 11 10 11 11.4C12.6 9.6 12.6 6 12 2.5Z"
        fill={on ? '#f97316' : '#e9e5dc'}
        {...STROKE}
      />
      <path
        d="M12 12.6C13.6 14.2 14.6 15.4 14.6 16.9A2.6 2.6 0 0 1 9.4 16.9C9.4 15.4 10.8 14.2 12 12.6Z"
        fill={on ? '#fde047' : '#f4f1ea'}
      />
    </Svg>
  )
}

export function Database(props) {
  return (
    <Svg {...props}>
      <path d="M5 6V18A7 2.8 0 0 0 19 18V6" fill="#3b82f6" {...STROKE} />
      <path d="M5 12A7 2.8 0 0 0 19 12" fill="none" {...STROKE} />
      <ellipse cx="12" cy="6" rx="7" ry="2.8" fill="#93c5fd" {...STROKE} />
    </Svg>
  )
}

export function Picture(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="4.5" width="18" height="15" rx="3" fill="#bae6fd" />
      <path d="M3 16.5L8.8 10.8L13 15L15.6 12.4L21 17.2V16.5A3 3 0 0 1 18 19.5H6A3 3 0 0 1 3 16.5Z" fill="#4ade80" {...STROKE} strokeWidth={1.4} />
      <circle cx="16" cy="8.6" r="1.9" fill="#facc15" {...STROKE} strokeWidth={1.4} />
      <rect x="3" y="4.5" width="18" height="15" rx="3" fill="none" {...STROKE} />
    </Svg>
  )
}

export function Code(props) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" fill="#374151" {...STROKE} />
      <path d="M8.8 9L5.8 12L8.8 15M15.2 9L18.2 12L15.2 15" fill="none" stroke="#fde047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 8.6L11 15.4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  )
}

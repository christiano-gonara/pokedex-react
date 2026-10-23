// As 8 insígnias de Kanto desenhadas em SVG, na ordem dos ginásios
const BADGES = [
  { name: 'Boulder', color: '#a8a29e', shape: <polygon points="8,2 16,2 22,8 22,16 16,22 8,22 2,16 2,8" /> },
  { name: 'Cascade', color: '#60a5fa', shape: <path d="M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0C19 10 12 2 12 2z" /> },
  {
    name: 'Thunder',
    color: '#f59e0b',
    shape: <polygon points="12,1 14.6,8 22,6.5 17,12 22,17.5 14.6,16 12,23 9.4,16 2,17.5 7,12 2,6.5 9.4,8" />,
  },
  {
    name: 'Rainbow',
    color: '#84cc16',
    shape: (
      <>
        <circle cx="12" cy="6.5" r="4.5" fill="#f87171" />
        <circle cx="17.5" cy="12" r="4.5" fill="#facc15" />
        <circle cx="12" cy="17.5" r="4.5" fill="#4ade80" />
        <circle cx="6.5" cy="12" r="4.5" fill="#60a5fa" />
        <circle cx="12" cy="12" r="3" fill="#fff" />
      </>
    ),
  },
  { name: 'Soul', color: '#f472b6', shape: <path d="M12 21s-8.5-5.4-8.5-11.2A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.5 2.8C20.5 15.6 12 21 12 21z" /> },
  {
    name: 'Marsh',
    color: '#eab308',
    shape: (
      <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="5" fill="none" stroke="#fff7" strokeWidth="2" />
      </>
    ),
  },
  { name: 'Volcano', color: '#ef4444', shape: <path d="M12 1.5c1.2 4.5 7 6.6 7 13a7 7 0 0 1-14 0c0-3.4 2.2-5.6 3.4-7.8.2 2.3 1.2 3.6 2.4 3.6-.4-3.4.1-6.2 1.2-8.8z" /> },
  {
    name: 'Earth',
    color: '#22c55e',
    shape: (
      <>
        <path d="M21 3C10 3 3 9.5 3 21c11 0 18-6.5 18-18z" />
        <path d="M5 19L17 7" stroke="#fff8" strokeWidth="1.6" />
      </>
    ),
  },
]

function KantoBadge({ index, lit }) {
  const badge = BADGES[index]
  return (
    <span className={lit ? 'kanto-badge lit' : 'kanto-badge'} title={`${badge.name} Badge`}>
      <svg viewBox="0 0 24 24" fill={badge.color}>
        {badge.shape}
      </svg>
    </span>
  )
}

export const BADGE_COUNT = BADGES.length

export default KantoBadge

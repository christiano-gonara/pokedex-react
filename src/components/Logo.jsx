import { useId } from 'react'

// Pokébola em flat 3D: cores chapadas, sombra lateral e um brilho no topo
function Logo({ size, className }) {
  const clip = useId()
  return (
    <svg
      className={className ? `logo ${className}` : 'logo'}
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clip}>
          <circle cx="16" cy="16" r="14" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect width="32" height="16" fill="#ef4444" />
        <rect y="16" width="32" height="16" fill="#fff" />
        <path d="M0 0h32v32H0zM13 13m-14 0a14 14 0 1 0 28 0a14 14 0 1 0-28 0" fill="rgba(0,0,0,0.16)" fillRule="evenodd" />
        <ellipse cx="10" cy="7.5" rx="4" ry="2.2" fill="#fff" opacity="0.6" transform="rotate(-25 10 7.5)" />
      </g>
      <rect x="2" y="14.5" width="28" height="3" fill="currentColor" />
      <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="16" cy="16" r="5" fill="#fff" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="16" cy="16" r="2" fill="none" stroke="#d6d3cd" strokeWidth="1.5" />
    </svg>
  )
}

export default Logo

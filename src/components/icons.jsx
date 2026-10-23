// Ícones em pixel art (Pixelarticons, grade 24x24), usados só dentro dos banners que imitam os jogos.
// O resto da interface usa os ícones flat 3D de icons3d.jsx
import {
  ChevronLeft as ChevronLeftPx,
  ChevronRight as ChevronRightPx,
  Shuffle as ShufflePx,
  Users as UsersPx,
} from 'pixelarticons/react'

function wrap(Icon) {
  return function PixelIcon({ size = 20, className, ...props }) {
    return (
      <Icon
        width={size}
        height={size}
        className={className ? `px-icon ${className}` : 'px-icon'}
        aria-hidden={props['aria-label'] ? undefined : true}
        {...props}
      />
    )
  }
}

export const ChevronLeft = wrap(ChevronLeftPx)
export const ChevronRight = wrap(ChevronRightPx)
export const Shuffle = wrap(ShufflePx)
export const Users = wrap(UsersPx)

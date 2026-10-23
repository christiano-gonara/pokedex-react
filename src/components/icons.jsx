// Ícones em pixel art (Pixelarticons, grade 24x24) com a mesma API de tamanho em todo o projeto
import {
  Bulletlist,
  Check as CheckPx,
  ChevronDown as ChevronDownPx,
  ChevronLeft as ChevronLeftPx,
  ChevronRight as ChevronRightPx,
  ChevronUp as ChevronUpPx,
  Close as ClosePx,
  Database as DatabasePx,
  Github as GithubPx,
  Grid2x22,
  Image as ImagePx,
  Moon as MoonPx,
  Search as SearchPx,
  Shuffle as ShufflePx,
  SlidersHorizontal as SlidersPx,
  SortVertical,
  Star as StarPx,
  Sun as SunPx,
  Trophy as TrophyPx,
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

// Desenhados no mesmo grid, para os ícones que a biblioteca não tem
const rects = (list) => list.map(([x, y, w, h]) => `M${x} ${y}h${w}v${h}h-${w}Z`).join('')

// Contorno igual ao Star da Pixelarticons, mais o miolo preenchido
const STAR_OUTLINE =
  'M5 20H8V22H3V16H5V20ZM21 22H16V20H19V16H21V22ZM10 20H8V18H10V20ZM16 20H14V18H16V20ZM14 18H10V16H14V18ZM7 16H5V13H7V16ZM19 16H17V13H19V16ZM5 13H3V11H5V13ZM21 13H19V11H21V13ZM9 9H3V11H1V7H9V9ZM23 11H21V9H15V7H23V11ZM11 7H9V3H11V7ZM15 7H13V3H15V7ZM13 3H11V1H13V3Z'

const STAR_FILL = rects([
  [11, 3, 2, 4],
  [9, 7, 6, 2],
  [3, 9, 18, 2],
  [5, 11, 14, 2],
  [7, 13, 10, 3],
  [5, 16, 5, 2],
  [14, 16, 5, 2],
  [5, 18, 3, 2],
  [16, 18, 3, 2],
])

const POKEBALL = rects([
  // contorno
  [8, 2, 8, 2],
  [6, 4, 2, 2],
  [16, 4, 2, 2],
  [4, 6, 2, 2],
  [18, 6, 2, 2],
  [2, 8, 2, 8],
  [20, 8, 2, 8],
  [4, 16, 2, 2],
  [18, 16, 2, 2],
  [6, 18, 2, 2],
  [16, 18, 2, 2],
  [8, 20, 8, 2],
  // metade de cima preenchida
  [8, 4, 8, 2],
  [6, 6, 12, 2],
  [4, 8, 16, 3],
  // faixa do meio e botão
  [4, 11, 6, 2],
  [14, 11, 6, 2],
  [10, 13, 4, 2],
])

const custom = (d) =>
  function CustomIcon(props) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d={d} />
      </svg>
    )
  }

export const Check = wrap(CheckPx)
export const ChevronDown = wrap(ChevronDownPx)
export const ChevronLeft = wrap(ChevronLeftPx)
export const ChevronRight = wrap(ChevronRightPx)
export const ChevronUp = wrap(ChevronUpPx)
export const Close = wrap(ClosePx)
export const Database = wrap(DatabasePx)
export const Github = wrap(GithubPx)
export const Grid = wrap(Grid2x22)
export const Image = wrap(ImagePx)
export const List = wrap(Bulletlist)
export const Moon = wrap(MoonPx)
export const Pokeball = wrap(custom(POKEBALL))
export const Search = wrap(SearchPx)
export const Shuffle = wrap(ShufflePx)
export const Sliders = wrap(SlidersPx)
export const Sort = wrap(SortVertical)
export const Star = wrap(StarPx)
export const Sun = wrap(SunPx)
export const Trophy = wrap(TrophyPx)
export const Users = wrap(UsersPx)

export const StarFilled = wrap(custom(STAR_OUTLINE + STAR_FILL))

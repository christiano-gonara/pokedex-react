import { TYPE_COLORS } from '../utils'

function TypeBadge({ name }) {
  return (
    <span className="type-badge" style={{ background: TYPE_COLORS[name] }}>
      {name}
    </span>
  )
}

export default TypeBadge

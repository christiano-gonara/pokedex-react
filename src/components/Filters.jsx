import '../css/Filters.css'
import { TYPE_COLORS } from '../utils'

const SORT_OPTIONS = [
  ['id', 'ID'],
  ['name', 'Nome'],
  ['hp', 'HP'],
  ['attack', 'Attack'],
  ['defense', 'Defense'],
  ['specialAttack', 'Special Attack'],
  ['specialDefense', 'Special Defense'],
  ['speed', 'Speed'],
]

function Filters({ types, selectedType, onTypeChange, sortBy, onSortChange, onRandom }) {
  return (
    <div className="filters">
      <div className="type-buttons">
        <button className={selectedType === '' ? 'active' : ''} onClick={() => onTypeChange('')}>
          Todos
        </button>
        {types.map((t) => (
          <button
            key={t.id}
            className={selectedType === t.name ? 'active' : ''}
            style={{ '--type-color': TYPE_COLORS[t.name] }}
            onClick={() => onTypeChange(t.name)}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div className="filters-row">
        <label>
          Ordenar por{' '}
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            {SORT_OPTIONS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <button className="random-btn" onClick={onRandom}>
          🎲 Aleatório
        </button>
      </div>
    </div>
  )
}

export default Filters

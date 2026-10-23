import { ArrowDownUp, Dices } from 'lucide-react'
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
      <div className="type-chips">
        <button className={selectedType === '' ? 'chip active' : 'chip'} onClick={() => onTypeChange('')}>
          Todos
        </button>
        {types.map((t) => (
          <button
            key={t.id}
            className={selectedType === t.name ? 'chip active' : 'chip'}
            style={{ '--type-color': TYPE_COLORS[t.name] }}
            onClick={() => onTypeChange(selectedType === t.name ? '' : t.name)}
          >
            <span className="chip-dot" />
            {t.name}
          </button>
        ))}
      </div>
      <div className="toolbar-actions">
        <label className="sort">
          <ArrowDownUp size={16} />
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)} aria-label="Ordenar por">
            {SORT_OPTIONS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <button className="random-btn" onClick={onRandom}>
          <Dices size={16} /> Aleatório
        </button>
      </div>
    </div>
  )
}

export default Filters

import { ArrowDownUp, Dices } from 'lucide-react'
import '../css/Filters.css'
import TypeFilter from './TypeFilter'

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
      <TypeFilter types={types} selectedType={selectedType} onTypeChange={onTypeChange} />
      <label className="pill-btn sort">
        <ArrowDownUp size={16} />
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)} aria-label="Ordenar por">
          {SORT_OPTIONS.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <button className="pill-btn icon-only" onClick={onRandom} title="Pokémon aleatório" aria-label="Pokémon aleatório">
        <Dices size={18} />
      </button>
    </div>
  )
}

export default Filters

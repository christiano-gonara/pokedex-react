import { ArrowDownUp, Dices, LayoutGrid, Table2 } from 'lucide-react'
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
  ['total', 'Total'],
]

const LAYOUTS = [
  ['cards', 'Cards', LayoutGrid],
  ['table', 'Tabela', Table2],
]

function Filters({ types, selectedType, onTypeChange, sortBy, onSortChange, onRandom, layout, onLayoutChange }) {
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
      <div className="layout-toggle" role="group" aria-label="Modo de exibição">
        {LAYOUTS.map(([value, label, Icon]) => (
          <button
            key={value}
            className={layout === value ? 'active' : undefined}
            onClick={() => onLayoutChange(value)}
            aria-pressed={layout === value}
            title={label}
            aria-label={label}
          >
            <Icon size={17} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default Filters

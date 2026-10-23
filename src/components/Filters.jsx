import { Dice, Grid, Sort, Table } from './icons3d'
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
  ['cards', 'Cards', Grid],
  ['table', 'Tabela', Table],
]

function Filters({ types, selectedType, onTypeChange, sortBy, onSortChange, onRandom, layout, onLayoutChange }) {
  return (
    <div className="filters">
      <TypeFilter types={types} selectedType={selectedType} onTypeChange={onTypeChange} />
      <label className="pill-btn btn3d sort">
        <Sort size={20} />
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)} aria-label="Ordenar por">
          {SORT_OPTIONS.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <button className="pill-btn btn3d icon-only" onClick={onRandom} title="Pokémon aleatório" aria-label="Pokémon aleatório">
        <Dice size={24} />
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
            <Icon size={20} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default Filters

import { ChevronDown, Star } from './icons3d'
import '../css/PokemonTable.css'
import TypeBadge from './TypeBadge'
import { STAT_SHORT, formatId, imageUrl, totalStats } from '../utils'

const STAT_KEYS = ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed']

// Ordem "natural" de cada coluna: id e nome crescem, atributos começam do maior
const descendingByDefault = (key) => key !== 'id' && key !== 'name'

function SortHeader({ column, label, sortBy, reversed, onSort, numeric }) {
  const active = sortBy === column
  const descending = descendingByDefault(column) !== reversed
  return (
    <th
      className={numeric ? 'num' : undefined}
      aria-sort={active ? (descending ? 'descending' : 'ascending') : 'none'}
    >
      <button className={active ? 'sort-btn active' : 'sort-btn'} onClick={() => onSort(column)}>
        {label}
        <ChevronDown size={16} className={descending ? 'sort-arrow' : 'sort-arrow up'} />
      </button>
    </th>
  )
}

function PokemonTable({ pokemon, favorites, sortBy, reversed, onSort, onSelect }) {
  const header = { sortBy, reversed, onSort }

  return (
    <div className="table-wrap">
      <table className="pokemon-table">
        <thead>
          <tr>
            <SortHeader column="id" label="#" numeric {...header} />
            <SortHeader column="name" label="Pokémon" {...header} />
            <th>Tipos</th>
            {STAT_KEYS.map((key) => (
              <SortHeader key={key} column={key} label={STAT_SHORT[key]} numeric {...header} />
            ))}
            <SortHeader column="total" label="Total" numeric {...header} />
          </tr>
        </thead>
        <tbody>
          {pokemon.map((p) => (
            <tr
              key={p.id}
              tabIndex={0}
              onClick={() => onSelect(p)}
              onKeyDown={(e) => e.key === 'Enter' && onSelect(p)}
            >
              <td className="num muted">{formatId(p.id)}</td>
              <td>
                <div className="name-cell">
                  <img src={imageUrl(p.id)} alt="" loading="lazy" />
                  <span>{p.name}</span>
                  {favorites.includes(p.id) && <Star size={16} className="fav-mark" aria-label="Favorito" />}
                </div>
              </td>
              <td>
                <div className="card-types">
                  {p.types.map((t) => (
                    <TypeBadge key={t.id} name={t.name} />
                  ))}
                </div>
              </td>
              {STAT_KEYS.map((key) => (
                <td key={key} className={sortBy === key ? 'num sorted' : 'num'}>
                  {p.stats[key]}
                </td>
              ))}
              <td className={sortBy === 'total' ? 'num total sorted' : 'num total'}>{totalStats(p)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PokemonTable

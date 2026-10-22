import { Star } from 'lucide-react'
import '../css/PokemonCard.css'
import TypeBadge from './TypeBadge'
import { STAT_LABELS, TYPE_COLORS, formatId, imageUrl } from '../utils'

function PokemonCard({ pokemon, isFavorite, onSelect, onToggleFavorite }) {
  const color = TYPE_COLORS[pokemon.types[0]?.name] ?? TYPE_COLORS.Typeless

  return (
    <article className="pokemon-card" style={{ '--card-color': color }} onClick={() => onSelect(pokemon)}>
      <button
        className="fav-btn"
        aria-label="Favoritar"
        onClick={(e) => {
          e.stopPropagation()
          onToggleFavorite(pokemon.id)
        }}
      >
        <Star size={20} fill={isFavorite ? 'currentColor' : 'none'} />
      </button>
      <span className="card-id">{formatId(pokemon.id)}</span>
      <img src={imageUrl(pokemon.id)} alt={pokemon.name} loading="lazy" />
      <h3>{pokemon.name}</h3>
      <div className="card-types">
        {pokemon.types.map((t) => (
          <TypeBadge key={t.id} name={t.name} />
        ))}
      </div>
      <ul className="card-stats">
        {Object.entries(pokemon.stats).map(([key, value]) => (
          <li key={key}>
            <span>{STAT_LABELS[key]}</span>
            <strong>{value}</strong>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default PokemonCard

import { useState } from 'react'
import { Star, StarFilled } from './icons'
import '../css/PokemonCard.css'
import TypeBadge from './TypeBadge'
import { STAT_SHORT, TYPE_COLORS, formatId, imageUrl } from '../utils'

function PokemonCard({ pokemon, isFavorite, onSelect, onToggleFavorite }) {
  const color = TYPE_COLORS[pokemon.types[0]?.name] ?? TYPE_COLORS.Typeless
  const [loaded, setLoaded] = useState(false)

  return (
    <article
      className="pokemon-card"
      style={{ '--card-color': color }}
      tabIndex={0}
      aria-label={`${pokemon.name}, ${formatId(pokemon.id)}`}
      onClick={() => onSelect(pokemon)}
      onKeyDown={(e) => e.key === 'Enter' && e.target === e.currentTarget && onSelect(pokemon)}
    >
      <div className={loaded ? 'card-top' : 'card-top loading'}>
        <span className="card-watermark">{formatId(pokemon.id)}</span>
        <div className="card-actions">
          <button
            className={isFavorite ? 'card-action fav active' : 'card-action fav'}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Favoritar'}
            aria-pressed={isFavorite}
            title={isFavorite ? 'Remover dos favoritos' : 'Favoritar'}
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(pokemon.id)
            }}
          >
            {isFavorite ? <StarFilled size={17} /> : <Star size={17} />}
          </button>
        </div>
        <img src={imageUrl(pokemon.id)} alt={pokemon.name} loading="lazy" onLoad={() => setLoaded(true)} />
      </div>
      <div className="card-body">
        <span className="card-id">{formatId(pokemon.id)}</span>
        <h3>{pokemon.name}</h3>
        <div className="card-types">
          {pokemon.types.map((t) => (
            <TypeBadge key={t.id} name={t.name} />
          ))}
        </div>
        <ul className="card-stats">
          {Object.entries(pokemon.stats).map(([key, value]) => (
            <li key={key}>
              <span className="mini-label">{STAT_SHORT[key]}</span>
              <span className="mini-track">
                <span className="mini-fill" style={{ width: `${Math.min(100, (value / 160) * 100)}%` }} />
              </span>
              <span className="mini-value">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default PokemonCard

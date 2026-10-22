import { useEffect } from 'react'
import { Users, X } from 'lucide-react'
import '../css/PokemonDetails.css'
import StatBar from './StatBar'
import TypeBadge from './TypeBadge'
import { STAT_LABELS, TYPE_COLORS, formatId, imageUrl } from '../utils'

function PokemonDetails({ pokemon, trainers, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const color = TYPE_COLORS[pokemon.types[0]?.name] ?? TYPE_COLORS.Typeless
  const owners = trainers.filter((t) => t.pokemonIds.includes(pokemon.id))
  const total = Object.values(pokemon.stats).reduce((a, b) => a + b, 0)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ '--card-color': color }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          <X size={20} />
        </button>
        <div className="modal-header">
          <img src={imageUrl(pokemon.id)} alt={pokemon.name} />
          <div>
            <span className="card-id">{formatId(pokemon.id)}</span>
            <h2>{pokemon.name}</h2>
            <div className="card-types">
              {pokemon.types.map((t) => (
                <TypeBadge key={t.id} name={t.name} />
              ))}
            </div>
          </div>
        </div>
        <div className="modal-stats">
          {Object.entries(pokemon.stats).map(([key, value]) => (
            <StatBar key={key} label={STAT_LABELS[key]} value={value} color={color} />
          ))}
          <p className="stat-total">Total: {total}</p>
        </div>
        {owners.length > 0 && (
          <p className="modal-owners">
            <Users size={16} /> Treinadores: <strong>{owners.map((t) => t.name).join(', ')}</strong>
          </p>
        )}
      </div>
    </div>
  )
}

export default PokemonDetails

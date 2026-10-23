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
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const color = TYPE_COLORS[pokemon.types[0]?.name] ?? TYPE_COLORS.Typeless
  const owners = trainers.filter((t) => t.pokemonIds.includes(pokemon.id))
  const total = Object.values(pokemon.stats).reduce((a, b) => a + b, 0)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ '--card-color': color }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-hero">
          <button className="modal-close" onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </button>
          <span className="modal-watermark">{pokemon.name}</span>
          <img src={imageUrl(pokemon.id)} alt={pokemon.name} />
        </div>
        <div className="modal-body">
          <span className="card-id">{formatId(pokemon.id)}</span>
          <h2>{pokemon.name}</h2>
          <div className="card-types">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.id} name={t.name} />
            ))}
          </div>

          <h4 className="section-title">Atributos base</h4>
          {Object.entries(pokemon.stats).map(([key, value]) => (
            <StatBar key={key} label={STAT_LABELS[key]} value={value} />
          ))}
          <div className="stat-total">
            <span>Total</span>
            <strong>{total}</strong>
          </div>

          {owners.length > 0 && (
            <>
              <h4 className="section-title">
                <Users size={16} /> Treinadores
              </h4>
              <div className="owner-chips">
                {owners.map((t) => (
                  <span key={t.id} className="owner-chip">
                    {t.name}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails

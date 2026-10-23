import { useEffect, useRef } from 'react'
import { Cap, Close } from './icons3d'
import '../css/PokemonDetails.css'
import StatBar from './StatBar'
import StatRadar from './StatRadar'
import TypeBadge from './TypeBadge'
import { STAT_LABELS, TYPE_COLORS, formatId, imageUrl } from '../utils'

function PokemonDetails({ pokemon, trainers, onClose }) {
  const closeRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    const previous = document.activeElement
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab') return
      // Mantém o Tab circulando dentro do modal
      const focusable = modalRef.current.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previous?.focus?.()
    }
  }, [onClose])

  const color = TYPE_COLORS[pokemon.types[0]?.name] ?? TYPE_COLORS.Typeless
  const owners = trainers.filter((t) => t.pokemonIds.includes(pokemon.id))
  const total = Object.values(pokemon.stats).reduce((a, b) => a + b, 0)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={pokemon.name} style={{ '--card-color': color }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-hero">
          <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Fechar">
            <Close size={30} />
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
          <div className="stats-layout">
            <StatRadar stats={pokemon.stats} />
            <div>
              {Object.entries(pokemon.stats).map(([key, value]) => (
                <StatBar key={key} label={STAT_LABELS[key]} value={value} />
              ))}
              <div className="stat-total">
                <span>Total</span>
                <strong>{total}</strong>
              </div>
            </div>
          </div>

          {owners.length > 0 && (
            <>
              <h4 className="section-title">
                <Cap size={20} /> Treinadores
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

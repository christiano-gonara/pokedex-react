import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import '../../css/heroes/FavoritesHero.css'
import { imageUrl } from '../../utils'

const BOX_SIZE = 30

function FavoritesHero({ favorites, onSelect }) {
  const boxes = Math.max(1, Math.ceil(favorites.length / BOX_SIZE))
  const [box, setBox] = useState(0)
  const current = Math.min(box, boxes - 1)
  const slots = Array.from({ length: BOX_SIZE }, (_, i) => favorites[current * BOX_SIZE + i] ?? null)
  const types = new Set(favorites.flatMap((p) => p.types.map((t) => t.name)))

  return (
    <section className="pc">
      <div className="pc-text">
        <span className="pc-eyebrow">Sistema de PC do Bill</span>
        <h1>Favoritos</h1>
        <p>
          {favorites.length > 0
            ? 'Seus Pokémon favoritos ficam guardados nas caixas do PC.'
            : 'Toque na estrela de um Pokémon para guardá-lo na caixa.'}
        </p>
        <dl className="pc-stats">
          <div>
            <dd>{favorites.length}</dd>
            <dt>Guardados</dt>
          </div>
          <div>
            <dd>{types.size}</dd>
            <dt>Tipos</dt>
          </div>
        </dl>
      </div>

      <div className="pc-box">
        <header className="pc-box-header">
          <button onClick={() => setBox((b) => (b - 1 + boxes) % boxes)} disabled={boxes === 1} aria-label="Caixa anterior">
            <ChevronLeft size={16} strokeWidth={3} />
          </button>
          <span>CAIXA {current + 1}</span>
          <button onClick={() => setBox((b) => (b + 1) % boxes)} disabled={boxes === 1} aria-label="Próxima caixa">
            <ChevronRight size={16} strokeWidth={3} />
          </button>
        </header>
        <div className="pc-grid">
          {slots.map((p, i) =>
            p ? (
              <button key={p.id} className="pc-slot filled" onClick={() => onSelect(p)} title={p.name}>
                <img src={imageUrl(p.id)} alt={p.name} loading="lazy" />
              </button>
            ) : (
              <span key={`empty-${i}`} className="pc-slot" />
            ),
          )}
        </div>
      </div>
    </section>
  )
}

export default FavoritesHero

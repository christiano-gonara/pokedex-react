import { useEffect, useState } from 'react'
import '../../css/heroes/PokedexHero.css'
import { ChevronLeft, ChevronRight, Shuffle } from '../icons'
import TypeBadge from '../TypeBadge'
import { imageUrl } from '../../utils'

const ROTATE_MS = 4500

function PokedexHero({ pokemon, typeCount, onSelect }) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * pokemon.length))
  const [paused, setPaused] = useState(false)
  const current = pokemon[index]

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % pokemon.length), ROTATE_MS)
    return () => clearInterval(timer)
  }, [paused, pokemon.length])

  const step = (delta) => setIndex((i) => (i + delta + pokemon.length) % pokemon.length)
  const randomize = () => setIndex(Math.floor(Math.random() * pokemon.length))

  return (
    <section className="dex" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="dex-info">
        <div className="dex-lights" aria-hidden="true">
          <span className="dex-lens" />
          <span className="dex-led red" />
          <span className="dex-led yellow" />
          <span className="dex-led green" />
        </div>
        <div className="dex-title">
          <h1>Pokédex</h1>
          <p>Pesquise, filtre e compare os Pokémon da primeira geração.</p>
        </div>
      </div>

      <dl className="dex-counter">
        <div>
          <dt>VISTOS</dt>
          <dd>{String(pokemon.length).padStart(3, '0')}</dd>
        </div>
        <div>
          <dt>TIPOS</dt>
          <dd>{String(typeCount).padStart(3, '0')}</dd>
        </div>
      </dl>

      <div className="dex-viewer">
        <button className="dex-screen" onClick={() => onSelect(current)} aria-label={`Ver detalhes de ${current.name}`}>
          <img key={current.id} src={imageUrl(current.id)} alt="" />
          <span className="screen-info">
            <span className="screen-id">No.{String(current.id).padStart(3, '0')}</span>
            <span className="screen-name">{current.name}</span>
            <span className="screen-types">
              {current.types.map((t) => (
                <TypeBadge key={t.id} name={t.name} />
              ))}
            </span>
          </span>
        </button>
        <div className="dex-keys">
          <button onClick={() => step(-1)} aria-label="Pokémon anterior">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => step(1)} aria-label="Próximo Pokémon">
            <ChevronRight size={18} />
          </button>
          <button onClick={randomize} aria-label="Pokémon aleatório" title="Pokémon aleatório">
            <Shuffle size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default PokedexHero

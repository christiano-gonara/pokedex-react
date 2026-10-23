import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import '../../css/heroes/PokedexHero.css'
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
      <div className="dex-left">
        <div className="dex-lights" aria-hidden="true">
          <span className="dex-lens" />
          <span className="dex-led red" />
          <span className="dex-led yellow" />
          <span className="dex-led green" />
        </div>
        <div className="dex-text">
          <span className="dex-eyebrow">Região de Kanto · Geração I</span>
          <h1>Pokédex</h1>
          <p>Pesquise, filtre e conheça os atributos de cada Pokémon.</p>
          <div className="dex-readout">
            <span>{pokemon.length} POKÉMON</span>
            <span>{typeCount} TIPOS</span>
          </div>
        </div>
      </div>

      <div className="dex-right">
        <div className="dex-bezel">
          <div className="bezel-dots" aria-hidden="true">
            <span />
            <span />
          </div>
          <button className="dex-screen" onClick={() => onSelect(current)} aria-label={`Ver detalhes de ${current.name}`}>
            <span className="screen-id">No.{String(current.id).padStart(3, '0')}</span>
            <img key={current.id} src={imageUrl(current.id)} alt="" />
            <span className="screen-name">{current.name}</span>
            <span className="screen-types">
              {current.types.map((t) => (
                <TypeBadge key={t.id} name={t.name} />
              ))}
            </span>
          </button>
          <div className="bezel-bottom" aria-hidden="true">
            <span className="bezel-btn" />
            <span className="speaker">
              <i />
              <i />
              <i />
              <i />
            </span>
          </div>
        </div>

        <div className="dex-controls">
          <button className="dex-round" onClick={randomize} title="Pokémon aleatório" aria-label="Pokémon aleatório" />
          <span className="dex-pills" aria-hidden="true">
            <i className="pill-red" />
            <i className="pill-blue" />
          </span>
          <div className="dpad">
            <span className="dpad-v" aria-hidden="true" />
            <button className="dpad-left" onClick={() => step(-1)} aria-label="Pokémon anterior">
              <ChevronLeft size={14} strokeWidth={3} />
            </button>
            <button className="dpad-right" onClick={() => step(1)} aria-label="Próximo Pokémon">
              <ChevronRight size={14} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PokedexHero

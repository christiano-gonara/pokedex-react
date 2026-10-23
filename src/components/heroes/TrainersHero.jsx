import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import '../../css/heroes/TrainersHero.css'
import KantoBadge, { BADGE_COUNT } from '../KantoBadge'
import { portraitOf, totalStats } from '../../utils'

const ROTATE_MS = 5000

function TrainersHero({ trainers, pokemon }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const trainer = trainers[index]
  const byId = Object.fromEntries(pokemon.map((p) => [p.id, p]))
  const team = trainer.pokemonIds.map((id) => byId[id]).filter(Boolean)
  const power = team.reduce((sum, p) => sum + totalStats(p), 0)
  const totalBadges = trainers.reduce((sum, t) => sum + t.badges, 0)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % trainers.length), ROTATE_MS)
    return () => clearInterval(timer)
  }, [paused, trainers.length])

  const step = (delta) => setIndex((i) => (i + delta + trainers.length) % trainers.length)

  return (
    <section className="league" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="league-text">
        <span className="league-eyebrow">Liga Pokémon de Kanto</span>
        <h1>Treinadores</h1>
        <p>Líderes de ginásio, rivais e vilões com suas equipes.</p>
        <dl className="league-stats">
          <div>
            <dd>{trainers.length}</dd>
            <dt>Treinadores</dt>
          </div>
          <div>
            <dd>{totalBadges}</dd>
            <dt>Insígnias</dt>
          </div>
        </dl>
      </div>

      <div className="tcard-area">
        <article className="tcard" key={trainer.id}>
          <header className="tcard-top">
            <span>CARTÃO DE TREINADOR</span>
            <span>IDNo.{String(trainer.id).padStart(5, '0')}</span>
          </header>
          <div className="tcard-body">
            <dl className="tcard-fields">
              <div>
                <dt>NOME</dt>
                <dd>{trainer.name.toUpperCase()}</dd>
              </div>
              <div>
                <dt>POKÉMON</dt>
                <dd>{team.length}</dd>
              </div>
              <div>
                <dt>PODER</dt>
                <dd>{power}</dd>
              </div>
            </dl>
            <div className="tcard-portrait">
              <img src={portraitOf(trainer.name)} alt={trainer.name} />
            </div>
          </div>
          <div className="badge-case" title={`${trainer.badges} insígnias`}>
            {Array.from({ length: BADGE_COUNT }, (_, i) => (
              <KantoBadge key={i} index={i} lit={i < trainer.badges} />
            ))}
          </div>
        </article>

        <div className="tcard-nav">
          <button onClick={() => step(-1)} aria-label="Treinador anterior">
            <ChevronLeft size={16} />
          </button>
          <span className="tcard-dots">
            {trainers.map((t, i) => (
              <i key={t.id} className={i === index ? 'on' : ''} />
            ))}
          </span>
          <button onClick={() => step(1)} aria-label="Próximo treinador">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default TrainersHero

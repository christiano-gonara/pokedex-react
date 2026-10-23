import { Award } from 'lucide-react'
import '../css/TrainerList.css'
import { TYPE_COLORS, difficultyOf, imageUrl, portraitOf, totalStats } from '../utils'

function mainType(team) {
  const counts = {}
  team.flatMap((p) => p.types).forEach(({ name }) => (counts[name] = (counts[name] ?? 0) + 1))
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'Typeless'
}

const MAX_BADGES = 9
const TEAM_SLOTS = 6

function TrainerCard({ trainer, team, onSelectPokemon }) {
  const type = mainType(team)
  const power = team.reduce((sum, p) => sum + totalStats(p), 0)
  const difficulty = difficultyOf(team)
  const emptySlots = Math.max(0, TEAM_SLOTS - team.length)

  return (
    <article className="trainer-card" style={{ '--card-color': TYPE_COLORS[type] }}>
      <div className="trainer-hero">
        <div className="hero-info">
          <span className="hero-kicker">Especialista {type}</span>
          <h3>{trainer.name}</h3>
          <div className="medals" title={`${trainer.badges} insígnias`}>
            {Array.from({ length: MAX_BADGES }, (_, i) => (
              <Award key={i} size={15} className={i < trainer.badges ? 'medal on' : 'medal'} />
            ))}
          </div>
          <div className="hero-meta">
            <span className={`level ${difficulty.toLowerCase()}`}>{difficulty}</span>
            <span className="power">
              Poder <strong>{power}</strong>
            </span>
          </div>
        </div>
        <img className="hero-portrait" src={portraitOf(trainer.name)} alt={trainer.name} />
      </div>

      <div className="trainer-team">
        {team.map((p, i) => (
          <button
            key={`${p.id}-${i}`}
            style={{ '--tile-color': TYPE_COLORS[p.types[0]?.name] }}
            onClick={() => onSelectPokemon(p)}
            title={p.name}
          >
            <img src={imageUrl(p.id)} alt="" loading="lazy" />
            <span>{p.name}</span>
          </button>
        ))}
        {Array.from({ length: emptySlots }, (_, i) => (
          <span key={`empty-${i}`} className="empty-slot" aria-hidden="true" />
        ))}
      </div>
    </article>
  )
}

function TrainerList({ trainers, pokemon, onSelectPokemon }) {
  const byId = Object.fromEntries(pokemon.map((p) => [p.id, p]))

  return (
    <section className="trainer-list">
      {trainers.map((trainer) => (
        <TrainerCard
          key={trainer.id}
          trainer={trainer}
          team={trainer.pokemonIds.map((id) => byId[id]).filter(Boolean)}
          onSelectPokemon={onSelectPokemon}
        />
      ))}
    </section>
  )
}

export default TrainerList

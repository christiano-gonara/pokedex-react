import { Award } from 'lucide-react'
import '../css/TrainerList.css'
import TypeBadge from './TypeBadge'
import { TYPE_COLORS, difficultyOf, imageUrl, totalStats } from '../utils'

const portraits = import.meta.glob('../assets/images/trainers/*.png', { eager: true, import: 'default' })

const slug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z]+/g, '-')
    .replace(/^-|-$/g, '')

const portraitOf = (name) => portraits[`../assets/images/trainers/${slug(name)}.png`]

function mainType(team) {
  const counts = {}
  team.flatMap((p) => p.types).forEach(({ name }) => (counts[name] = (counts[name] ?? 0) + 1))
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'Typeless'
}

function TrainerCard({ trainer, team, onSelectPokemon }) {
  const type = mainType(team)
  const power = team.reduce((sum, p) => sum + totalStats(p), 0)
  const difficulty = difficultyOf(team)

  return (
    <article className="trainer-card" style={{ '--card-color': TYPE_COLORS[type] }}>
      <div className="trainer-header">
        <div className="portrait">
          <img src={portraitOf(trainer.name)} alt={trainer.name} />
        </div>
        <div className="trainer-info">
          <h3>{trainer.name}</h3>
          <span className="badges">
            <Award size={14} /> {trainer.badges} {trainer.badges === 1 ? 'insígnia' : 'insígnias'}
          </span>
          <div className="trainer-tags">
            <TypeBadge name={type} />
            <span className={`difficulty ${difficulty.toLowerCase()}`}>{difficulty}</span>
          </div>
        </div>
      </div>

      <div className="trainer-team-header">
        <span>Equipe · {team.length}</span>
        <span>
          Poder <strong>{power}</strong>
        </span>
      </div>
      <div className="trainer-team">
        {team.map((p, i) => (
          <button
            key={`${p.id}-${i}`}
            style={{ '--tile-color': TYPE_COLORS[p.types[0]?.name] }}
            onClick={() => onSelectPokemon(p)}
          >
            <img src={imageUrl(p.id)} alt="" loading="lazy" />
            <span>{p.name}</span>
          </button>
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

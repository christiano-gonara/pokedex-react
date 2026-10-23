import { Award, Swords, Trophy } from 'lucide-react'
import '../css/TrainerList.css'
import TypeBadge from './TypeBadge'
import { TYPE_COLORS, difficultyOf, imageUrl, totalStats } from '../utils'

function mainType(team) {
  const counts = {}
  team.flatMap((p) => p.types).forEach(({ name }) => (counts[name] = (counts[name] ?? 0) + 1))
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'Typeless'
}

function TrainerCard({ trainer, team, defeated, onSelectPokemon, onChallenge }) {
  const type = mainType(team)
  const ace = [...team].sort((a, b) => totalStats(b) - totalStats(a))[0]
  const power = team.reduce((sum, p) => sum + totalStats(p), 0)
  const difficulty = difficultyOf(team)

  return (
    <article className="trainer-card" style={{ '--card-color': TYPE_COLORS[type] }}>
      <div className="trainer-banner">
        {ace && <img className="trainer-ace" src={imageUrl(ace.id)} alt="" aria-hidden="true" />}
        {defeated && (
          <span className="defeated-tag">
            <Trophy size={13} /> Vencido
          </span>
        )}
        <span className="avatar">{trainer.name.charAt(0)}</span>
        <h3>{trainer.name}</h3>
        <span className="badges">
          <Award size={14} /> {trainer.badges} {trainer.badges === 1 ? 'insígnia' : 'insígnias'}
        </span>
      </div>

      <div className="trainer-body">
        <dl className="trainer-stats">
          <div>
            <dt>Poder</dt>
            <dd>{power}</dd>
          </div>
          <div>
            <dt>Especialidade</dt>
            <dd>
              <TypeBadge name={type} />
            </dd>
          </div>
          <div>
            <dt>Nível</dt>
            <dd className={`difficulty ${difficulty.toLowerCase()}`}>{difficulty}</dd>
          </div>
        </dl>

        <div className="trainer-team">
          {team.map((p) => (
            <button key={p.id} title={p.name} onClick={() => onSelectPokemon(p)}>
              <img src={imageUrl(p.id)} alt={p.name} loading="lazy" />
            </button>
          ))}
        </div>

        <button className="challenge-btn" onClick={() => onChallenge(trainer)}>
          <Swords size={16} /> {defeated ? 'Desafiar de novo' : 'Desafiar'}
        </button>
      </div>
    </article>
  )
}

function TrainerList({ trainers, pokemon, defeated, onSelectPokemon, onChallenge }) {
  const byId = Object.fromEntries(pokemon.map((p) => [p.id, p]))

  return (
    <section className="trainer-list">
      {trainers.map((trainer) => (
        <TrainerCard
          key={trainer.id}
          trainer={trainer}
          team={trainer.pokemonIds.map((id) => byId[id]).filter(Boolean)}
          defeated={defeated.includes(trainer.id)}
          onSelectPokemon={onSelectPokemon}
          onChallenge={onChallenge}
        />
      ))}
    </section>
  )
}

export default TrainerList

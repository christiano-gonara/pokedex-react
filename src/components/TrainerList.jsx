import { Award } from 'lucide-react'
import '../css/TrainerList.css'
import { TYPE_COLORS, imageUrl } from '../utils'

function TrainerList({ trainers, pokemon, onSelectPokemon }) {
  const byId = Object.fromEntries(pokemon.map((p) => [p.id, p]))

  return (
    <section className="trainer-list">
      {trainers.map((trainer) => {
        const team = trainer.pokemonIds.map((id) => byId[id]).filter(Boolean)
        const color = TYPE_COLORS[team[0]?.types[0]?.name] ?? TYPE_COLORS.Typeless

        return (
          <article key={trainer.id} className="trainer-card" style={{ '--card-color': color }}>
            <div className="trainer-header">
              <span className="avatar">{trainer.name.charAt(0)}</span>
              <div>
                <h3>{trainer.name}</h3>
                <span className="badges">
                  <Award size={14} /> {trainer.badges} {trainer.badges === 1 ? 'insígnia' : 'insígnias'}
                </span>
              </div>
            </div>
            <div className="trainer-team">
              {team.map((p) => (
                <button key={p.id} title={p.name} onClick={() => onSelectPokemon(p)}>
                  <img src={imageUrl(p.id)} alt={p.name} loading="lazy" />
                  <span>{p.name}</span>
                </button>
              ))}
            </div>
          </article>
        )
      })}
    </section>
  )
}

export default TrainerList

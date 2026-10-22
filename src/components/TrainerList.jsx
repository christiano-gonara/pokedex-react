import '../css/TrainerList.css'
import { imageUrl } from '../utils'

function TrainerList({ trainers, pokemon, onSelectPokemon }) {
  const byId = Object.fromEntries(pokemon.map((p) => [p.id, p]))

  return (
    <section className="trainer-list">
      {trainers.map((trainer) => (
        <article key={trainer.id} className="trainer-card">
          <h3>🧑‍🚀 {trainer.name}</h3>
          <p>🏅 Insígnias: {trainer.badges}</p>
          <div className="trainer-pokemon">
            {trainer.pokemonIds.map((id) => (
              <button key={id} title={byId[id]?.name} onClick={() => onSelectPokemon(byId[id])}>
                <img src={imageUrl(id)} alt={byId[id]?.name} loading="lazy" />
                <span>{byId[id]?.name}</span>
              </button>
            ))}
          </div>
        </article>
      ))}
    </section>
  )
}

export default TrainerList

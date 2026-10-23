import { Award, Star } from 'lucide-react'
import '../css/PageHero.css'
import { imageUrl, portraitOf } from '../utils'

const STARTERS = [
  { id: 1, className: 'art-left' },
  { id: 25, className: 'art-main' },
  { id: 4, className: 'art-right' },
  { id: 7, className: 'art-back' },
]

const LINEUP = ['Misty', 'Brock', 'Ash', 'Gary', 'Lance']

function Stats({ items }) {
  return (
    <dl className="hero-stats">
      {items.map(([label, value]) => (
        <div key={label}>
          <dd>{value}</dd>
          <dt>{label}</dt>
        </div>
      ))}
    </dl>
  )
}

function PokedexHero({ pokemonCount, typeCount }) {
  return (
    <section className="hero hero-pokedex">
      <div className="hero-content">
        <div className="dex-lights" aria-hidden="true">
          <span className="lens" />
          <span className="led red" />
          <span className="led yellow" />
          <span className="led green" />
        </div>
        <span className="hero-eyebrow">Região de Kanto · Geração I</span>
        <h1>Pokédex</h1>
        <p>Pesquise, filtre e conheça os atributos de cada Pokémon.</p>
        <Stats
          items={[
            ['Pokémon', pokemonCount],
            ['Tipos', typeCount],
          ]}
        />
      </div>
      <div className="hero-art" aria-hidden="true">
        {STARTERS.map(({ id, className }) => (
          <img key={id} className={className} src={imageUrl(id)} alt="" />
        ))}
      </div>
    </section>
  )
}

function TrainersHero({ trainers }) {
  const badges = trainers.reduce((sum, t) => sum + t.badges, 0)
  const pokemon = trainers.reduce((sum, t) => sum + t.pokemonIds.length, 0)

  return (
    <section className="hero hero-trainers">
      <div className="hero-content">
        <span className="hero-eyebrow">
          <Award size={14} /> Liga Pokémon
        </span>
        <h1>Treinadores</h1>
        <p>Líderes de ginásio, rivais e vilões de Kanto com suas equipes.</p>
        <Stats
          items={[
            ['Treinadores', trainers.length],
            ['Insígnias', badges],
            ['Pokémon', pokemon],
          ]}
        />
      </div>
      <div className="hero-art lineup" aria-hidden="true">
        {LINEUP.map((name) => (
          <img key={name} src={portraitOf(name)} alt="" />
        ))}
      </div>
    </section>
  )
}

function FavoritesHero({ favorites }) {
  const types = new Set(favorites.flatMap((p) => p.types.map((t) => t.name)))
  const showcase = favorites.slice(-3).reverse()

  return (
    <section className="hero hero-favorites">
      <div className="hero-content">
        <span className="hero-eyebrow">
          <Star size={14} fill="currentColor" /> Sua coleção
        </span>
        <h1>Favoritos</h1>
        <p>
          {favorites.length > 0
            ? 'Os Pokémon que você marcou com a estrela ficam guardados aqui.'
            : 'Toque na estrela de um Pokémon para guardá-lo aqui.'}
        </p>
        <Stats
          items={[
            ['Favoritos', favorites.length],
            ['Tipos', types.size],
          ]}
        />
      </div>
      <div className="hero-art" aria-hidden="true">
        {showcase.length > 0 ? (
          showcase.map((p, i) => <img key={p.id} className={`fav-art fav-${i}`} src={imageUrl(p.id)} alt="" />)
        ) : (
          <Star className="big-star" size={140} strokeWidth={1.2} />
        )}
      </div>
    </section>
  )
}

function PageHero({ view, pokemonCount, typeCount, trainers, favorites }) {
  if (view === 'trainers') return <TrainersHero trainers={trainers} />
  if (view === 'favorites') return <FavoritesHero favorites={favorites} />
  return <PokedexHero pokemonCount={pokemonCount} typeCount={typeCount} />
}

export default PageHero

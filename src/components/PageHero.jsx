import PokedexHero from './heroes/PokedexHero'
import TrainersHero from './heroes/TrainersHero'
import FavoritesHero from './heroes/FavoritesHero'

function PageHero({ view, pokemon, typeCount, trainers, favorites, onSelect }) {
  if (view === 'trainers') return <TrainersHero trainers={trainers} pokemon={pokemon} />
  if (view === 'favorites') return <FavoritesHero favorites={favorites} onSelect={onSelect} />
  return <PokedexHero pokemon={pokemon} typeCount={typeCount} onSelect={onSelect} />
}

export default PageHero

import { SearchX } from 'lucide-react'
import '../css/PokemonList.css'
import PokemonCard from './PokemonCard'

function PokemonList({ pokemon, favorites, onSelect, onToggleFavorite }) {
  if (pokemon.length === 0) {
    return <p className="empty">
        <SearchX size={32} />
        Nenhum Pokémon encontrado.
      </p>
  }

  return (
    <section className="pokemon-list">
      {pokemon.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          isFavorite={favorites.includes(p.id)}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  )
}

export default PokemonList

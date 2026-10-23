import { SearchX } from 'lucide-react'
import '../css/PokemonList.css'
import PokemonCard from './PokemonCard'
import PokemonTable from './PokemonTable'

function PokemonList({ pokemon, favorites, layout, sortBy, reversed, onSort, onSelect, onToggleFavorite }) {
  if (pokemon.length === 0) {
    return (
      <div className="empty">
        <SearchX size={40} strokeWidth={1.5} />
        <h3>Nenhum Pokémon encontrado</h3>
        <p>Tente outro nome, ID ou tipo.</p>
      </div>
    )
  }

  if (layout === 'table') {
    return (
      <PokemonTable
        pokemon={pokemon}
        favorites={favorites}
        sortBy={sortBy}
        reversed={reversed}
        onSort={onSort}
        onSelect={onSelect}
      />
    )
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

import { SearchX } from 'lucide-react'
import '../css/PokemonList.css'
import PokemonCard from './PokemonCard'

function PokemonList({ pokemon, favorites, teamIds, onSelect, onToggleFavorite, onToggleTeam }) {
  if (pokemon.length === 0) {
    return (
      <div className="empty">
        <SearchX size={40} strokeWidth={1.5} />
        <h3>Nenhum Pokémon encontrado</h3>
        <p>Tente outro nome, ID ou tipo.</p>
      </div>
    )
  }

  return (
    <section className="pokemon-list">
      {pokemon.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          isFavorite={favorites.includes(p.id)}
          inTeam={teamIds.includes(p.id)}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
          onToggleTeam={onToggleTeam}
        />
      ))}
    </section>
  )
}

export default PokemonList

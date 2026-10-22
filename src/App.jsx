import { useEffect, useMemo, useState } from 'react'
import './css/App.css'
import data from './data/pokedex-data.json'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import TrainerList from './components/TrainerList'

const { pokemon: allPokemon, types, trainers } = data
const realTypes = types.filter((t) => t.id !== 0)

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem('favorites')) ?? []
  } catch {
    return []
  }
}

function App() {
  const [view, setView] = useState('pokedex')
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [sortBy, setSortBy] = useState('id')
  const [selected, setSelected] = useState(null)
  const [favorites, setFavorites] = useState(loadFavorites)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const visiblePokemon = useMemo(() => {
    const query = search.trim().toLowerCase().replace(/^#/, '')
    const list = allPokemon.filter((p) => {
      if (view === 'favorites' && !favorites.includes(p.id)) return false
      if (selectedType && !p.types.some((t) => t.name === selectedType)) return false
      if (!query) return true
      return p.name.toLowerCase().includes(query) || String(p.id).includes(query)
    })
    return list.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'id') return a.id - b.id
      return b.stats[sortBy] - a.stats[sortBy]
    })
  }, [search, selectedType, sortBy, view, favorites])

  const toggleFavorite = (id) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))

  const pickRandom = () => setSelected(allPokemon[Math.floor(Math.random() * allPokemon.length)])

  return (
    <div className="app">
      <Header
        view={view}
        onViewChange={setView}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((d) => !d)}
        favoritesCount={favorites.length}
      />
      <main>
        {view === 'trainers' ? (
          <TrainerList trainers={trainers} pokemon={allPokemon} onSelectPokemon={setSelected} />
        ) : (
          <>
            <SearchBar value={search} onChange={setSearch} />
            <Filters
              types={realTypes}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onRandom={pickRandom}
            />
            <PokemonList
              pokemon={visiblePokemon}
              favorites={favorites}
              onSelect={setSelected}
              onToggleFavorite={toggleFavorite}
            />
          </>
        )}
      </main>
      {selected && <PokemonDetails pokemon={selected} trainers={trainers} onClose={() => setSelected(null)} />}
    </div>
  )
}

export default App

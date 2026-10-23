import { useCallback, useEffect, useMemo, useState } from 'react'
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

const PAGE_TITLES = {
  pokedex: 'Encontre seu Pokémon',
  trainers: 'Treinadores',
  favorites: 'Seus favoritos',
}

function loadList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? []
  } catch {
    return []
  }
}

function saveList(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // sem localStorage (ex.: aba anônima), segue só em memória
  }
}

function App() {
  const [view, setView] = useState('pokedex')
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [sortBy, setSortBy] = useState('id')
  const [selected, setSelected] = useState(null)
  const [favorites, setFavorites] = useState(() => loadList('favorites'))
  const [darkMode, setDarkMode] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  useEffect(() => saveList('favorites', favorites), [favorites])

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

  const closeDetails = useCallback(() => setSelected(null), [])

  const pickRandom = () => setSelected(allPokemon[Math.floor(Math.random() * allPokemon.length)])

  const subtitle = {
    pokedex: `${visiblePokemon.length} de ${allPokemon.length} Pokémon`,
    favorites: `${visiblePokemon.length} de ${favorites.length} Pokémon`,
    trainers: `${trainers.length} treinadores e suas equipes`,
  }[view]

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
        <section className="page-intro">
          <h1>{PAGE_TITLES[view]}</h1>
          <p>{subtitle}</p>
        </section>

        {view === 'trainers' && (
          <TrainerList trainers={trainers} pokemon={allPokemon} onSelectPokemon={setSelected} />
        )}

        {(view === 'pokedex' || view === 'favorites') && (
          <>
            <div className="toolbar">
              <SearchBar value={search} onChange={setSearch} />
              <Filters
                types={realTypes}
                selectedType={selectedType}
                onTypeChange={setSelectedType}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onRandom={pickRandom}
              />
            </div>
            <PokemonList
              pokemon={visiblePokemon}
              favorites={favorites}
              onSelect={setSelected}
              onToggleFavorite={toggleFavorite}
            />
          </>
        )}
      </main>

      {selected && <PokemonDetails pokemon={selected} trainers={trainers} onClose={closeDetails} />}
    </div>
  )
}

export default App

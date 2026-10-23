import { useCallback, useEffect, useMemo, useState } from 'react'
import './css/App.css'
import data from './data/pokedex-data.json'
import Header from './components/Header'
import Footer from './components/Footer'
import PageHero from './components/PageHero'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import TrainerList from './components/TrainerList'
import { totalStats } from './utils'

const { pokemon: allPokemon, types, trainers } = data
const realTypes = types.filter((t) => t.id !== 0)

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
  const [reversed, setReversed] = useState(false)
  const [layout, setLayout] = useState(() => {
    try {
      return localStorage.getItem('layout') === 'table' ? 'table' : 'cards'
    } catch {
      return 'cards'
    }
  })
  const [selected, setSelected] = useState(null)
  const [favorites, setFavorites] = useState(() => loadList('favorites'))
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'dark'
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    try {
      localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    } catch {
      // sem localStorage, o tema volta ao claro na próxima visita
    }
  }, [darkMode])

  useEffect(() => saveList('favorites', favorites), [favorites])

  useEffect(() => {
    try {
      localStorage.setItem('layout', layout)
    } catch {
      // sem localStorage, volta aos cards na próxima visita
    }
  }, [layout])

  const visiblePokemon = useMemo(() => {
    const query = search.trim().toLowerCase().replace(/^#/, '')
    const list = allPokemon.filter((p) => {
      if (view === 'favorites' && !favorites.includes(p.id)) return false
      if (selectedType && !p.types.some((t) => t.name === selectedType)) return false
      if (!query) return true
      return p.name.toLowerCase().includes(query) || String(p.id).includes(query)
    })
    list.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'id') return a.id - b.id
      if (sortBy === 'total') return totalStats(b) - totalStats(a)
      return b.stats[sortBy] - a.stats[sortBy]
    })
    return reversed ? list.reverse() : list
  }, [search, selectedType, sortBy, reversed, view, favorites])

  const favoritePokemon = useMemo(
    () => favorites.map((id) => allPokemon.find((p) => p.id === id)).filter(Boolean),
    [favorites],
  )

  const toggleFavorite = (id) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))

  const changeSort = (key) => {
    setSortBy(key)
    setReversed(false)
  }

  // Clicar de novo na mesma coluna da tabela inverte a ordem
  const sortByColumn = (key) => {
    if (key === sortBy) setReversed((r) => !r)
    else changeSort(key)
  }

  const closeDetails = useCallback(() => setSelected(null), [])

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
        <PageHero
          view={view}
          pokemon={allPokemon}
          typeCount={realTypes.length}
          trainers={trainers}
          favorites={favoritePokemon}
          onSelect={setSelected}
        />

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
                onSortChange={changeSort}
                onRandom={pickRandom}
                layout={layout}
                onLayoutChange={setLayout}
              />
            </div>
            {visiblePokemon.length > 0 && (
              <p className="results-count">
                {visiblePokemon.length === 1 ? '1 Pokémon' : `${visiblePokemon.length} Pokémon`}
                {selectedType && ` do tipo ${selectedType}`}
                {search.trim() && ` para "${search.trim()}"`}
              </p>
            )}
            <PokemonList
              pokemon={visiblePokemon}
              favorites={favorites}
              layout={layout}
              sortBy={sortBy}
              reversed={reversed}
              onSort={sortByColumn}
              onSelect={setSelected}
              onToggleFavorite={toggleFavorite}
            />
          </>
        )}
      </main>
      <Footer />

      {selected && <PokemonDetails pokemon={selected} trainers={trainers} onClose={closeDetails} />}
    </div>
  )
}

export default App

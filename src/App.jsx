import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './css/App.css'
import data from './data/pokedex-data.json'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import TrainerList from './components/TrainerList'
import TeamView from './components/TeamView'
import BattleArena from './components/BattleArena'
import Toast from './components/Toast'
import { TEAM_SIZE } from './utils'

const { pokemon: allPokemon, types, trainers } = data
const realTypes = types.filter((t) => t.id !== 0)
const pokemonById = Object.fromEntries(allPokemon.map((p) => [p.id, p]))

const PAGE_TITLES = {
  pokedex: 'Encontre seu Pokémon',
  team: 'Meu time',
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
  const [teamIds, setTeamIds] = useState(() => loadList('team'))
  const [defeated, setDefeated] = useState(() => loadList('defeated'))
  const [battle, setBattle] = useState(null)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef()
  const [darkMode, setDarkMode] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  useEffect(() => saveList('favorites', favorites), [favorites])
  useEffect(() => saveList('team', teamIds), [teamIds])
  useEffect(() => saveList('defeated', defeated), [defeated])

  const team = useMemo(() => teamIds.map((id) => pokemonById[id]).filter(Boolean), [teamIds])

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

  const notify = (text) => {
    clearTimeout(toastTimer.current)
    setToast({ text, id: Date.now() })
    toastTimer.current = setTimeout(() => setToast(null), 2200)
  }

  const toggleFavorite = (id) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))

  const toggleTeam = (pokemon) => {
    if (teamIds.includes(pokemon.id)) {
      setTeamIds(teamIds.filter((id) => id !== pokemon.id))
      notify(`${pokemon.name} saiu do time`)
    } else if (teamIds.length >= TEAM_SIZE) {
      notify(`Seu time já tem ${TEAM_SIZE} Pokémon`)
    } else {
      setTeamIds([...teamIds, pokemon.id])
      notify(`${pokemon.name} entrou no time (${teamIds.length + 1}/${TEAM_SIZE})`)
    }
  }

  const randomTeam = () => {
    const shuffled = [...allPokemon].sort(() => Math.random() - 0.5)
    setTeamIds(shuffled.slice(0, TEAM_SIZE).map((p) => p.id))
  }

  const challenge = (trainer) => {
    if (team.length === 0) {
      setView('team')
      notify('Monte seu time antes de batalhar')
      return
    }
    setBattle(trainer)
  }

  const finishBattle = useCallback((trainer, winner) => {
    if (winner === 'you') setDefeated((prev) => (prev.includes(trainer.id) ? prev : [...prev, trainer.id]))
  }, [])

  const closeDetails = useCallback(() => setSelected(null), [])
  const closeBattle = useCallback(() => setBattle(null), [])

  const pickRandom = () => setSelected(allPokemon[Math.floor(Math.random() * allPokemon.length)])

  const subtitle = {
    pokedex: `${visiblePokemon.length} de ${allPokemon.length} Pokémon`,
    favorites: `${visiblePokemon.length} de ${favorites.length} Pokémon`,
    team: `${team.length} de ${TEAM_SIZE} Pokémon · monte seu time e desafie os treinadores`,
    trainers: `${defeated.length} de ${trainers.length} treinadores vencidos`,
  }[view]

  const battleTeam = useMemo(
    () => (battle ? battle.pokemonIds.map((id) => pokemonById[id]).filter(Boolean) : []),
    [battle],
  )

  return (
    <div className="app">
      <Header
        view={view}
        onViewChange={setView}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((d) => !d)}
        favoritesCount={favorites.length}
        teamCount={team.length}
      />
      <main>
        <section className="page-intro">
          <h1>{PAGE_TITLES[view]}</h1>
          <p>{subtitle}</p>
        </section>

        {view === 'trainers' && (
          <TrainerList
            trainers={trainers}
            pokemon={allPokemon}
            defeated={defeated}
            onSelectPokemon={setSelected}
            onChallenge={challenge}
          />
        )}

        {view === 'team' && (
          <TeamView
            team={team}
            trainers={trainers}
            pokemonById={pokemonById}
            defeated={defeated}
            onRemove={(id) => setTeamIds(teamIds.filter((t) => t !== id))}
            onRandomTeam={randomTeam}
            onClear={() => setTeamIds([])}
            onBrowse={() => setView('pokedex')}
            onSelect={setSelected}
            onChallenge={challenge}
          />
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
              teamIds={teamIds}
              onSelect={setSelected}
              onToggleFavorite={toggleFavorite}
              onToggleTeam={toggleTeam}
            />
          </>
        )}
      </main>

      {selected && (
        <PokemonDetails
          pokemon={selected}
          trainers={trainers}
          inTeam={teamIds.includes(selected.id)}
          onToggleTeam={toggleTeam}
          onClose={closeDetails}
        />
      )}
      {battle && (
        <BattleArena
          team={team}
          trainer={battle}
          trainerTeam={battleTeam}
          onClose={closeBattle}
          onFinish={finishBattle}
        />
      )}
      <Toast message={toast} />
    </div>
  )
}

export default App

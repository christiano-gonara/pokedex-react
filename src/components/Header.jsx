import '../css/Header.css'

function Header({ view, onViewChange, darkMode, onToggleDark, favoritesCount }) {
  return (
    <header className="header">
      <h1>Pokédex</h1>
      <nav>
        <button className={view === 'pokedex' ? 'active' : ''} onClick={() => onViewChange('pokedex')}>
          🐾 Pokémon
        </button>
        <button className={view === 'trainers' ? 'active' : ''} onClick={() => onViewChange('trainers')}>
          🧑‍🚀 Treinadores
        </button>
        <button className={view === 'favorites' ? 'active' : ''} onClick={() => onViewChange('favorites')}>
          ⭐ Favoritos ({favoritesCount})
        </button>
        <button onClick={onToggleDark} aria-label="Alternar tema">
          {darkMode ? '☀️' : '🌙'}
        </button>
      </nav>
    </header>
  )
}

export default Header

import { Moon, PawPrint, Star, Sun, Users } from 'lucide-react'
import '../css/Header.css'

function Header({ view, onViewChange, darkMode, onToggleDark, favoritesCount }) {
  return (
    <header className="header">
      <h1>Pokédex</h1>
      <nav>
        <button className={view === 'pokedex' ? 'active' : ''} onClick={() => onViewChange('pokedex')}>
          <PawPrint size={16} /> Pokémon
        </button>
        <button className={view === 'trainers' ? 'active' : ''} onClick={() => onViewChange('trainers')}>
          <Users size={16} /> Treinadores
        </button>
        <button className={view === 'favorites' ? 'active' : ''} onClick={() => onViewChange('favorites')}>
          <Star size={16} /> Favoritos ({favoritesCount})
        </button>
        <button onClick={onToggleDark} aria-label="Alternar tema">
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </nav>
    </header>
  )
}

export default Header

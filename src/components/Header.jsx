import { Moon, PawPrint, Star, Sun, Users } from 'lucide-react'
import '../css/Header.css'
import Logo from './Logo'

const TABS = [
  { id: 'pokedex', label: 'Pokémon', icon: PawPrint },
  { id: 'trainers', label: 'Treinadores', icon: Users },
  { id: 'favorites', label: 'Favoritos', icon: Star },
]

function Header({ view, onViewChange, darkMode, onToggleDark, favoritesCount }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <Logo />
          <span>Pokédex</span>
        </div>
        <nav className="tabs">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} className={view === id ? 'active' : ''} onClick={() => onViewChange(id)}>
              <Icon size={16} />
              <span className="tab-label">{label}</span>
              {id === 'favorites' && favoritesCount > 0 && <span className="count">{favoritesCount}</span>}
            </button>
          ))}
        </nav>
        <button className="icon-btn" onClick={onToggleDark} aria-label="Alternar tema">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}

export default Header

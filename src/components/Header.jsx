import { Moon, Pokeball, Star, Sun, Users } from './icons'
import '../css/Header.css'
import Logo from './Logo'

const TABS = [
  { id: 'pokedex', label: 'Pokémon', icon: Pokeball },
  { id: 'trainers', label: 'Treinadores', icon: Users },
  { id: 'favorites', label: 'Favoritos', icon: Star },
]

function Header({ view, onViewChange, darkMode, onToggleDark, favoritesCount }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <Logo />
          <span className="brand-name">Pokédex</span>
          <span className="brand-region">KANTO</span>
        </div>

        <nav className="menu" aria-label="Seções">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              data-tab={id}
              className={view === id ? 'menu-item active' : 'menu-item'}
              aria-current={view === id ? 'page' : undefined}
              onClick={() => onViewChange(id)}
            >
              <Icon size={18} />
              <span className="menu-label">{label}</span>
              {id === 'favorites' && favoritesCount > 0 && <span className="menu-count">{favoritesCount}</span>}
            </button>
          ))}
        </nav>

        <button className="theme-btn" onClick={onToggleDark} aria-label="Alternar tema" title="Alternar tema">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}

export default Header

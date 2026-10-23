import { Cap, Moon, Pokeball, Star, Sun } from './icons3d'
import '../css/Header.css'
import Logo from './Logo'

const TABS = [
  { id: 'pokedex', label: 'Pokémon', icon: Pokeball },
  { id: 'trainers', label: 'Treinadores', icon: Cap },
  { id: 'favorites', label: 'Favoritos', icon: Star },
]

function Header({ view, onViewChange, darkMode, onToggleDark, favoritesCount }) {
  return (
    <header className="header">
      <div className="header-inner">
        <button className="brand" onClick={() => onViewChange('pokedex')} aria-label="Pokédex Kanto, ir para Pokémon">
          <Logo />
          <span className="brand-name">Pokédex</span>
          <span className="brand-region">KANTO</span>
        </button>

        <nav className="menu" aria-label="Seções">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              data-tab={id}
              className={view === id ? 'menu-item btn3d active' : 'menu-item btn3d'}
              aria-current={view === id ? 'page' : undefined}
              onClick={() => onViewChange(id)}
            >
              <Icon size={22} />
              <span className="menu-label">{label}</span>
              {id === 'favorites' && favoritesCount > 0 && <span className="menu-count">{favoritesCount}</span>}
            </button>
          ))}
        </nav>

        <button className="theme-btn btn3d" onClick={onToggleDark} aria-label="Alternar tema" title="Alternar tema">
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </header>
  )
}

export default Header

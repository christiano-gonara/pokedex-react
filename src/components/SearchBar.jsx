import { Close, Search } from './icons3d'
import '../css/SearchBar.css'

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <Search size={24} className="search-icon" />
      <input
        type="text"
        placeholder="Pesquisar por nome ou ID..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')} aria-label="Limpar pesquisa">
          <Close size={24} />
        </button>
      )}
    </div>
  )
}

export default SearchBar

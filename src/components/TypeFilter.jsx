import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Close, Funnel } from './icons3d'
import { TYPE_COLORS } from '../utils'

function TypeFilter({ types, selectedType, onTypeChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onClickOutside = (e) => !ref.current?.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const choose = (name) => {
    onTypeChange(name)
    setOpen(false)
  }

  return (
    <div className="type-filter" ref={ref}>
      <button
        className={selectedType ? 'pill-btn btn3d selected' : 'pill-btn btn3d'}
        style={selectedType ? { '--type-color': TYPE_COLORS[selectedType] } : undefined}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {selectedType ? <span className="chip-dot" /> : <Funnel size={20} />}
        <span>{selectedType || 'Tipo'}</span>
        <ChevronDown size={18} className={open ? 'chevron open' : 'chevron'} />
      </button>
      {selectedType && (
        <button className="clear-type" onClick={() => onTypeChange('')} aria-label="Limpar filtro de tipo">
          <Close size={20} />
        </button>
      )}

      {open && (
        <div className="type-panel" role="listbox">
          <div className="type-panel-header">
            <span>Filtrar por tipo</span>
            {selectedType && (
              <button className="link-btn" onClick={() => choose('')}>
                Limpar
              </button>
            )}
          </div>
          <div className="type-grid">
            {types.map((t) => (
              <button
                key={t.id}
                role="option"
                aria-selected={selectedType === t.name}
                className={selectedType === t.name ? 'type-option active' : 'type-option'}
                style={{ '--type-color': TYPE_COLORS[t.name] }}
                onClick={() => choose(selectedType === t.name ? '' : t.name)}
              >
                <span className="chip-dot" />
                {t.name}
                {selectedType === t.name && <Check size={18} className="type-check" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TypeFilter

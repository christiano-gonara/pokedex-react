import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Close, Sliders } from './icons'
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
        className={selectedType ? 'pill-btn selected' : 'pill-btn'}
        style={selectedType ? { '--type-color': TYPE_COLORS[selectedType] } : undefined}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {selectedType ? <span className="chip-dot" /> : <Sliders size={16} />}
        <span>{selectedType || 'Tipo'}</span>
        <ChevronDown size={16} className={open ? 'chevron open' : 'chevron'} />
      </button>
      {selectedType && (
        <button className="clear-type" onClick={() => onTypeChange('')} aria-label="Limpar filtro de tipo">
          <Close size={14} />
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
                {selectedType === t.name && <Check size={14} className="type-check" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TypeFilter

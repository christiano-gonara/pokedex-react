import { useEffect, useMemo, useRef, useState } from 'react'
import { FastForward, RotateCcw, Swords, Trophy, X } from 'lucide-react'
import '../css/BattleArena.css'
import { simulateBattle } from '../battle'
import { TYPE_COLORS, imageUrl } from '../utils'

const STEP_MS = 1100

function Fighter({ side, state, teamSize, frame }) {
  const { pokemon, hp, maxHp, fainted } = state
  const percent = (hp / maxHp) * 100
  const hpClass = percent > 50 ? 'high' : percent > 20 ? 'mid' : 'low'
  const anim = [
    frame.attacker === side && 'attacking',
    frame.damage?.side === side && 'hit',
    frame.faint === side && 'fainting',
    (frame.entering === side || frame.entering === 'both') && 'entering',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={`fighter ${side}`} style={{ '--card-color': TYPE_COLORS[pokemon.types[0]?.name] }}>
      <div className="fighter-card">
        <div className="fighter-name">
          <strong>{pokemon.name}</strong>
          <span>
            {Math.ceil(hp)}/{maxHp}
          </span>
        </div>
        <div className="hp-track">
          <div className={`hp-fill ${hpClass}`} style={{ width: `${percent}%` }} />
        </div>
        <div className="team-dots">
          {Array.from({ length: teamSize }, (_, i) => (
            <span key={i} className={i < fainted ? 'dot out' : 'dot'} />
          ))}
        </div>
      </div>
      <div className="sprite-wrap">
        {frame.damage?.side === side && (
          <span key={`dmg-${frame.step}`} className="damage-pop">
            -{frame.damage.value}
          </span>
        )}
        <img key={`${pokemon.id}-${frame.step}`} className={`sprite ${anim}`} src={imageUrl(pokemon.id)} alt={pokemon.name} />
        <span className="platform" />
      </div>
    </div>
  )
}

function BattleArena({ team, trainer, trainerTeam, onClose, onFinish }) {
  const [round, setRound] = useState(0)
  const [step, setStep] = useState(0)
  const reported = useRef(-1)

  // round só existe para gerar uma nova batalha na revanche
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const frames = useMemo(() => simulateBattle(team, trainer, trainerTeam), [team, trainer, trainerTeam, round])
  const last = frames.length - 1
  const frame = { ...frames[Math.min(step, last)], step }
  const finished = step >= last

  useEffect(() => {
    if (finished) return
    const timer = setTimeout(() => setStep((s) => s + 1), STEP_MS)
    return () => clearTimeout(timer)
  }, [step, finished])

  useEffect(() => {
    if (finished && reported.current !== round) {
      reported.current = round
      onFinish(trainer, frames[last].winner)
    }
  }, [finished, round, frames, last, trainer, onFinish])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const rematch = () => {
    setRound((r) => r + 1)
    setStep(0)
  }

  const won = frames[last].winner === 'you'

  return (
    <div className="modal-overlay">
      <div className="arena">
        <header className="arena-header">
          <span className="arena-title">
            <Swords size={18} /> Você <span className="vs">vs</span> {trainer.name}
          </span>
          <button className="arena-close" onClick={onClose} aria-label="Fechar batalha">
            <X size={20} />
          </button>
        </header>

        <div className="arena-field">
          <Fighter side="foe" state={frame.foe} teamSize={trainerTeam.length} frame={frame} />
          <Fighter side="you" state={frame.you} teamSize={team.length} frame={frame} />
        </div>

        <div className="arena-log">
          <p key={step}>{frame.message}</p>
        </div>

        <footer className="arena-footer">
          {finished ? (
            <>
              <span className={won ? 'result win' : 'result lose'}>
                {won && <Trophy size={18} />} {won ? 'Vitória!' : 'Derrota'}
              </span>
              <button className="pill-btn" onClick={rematch}>
                <RotateCcw size={16} /> Revanche
              </button>
              <button className="challenge-btn" onClick={onClose}>
                Concluir
              </button>
            </>
          ) : (
            <button className="pill-btn" onClick={() => setStep(last)}>
              <FastForward size={16} /> Pular
            </button>
          )}
        </footer>
      </div>
    </div>
  )
}

export default BattleArena

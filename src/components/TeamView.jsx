import { Plus, Shuffle, Swords, Trash2, Trophy, X } from 'lucide-react'
import '../css/TeamView.css'
import TypeBadge from './TypeBadge'
import { TEAM_SIZE, TYPE_COLORS, difficultyOf, imageUrl, totalStats } from '../utils'

function TeamView({ team, trainers, pokemonById, defeated, onRemove, onRandomTeam, onClear, onBrowse, onSelect, onChallenge }) {
  const slots = Array.from({ length: TEAM_SIZE }, (_, i) => team[i] ?? null)
  const power = team.reduce((sum, p) => sum + totalStats(p), 0)
  const teamTypes = [...new Set(team.flatMap((p) => p.types.map((t) => t.name)))]

  return (
    <div className="team-view">
      <section className="team-panel">
        <div className="team-summary">
          <div>
            <span className="summary-label">Poder do time</span>
            <strong className="summary-value">{power}</strong>
          </div>
          <div className="summary-types">
            {teamTypes.length > 0 ? (
              teamTypes.map((t) => <TypeBadge key={t} name={t} />)
            ) : (
              <span className="muted">Adicione Pokémon para ver os tipos do time</span>
            )}
          </div>
          <div className="summary-actions">
            <button className="pill-btn" onClick={onRandomTeam}>
              <Shuffle size={16} /> Aleatório
            </button>
            {team.length > 0 && (
              <button className="pill-btn icon-only" onClick={onClear} title="Limpar time" aria-label="Limpar time">
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="team-slots">
          {slots.map((p, i) =>
            p ? (
              <article
                key={p.id}
                className="team-slot"
                style={{ '--card-color': TYPE_COLORS[p.types[0]?.name] }}
                onClick={() => onSelect(p)}
              >
                <button
                  className="slot-remove"
                  aria-label={`Remover ${p.name}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemove(p.id)
                  }}
                >
                  <X size={14} />
                </button>
                <img src={imageUrl(p.id)} alt={p.name} />
                <span className="slot-name">{p.name}</span>
                <span className="slot-power">{totalStats(p)}</span>
              </article>
            ) : (
              <button key={`empty-${i}`} className="team-slot empty" onClick={onBrowse}>
                <Plus size={22} />
                <span>Adicionar</span>
              </button>
            ),
          )}
        </div>
      </section>

      <section>
        <h2 className="section-heading">Escolha um adversário</h2>
        <div className="opponents">
          {trainers.map((trainer) => {
            const trainerTeam = trainer.pokemonIds.map((id) => pokemonById[id]).filter(Boolean)
            const difficulty = difficultyOf(trainerTeam)
            const beaten = defeated.includes(trainer.id)
            return (
              <div key={trainer.id} className="opponent">
                <span className="opponent-avatar">{trainer.name.charAt(0)}</span>
                <div className="opponent-info">
                  <strong>
                    {trainer.name} {beaten && <Trophy size={14} className="trophy" />}
                  </strong>
                  <span className={`difficulty ${difficulty.toLowerCase()}`}>{difficulty}</span>
                </div>
                <div className="opponent-team">
                  {trainerTeam.map((p) => (
                    <img key={p.id} src={imageUrl(p.id)} alt={p.name} title={p.name} loading="lazy" />
                  ))}
                </div>
                <button
                  className="pill-btn fight-btn"
                  disabled={team.length === 0}
                  onClick={() => onChallenge(trainer)}
                  aria-label={`Desafiar ${trainer.name}`}
                >
                  <Swords size={16} />
                  <span>Lutar</span>
                </button>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default TeamView

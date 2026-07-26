import { ArrowUpRight } from 'lucide-react'

function initials(name = '') {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function FighterCard({ fighter, rank, onSelect }) {
  const total = fighter.wins + fighter.losses + fighter.draws
  const winRate = total ? Math.round((fighter.wins / total) * 100) : 0

  return (
    <button className="fighter-card" onClick={() => onSelect(fighter)}>
      <div className="fighter-card__topline">
        <span className="fighter-rank">#{String(rank).padStart(2, '0')}</span>
        <span className="stance-tag">{fighter.stance || 'Unknown stance'}</span>
        <ArrowUpRight size={18} />
      </div>

      <div className="fighter-avatar" data-initials={initials(fighter.fullName)}>
        <span>{initials(fighter.fullName)}</span>
      </div>

      <div className="fighter-card__identity">
        {fighter.nickname && <p>“{fighter.nickname}”</p>}
        <h3>{fighter.fullName}</h3>
        <span>{fighter.weight || 'Weight unlisted'}</span>
      </div>

      <div className="fighter-card__stats">
        <div>
          <strong>{fighter.wins}</strong>
          <span>Wins</span>
        </div>
        <div>
          <strong>{fighter.losses}</strong>
          <span>Losses</span>
        </div>
        <div>
          <strong>{winRate}%</strong>
          <span>Win rate</span>
        </div>
      </div>
    </button>
  )
}

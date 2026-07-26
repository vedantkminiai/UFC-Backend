import { Edit3, ExternalLink, Ruler, Shield, Trash2, Weight, X } from 'lucide-react'

function Stat({ label, value, suffix = '' }) {
  return (
    <div className="detail-stat">
      <span>{label}</span>
      <strong>{value ?? '—'}{value !== null && value !== undefined ? suffix : ''}</strong>
    </div>
  )
}

export default function FighterPanel({ fighter, onClose, onEdit, onDelete }) {
  if (!fighter) return null

  return (
    <div className="panel-backdrop" onMouseDown={onClose}>
      <aside className="fighter-panel" onMouseDown={(event) => event.stopPropagation()}>
        <button className="icon-button panel-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="panel-hero">
          <span className="eyebrow">Fighter profile</span>
          <p>{fighter.nickname ? `“${fighter.nickname}”` : 'UFC Zone athlete'}</p>
          <h2>{fighter.fullName}</h2>
          <div className="record-lockup">
            <strong>{fighter.wins}</strong>
            <span>—</span>
            <strong>{fighter.losses}</strong>
            <span>—</span>
            <strong>{fighter.draws}</strong>
            <small>W &nbsp;&nbsp;&nbsp;&nbsp; L &nbsp;&nbsp;&nbsp;&nbsp; D</small>
          </div>
        </div>

        <div className="physical-grid">
          <div><Ruler size={18} /><span>Height</span><strong>{fighter.height || '—'}</strong></div>
          <div><Weight size={18} /><span>Weight</span><strong>{fighter.weight || '—'}</strong></div>
          <div><Shield size={18} /><span>Stance</span><strong>{fighter.stance || '—'}</strong></div>
        </div>

        <section className="panel-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Performance</span>
              <h3>Fight metrics</h3>
            </div>
            <span>Career averages</span>
          </div>
          <div className="metrics-grid">
            <Stat label="Strikes landed / min" value={fighter.slpm} />
            <Stat label="Strike accuracy" value={fighter.strAcc} />
            <Stat label="Strikes absorbed / min" value={fighter.sapm} />
            <Stat label="Strike defense" value={fighter.strDef} />
            <Stat label="Takedown average" value={fighter.tdAvg} />
            <Stat label="Submission average" value={fighter.subAvg} />
          </div>
        </section>

        <div className="panel-actions">
          <button className="button button--light" onClick={() => onEdit(fighter)}>
            <Edit3 size={17} /> Edit fighter
          </button>
          {fighter.url && (
            <a className="button button--ghost" href={fighter.url} target="_blank" rel="noreferrer">
              <ExternalLink size={17} /> Source
            </a>
          )}
          <button className="icon-button icon-button--danger" onClick={() => onDelete(fighter)}>
            <Trash2 size={18} />
          </button>
        </div>
      </aside>
    </div>
  )
}

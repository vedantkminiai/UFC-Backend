import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowDown,
  Crosshair,
  Gauge,
  Medal,
  ShieldCheck,
  Swords,
  Target,
  Trophy,
} from 'lucide-react'

function numberFrom(value) {
  if (value === null || value === undefined || value === '') return null
  const parsed = Number.parseFloat(String(value).replace(/[^0-9.-]/g, ''))
  return Number.isFinite(parsed) ? parsed : null
}

function winRate(fighter) {
  const totalFights = fighter.wins + fighter.losses + fighter.draws
  return totalFights ? (fighter.wins / totalFights) * 100 : null
}

const categories = [
  {
    id: 'wins',
    label: 'Wins',
    shortLabel: 'Wins',
    description: 'Most career victories',
    icon: Trophy,
    value: (fighter) => fighter.wins,
    format: (value) => String(value),
  },
  {
    id: 'losses',
    label: 'Losses',
    shortLabel: 'Losses',
    description: 'Most recorded losses',
    icon: ArrowDown,
    value: (fighter) => fighter.losses,
    format: (value) => String(value),
  },
  {
    id: 'win-rate',
    label: 'Win rate',
    shortLabel: 'Win %',
    description: 'Highest career win percentage',
    icon: Medal,
    value: winRate,
    format: (value) => `${value.toFixed(1)}%`,
  },
  {
    id: 'slpm',
    label: 'Strikes landed',
    shortLabel: 'SLpM',
    description: 'Significant strikes landed per minute',
    icon: Swords,
    value: (fighter) => numberFrom(fighter.slpm),
    format: (value) => value.toFixed(2),
  },
  {
    id: 'str-acc',
    label: 'Strike accuracy',
    shortLabel: 'Str. acc.',
    description: 'Highest significant strike accuracy',
    icon: Target,
    value: (fighter) => numberFrom(fighter.strAcc),
    format: (value) => `${value.toFixed(0)}%`,
  },
  {
    id: 'sapm',
    label: 'Strike absorption',
    shortLabel: 'SApM',
    description: 'Fewest significant strikes absorbed per minute',
    icon: ShieldCheck,
    value: (fighter) => numberFrom(fighter.sapm),
    format: (value) => value.toFixed(2),
    ascending: true,
  },
  {
    id: 'str-def',
    label: 'Strike defense',
    shortLabel: 'Str. def.',
    description: 'Highest significant strike defense',
    icon: ShieldCheck,
    value: (fighter) => numberFrom(fighter.strDef),
    format: (value) => `${value.toFixed(0)}%`,
  },
  {
    id: 'td-avg',
    label: 'Takedown average',
    shortLabel: 'TD avg.',
    description: 'Most takedowns landed per 15 minutes',
    icon: Activity,
    value: (fighter) => numberFrom(fighter.tdAvg),
    format: (value) => value.toFixed(2),
  },
  {
    id: 'td-acc',
    label: 'Takedown accuracy',
    shortLabel: 'TD acc.',
    description: 'Highest successful takedown percentage',
    icon: Crosshair,
    value: (fighter) => numberFrom(fighter.tdAcc),
    format: (value) => `${value.toFixed(0)}%`,
  },
  {
    id: 'td-def',
    label: 'Takedown defense',
    shortLabel: 'TD def.',
    description: 'Highest takedown defense percentage',
    icon: ShieldCheck,
    value: (fighter) => numberFrom(fighter.tdDef),
    format: (value) => `${value.toFixed(0)}%`,
  },
  {
    id: 'sub-avg',
    label: 'Submission average',
    shortLabel: 'Sub. avg.',
    description: 'Most submission attempts per 15 minutes',
    icon: Gauge,
    value: (fighter) => numberFrom(fighter.subAvg),
    format: (value) => value.toFixed(2),
  },
  {
    id: 'reach',
    label: 'Reach',
    shortLabel: 'Reach',
    description: 'Longest listed reach',
    icon: Crosshair,
    value: (fighter) => numberFrom(fighter.reach),
    format: (value) => `${value.toFixed(0)}"`,
  },
]

function RankingRow({ entry, rank, category, onSelect }) {
  return (
    <button className="leader-row" onClick={() => onSelect(entry.fighter)}>
      <span className={`leader-position leader-position--${rank}`}>{String(rank).padStart(2, '0')}</span>
      <span className="leader-name">
        <strong>{entry.fighter.fullName}</strong>
        <small>
          {entry.fighter.wins}-{entry.fighter.losses}-{entry.fighter.draws}
          {entry.fighter.stance && ` · ${entry.fighter.stance}`}
        </small>
      </span>
      <span className="leader-weight">{entry.fighter.weight || '—'}</span>
      <strong className="leader-value">{category.format(entry.value)}</strong>
    </button>
  )
}

export default function StatLeaders({ fighters, loading, onSelect }) {
  const [activeCategoryId, setActiveCategoryId] = useState('wins')
  const activeCategory =
    categories.find((category) => category.id === activeCategoryId) || categories[0]

  const rankings = useMemo(
    () =>
      fighters
        .map((fighter) => ({ fighter, value: activeCategory.value(fighter) }))
        .filter((entry) => entry.value !== null && Number.isFinite(entry.value))
        .sort((first, second) =>
          activeCategory.ascending
            ? first.value - second.value
            : second.value - first.value,
        )
        .slice(0, 10),
    [activeCategory, fighters],
  )

  const ActiveIcon = activeCategory.icon

  return (
    <main className="leaders-page">
      <section className="leaders-hero">
        <div>
          <span className="eyebrow">Performance rankings</span>
          <h1>Stat<br /><em>leaders.</em></h1>
        </div>
        <p>
          Compare the athletes setting the pace across every major fight metric
          in the UFC Zone database.
        </p>
      </section>

      <section className="leaders-content">
        <div className="category-strip" aria-label="Statistic categories">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                className={category.id === activeCategory.id ? 'category-card active' : 'category-card'}
                onClick={() => setActiveCategoryId(category.id)}
              >
                <Icon size={18} />
                <span>{category.shortLabel}</span>
              </button>
            )
          })}
        </div>

        <div className="leader-board">
          <div className="leader-board__heading">
            <div className="leader-board__icon"><ActiveIcon size={25} /></div>
            <div>
              <span className="eyebrow">Top 10</span>
              <h2>{activeCategory.label}</h2>
              <p>{activeCategory.description}</p>
            </div>
            <span className="leader-count">{rankings.length} ranked athletes</span>
          </div>

          <div className="leader-table-head">
            <span>Rank</span>
            <span>Fighter</span>
            <span>Weight</span>
            <span>{activeCategory.shortLabel}</span>
          </div>

          <div className="leader-list" key={activeCategory.id}>
            {loading ? (
              [1, 2, 3, 4, 5].map((rank) => <div className="leader-row leader-row--loading" key={rank} />)
            ) : rankings.length ? (
              rankings.map((entry, index) => (
                <RankingRow
                  key={entry.fighter.fullName}
                  entry={entry}
                  rank={index + 1}
                  category={activeCategory}
                  onSelect={onSelect}
                />
              ))
            ) : (
              <div className="leaders-empty">
                <ActiveIcon size={30} />
                <strong>No ranking data available</strong>
                <span>This statistic is missing from the current fighter records.</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

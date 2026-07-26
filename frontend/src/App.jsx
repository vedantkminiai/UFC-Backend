import { useEffect, useMemo, useState } from 'react'
import {
  ChevronDown,
  Menu,
  Plus,
  Search,
  SlidersHorizontal,
  Swords,
  Trophy,
  Users,
  X,
} from 'lucide-react'
import { fighterApi } from './api/fighters'
import BrandMark from './components/BrandMark'
import FighterCard from './components/FighterCard'
import FighterForm from './components/FighterForm'
import FighterPanel from './components/FighterPanel'

const read = (fighter, snake, camel = snake) => fighter[snake] ?? fighter[camel]

function normalizeFighter(fighter) {
  return {
    raw: fighter,
    fullName: read(fighter, 'full_name', 'fullName') || 'Unknown fighter',
    firstName: read(fighter, 'first_name', 'firstName') || '',
    nickname: fighter.nickname || '',
    height: fighter.height || '',
    weight: fighter.weight || '',
    reach: fighter.reach || '',
    stance: fighter.stance || '',
    wins: Number(fighter.wins || 0),
    losses: Number(fighter.losses || 0),
    draws: Number(fighter.draws || 0),
    belt: fighter.belt || '',
    slpm: fighter.slpm ?? null,
    strAcc: read(fighter, 'str_acc', 'strAcc') ?? null,
    sapm: fighter.sapm ?? null,
    strDef: read(fighter, 'str_def', 'strDef') ?? null,
    tdAvg: read(fighter, 'td_avg', 'tdAvg') ?? null,
    tdAcc: read(fighter, 'td_acc', 'tdAcc') ?? null,
    tdDef: read(fighter, 'td_def', 'tdDef') ?? null,
    subAvg: read(fighter, 'sub_avg', 'subAvg') ?? null,
    url: fighter.url || '',
  }
}

export default function App() {
  const [fighters, setFighters] = useState([])
  const [search, setSearch] = useState('')
  const [stance, setStance] = useState('All stances')
  const [weight, setWeight] = useState('All weights')
  const [selected, setSelected] = useState(null)
  const [editing, setEditing] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  async function loadFighters() {
    try {
      setLoading(true)
      setError('')
      const data = await fighterApi.getAll()
      setFighters(data.map(normalizeFighter))
    } catch (requestError) {
      setError(requestError.message || 'Could not connect to the UFC backend.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFighters()
  }, [])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setSelected(null)
        setFormOpen(false)
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const stances = useMemo(
    () => ['All stances', ...new Set(fighters.map((fighter) => fighter.stance).filter(Boolean))],
    [fighters],
  )
  const weights = useMemo(
    () => ['All weights', ...new Set(fighters.map((fighter) => fighter.weight).filter(Boolean))],
    [fighters],
  )

  const visibleFighters = useMemo(() => {
    const query = search.toLowerCase().trim()
    return fighters.filter((fighter) => {
      const matchesSearch =
        !query ||
        fighter.fullName.toLowerCase().includes(query) ||
        fighter.nickname.toLowerCase().includes(query)
      const matchesStance = stance === 'All stances' || fighter.stance === stance
      const matchesWeight = weight === 'All weights' || fighter.weight === weight
      return matchesSearch && matchesStance && matchesWeight
    })
  }, [fighters, search, stance, weight])

  const totalWins = fighters.reduce((sum, fighter) => sum + fighter.wins, 0)
  const dominantStance =
    Object.entries(
      fighters.reduce((counts, fighter) => {
        if (fighter.stance) counts[fighter.stance] = (counts[fighter.stance] || 0) + 1
        return counts
      }, {}),
    ).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'

  function openCreate() {
    setEditing(null)
    setFormOpen(true)
  }

  function openEdit(fighter) {
    setSelected(null)
    setEditing(fighter)
    setFormOpen(true)
  }

  async function saveFighter(payload) {
    try {
      setSaving(true)
      setError('')
      if (editing) await fighterApi.update(payload)
      else await fighterApi.create(payload)
      setFormOpen(false)
      setEditing(null)
      await loadFighters()
    } catch (requestError) {
      setError(requestError.message || 'Unable to save this fighter.')
    } finally {
      setSaving(false)
    }
  }

  async function deleteFighter(fighter) {
    const confirmed = window.confirm(`Remove ${fighter.fullName} from the roster?`)
    if (!confirmed) return
    try {
      setError('')
      await fighterApi.remove(fighter.fullName)
      setSelected(null)
      await loadFighters()
    } catch (requestError) {
      setError(requestError.message || 'Unable to delete this fighter.')
    }
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <BrandMark />
        <nav className={menuOpen ? 'nav-links nav-links--open' : 'nav-links'}>
          <a className="active" href="#roster">Roster</a>
          <a href="#insights">Insights</a>
          <a href="#about">About</a>
        </nav>
        <button className="button button--red header-cta" onClick={openCreate}>
          <Plus size={17} /> Add fighter
        </button>
        <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        <section className="hero" id="about">
          <div className="hero__texture" />
          <div className="hero__copy">
            <span className="eyebrow">Fighter intelligence platform</span>
            <h1>Every fighter.<br /><em>Every number.</em></h1>
            <p>
              Explore the roster, break down performance, and keep your fighter
              database ready for the next card.
            </p>
            <a className="button button--light" href="#roster">
              Explore the roster <ChevronDown size={18} />
            </a>
          </div>
          <div className="octagon-art" aria-hidden="true">
            <div className="octagon octagon--outer" />
            <div className="octagon octagon--middle" />
            <div className="octagon octagon--inner">
              <Swords size={76} strokeWidth={1.25} />
            </div>
            <span>EST. 2026</span>
          </div>
        </section>

        <section className="overview" id="insights">
          <div className="section-intro">
            <span className="eyebrow">Live database</span>
            <h2>The roster<br />at a glance.</h2>
          </div>
          <div className="overview-stat">
            <Users size={20} />
            <strong>{fighters.length}</strong>
            <span>Fighters tracked</span>
          </div>
          <div className="overview-stat">
            <Trophy size={20} />
            <strong>{totalWins.toLocaleString()}</strong>
            <span>Combined wins</span>
          </div>
          <div className="overview-stat">
            <Swords size={20} />
            <strong className="overview-stat__text">{dominantStance}</strong>
            <span>Dominant stance</span>
          </div>
        </section>

        <section className="roster" id="roster">
          <div className="roster-heading">
            <div>
              <span className="eyebrow">Athlete database</span>
              <h2>Fighter roster</h2>
            </div>
            <p>{visibleFighters.length} of {fighters.length} fighters</p>
          </div>

          <div className="filter-bar">
            <label className="search-box">
              <Search size={19} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by fighter or nickname"
              />
            </label>
            <label className="select-box">
              <SlidersHorizontal size={17} />
              <select value={stance} onChange={(event) => setStance(event.target.value)}>
                {stances.map((option) => <option key={option}>{option}</option>)}
              </select>
              <ChevronDown size={16} />
            </label>
            <label className="select-box">
              <select value={weight} onChange={(event) => setWeight(event.target.value)}>
                {weights.map((option) => <option key={option}>{option}</option>)}
              </select>
              <ChevronDown size={16} />
            </label>
          </div>

          {error && (
            <div className="error-banner">
              <div><strong>Backend connection issue</strong><span>{error}</span></div>
              <button onClick={loadFighters}>Try again</button>
            </div>
          )}

          {loading ? (
            <div className="fighter-grid">
              {[1, 2, 3, 4, 5, 6].map((item) => <div className="fighter-card skeleton" key={item} />)}
            </div>
          ) : visibleFighters.length ? (
            <div className="fighter-grid">
              {visibleFighters.map((fighter, index) => (
                <FighterCard
                  key={fighter.fullName}
                  fighter={fighter}
                  rank={index + 1}
                  onSelect={setSelected}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Swords size={34} />
              <h3>No fighters found</h3>
              <p>Adjust your filters or add a new athlete to the roster.</p>
              <button className="button button--red" onClick={openCreate}><Plus size={17} /> Add fighter</button>
            </div>
          )}
        </section>
      </main>

      <footer>
        <BrandMark />
        <p>Built for fight fans who care about the numbers.</p>
        <span>UFC Zone © 2026</span>
      </footer>

      <FighterPanel
        fighter={selected}
        onClose={() => setSelected(null)}
        onEdit={openEdit}
        onDelete={deleteFighter}
      />
      {formOpen && (
        <FighterForm
          fighter={editing}
          onClose={() => setFormOpen(false)}
          onSubmit={saveFighter}
          busy={saving}
        />
      )}
    </div>
  )
}

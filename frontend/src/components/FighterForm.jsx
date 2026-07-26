import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const emptyFighter = {
  full_name: '',
  first_name: '',
  last_name: '',
  nickname: '',
  height: '',
  weight: '',
  reach: '',
  stance: '',
  dob: '',
  wins: 0,
  losses: 0,
  draws: 0,
  belt: '',
  slpm: 0,
  str_acc: '',
  sapm: 0,
  str_def: '',
  td_avg: 0,
  td_acc: '',
  td_def: '',
  sub_avg: 0,
  url: '',
}

const fieldGroups = [
  {
    title: 'Identity',
    fields: [
      ['full_name', 'Full name', 'text', true],
      ['nickname', 'Nickname', 'text'],
      ['first_name', 'First name', 'text'],
      ['last_name', 'Last name', 'text'],
    ],
  },
  {
    title: 'Physical profile',
    fields: [
      ['height', 'Height', 'text'],
      ['weight', 'Weight', 'text'],
      ['reach', 'Reach', 'text'],
      ['stance', 'Stance', 'text'],
      ['dob', 'Date of birth', 'text'],
      ['belt', 'Belt', 'text'],
    ],
  },
  {
    title: 'Record & performance',
    fields: [
      ['wins', 'Wins', 'number'],
      ['losses', 'Losses', 'number'],
      ['draws', 'Draws', 'number'],
      ['slpm', 'Strikes landed / min', 'number'],
      ['str_acc', 'Strike accuracy', 'text'],
      ['sapm', 'Strikes absorbed / min', 'number'],
      ['str_def', 'Strike defense', 'text'],
      ['td_avg', 'Takedown average', 'number'],
      ['td_acc', 'Takedown accuracy', 'text'],
      ['td_def', 'Takedown defense', 'text'],
      ['sub_avg', 'Submission average', 'number'],
      ['url', 'Source URL', 'url'],
    ],
  },
]

export default function FighterForm({ fighter, onClose, onSubmit, busy }) {
  const [form, setForm] = useState(emptyFighter)

  useEffect(() => {
    setForm(fighter ? { ...emptyFighter, ...fighter.raw } : emptyFighter)
  }, [fighter])

  function handleChange(event) {
    const { name, value, type } = event.target
    setForm((current) => ({ ...current, [name]: type === 'number' ? Number(value) : value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(form)
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="fighter-form" onMouseDown={(event) => event.stopPropagation()}>
        <div className="form-header">
          <div>
            <span className="eyebrow">{fighter ? 'Update roster' : 'New signing'}</span>
            <h2>{fighter ? 'Edit fighter' : 'Add a fighter'}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {fieldGroups.map((group) => (
            <fieldset key={group.title}>
              <legend>{group.title}</legend>
              <div className="form-grid">
                {group.fields.map(([name, label, type, required]) => (
                  <label key={name}>
                    <span>{label}</span>
                    <input
                      name={name}
                      type={type}
                      value={form[name]}
                      onChange={handleChange}
                      required={required}
                      step={type === 'number' ? 'any' : undefined}
                      disabled={fighter && name === 'full_name'}
                    />
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <div className="form-actions">
            <button type="button" className="button button--ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="button button--red" disabled={busy}>
              {busy ? 'Saving…' : fighter ? 'Save changes' : 'Add to roster'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

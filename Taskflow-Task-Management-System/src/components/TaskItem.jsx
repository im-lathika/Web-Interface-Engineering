import { useState } from 'react'
import { uid, today, REP } from '../utils'

export default function TaskItem({ t, onToggle, onPatch, onDelete, draggable, onDragStart, onDrop }) {
  const [editing, setEditing] = useState(false)
  const [sub, setSub] = useState('')
  const overdue = !t.done && t.due && t.due < today()
  const subDone = t.subs.filter((s) => s.done).length
  const setSubs = (subs) => onPatch(t.id, { subs })

  const saveTitle = (v) => {
    if (v.trim()) onPatch(t.id, { title: v.trim() })
    setEditing(false)
  }

  return (
    <div className={`item ${t.pri} ${t.done ? 'done' : ''}`} draggable={draggable}
      onDragStart={() => onDragStart(t.id)} onDragOver={(e) => e.preventDefault()} onDrop={() => onDrop(t.id)}>
      <div className="row">
        <input type="checkbox" checked={t.done} onChange={() => onToggle(t)} />
        {editing ? (
          <input className="edit" autoFocus defaultValue={t.title}
            onBlur={(e) => saveTitle(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') saveTitle(e.target.value); if (e.key === 'Escape') setEditing(false) }} />
        ) : (
          <span className="title" onClick={() => setEditing(true)}>{t.title}</span>
        )}
        <button className="x" onClick={() => onDelete(t)} aria-label="Delete task">✕</button>
      </div>

      <div className="meta">
        <span className="chip">{t.pri}</span>
        {t.project && <span className="chip">#{t.project}</span>}
        {t.due && <span className={`chip ${overdue ? 'over' : ''}`}>📅 {t.due}{overdue && ' overdue'}</span>}
        {t.subs.length > 0 && <span className="chip">{subDone}/{t.subs.length} subtasks</span>}
        {t.rep && <span className="chip">🔁 {REP[t.rep]}</span>}
      </div>

      <div className="subs">
        {t.subs.map((s) => (
          <div key={s.id} className={`sub ${s.done ? 'done' : ''}`}>
            <input type="checkbox" checked={s.done}
              onChange={() => setSubs(t.subs.map((x) => (x.id === s.id ? { ...x, done: !x.done } : x)))} />
            <span>{s.text}</span>
            <button className="x" onClick={() => setSubs(t.subs.filter((x) => x.id !== s.id))}>✕</button>
          </div>
        ))}
        <input className="subadd" value={sub} placeholder="+ subtask" onChange={(e) => setSub(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && sub.trim()) { setSubs([...t.subs, { id: uid(), text: sub.trim(), done: false }]); setSub('') }
          }} />
      </div>

      <details open={!!t.notes}>
        <summary>📝 Notes</summary>
        <textarea rows="2" value={t.notes || ''} placeholder="Add notes…" onChange={(e) => onPatch(t.id, { notes: e.target.value })} />
      </details>
    </div>
  )
}

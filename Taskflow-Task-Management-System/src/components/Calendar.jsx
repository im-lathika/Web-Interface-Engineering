import { useState } from 'react'
import { ymd, today } from '../utils'

export default function Calendar({ tasks }) {
  const [cur, setCur] = useState(new Date())
  const [sel, setSel] = useState(today())
  const y = cur.getFullYear(), m = cur.getMonth()
  const first = new Date(y, m, 1).getDay()
  const n = new Date(y, m + 1, 0).getDate()
  const move = (k) => setCur(new Date(y, m + k, 1))
  const dayTasks = tasks.filter((t) => t.due === sel)

  return (
    <div>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
        <button className="btn" onClick={() => move(-1)}>◀</button>
        <b>{cur.toLocaleString('en', { month: 'long', year: 'numeric' })}</b>
        <button className="btn" onClick={() => move(1)}>▶</button>
      </div>
      <div className="cal">
        {'SMTWTFS'.split('').map((x, i) => <div key={i} className="dow">{x}</div>)}
        {Array.from({ length: first }, (_, i) => <div key={'e' + i} />)}
        {Array.from({ length: n }, (_, i) => {
          const k = ymd(new Date(y, m, i + 1))
          const c = tasks.filter((t) => t.due === k && !t.done).length
          return (
            <div key={k} className={`cd ${k === sel ? 'sel' : ''} ${k === today() ? 'td' : ''}`} onClick={() => setSel(k)}>
              <b>{i + 1}</b>{c > 0 && <><span className="dot" />{c}</>}
            </div>
          )
        })}
      </div>
      <h3>{sel}</h3>
      {dayTasks.length ? dayTasks.map((t) => (
        <div key={t.id} className={`item ${t.pri} ${t.done ? 'done' : ''}`}><span className="title">{t.title}</span></div>
      )) : <div className="empty">No tasks this day</div>}
    </div>
  )
}

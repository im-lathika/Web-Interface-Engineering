import { ymd, today } from '../utils'

export default function Stats({ tasks }) {
  const done = tasks.filter((t) => t.done).length
  const overdue = tasks.filter((t) => !t.done && t.due && t.due < today()).length
  const days = [...Array(7)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - 6 + i); return d })
  const counts = days.map((d) => tasks.filter((t) => t.doneAt && ymd(new Date(t.doneAt)) === ymd(d)).length)
  const max = Math.max(1, ...counts)

  return (
    <>
      <div className="stats">
        <div className="stat"><b>{tasks.length}</b><span>Total</span></div>
        <div className="stat"><b>{tasks.length - done}</b><span>Active</span></div>
        <div className="stat"><b>{done}</b><span>Done</span></div>
        <div className="stat"><b style={{ color: overdue ? 'var(--hi)' : 'inherit' }}>{overdue}</b><span>Overdue</span></div>
      </div>
      <div className="bar"><div style={{ width: (tasks.length ? (done / tasks.length) * 100 : 0) + '%' }} /></div>
      <div className="chart" title="Completed in the last 7 days">
        {days.map((d, i) => (
          <div key={i} title={counts[i] + ' done'}>
            <i style={{ height: (counts[i] / max) * 40 }} />{'SMTWTFS'[d.getDay()]}
          </div>
        ))}
      </div>
    </>
  )
}

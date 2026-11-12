import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import { uid, today, PR, nextDate } from './utils'
import AddForm from './components/AddForm'
import Stats from './components/Stats'
import TaskItem from './components/TaskItem'
import Calendar from './components/Calendar'
import Pomodoro from './components/Pomodoro'
import Toast from './components/Toast'

const VIEWS = [['all', 'All'], ['active', 'Active'], ['today', 'Due today'], ['upcoming', 'Upcoming'], ['done', 'Done'], ['cal', '📅 Calendar']]

export default function App() {
  const [tasks, setTasks] = useLocalStorage('taskflow.v1', [])
  const [theme, setTheme] = useLocalStorage('taskflow.theme', 'auto')
  const [view, setView] = useState('all')
  const [proj, setProj] = useState('')
  const [sort, setSort] = useState('manual')
  const [q, setQ] = useState('')
  const [toast, setToast] = useState(null)
  const dragId = useRef(null)
  const searchRef = useRef(null)
  const fileRef = useRef(null)

  useEffect(() => {
    const r = document.documentElement
    theme === 'auto' ? delete r.dataset.theme : (r.dataset.theme = theme)
  }, [theme])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && !/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) {
        e.preventDefault(); searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const notify = useCallback((msg, undo) => setToast({ msg, undo }), [])
  const closeToast = useCallback(() => setToast(null), [])

  const add = (t) => setTasks((a) => [t, ...a])
  const patch = (id, ch) => setTasks((a) => a.map((t) => (t.id === id ? { ...t, ...ch } : t)))

  const toggle = (t) => {
    const done = !t.done
    const repeats = done && t.rep && t.due
    setTasks((a) => {
      const i = a.findIndex((x) => x.id === t.id)
      const copy = [...a]
      copy[i] = { ...t, done, doneAt: done ? Date.now() : 0, rep: repeats ? '' : t.rep }
      if (repeats) {
        copy.splice(i, 0, {
          ...t, id: uid(), done: false, doneAt: 0, due: nextDate(t.due, t.rep),
          subs: t.subs.map((s) => ({ ...s, id: uid(), done: false })), created: Date.now(),
        })
      }
      return copy
    })
    if (repeats) notify('Next repeat created for ' + nextDate(t.due, t.rep))
  }

  const remove = (t) => {
    const i = tasks.findIndex((x) => x.id === t.id)
    setTasks((a) => a.filter((x) => x.id !== t.id))
    notify('Task deleted', () => setTasks((a) => { const c = [...a]; c.splice(i, 0, t); return c }))
  }

  const drop = (toId) => {
    const from = tasks.findIndex((t) => t.id === dragId.current)
    const to = tasks.findIndex((t) => t.id === toId)
    if (from < 0 || to < 0 || from === to) return
    setTasks((a) => { const c = [...a]; c.splice(to, 0, c.splice(from, 1)[0]); return c })
  }

  const projects = useMemo(() => [...new Set(tasks.map((t) => t.project).filter(Boolean))], [tasks])

  const list = useMemo(() => {
    const s = q.toLowerCase()
    const a = tasks.filter((t) => {
      if (proj && t.project !== proj) return false
      if (s && !(t.title + ' ' + t.project + ' ' + t.subs.map((x) => x.text).join(' ')).toLowerCase().includes(s)) return false
      if (view === 'active') return !t.done
      if (view === 'done') return t.done
      if (view === 'today') return !t.done && t.due && t.due <= today()
      if (view === 'upcoming') return !t.done && t.due && t.due > today()
      return true
    })
    if (sort === 'due') a.sort((x, y) => ((x.due || '9') > (y.due || '9') ? 1 : -1))
    if (sort === 'pri') a.sort((x, y) => PR[x.pri] - PR[y.pri])
    if (sort === 'new') a.sort((x, y) => y.created - x.created)
    return a
  }, [tasks, view, proj, sort, q])

  const exportJson = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' }))
    Object.assign(document.createElement('a'), { href: url, download: 'tasks.json' }).click()
  }
  const importJson = (e) => {
    const f = e.target.files[0]
    if (!f) return
    const r = new FileReader()
    r.onload = () => {
      try { const d = JSON.parse(r.result); if (Array.isArray(d)) setTasks(d) } catch { alert('Invalid file') }
    }
    r.readAsText(f)
    e.target.value = ''
  }

  const dark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <div className="app">
      <header>
        <h1>✅ Taskflow</h1>
        <span>
          <Pomodoro onDone={notify} />{' '}
          <button className="btn" onClick={() => setTheme(dark ? 'light' : 'dark')}>🌓</button>
        </span>
      </header>

      <Stats tasks={tasks} />
      <AddForm onAdd={add} />

      <div className="tools">
        <input ref={searchRef} placeholder="🔍 Search…  ( / )" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="btn" value={proj} onChange={(e) => setProj(e.target.value)}>
          <option value="">All projects</option>
          {projects.map((p) => <option key={p}>{p}</option>)}
        </select>
        <select className="btn" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="manual">Manual order</option><option value="due">Due date</option>
          <option value="pri">Priority</option><option value="new">Newest</option>
        </select>
      </div>

      <div className="tabs">
        {VIEWS.map(([k, l]) => (
          <button key={k} className={`btn tab ${view === k ? 'on' : ''}`} onClick={() => setView(k)}>{l}</button>
        ))}
      </div>
      <div style={{ height: 12 }} />

      {view === 'cal' ? <Calendar tasks={tasks} /> : list.length ? list.map((t) => (
        <TaskItem key={t.id} t={t} onToggle={toggle} onPatch={patch} onDelete={remove}
          draggable={sort === 'manual'} onDragStart={(id) => (dragId.current = id)} onDrop={drop} />
      )) : <div className="empty">Nothing here yet 🎉</div>}

      <footer>
        <button className="btn" onClick={() => setTasks((a) => a.filter((t) => !t.done))}>Clear completed</button>
        <button className="btn" onClick={exportJson}>Export</button>
        <button className="btn" onClick={() => fileRef.current.click()}>Import</button>
        <input ref={fileRef} type="file" accept=".json" hidden onChange={importJson} />
      </footer>
      <Toast toast={toast} onClose={closeToast} />
    </div>
  )
}

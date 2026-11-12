import { useState } from 'react'
import { uid } from '../utils'

export default function AddForm({ onAdd }) {
  const [text, setText] = useState('')
  const [pri, setPri] = useState('medium')
  const [due, setDue] = useState('')
  const [rep, setRep] = useState('')

  const submit = () => {
    let title = text.trim()
    if (!title) return
    let project = ''
    const m = title.match(/#(\w+)/)
    if (m) { project = m[1]; title = title.replace(m[0], '').trim() || project }
    onAdd({ id: uid(), title, pri, due, rep, notes: '', project, done: false, doneAt: 0, subs: [], created: Date.now() })
    setText(''); setDue('')
  }

  return (
    <div className="add">
      <input type="text" value={text} autoFocus placeholder="Add a task… (use #project)"
        onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()} />
      <select value={pri} onChange={(e) => setPri(e.target.value)}>
        <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
      </select>
      <input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
      <select value={rep} onChange={(e) => setRep(e.target.value)}>
        <option value="">No repeat</option><option value="d">Daily</option><option value="w">Weekly</option><option value="m">Monthly</option>
      </select>
      <button className="btn pri" onClick={submit}>Add</button>
    </div>
  )
}

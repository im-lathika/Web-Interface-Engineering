import { useState, useEffect } from 'react'

const FULL = 1500
export default function Pomodoro({ onDone }) {
  const [left, setLeft] = useState(FULL)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setLeft((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [running])

  useEffect(() => {
    if (left <= 0) {
      setRunning(false); setLeft(FULL)
      onDone('Focus session done! Take a 5 minute break 🎉')
      try { navigator.vibrate && navigator.vibrate(300) } catch {}
    }
  }, [left, onDone])

  const reset = () => { setRunning(false); setLeft(FULL) }
  const label = Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0')
  return (
    <button className="btn" onClick={() => (running ? reset() : setRunning(true))}
      title={running ? 'Click to stop' : 'Start 25 minute focus'}>🍅 {label}</button>
  )
}

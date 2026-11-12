import { useEffect } from 'react'

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return
    const id = setTimeout(onClose, 4000)
    return () => clearTimeout(id)
  }, [toast, onClose])
  if (!toast) return null
  return (
    <div id="toast">
      {toast.msg}
      {toast.undo && <button onClick={() => { toast.undo(); onClose() }}>Undo</button>}
    </div>
  )
}

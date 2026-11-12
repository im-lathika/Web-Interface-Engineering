export const uid = () => Math.random().toString(36).slice(2, 9)
export const ymd = (d) =>
  d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')
export const today = () => ymd(new Date())
export const PR = { high: 0, medium: 1, low: 2 }
export const REP = { d: 'daily', w: 'weekly', m: 'monthly' }
export function nextDate(due, rep) {
  const d = new Date(due + 'T00:00')
  if (rep === 'd') d.setDate(d.getDate() + 1)
  else if (rep === 'w') d.setDate(d.getDate() + 7)
  else d.setMonth(d.getMonth() + 1)
  return ymd(d)
}

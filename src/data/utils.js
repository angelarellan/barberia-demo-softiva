export function formatPrice(value) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDateLong(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`)
  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date)
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function pad(n) {
  return String(n).padStart(2, '0')
}

export function getMonthLabel(year, month) {
  return new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric' }).format(
    new Date(year, month, 1),
  )
}

// Devuelve una grilla de semanas (lunes a domingo) para el mes dado, con
// `null` en los días de relleno antes del 1° y después del último día.
export function getMonthCells(year, month) {
  const firstDay = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startOffset = (firstDay.getDay() + 6) % 7
  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ day, iso: `${year}-${pad(month + 1)}-${pad(day)}` })
  }
  return cells
}

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

export function getNextDays(count = 7) {
  const days = []
  const today = new Date()
  for (let i = 0; i < count; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push({
      iso: d.toISOString().slice(0, 10),
      weekday: new Intl.DateTimeFormat('es-AR', { weekday: 'short' }).format(d),
      day: d.getDate(),
      month: new Intl.DateTimeFormat('es-AR', { month: 'short' }).format(d),
    })
  }
  return days
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

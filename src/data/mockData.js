import { Scissors, Sparkles, Brush } from 'lucide-react'

export const SERVICES = [
  {
    id: 'corte',
    name: 'Corte',
    description: 'Corte clásico o moderno, incluye lavado y styling.',
    price: 14000,
    duration: 30,
    icon: Scissors,
  },
  {
    id: 'barba',
    name: 'Barba',
    description: 'Perfilado y afeitado premium con toalla caliente.',
    price: 12000,
    duration: 20,
    icon: Brush,
  },
  {
    id: 'combo',
    name: 'Combo',
    description: 'Corte + Barba. La experiencia completa.',
    price: 24000,
    duration: 45,
    icon: Sparkles,
  },
]

export const BARBERS = [
  {
    id: 'lucas',
    name: 'Lucas Medina',
    role: 'Especialista en fade y diseño',
    initials: 'LM',
  },
  {
    id: 'nico',
    name: 'Nicolás Ferreyra',
    role: 'Experto en barba y afeitado clásico',
    initials: 'NF',
  },
  {
    id: 'santi',
    name: 'Santiago Roldán',
    role: 'Cortes modernos y color',
    initials: 'SR',
  },
]

export const TIME_SLOTS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
]

// Turnos ocupados de ejemplo para simular disponibilidad real
export const BOOKED_SLOTS = {
  lucas: ['10:00', '10:30', '16:00'],
  nico: ['09:30', '15:00', '15:30', '18:00'],
  santi: ['11:00', '17:00', '17:30'],
}

export const SEED_APPOINTMENTS = [
  {
    id: 'seed-1',
    clientName: 'Martín Gómez',
    clientPhone: '351 555 0142',
    serviceId: 'combo',
    barberId: 'lucas',
    date: new Date().toISOString().slice(0, 10),
    time: '10:00',
    reminderSent: false,
  },
  {
    id: 'seed-2',
    clientName: 'Facundo Ríos',
    clientPhone: '351 555 0198',
    serviceId: 'barba',
    barberId: 'nico',
    date: new Date().toISOString().slice(0, 10),
    time: '15:00',
    reminderSent: true,
  },
  {
    id: 'seed-3',
    clientName: 'Bruno Aguirre',
    clientPhone: '351 555 0163',
    serviceId: 'corte',
    barberId: 'santi',
    date: new Date().toISOString().slice(0, 10),
    time: '17:00',
    reminderSent: false,
  },
]

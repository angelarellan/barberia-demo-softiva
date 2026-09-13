import { Activity, Sparkles, Eye, Stethoscope } from 'lucide-react'

export const SERVICES = [
  {
    id: 'kinesiologia',
    name: 'Consulta Kinesiología / Fisioterapia',
    description: 'Evaluación y sesión de tratamiento kinesiológico personalizado.',
    price: 8000,
    deposit: 3000,
    duration: 40,
    icon: Activity,
  },
  {
    id: 'limpieza-facial',
    name: 'Limpieza Facial Profunda',
    description: 'Limpieza profesional de cutis con hidratación y masaje final.',
    price: 12000,
    deposit: 4000,
    duration: 50,
    icon: Sparkles,
  },
  {
    id: 'cejas-pestanas',
    name: 'Perfilado de Cejas / Pestañas',
    description: 'Diseño y perfilado de cejas o lifting de pestañas.',
    price: 6000,
    deposit: 2000,
    duration: 30,
    icon: Eye,
  },
  {
    id: 'consulta-general',
    name: 'Consulta General / Diagnóstico',
    description: 'Consulta con profesional para evaluación y diagnóstico general.',
    price: 7000,
    deposit: 2500,
    duration: 30,
    icon: Stethoscope,
  },
]

export const SEED_PROFESSIONALS = [
  {
    id: 'lucas',
    name: 'Dr. Lucas Medina',
    role: 'Kinesiólogo / Fisioterapeuta',
    status: 'active',
  },
  {
    id: 'nico',
    name: 'Lic. Nicolás Ferreyra',
    role: 'Especialista en Estética Facial',
    status: 'active',
  },
  {
    id: 'santi',
    name: 'Dr. Santiago Roldán',
    role: 'Médico Clínico General',
    status: 'active',
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
  lucas: ['10:30', '16:00'],
  nico: ['09:30', '15:30', '18:00'],
  santi: ['11:00', '17:30'],
}

export const SEED_APPOINTMENTS = [
  {
    id: 'seed-1',
    clientName: 'Martín Gómez',
    clientPhone: '351 555 0142',
    serviceId: 'kinesiologia',
    barberId: 'lucas',
    date: new Date().toISOString().slice(0, 10),
    time: '10:00',
    reminderSent: false,
  },
  {
    id: 'seed-2',
    clientName: 'Facundo Ríos',
    clientPhone: '351 555 0198',
    serviceId: 'limpieza-facial',
    barberId: 'nico',
    date: new Date().toISOString().slice(0, 10),
    time: '15:00',
    reminderSent: true,
  },
  {
    id: 'seed-3',
    clientName: 'Bruno Aguirre',
    clientPhone: '351 555 0163',
    serviceId: 'consulta-general',
    barberId: 'santi',
    date: new Date().toISOString().slice(0, 10),
    time: '17:00',
    reminderSent: false,
  },
]

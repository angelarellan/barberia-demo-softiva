import { useEffect, useMemo, useRef, useState } from 'react'
import {
  CalendarDays,
  Users,
  Wallet,
  Send,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Ban,
} from 'lucide-react'
import { SERVICES, BARBERS } from '../data/mockData'
import { formatPrice, todayISO } from '../data/utils'

function findService(id) {
  return SERVICES.find((s) => s.id === id)
}
function findBarber(id) {
  return BARBERS.find((b) => b.id === id)
}

export default function AdminPanel({ appointments, onSendReminder, onCancelAppointment }) {
  const [sendingId, setSendingId] = useState(null)
  const today = todayISO()

  const todayAppointments = useMemo(
    () =>
      appointments
        .filter((a) => a.date === today)
        .sort((a, b) => a.time.localeCompare(b.time)),
    [appointments, today],
  )

  const activeAppointments = useMemo(
    () => todayAppointments.filter((a) => a.status !== 'cancelled'),
    [todayAppointments],
  )

  const totalIncome = activeAppointments.reduce((sum, a) => {
    const service = findService(a.serviceId)
    return sum + (service?.price ?? 0)
  }, 0)

  function handleSendReminder(id) {
    setSendingId(id)
    setTimeout(() => {
      onSendReminder(id)
      setSendingId(null)
    }, 700)
  }

  function handleCancelAppointment(id, clientName) {
    const confirmed = window.confirm(
      `¿Confirmás cancelar el turno de ${clientName}? Se liberará el horario.`,
    )
    if (!confirmed) return
    onCancelAppointment(id)
  }

  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  function updateScrollState() {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollState()
    document.fonts?.ready?.then(updateScrollState)
    el.addEventListener('scroll', updateScrollState)
    const resizeObserver = new ResizeObserver(updateScrollState)
    resizeObserver.observe(el)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      resizeObserver.disconnect()
    }
  }, [todayAppointments.length])

  function scrollByAmount(direction) {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: 'smooth' })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-white">
          Panel Admin
        </h1>
        <p className="mt-1 text-sm text-white/55">
          Turnos de hoy y simulador de recordatorios por WhatsApp.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 text-white/55">
            <CalendarDays size={15} aria-hidden="true" />
            <span className="text-xs uppercase tracking-wide">Turnos hoy</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">
            {activeAppointments.length}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 text-white/55">
            <Users size={15} aria-hidden="true" />
            <span className="text-xs uppercase tracking-wide">Profesionales activos</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">{BARBERS.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 text-white/55">
            <Wallet size={15} aria-hidden="true" />
            <span className="text-xs uppercase tracking-wide">Ingresos estimados</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-indigo-300">
            {formatPrice(totalIncome)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => scrollByAmount(-1)}
          disabled={!canScrollLeft}
          aria-label="Ver columnas anteriores"
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition hover:border-white/25 hover:text-white disabled:pointer-events-none disabled:opacity-0"
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </button>
        <div
          ref={scrollRef}
          className="overflow-x-auto rounded-2xl border border-white/10"
        >
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-white/[0.04] text-xs uppercase tracking-wide text-white/55">
              <th className="px-4 py-3 font-medium">Hora</th>
              <th className="px-4 py-3 font-medium">Cliente</th>
              <th className="px-4 py-3 font-medium">Servicio</th>
              <th className="px-4 py-3 font-medium">Profesional</th>
              <th className="px-4 py-3 font-medium">Recordatorio</th>
              <th className="px-4 py-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {todayAppointments.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-sm text-white/55"
                >
                  No hay turnos agendados para hoy todavía.
                </td>
              </tr>
            )}
            {todayAppointments.map((appointment) => {
              const service = findService(appointment.serviceId)
              const barber = findBarber(appointment.barberId)
              const isSending = sendingId === appointment.id
              const isCancelled = appointment.status === 'cancelled'
              return (
                <tr
                  key={appointment.id}
                  className={`border-t border-white/5 text-white/70 ${isCancelled ? 'line-through decoration-white/30' : ''}`}
                >
                  <td className="px-4 py-3 font-semibold text-white">
                    {appointment.time}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">
                      {appointment.clientName}
                    </div>
                    <div className="text-xs text-white/55">
                      {appointment.clientPhone}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5">
                      {service?.icon && (
                        <service.icon size={12} className="text-indigo-400" aria-hidden="true" />
                      )}
                      {service?.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">{barber?.name}</td>
                  <td className="px-4 py-3">
                    {isCancelled ? (
                      <span className="text-xs text-white/40">—</span>
                    ) : appointment.reminderSent ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                        <CheckCheck size={14} aria-hidden="true" />
                        Enviado
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSendReminder(appointment.id)}
                        disabled={isSending}
                        aria-label={`Simular recordatorio de WhatsApp para ${appointment.clientName}`}
                        className="flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1.5 text-xs font-medium text-indigo-300 transition hover:bg-indigo-400/20 disabled:opacity-50"
                      >
                        <Send size={12} aria-hidden="true" />
                        {isSending ? 'Enviando...' : 'Simular recordatorio'}
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {isCancelled ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-red-400">
                        <Ban size={14} aria-hidden="true" />
                        Cancelado
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleCancelAppointment(appointment.id, appointment.clientName)}
                        aria-label={`Cancelar turno de ${appointment.clientName}`}
                        className="flex items-center gap-1.5 rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1.5 text-xs font-medium text-red-300 transition hover:bg-red-400/20"
                      >
                        <Ban size={12} aria-hidden="true" />
                        Cancelar
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        </div>
        <button
          type="button"
          onClick={() => scrollByAmount(1)}
          disabled={!canScrollRight}
          aria-label="Ver columnas siguientes"
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition hover:border-white/25 hover:text-white disabled:pointer-events-none disabled:opacity-0"
        >
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

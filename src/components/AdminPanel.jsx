import { useMemo, useState } from 'react'
import {
  CalendarDays,
  Users,
  Wallet,
  Send,
  CheckCheck,
} from 'lucide-react'
import { SERVICES, BARBERS } from '../data/mockData'
import { formatPrice, todayISO } from '../data/utils'

function findService(id) {
  return SERVICES.find((s) => s.id === id)
}
function findBarber(id) {
  return BARBERS.find((b) => b.id === id)
}

export default function AdminPanel({ appointments, onSendReminder }) {
  const [sendingId, setSendingId] = useState(null)
  const today = todayISO()

  const todayAppointments = useMemo(
    () =>
      appointments
        .filter((a) => a.date === today)
        .sort((a, b) => a.time.localeCompare(b.time)),
    [appointments, today],
  )

  const totalIncome = todayAppointments.reduce((sum, a) => {
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
            {todayAppointments.length}
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

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-white/[0.04] text-xs uppercase tracking-wide text-white/55">
              <th className="px-4 py-3 font-medium">Hora</th>
              <th className="px-4 py-3 font-medium">Cliente</th>
              <th className="px-4 py-3 font-medium">Servicio</th>
              <th className="px-4 py-3 font-medium">Profesional</th>
              <th className="px-4 py-3 font-medium">Recordatorio</th>
            </tr>
          </thead>
          <tbody>
            {todayAppointments.length === 0 && (
              <tr>
                <td
                  colSpan={5}
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
              return (
                <tr
                  key={appointment.id}
                  className="border-t border-white/5 text-white/70"
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
                    {appointment.reminderSent ? (
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
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

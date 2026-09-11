import { Scissors, User, CalendarDays, Clock } from 'lucide-react'
import { formatPrice, formatDateLong } from '../data/utils'

export default function BookingSummary({ service, barber, date, time }) {
  if (!service && !barber && !date && !time) return null

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/55">
        Resumen de tu turno
      </p>
      <ul className="flex flex-col gap-2.5 text-sm">
        {service && (
          <li className="flex items-center justify-between gap-2 text-white/70">
            <span className="flex items-center gap-2">
              <Scissors size={14} className="text-amber-400" aria-hidden="true" />
              {service.name}
            </span>
            <span className="font-semibold text-amber-400">
              {formatPrice(service.price)}
            </span>
          </li>
        )}
        {barber && (
          <li className="flex items-center gap-2 text-white/70">
            <User size={14} className="text-amber-400" aria-hidden="true" />
            {barber.name}
          </li>
        )}
        {date && (
          <li className="flex items-center gap-2 capitalize text-white/70">
            <CalendarDays size={14} className="text-amber-400" aria-hidden="true" />
            {formatDateLong(date)}
          </li>
        )}
        {time && (
          <li className="flex items-center gap-2 text-white/70">
            <Clock size={14} className="text-amber-400" aria-hidden="true" />
            {time} hs
          </li>
        )}
      </ul>
    </div>
  )
}

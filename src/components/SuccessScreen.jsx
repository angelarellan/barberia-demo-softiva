import { CheckCircle2, MessageCircle, RotateCcw } from 'lucide-react'
import { formatDateLong, formatPrice } from '../data/utils'

export default function SuccessScreen({ booking, onReset }) {
  const { service, barber, date, time, clientName, clientPhone } = booking

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-6 px-4 py-10 text-center sm:px-6">
      <span
        aria-hidden="true"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400"
      >
        <CheckCircle2 size={34} />
      </span>
      <div>
        <h2 className="font-serif text-2xl font-bold text-white">
          ¡Reserva confirmada, {clientName.split(' ')[0]}!
        </h2>
        <p className="mt-2 text-sm text-white/50">
          Tu seña fue acreditada con Mercado Pago. Te enviamos los datos por
          WhatsApp/Mail.
        </p>
      </div>

      <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left text-sm text-white/70 shadow-lg shadow-black/20 backdrop-blur">
        <div className="flex justify-between border-b border-white/10 pb-2.5">
          <span className="text-white/55">Servicio</span>
          <span className="font-medium text-white">
            {service.name} · {formatPrice(service.price)}
          </span>
        </div>
        <div className="flex justify-between border-b border-white/10 py-2.5">
          <span className="text-white/55">Profesional</span>
          <span className="font-medium text-white">{barber.name}</span>
        </div>
        <div className="flex justify-between border-b border-white/10 py-2.5">
          <span className="text-white/55">Fecha</span>
          <span className="font-medium capitalize text-white">
            {formatDateLong(date)}
          </span>
        </div>
        <div className="flex justify-between border-b border-white/10 py-2.5">
          <span className="text-white/55">Horario</span>
          <span className="font-medium text-white">{time} hs</span>
        </div>
        <div className="flex justify-between pt-2.5">
          <span className="text-white/55">Seña abonada (Mercado Pago)</span>
          <span className="font-medium text-indigo-300">
            {formatPrice(service.deposit)}
          </span>
        </div>
      </div>

      <div className="flex w-full items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-left">
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400"
        >
          <MessageCircle size={16} />
        </span>
        <div className="text-xs text-white/60">
          <p className="font-medium text-emerald-300">
            Confirmación simulada por WhatsApp
          </p>
          <p className="mt-1">
            "Hola {clientName.split(' ')[0]}! 👋 Tu turno para{' '}
            <strong className="text-white/80">{service.name}</strong> con{' '}
            <strong className="text-white/80">{barber.name}</strong> quedó
            confirmado para el <strong className="text-white/80">
              {formatDateLong(date)}
            </strong>{' '}
            a las <strong className="text-white/80">{time} hs</strong>. Te
            enviamos este mensaje a {clientPhone}. ¡Nos vemos pronto! 😊"
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/70 transition hover:border-white/30 hover:text-white"
      >
        <RotateCcw size={15} aria-hidden="true" />
        Agendar otro turno
      </button>
    </div>
  )
}

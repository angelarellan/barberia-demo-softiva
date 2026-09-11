import { MapPin, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="border-b border-white/10 px-4 py-10 text-center sm:px-6 sm:py-14">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
          <Star size={12} fill="currentColor" aria-hidden="true" />
          4.9 · +500 turnos agendados
        </span>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Barbería Demo
        </h1>
        <p className="flex items-center gap-1.5 text-sm text-white/50">
          <MapPin size={14} aria-hidden="true" />
          Dirección de prueba — Córdoba
        </p>
        <p className="max-w-lg text-base text-white/60 sm:text-lg">
          Reservá tu turno online en menos de un minuto. Elegí el servicio, tu
          barbero de confianza y el horario que más te convenga.
        </p>
      </div>
    </section>
  )
}

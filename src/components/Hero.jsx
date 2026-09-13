import { MapPin } from 'lucide-react'

export default function Hero() {
  return (
    <section className="border-b border-white/10 px-4 py-10 text-center sm:px-6 sm:py-14">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3">
        <h1 className="font-serif text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:whitespace-nowrap">
          Gestión de Turnos
        </h1>
        <p className="flex items-center gap-1.5 text-sm text-white/50">
          <MapPin size={14} aria-hidden="true" />
          Dirección de prueba — Córdoba
        </p>
        <p className="max-w-xl text-base text-white/60 sm:text-lg">
          Reservá tu turno online en menos de un minuto. Elegí el servicio, tu
          profesional de confianza y el horario que más te convenga.
        </p>
      </div>
    </section>
  )
}

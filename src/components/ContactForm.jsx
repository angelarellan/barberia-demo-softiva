import { User, Phone } from 'lucide-react'

export default function ContactForm({ name, phone, onChangeName, onChangePhone }) {
  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-white/55">
          Nombre y apellido
        </span>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 focus-within:border-amber-400/60">
          <User size={16} className="text-white/30" aria-hidden="true" />
          <input
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => onChangeName(event.target.value)}
            placeholder="Ej: Juan Pérez"
            className="w-full bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none"
          />
        </div>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-white/55">
          WhatsApp
        </span>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 focus-within:border-amber-400/60">
          <Phone size={16} className="text-white/30" aria-hidden="true" />
          <input
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(event) => onChangePhone(event.target.value)}
            placeholder="Ej: 351 123 4567"
            className="w-full bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none"
          />
        </div>
      </label>

      <p className="text-xs text-white/50">
        Te enviaremos la confirmación de tu turno por WhatsApp a este número.
      </p>
    </div>
  )
}

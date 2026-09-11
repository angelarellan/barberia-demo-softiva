import { useState } from 'react'
import { User, Phone, AlertCircle } from 'lucide-react'

export default function ContactForm({
  name,
  phone,
  onChangeName,
  onChangePhone,
  attemptedSubmit,
}) {
  const [nameTouched, setNameTouched] = useState(false)
  const [phoneTouched, setPhoneTouched] = useState(false)

  const isNameValid = name.trim().length > 1
  const isPhoneValid = phone.trim().length > 6
  const showNameError = (nameTouched || attemptedSubmit) && !isNameValid
  const showPhoneError = (phoneTouched || attemptedSubmit) && !isPhoneValid

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-white/55">
          Nombre y apellido <span className="text-amber-400">*</span>
        </span>
        <div
          className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 transition ${
            showNameError
              ? 'border-red-500 bg-red-500/5'
              : 'border-white/10 bg-white/[0.03] focus-within:border-amber-400/60'
          }`}
        >
          <User
            size={16}
            className={showNameError ? 'text-red-400' : 'text-white/30'}
            aria-hidden="true"
          />
          <input
            type="text"
            required
            aria-required="true"
            aria-invalid={showNameError}
            aria-describedby={showNameError ? 'name-error' : undefined}
            autoComplete="name"
            value={name}
            onChange={(event) => onChangeName(event.target.value)}
            onBlur={() => setNameTouched(true)}
            placeholder="Ej: Juan Pérez"
            className="w-full bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none"
          />
        </div>
        {showNameError && (
          <p id="name-error" className="flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle size={13} aria-hidden="true" />
            Ingresá tu nombre y apellido.
          </p>
        )}
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-white/55">
          WhatsApp <span className="text-amber-400">*</span>
        </span>
        <div
          className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 transition ${
            showPhoneError
              ? 'border-red-500 bg-red-500/5'
              : 'border-white/10 bg-white/[0.03] focus-within:border-amber-400/60'
          }`}
        >
          <Phone
            size={16}
            className={showPhoneError ? 'text-red-400' : 'text-white/30'}
            aria-hidden="true"
          />
          <input
            type="tel"
            required
            aria-required="true"
            aria-invalid={showPhoneError}
            aria-describedby={showPhoneError ? 'phone-error' : undefined}
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(event) => onChangePhone(event.target.value)}
            onBlur={() => setPhoneTouched(true)}
            placeholder="Ej: 351 123 4567"
            className="w-full bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none"
          />
        </div>
        {showPhoneError && (
          <p id="phone-error" className="flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle size={13} aria-hidden="true" />
            Ingresá un número de WhatsApp válido.
          </p>
        )}
      </label>

      <p className="text-xs text-white/50">
        <span className="text-amber-400">*</span> Campos obligatorios. Te
        enviaremos la confirmación de tu turno por WhatsApp a este número.
      </p>

      {attemptedSubmit && (!isNameValid || !isPhoneValid) && (
        <p
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm font-medium text-red-400"
        >
          <AlertCircle size={16} className="flex-shrink-0" aria-hidden="true" />
          Completá los campos obligatorios para poder reservar tu turno.
        </p>
      )}
    </div>
  )
}

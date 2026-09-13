import { Check } from 'lucide-react'

const STEPS = ['Servicio', 'Profesional', 'Fecha y hora', 'Tus datos']

export default function StepIndicator({ currentStep }) {
  return (
    <ol className="mx-auto flex w-full max-w-2xl items-center justify-between px-2">
      {STEPS.map((label, index) => {
        const stepNumber = index + 1
        const isDone = stepNumber < currentStep
        const isActive = stepNumber === currentStep
        return (
          <li
            key={label}
            aria-current={isActive ? 'step' : undefined}
            className="flex flex-1 items-center last:flex-none"
          >
            <span className="sr-only">
              {`Paso ${stepNumber} de ${STEPS.length}: ${label}${
                isDone ? ' (completado)' : isActive ? ' (paso actual)' : ''
              }`}
            </span>
            <div aria-hidden="true" className="flex flex-col items-center gap-1.5">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition ${
                  isDone
                    ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white'
                    : isActive
                      ? 'border-2 border-indigo-400 text-indigo-300'
                      : 'border border-white/20 text-white/50'
                }`}
              >
                {isDone ? <Check size={15} /> : stepNumber}
              </span>
              <span
                className={`hidden text-[11px] sm:block ${
                  isActive ? 'text-white' : 'text-white/55'
                }`}
              >
                {label}
              </span>
            </div>
            {stepNumber !== STEPS.length && (
              <span
                className={`mx-2 h-px flex-1 ${
                  isDone ? 'bg-gradient-to-r from-indigo-500 to-violet-600' : 'bg-white/10'
                }`}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}

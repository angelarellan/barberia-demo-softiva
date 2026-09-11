import { BARBER_AVATARS } from '../data/avatars'

export default function BarberSelector({ barbers, selectedId, onSelect }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {barbers.map((barber) => {
        const isSelected = barber.id === selectedId
        return (
          <button
            key={barber.id}
            type="button"
            onClick={() => onSelect(barber.id)}
            className={`flex flex-col items-center gap-3 rounded-2xl border p-5 text-center transition ${
              isSelected
                ? 'border-amber-400 bg-amber-400/10 shadow-[0_0_0_1px_rgba(251,191,36,0.4)]'
                : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
            }`}
          >
            <span
              className={`flex h-16 w-16 items-center justify-center overflow-hidden rounded-full ring-2 transition ${
                isSelected ? 'ring-amber-400' : 'ring-white/10'
              }`}
            >
              <img
                src={BARBER_AVATARS[barber.id]}
                alt=""
                aria-hidden="true"
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </span>
            <div>
              <p className="font-serif text-base font-semibold text-white">
                {barber.name}
              </p>
              <p className="mt-1 text-xs text-white/55">{barber.role}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}

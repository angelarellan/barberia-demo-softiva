import { getBarberAvatar } from '../data/avatars'

export default function BarberSelector({ barbers, selectedId, onSelect }) {
  if (barbers.length === 0) {
    return (
      <p className="text-sm text-white/55">
        No hay profesionales disponibles en este momento.
      </p>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {barbers.map((barber) => {
        const isSelected = barber.id === selectedId
        return (
          <button
            key={barber.id}
            type="button"
            onClick={() => onSelect(barber.id)}
            className={`flex flex-col items-center gap-3 rounded-2xl border p-5 text-center shadow-lg shadow-black/20 backdrop-blur transition ${
              isSelected
                ? 'border-indigo-400 bg-gradient-to-br from-indigo-500/15 to-violet-500/10 shadow-[0_0_0_1px_rgba(129,140,248,0.5)]'
                : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
            }`}
          >
            <span
              className={`flex h-16 w-16 items-center justify-center overflow-hidden rounded-full ring-2 transition ${
                isSelected ? 'ring-indigo-400' : 'ring-white/10'
              }`}
            >
              <img
                src={getBarberAvatar(barber.id)}
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

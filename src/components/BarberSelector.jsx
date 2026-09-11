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
              className={`flex h-14 w-14 items-center justify-center rounded-full text-base font-bold ${
                isSelected
                  ? 'bg-amber-400 text-black'
                  : 'bg-white/10 text-white/70'
              }`}
            >
              {barber.initials}
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

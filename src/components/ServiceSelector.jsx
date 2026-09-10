import { formatPrice } from '../data/utils'

export default function ServiceSelector({ services, selectedId, onSelect }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {services.map((service) => {
        const Icon = service.icon
        const isSelected = service.id === selectedId
        return (
          <button
            key={service.id}
            type="button"
            onClick={() => onSelect(service.id)}
            className={`group flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition ${
              isSelected
                ? 'border-amber-400 bg-amber-400/10 shadow-[0_0_0_1px_rgba(251,191,36,0.4)]'
                : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
            }`}
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                isSelected
                  ? 'bg-amber-400 text-black'
                  : 'bg-white/10 text-amber-300'
              }`}
            >
              <Icon size={20} />
            </span>
            <div>
              <p className="font-serif text-lg font-semibold text-white">
                {service.name}
              </p>
              <p className="mt-1 text-xs text-white/40">{service.description}</p>
            </div>
            <div className="mt-auto flex w-full items-center justify-between gap-3 border-t border-white/10 pt-3">
              <span className="text-xl font-bold tracking-tight text-amber-400">
                {formatPrice(service.price)}
              </span>
              <span className="whitespace-nowrap rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/40">
                {service.duration} min
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

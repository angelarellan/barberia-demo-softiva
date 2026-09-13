import { formatPrice } from '../data/utils'

export default function ServiceSelector({ services, selectedId, onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {services.map((service) => {
        const Icon = service.icon
        const isSelected = service.id === selectedId
        return (
          <button
            key={service.id}
            type="button"
            onClick={() => onSelect(service.id)}
            className={`group flex w-full flex-col items-start gap-3 rounded-2xl border p-5 text-left shadow-lg shadow-black/20 backdrop-blur transition sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] ${
              isSelected
                ? 'border-indigo-400 bg-gradient-to-br from-indigo-500/15 to-violet-500/10 shadow-[0_0_0_1px_rgba(129,140,248,0.5)]'
                : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
            }`}
          >
            <span
              aria-hidden="true"
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                isSelected
                  ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white'
                  : 'bg-white/10 text-indigo-300'
              }`}
            >
              <Icon size={20} />
            </span>
            <div>
              <p className="font-serif text-lg font-semibold text-white">
                {service.name}
              </p>
              <p className="mt-1 text-xs text-white/55">{service.description}</p>
            </div>
            <div className="mt-auto flex w-full flex-col gap-1.5 border-t border-white/10 pt-3">
              <span className="text-xl font-bold tracking-tight text-indigo-300">
                {formatPrice(service.price)}
              </span>
              <span className="text-xs text-white/50">
                Seña:{' '}
                <span className="font-semibold text-indigo-300">
                  {formatPrice(service.deposit)}
                </span>
              </span>
              <span className="mt-0.5 inline-flex w-fit whitespace-nowrap rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/60">
                {service.duration} min
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

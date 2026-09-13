import { formatPrice } from '../data/utils'

export default function DepositBreakdown({ service }) {
  if (!service) return null

  const remaining = service.price - service.deposit

  return (
    <div className="mb-5 rounded-2xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 p-4">
      <div className="flex items-center justify-between text-sm text-white/70">
        <span>Total del servicio</span>
        <span className="font-medium text-white">{formatPrice(service.price)}</span>
      </div>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-white">Seña a pagar ahora</span>
        <span className="text-lg font-bold text-indigo-300">
          {formatPrice(service.deposit)}
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2 text-xs text-white/50">
        <span>Resta abonar en el turno</span>
        <span>{formatPrice(remaining)}</span>
      </div>
    </div>
  )
}

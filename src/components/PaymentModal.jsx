import { useState } from 'react'
import { Wallet, X, Loader2, CheckCircle2 } from 'lucide-react'
import { formatPrice } from '../data/utils'

export default function PaymentModal({ open, amount, onClose, onConfirm }) {
  const [status, setStatus] = useState('idle')

  if (!open) return null

  function handleConfirmPayment() {
    setStatus('processing')
    setTimeout(() => {
      setStatus('approved')
      setTimeout(() => {
        onConfirm()
      }, 900)
    }, 1400)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mp-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between bg-[#00aaef] px-5 py-4">
          <div className="flex items-center gap-2 text-white">
            <Wallet size={18} aria-hidden="true" />
            <span id="mp-modal-title" className="font-semibold">
              Mercado Pago
            </span>
          </div>
          {status === 'idle' && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="text-white/80 transition hover:text-white"
            >
              <X size={18} aria-hidden="true" />
            </button>
          )}
        </div>

        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-center gap-4 px-6 py-8 text-center"
        >
          {status === 'idle' && (
            <>
              <p className="text-sm text-white/60">
                Vas a pagar una seña de reserva de
              </p>
              <p className="text-3xl font-bold text-white">{formatPrice(amount)}</p>
              <button
                type="button"
                onClick={handleConfirmPayment}
                className="mt-2 w-full rounded-full bg-[#00aaef] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0090c8]"
              >
                Confirmar pago
              </button>
              <p className="text-[11px] text-white/30">
                Simulación de pago — no se procesa ningún cobro real.
              </p>
            </>
          )}
          {status === 'processing' && (
            <>
              <Loader2
                size={36}
                className="animate-spin text-[#00aaef]"
                aria-hidden="true"
              />
              <p className="text-sm text-white/70">Procesando pago...</p>
            </>
          )}
          {status === 'approved' && (
            <>
              <CheckCircle2 size={40} className="text-emerald-400" aria-hidden="true" />
              <p className="text-base font-semibold text-white">¡Pago aprobado!</p>
              <p className="text-sm text-white/60">Confirmando tu reserva...</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

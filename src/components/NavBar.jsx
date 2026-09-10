import { Scissors, CalendarClock, ShieldCheck } from 'lucide-react'

export default function NavBar({ view, onChangeView }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0b0f]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-black">
            <Scissors size={18} strokeWidth={2.5} />
          </span>
          <div className="leading-tight">
            <p className="font-serif text-base font-semibold text-white sm:text-lg">
              Barbería Premium Demo
            </p>
            <p className="text-[11px] text-white/40 sm:text-xs">
              Córdoba Capital, Argentina
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
          <button
            type="button"
            onClick={() => onChangeView('public')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
              view === 'public'
                ? 'bg-amber-500 text-black'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <CalendarClock size={15} />
            <span className="hidden sm:inline">Reservar</span>
          </button>
          <button
            type="button"
            onClick={() => onChangeView('admin')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
              view === 'admin'
                ? 'bg-amber-500 text-black'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <ShieldCheck size={15} />
            <span className="hidden sm:inline">Panel Admin</span>
          </button>
        </nav>
      </div>
    </header>
  )
}

import { Sparkles, CalendarClock, ShieldCheck } from 'lucide-react'

export default function NavBar({ view, onChangeView, onGoHome }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-900/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center gap-2.5 rounded-lg text-left transition hover:opacity-80"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white"
          >
            <Sparkles size={18} strokeWidth={2.5} />
          </span>
          <p className="font-serif text-base font-semibold text-white sm:text-lg">
            Gestión de Turnos
          </p>
        </button>

        <nav
          aria-label="Navegación principal"
          className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1"
        >
          <button
            type="button"
            onClick={() => onChangeView('public')}
            aria-current={view === 'public' ? 'page' : undefined}
            aria-label="Reservar"
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
              view === 'public'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <CalendarClock size={15} aria-hidden="true" />
            <span className="hidden sm:inline">Reservar</span>
          </button>
          <button
            type="button"
            onClick={() => onChangeView('admin')}
            aria-current={view === 'admin' ? 'page' : undefined}
            aria-label="Panel Admin"
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
              view === 'admin'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <ShieldCheck size={15} aria-hidden="true" />
            <span className="hidden sm:inline">Panel Admin</span>
          </button>
        </nav>
      </div>
    </header>
  )
}

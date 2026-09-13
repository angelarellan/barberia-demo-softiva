export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-900 px-4 py-8 text-center sm:px-6">
      <p className="text-sm text-white/55">
        Desarrollado por{' '}
        <a
          href="https://www.softivastudio.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-indigo-400 transition hover:text-indigo-300"
        >
          Softiva Studio
        </a>
      </p>
      <p className="mt-1 text-xs text-white/50">
        Demo de agendamiento — Consultorio / Estudio de Estética (Demo) ©{' '}
        {new Date().getFullYear()}
      </p>
    </footer>
  )
}

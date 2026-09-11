export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0b0f] px-4 py-8 text-center sm:px-6">
      <p className="text-sm text-white/40">
        Desarrollado por{' '}
        <a
          href="https://www.softivastudio.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-amber-400 transition hover:text-amber-300"
        >
          Softiva Studio
        </a>
      </p>
      <p className="mt-1 text-xs text-white/20">
        Demo de agendamiento — Barbería Demo © {new Date().getFullYear()}
      </p>
    </footer>
  )
}

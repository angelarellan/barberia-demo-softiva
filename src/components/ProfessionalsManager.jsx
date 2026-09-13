import { useState } from 'react'
import { UserPlus, Palmtree, RotateCcw, Trash2 } from 'lucide-react'

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

export default function ProfessionalsManager({
  professionals,
  onAdd,
  onToggleStatus,
  onRemove,
}) {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!name.trim() || !role.trim()) return
    onAdd({
      id: `prof-${Date.now()}`,
      name: name.trim(),
      role: role.trim(),
      status: 'active',
    })
    setName('')
    setRole('')
    setShowForm(false)
  }

  function handleRemove(id, personName) {
    const confirmed = window.confirm(
      `¿Confirmás dar de baja a ${personName}? Ya no va a aparecer para reservar turnos.`,
    )
    if (!confirmed) return
    onRemove(id)
  }

  return (
    <div className="mt-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-lg font-semibold text-white">Profesionales</h2>
          <p className="mt-1 text-sm text-white/55">
            Agregá, dá de baja o marcá vacaciones para el equipo.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-indigo-500 hover:to-violet-500"
        >
          <UserPlus size={15} aria-hidden="true" />
          Agregar profesional
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-end"
        >
          <label className="flex flex-1 flex-col gap-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-white/55">
              Nombre
            </span>
            <input
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ej: Dra. Ana Pérez"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-indigo-400/60 focus:outline-none"
            />
          </label>
          <label className="flex flex-1 flex-col gap-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-white/55">
              Especialidad
            </span>
            <input
              type="text"
              required
              value={role}
              onChange={(event) => setRole(event.target.value)}
              placeholder="Ej: Nutricionista"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-indigo-400/60 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:from-indigo-500 hover:to-violet-500"
          >
            Agregar
          </button>
        </form>
      )}

      <div className="flex flex-col gap-3">
        {professionals.length === 0 && (
          <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/55">
            No hay profesionales cargados.
          </p>
        )}
        {professionals.map((professional) => {
          const isActive = professional.status === 'active'
          return (
            <div
              key={professional.id}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white/70"
                >
                  {initials(professional.name)}
                </span>
                <div>
                  <p className="font-medium text-white">{professional.name}</p>
                  <p className="text-xs text-white/55">{professional.role}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    isActive
                      ? 'bg-emerald-400/10 text-emerald-400'
                      : 'bg-amber-400/10 text-amber-300'
                  }`}
                >
                  {isActive ? 'Activo' : 'De vacaciones'}
                </span>
              </div>
              <div className="flex flex-shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggleStatus(professional.id)}
                  aria-label={
                    isActive
                      ? `Marcar a ${professional.name} de vacaciones`
                      : `Reactivar a ${professional.name}`
                  }
                  className="flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-300 transition hover:bg-amber-400/20"
                >
                  {isActive ? (
                    <>
                      <Palmtree size={12} aria-hidden="true" />
                      Vacaciones
                    </>
                  ) : (
                    <>
                      <RotateCcw size={12} aria-hidden="true" />
                      Reactivar
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(professional.id, professional.name)}
                  aria-label={`Dar de baja a ${professional.name}`}
                  className="flex items-center gap-1.5 rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1.5 text-xs font-medium text-red-300 transition hover:bg-red-400/20"
                >
                  <Trash2 size={12} aria-hidden="true" />
                  Dar de baja
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

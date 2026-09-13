import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getNextDays } from '../data/utils'

const DAYS_AHEAD = 21

export default function DateTimeSelector({
  timeSlots,
  bookedSlots,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}) {
  const days = getNextDays(DAYS_AHEAD)
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  function updateScrollState() {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollState()
    document.fonts?.ready?.then(updateScrollState)
    el.addEventListener('scroll', updateScrollState)
    const resizeObserver = new ResizeObserver(updateScrollState)
    resizeObserver.observe(el)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      resizeObserver.disconnect()
    }
  }, [])

  function scrollByAmount(direction) {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/55">
          Elegí una fecha
        </p>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            disabled={!canScrollLeft}
            aria-label="Ver fechas anteriores"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition hover:border-white/25 hover:text-white disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <div
            ref={scrollRef}
            className="flex flex-1 gap-2 overflow-x-auto scroll-smooth pb-1"
          >
            {days.map((day) => {
              const isSelected = day.iso === selectedDate
              return (
                <button
                  key={day.iso}
                  type="button"
                  onClick={() => onSelectDate(day.iso)}
                  className={`flex min-w-[64px] flex-shrink-0 flex-col items-center gap-0.5 rounded-xl border px-3 py-2.5 transition ${
                    isSelected
                      ? 'border-indigo-400 bg-gradient-to-br from-indigo-500/15 to-violet-500/10 text-white'
                      : 'border-white/10 bg-white/[0.03] text-white/50 hover:border-white/25'
                  }`}
                >
                  <span className="text-[11px] capitalize">{day.weekday}</span>
                  <span className="text-lg font-semibold">{day.day}</span>
                  <span
                    className={`text-[10px] capitalize ${
                      isSelected ? 'text-white/70' : 'text-white/60'
                    }`}
                  >
                    {day.month}
                  </span>
                </button>
              )
            })}
          </div>
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            disabled={!canScrollRight}
            aria-label="Ver fechas siguientes"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition hover:border-white/25 hover:text-white disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/55">
          Elegí un horario
        </p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {timeSlots.map((slot) => {
            const isBooked = bookedSlots.includes(slot)
            const isSelected = slot === selectedTime
            return (
              <button
                key={slot}
                type="button"
                disabled={isBooked}
                onClick={() => onSelectTime(slot)}
                className={`rounded-lg border px-2 py-2 text-sm font-medium transition ${
                  isBooked
                    ? 'cursor-not-allowed border-white/5 bg-white/[0.02] text-white/20 line-through'
                    : isSelected
                      ? 'border-transparent bg-gradient-to-br from-indigo-500 to-violet-600 text-white'
                      : 'border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25'
                }`}
              >
                {slot}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

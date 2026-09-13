import { getNextDays } from '../data/utils'

export default function DateTimeSelector({
  timeSlots,
  bookedSlots,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}) {
  const days = getNextDays(7)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/55">
          Elegí una fecha
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {days.map((day) => {
            const isSelected = day.iso === selectedDate
            return (
              <button
                key={day.iso}
                type="button"
                onClick={() => onSelectDate(day.iso)}
                className={`flex min-w-[64px] flex-col items-center gap-0.5 rounded-xl border px-3 py-2.5 transition ${
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

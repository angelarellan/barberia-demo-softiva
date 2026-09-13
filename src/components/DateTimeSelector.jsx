import Calendar from './Calendar'

export default function DateTimeSelector({
  timeSlots,
  bookedSlots,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}) {
  return (
    <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
      <div className="xl:w-full xl:max-w-xs xl:flex-shrink-0">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/55">
          Elegí una fecha
        </p>
        <Calendar selectedDate={selectedDate} onSelectDate={onSelectDate} />
      </div>

      <div className="xl:w-full xl:max-w-xs xl:flex-shrink-0">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/55">
          Elegí un horario
        </p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 xl:grid-cols-3">
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

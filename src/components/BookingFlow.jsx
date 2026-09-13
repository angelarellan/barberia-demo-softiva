import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Wallet } from 'lucide-react'
import StepIndicator from './StepIndicator'
import ServiceSelector from './ServiceSelector'
import BarberSelector from './BarberSelector'
import DateTimeSelector from './DateTimeSelector'
import ContactForm from './ContactForm'
import BookingSummary from './BookingSummary'
import DepositBreakdown from './DepositBreakdown'
import PaymentModal from './PaymentModal'
import { SERVICES, BARBERS, TIME_SLOTS, BOOKED_SLOTS } from '../data/mockData'
import { todayISO } from '../data/utils'

const STEP_TITLES = {
  1: '¿Qué servicio querés reservar?',
  2: '¿Con qué profesional preferís atenderte?',
  3: 'Elegí el día y horario',
  4: 'Casi listo, dejanos tus datos',
}

export default function BookingFlow({ existingAppointments, onComplete }) {
  const [step, setStep] = useState(1)
  const [serviceId, setServiceId] = useState(null)
  const [barberId, setBarberId] = useState(null)
  const [date, setDate] = useState(todayISO())
  const [time, setTime] = useState(null)
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentKey, setPaymentKey] = useState(0)

  const service = useMemo(
    () => SERVICES.find((s) => s.id === serviceId) ?? null,
    [serviceId],
  )
  const barber = useMemo(
    () => BARBERS.find((b) => b.id === barberId) ?? null,
    [barberId],
  )

  const bookedSlots = useMemo(() => {
    if (!barberId) return []
    const base = BOOKED_SLOTS[barberId] ?? []
    const fromSession = existingAppointments
      .filter((a) => a.barberId === barberId && a.date === date)
      .map((a) => a.time)
    return [...new Set([...base, ...fromSession])]
  }, [barberId, date, existingAppointments])

  const canContinue = {
    1: Boolean(serviceId),
    2: Boolean(barberId),
    3: Boolean(date && time),
    4: clientName.trim().length > 1 && clientPhone.trim().length > 6,
  }[step]

  function handleNext() {
    if (!canContinue) {
      setAttemptedSubmit(true)
      return
    }
    if (step < 4) {
      setAttemptedSubmit(false)
      setStep(step + 1)
    } else {
      setPaymentKey((k) => k + 1)
      setShowPayment(true)
    }
  }

  function handlePaymentConfirmed() {
    setShowPayment(false)
    onComplete({
      id: `booking-${Date.now()}`,
      service,
      barber,
      serviceId,
      barberId,
      date,
      time,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
    })
  }

  function handleBack() {
    setAttemptedSubmit(false)
    setStep((s) => Math.max(1, s - 1))
  }

  function handleSelectTime(slot) {
    if (bookedSlots.includes(slot)) return
    setTime(slot)
  }

  function handleSelectDate(iso) {
    setDate(iso)
    setTime(null)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <StepIndicator currentStep={step} />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7">
          <h2 className="font-serif text-xl font-semibold text-white">
            {STEP_TITLES[step]}
          </h2>
          <div className="mt-5">
            {step === 1 && (
              <ServiceSelector
                services={SERVICES}
                selectedId={serviceId}
                onSelect={setServiceId}
              />
            )}
            {step === 2 && (
              <BarberSelector
                barbers={BARBERS}
                selectedId={barberId}
                onSelect={setBarberId}
              />
            )}
            {step === 3 && (
              <DateTimeSelector
                timeSlots={TIME_SLOTS}
                bookedSlots={bookedSlots}
                selectedDate={date}
                selectedTime={time}
                onSelectDate={handleSelectDate}
                onSelectTime={handleSelectTime}
              />
            )}
            {step === 4 && (
              <>
                <DepositBreakdown service={service} />
                <ContactForm
                  name={clientName}
                  phone={clientPhone}
                  onChangeName={setClientName}
                  onChangePhone={setClientPhone}
                  attemptedSubmit={attemptedSubmit}
                />
              </>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-white/50 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-0"
            >
              <ChevronLeft size={16} aria-hidden="true" />
              Volver
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={step !== 4 && !canContinue}
              aria-disabled={!canContinue}
              className={`flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                canContinue
                  ? step === 4
                    ? 'bg-[#00aaef] text-white hover:bg-[#0090c8]'
                    : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500'
                  : step === 4
                    ? 'cursor-pointer bg-white/10 text-white/70 hover:bg-white/15'
                    : 'cursor-not-allowed bg-white/10 text-white/30'
              }`}
            >
              {step === 4 ? (
                <>
                  <Wallet size={16} aria-hidden="true" />
                  Pagar seña de reserva con Mercado Pago
                </>
              ) : (
                <>
                  Continuar
                  <ChevronRight size={16} aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="hidden lg:block">
          <BookingSummary service={service} barber={barber} date={date} time={time} />
        </div>
      </div>

      <PaymentModal
        key={paymentKey}
        open={showPayment}
        amount={service?.deposit}
        onClose={() => setShowPayment(false)}
        onConfirm={handlePaymentConfirmed}
      />

      <div className="mt-6 lg:hidden">
        <BookingSummary service={service} barber={barber} date={date} time={time} />
      </div>
    </div>
  )
}

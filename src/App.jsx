import { lazy, Suspense, useState } from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import BookingFlow from './components/BookingFlow'
import SuccessScreen from './components/SuccessScreen'
import Footer from './components/Footer'
import { SEED_APPOINTMENTS, SEED_PROFESSIONALS } from './data/mockData'

const AdminPanel = lazy(() => import('./components/AdminPanel'))

export default function App() {
  const [view, setView] = useState('public')
  const [appointments, setAppointments] = useState(SEED_APPOINTMENTS)
  const [professionals, setProfessionals] = useState(SEED_PROFESSIONALS)
  const [confirmedBooking, setConfirmedBooking] = useState(null)
  const [bookingResetKey, setBookingResetKey] = useState(0)

  function handleBookingComplete(booking) {
    setAppointments((prev) => [
      ...prev,
      {
        id: booking.id,
        clientName: booking.clientName,
        clientPhone: booking.clientPhone,
        serviceId: booking.serviceId,
        barberId: booking.barberId,
        date: booking.date,
        time: booking.time,
        reminderSent: false,
        status: 'confirmed',
      },
    ])
    setConfirmedBooking(booking)
  }

  function handleReset() {
    setConfirmedBooking(null)
  }

  function handleSendReminder(id) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, reminderSent: true } : a)),
    )
  }

  function handleCancelAppointment(id) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a)),
    )
  }

  function handleAddProfessional(professional) {
    setProfessionals((prev) => [...prev, professional])
  }

  function handleToggleProfessionalStatus(id) {
    setProfessionals((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === 'active' ? 'vacation' : 'active' }
          : p,
      ),
    )
  }

  function handleRemoveProfessional(id) {
    setProfessionals((prev) => prev.filter((p) => p.id !== id))
  }

  function handleChangeView(nextView) {
    setView(nextView)
    setConfirmedBooking(null)
  }

  function handleGoHome() {
    setView('public')
    setConfirmedBooking(null)
    setBookingResetKey((k) => k + 1)
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 text-white">
      <NavBar view={view} onChangeView={handleChangeView} onGoHome={handleGoHome} />

      <main className="flex-1">
        {view === 'public' ? (
          <>
            <Hero />
            {confirmedBooking ? (
              <SuccessScreen booking={confirmedBooking} onReset={handleReset} />
            ) : (
              <BookingFlow
                key={bookingResetKey}
                existingAppointments={appointments}
                professionals={professionals}
                onComplete={handleBookingComplete}
              />
            )}
          </>
        ) : (
          <Suspense fallback={null}>
            <AdminPanel
              appointments={appointments}
              onSendReminder={handleSendReminder}
              onCancelAppointment={handleCancelAppointment}
              professionals={professionals}
              onAddProfessional={handleAddProfessional}
              onToggleProfessionalStatus={handleToggleProfessionalStatus}
              onRemoveProfessional={handleRemoveProfessional}
            />
          </Suspense>
        )}
      </main>

      <Footer />
    </div>
  )
}

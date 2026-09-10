import { useState } from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import BookingFlow from './components/BookingFlow'
import SuccessScreen from './components/SuccessScreen'
import AdminPanel from './components/AdminPanel'
import Footer from './components/Footer'
import { SEED_APPOINTMENTS } from './data/mockData'

export default function App() {
  const [view, setView] = useState('public')
  const [appointments, setAppointments] = useState(SEED_APPOINTMENTS)
  const [confirmedBooking, setConfirmedBooking] = useState(null)

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

  function handleChangeView(nextView) {
    setView(nextView)
    setConfirmedBooking(null)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0b0b0f] text-white">
      <NavBar view={view} onChangeView={handleChangeView} />

      <main className="flex-1">
        {view === 'public' ? (
          <>
            <Hero />
            {confirmedBooking ? (
              <SuccessScreen booking={confirmedBooking} onReset={handleReset} />
            ) : (
              <BookingFlow
                existingAppointments={appointments}
                onComplete={handleBookingComplete}
              />
            )}
          </>
        ) : (
          <AdminPanel
            appointments={appointments}
            onSendReminder={handleSendReminder}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}

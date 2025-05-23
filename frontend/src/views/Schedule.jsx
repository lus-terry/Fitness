import React, { useEffect, useState, useCallback } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAuth } from '../contexts/AuthContext';
import TerminModal from '../components/TerminModal';
import TrenerDropdown from '../components/TrenerDropdown';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const Schedule = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [trenutniTrener, setTrenutniTrener] = useState(null);
  const [trenutniTermin, setTrenutniTermin] = useState(null);
  const [showAvailable, setShowAvailable] = useState(true);
  const [showReserved, setShowReserved] = useState(true);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.MONTH);

  useEffect(() => {
    const fetchTermini = async () => {
      try {
        const [terminiRes, zahtjeviRes] = await Promise.all([
          axios.get('/termini'),
          axios.get(user.role === 'trainer'
            ? '/api/reservations/trainer-reservations'
            : '/api/reservations/my-reservations', {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }),
        ]);

        const zahtjevi = zahtjeviRes.data;
        const termini = terminiRes.data;

        const formatted = termini.map((t) => {
          const [h, m] = t.vrijeme_termina.split(':').map(Number);
          const start = new Date(t.datum);
          start.setHours(h, m, 0);
          const end = new Date(start);
          end.setMinutes(end.getMinutes() + (t.trajanje?.minutes || 60));

          let jeRezerviran = false;
          let klijentIme = null;

          if (user.role === 'trainer') {
            const rezervacija = zahtjevi.find(z => z.id_termina === t.id_termina);
            if (rezervacija) {
              jeRezerviran = true;
              klijentIme = `${rezervacija.ime} ${rezervacija.prezime}`;
            }
          } else {
            jeRezerviran = zahtjevi.some(z => z.id_termina === t.id_termina && z.status_rezervacije === 'reserved');
          }

          return {
            id: t.id_termina,
            title: `Trening ID ${t.id_treninga || 'nije definirano'}`,
            start,
            end,
            rezerviran: jeRezerviran,
            klijentIme,
            ...t
          };
        });

        setEvents(formatted);
      } catch (err) {
        console.error('❌ Greška prilikom dohvaćanja termina:', err);
      }
    };

    if (user) fetchTermini();
  }, [user]);

  useEffect(() => {
    const filtered = events.filter((e) => {
      if (user.role === 'client' && trenutniTrener && e.id_trenera !== trenutniTrener) return false;
      if (e.rezerviran && showReserved) return true;
      if (!e.rezerviran && showAvailable) return true;
      return false;
    });
    setFilteredEvents(filtered);
  }, [events, showAvailable, showReserved, trenutniTrener, user.role]);

  const handleNavigate = useCallback((newDate) => setDate(newDate), []);
  const handleViewChange = useCallback((newView) => setView(newView), []);

  const eventStyleGetter = (event) => {
    const backgroundColor = event.rezerviran ? '#FFA500' : '#ADD8E6';
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.9,
        color: 'black',
        border: '1px solid #ccc',
        display: 'block',
      },
    };
  };

  return (
    <div className="p-4" style={{ width: '90%', margin: '0 auto' }}>
      <h2 className="text-xl font-bold mb-4">Raspored termina</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label>
            <input
              type="checkbox"
              checked={showAvailable}
              onChange={(e) => setShowAvailable(e.target.checked)}
            /> Slobodni termini
          </label>
          <label>
            <input
              type="checkbox"
              checked={showReserved}
              onChange={(e) => setShowReserved(e.target.checked)}
            /> Rezervirani termini
          </label>
        </div>

        {user?.role === 'client' && <TrenerDropdown onSelect={setTrenutniTrener} />}
      </div>

      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        views={['month', 'week', 'day']}
        date={date}
        view={view}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={setTrenutniTermin}
      />

      {trenutniTermin && (
        <TerminModal
          termin={trenutniTermin}
          trener={user.role === 'trainer' ? (trenutniTermin.klijentIme || '-') : `${user.ime} ${user.prezime}`}
          onClose={() => setTrenutniTermin(null)}
          osvjezi={() => window.location.reload()}
        />
      )}
    </div>
  );
};

export default Schedule;

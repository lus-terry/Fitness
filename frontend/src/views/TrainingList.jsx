import React, { useEffect, useState, useCallback } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const locales = { 'en-US': enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Schedule = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [trenutniTrener, setTrenutniTrener] = useState(null);
  const [treneri, setTreneri] = useState([]);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.MONTH);
  const [showAvailable, setShowAvailable] = useState(true);
  const [showReserved, setShowReserved] = useState(true);

  useEffect(() => {
    const fetchTreneri = async () => {
      try {
        const res = await axios.get('/treneri');
        setTreneri(res.data);
      } catch (err) {
        console.error('Greška pri dohvaćanju trenera:', err);
      }
    };

    if (user?.role === 'client') {
      fetchTreneri();
    }
  }, [user]);

  useEffect(() => {
    const fetchTermini = async () => {
      try {
        const terminiRes = await axios.get('/termini');
        const zahtjeviRes = await axios.get('/api/reservations/my-reservations', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const zahtjevi = zahtjeviRes.data;
        const termini = terminiRes.data;

        const formatted = termini
          .map((t) => {
            const [h, m] = t.vrijeme_termina.split(':').map(Number);
            const start = new Date(t.datum);
            start.setHours(h, m, 0);
            const end = new Date(start);
            end.setMinutes(end.getMinutes() + (t.trajanje?.minutes || 60));

            const jeRezerviran = zahtjevi.some(z =>
              z.id_termina === t.id_termina &&
              z.status_rezervacije === 'reserved'
            );

            const prikazati =
              (user.role === 'trainer' && t.id_trenera === user.id_korisnika) ||
              (user.role === 'client' &&
                jeRezerviran ||
                (t.dostupnost === 'available' && (!trenutniTrener || t.id_trenera === Number(trenutniTrener))));

            if (!prikazati) return null;

            return {
              id: t.id_termina,
              title: `Trening ID ${t.id_treninga || '-'}`,
              start,
              end,
              rezerviran: jeRezerviran
            };
          })
          .filter(Boolean);

        setEvents(formatted);
      } catch (err) {
        console.error('❌ Greška prilikom dohvaćanja termina:', err);
      }
    };

    if (user) fetchTermini();
  }, [user, trenutniTrener]);

  const handleNavigate = useCallback((newDate) => setDate(newDate), []);
  const handleViewChange = useCallback((newView) => setView(newView), []);

  const eventStyleGetter = (event) => {
    const backgroundColor = event.rezerviran ? '#FFA500' : '#ADD8E6'; // orange vs light blue
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.9,
        color: 'black',
        border: '1px solid #ccc',
        display: 'block'
      },
    };
  };

  const filtriraniEventi = events.filter((e) => {
    if (e.rezerviran && !showReserved) return false;
    if (!e.rezerviran && !showAvailable) return false;
    return true;
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Raspored termina</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label>
            <input
              type="checkbox"
              checked={showAvailable}
              onChange={(e) => setShowAvailable(e.target.checked)}
            />{' '}
            Slobodni termini
          </label>
          <label>
            <input
              type="checkbox"
              checked={showReserved}
              onChange={(e) => setShowReserved(e.target.checked)}
            />{' '}
            Rezervirani termini
          </label>
        </div>

        {user?.role === 'client' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <select
              value={trenutniTrener || ''}
              onChange={(e) => setTrenutniTrener(e.target.value)}
            >
              <option value="">-- Odaberi trenera --</option>
              {treneri.map((t) => (
                <option key={t.id_korisnika} value={t.id_korisnika}>
                  {t.ime} {t.prezime}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          {user?.role === 'client' && (
            <button onClick={() => navigate('/reservation')} className="btn btn-primary">
              Rezerviraj termin
            </button>
          )}
          {user?.role === 'trainer' && (
            <button onClick={() => navigate('/novi-termin')} className="btn btn-primary">
              Dodaj termin
            </button>
          )}
        </div>
      </div>

      <Calendar
        localizer={localizer}
        events={filtriraniEventi}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        views={['month', 'week', 'day']}
        date={date}
        view={view}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event) => alert(`Kliknut event: ${event.title}`)}
      />
    </div>
  );
};

export default Schedule;

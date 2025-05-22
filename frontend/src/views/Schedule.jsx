import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Schedule.css';


const localizer = momentLocalizer(moment);

const CustomToolbar = ({ label, onNavigate }) => {
  return (
    <div className="rbc-toolbar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
      <div>
        <button onClick={() => onNavigate('PREV')}>{'Prev'}</button>
        <span style={{ margin: '0 1rem' }}>{label}</span>
        <button onClick={() => onNavigate('NEXT')}>{'Next'}</button>
      </div>
    </div>
  );
};


export default function Schedule() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/termini');
        const data = response.data;

        let filtered = [];
        if (user.role === 'client') {
          filtered = data.filter((t) => t.id_korisnika === user.id);
        } else if (user.role === 'trainer') {
          filtered = data.filter((t) => t.id_trenera === user.id);
        }

        const formatted = filtered.map((t) => ({
          title: t.napomena || 'Termin',
          start: new Date(`${t.datum}T${t.vrijeme_termina}`),
          end: new Date(`${t.datum}T${t.vrijeme_termina}`), // Dodaj trajanje ako trebaš
          allDay: false,
        }));

        setEvents(formatted);
      } catch (err) {
        console.error('Greška kod dohvaćanja termina:', err);
      }
    };

    if (user) fetchEvents();
  }, [user]);

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <h2>Raspored</h2>

    {user.role === 'client' && (
      <div className="button-wrapper">
        <Link to="/reservation">
          <button>Nova rezervacija</button>
        </Link>
      </div>
    )}

    {user.role === 'trainer' && (
      <div className="button-wrapper">
        <Link to="/novi-termin">
          <button>Dodaj novi slobodan termin</button>
        </Link>
      </div>
    )}


      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month']}
        defaultView="month"
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        components={{
          toolbar: (props) => <CustomToolbar {...props} />
        }}
        style={{ height: 500 }}
      />

    </div>
  );
}


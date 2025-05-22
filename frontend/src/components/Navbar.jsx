import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Greška pri odjavi:', err);
    }
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        FitnessApp
      </Link>

      {user && (
        <div style={styles.links}>
          <NavLink to="/dashboard" style={styles.link} activeStyle={styles.activeLink}>
            Dashboard
          </NavLink>
          <NavLink to="/trainings" style={styles.link} activeStyle={styles.activeLink}>
            Treninzi
          </NavLink>

          {/* Rezervacije - dostupno samo klijentima i adminu */}
          {(user.role === 'klijent' || user.role === 'admin') && (
            <NavLink to="/reservation" style={styles.link} activeStyle={styles.activeLink}>
              Rezervacije
            </NavLink>
          )}

          <NavLink to="/schedule" style={styles.link} activeStyle={styles.activeLink}>
            Raspored
          </NavLink>

          {/* Prisustva - dostupno samo trenerima i adminu */}
          {(user.role === 'trener' || user.role === 'admin') && (
            <NavLink to="/attendance" style={styles.link} activeStyle={styles.activeLink}>
              Prisustva
            </NavLink>
          )}

          {/* Admin sekcija */}
          {user.role === 'admin' && (
            <>
              <NavLink to="/admin" style={styles.link} activeStyle={styles.activeLink}>
                Admin Panel
              </NavLink>
              <NavLink to="/users" style={styles.link} activeStyle={styles.activeLink}>
                Korisnici
              </NavLink>
            </>
          )}
        </div>
      )}

      <div style={styles.auth}>
        {user ? (
          <>
            <span style={styles.user}>Pozdrav, {user.name}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Odjava
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Prijava
            </Link>
            <Link to="/register" style={styles.link}>
              Registracija
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#282c34',
    color: 'white',
    flexWrap: 'wrap',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: 'white',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
  },
  activeLink: {
    textDecoration: 'underline',
  },
  auth: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  user: {
    fontWeight: 'bold',
  },
  logoutBtn: {
    backgroundColor: '#ff4d4f',
    border: 'none',
    color: 'white',
    padding: '0.3rem 0.7rem',
    cursor: 'pointer',
    borderRadius: '3px',
  },
};

export default Navbar;

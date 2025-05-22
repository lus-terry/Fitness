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
      <div style={styles.links}>
        <NavLink to="/" exact activeStyle={styles.activeLink} style={styles.link}>
          Početna
        </NavLink>
        {user && (user.role === 'admin' || user.role === 'trainer') && (
          <NavLink to="/schedule" activeStyle={styles.activeLink} style={styles.link}>
            Raspored
          </NavLink>
        )}
        {user && (
          <NavLink to="/trainings" activeStyle={styles.activeLink} style={styles.link}>
            Treninzi
          </NavLink>
        )}
        {user && user.role === 'admin' && (
          <NavLink to="/admin" activeStyle={styles.activeLink} style={styles.link}>
            Admin Panel
          </NavLink>
        )}
      </div>
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

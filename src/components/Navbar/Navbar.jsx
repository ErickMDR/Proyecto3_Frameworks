import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthContext.jsx';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <Link to="/">Portafolio</Link>
        </div>
        
        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>Inicio</Link>
          <Link to="/projects" className={styles.navLink}>Proyectos</Link>
          <Link to="/about" className={styles.navLink}>Sobre Mí</Link>
          
          {user ? (
            <button onClick={handleLogout} className={styles.logoutButton}>
              Cerrar Sesión
            </button>
          ) : (
            <Link to="/login" className={styles.loginButton}>
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
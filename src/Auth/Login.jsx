import React, { useState } from 'react';
import { useAuth } from './AuthContext.jsx';
import styles from './Auth.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      setError('');
      window.location.href = '/';
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Iniciar Sesión</button>
        <p className={styles.authLink}>
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
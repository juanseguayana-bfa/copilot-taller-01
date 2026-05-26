import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './LoginPage.module.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const body = new URLSearchParams();
      body.append('username', username);
      body.append('password', password);

      const res = await fetch(`${API_BASE}/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.detail || 'Usuario o contraseña incorrectos.');
        return;
      }

      const data = await res.json();
      login(data.access_token, username);
      navigate('/welcome', { replace: true });
    } catch {
      setError('Error de conexión. Verificá que el servidor esté activo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.gradientBg} aria-hidden="true" />

      <div className={styles.cardShell}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.logo} aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <rect width="32" height="32" rx="8" fill="#0F172A" />
                <path d="M10 22V10l6 4 6-4v12l-6-4-6 4Z" fill="#E0E7FF" />
              </svg>
            </div>
            <h1 className={styles.title}>Compliance Platform</h1>
            <p className={styles.subtitle}>Ingresá tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.field}>
              <label htmlFor="username" className={styles.label}>Usuario</label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                required
                className={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                disabled={loading}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>Contraseña</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            {error && (
              <div className={styles.error} role="alert">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="7.5" stroke="#EF4444" />
                  <path d="M8 5v3M8 10.5v.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              className={styles.button}
              disabled={loading || !username || !password}
            >
              {loading ? (
                <span className={styles.spinner} aria-label="Cargando…" />
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

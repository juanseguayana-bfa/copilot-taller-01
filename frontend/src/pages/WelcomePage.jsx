import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './WelcomePage.module.css';

export default function WelcomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className={styles.page}>
      <div className={styles.gradientBg} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="#0F172A" />
              <path d="M10 22V10l6 4 6-4v12l-6-4-6 4Z" fill="#E0E7FF" />
            </svg>
            <span className={styles.brandName}>Compliance Platform</span>
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userBadge}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="5.5" r="2.5" stroke="#64748B" strokeWidth="1.2" />
                <path d="M2.5 13c0-2.485 2.462-4.5 5.5-4.5s5.5 2.015 5.5 4.5" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              {user}
            </span>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3M10 11l3-3-3-3M13 8H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.heroShell}>
          <div className={styles.hero}>
            <div className={styles.tag}>Dashboard</div>
            <h1 className={styles.greeting}>Bienvenido, <span className={styles.username}>{user}</span></h1>
            <p className={styles.description}>
              Accediste correctamente a la plataforma de compliance. Desde aquí podés gestionar
              flujos de trabajo, revisar paneles y analizar el estado del sistema.
            </p>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.cardShell}>
            <div className={styles.card}>
              <div className={styles.cardIcon} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#0F172A" strokeWidth="1.4" />
                  <rect x="12" y="3" width="7" height="7" rx="1.5" stroke="#0F172A" strokeWidth="1.4" />
                  <rect x="3" y="12" width="7" height="7" rx="1.5" stroke="#0F172A" strokeWidth="1.4" />
                  <rect x="12" y="12" width="7" height="7" rx="1.5" stroke="#0F172A" strokeWidth="1.4" />
                </svg>
              </div>
              <h2 className={styles.cardTitle}>Flujos de trabajo</h2>
              <p className={styles.cardText}>Visualizá y administrá los procesos activos de la plataforma.</p>
            </div>
          </div>

          <div className={styles.cardShell}>
            <div className={styles.card}>
              <div className={styles.cardIcon} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 3v16M3 11h16" stroke="#0F172A" strokeWidth="1.4" strokeLinecap="round" />
                  <circle cx="11" cy="11" r="8" stroke="#0F172A" strokeWidth="1.4" />
                </svg>
              </div>
              <h2 className={styles.cardTitle}>Analítica</h2>
              <p className={styles.cardText}>Revisá métricas clave y el estado operativo del sistema.</p>
            </div>
          </div>

          <div className={styles.cardShell}>
            <div className={styles.card}>
              <div className={styles.cardIcon} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="8" r="3" stroke="#0F172A" strokeWidth="1.4" />
                  <path d="M5 19c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#0F172A" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className={styles.cardTitle}>Usuarios</h2>
              <p className={styles.cardText}>Gestioná accesos, roles y permisos del equipo.</p>
            </div>
          </div>
        </div>

        <div className={styles.sessionInfo}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="6.5" stroke="#64748B" />
            <path d="M7 4.5V7l2 1.5" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Sesión activa · Token expira en 5 minutos
        </div>
      </main>
    </div>
  );
}

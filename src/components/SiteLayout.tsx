import { NavLink, Outlet } from 'react-router'
import { useTheme } from '../context/ThemeContext'

const navigation = [
  { to: '/sobre-mi', label: 'Sobre mí' },
  { to: '/proyectos', label: 'Proyectos' },
  { to: '/contacto', label: 'Contacto' },
]

export function SiteLayout() {
  const { theme, toggleTheme } = useTheme()

  function focusMainContent() {
    document.getElementById('main-content')?.focus()
  }

  return (
    <>
      <button className="skip-link" type="button" onClick={focusMainContent}>
        Saltar al contenido
      </button>

      <header className="site-header">
        <div className="header-inner page-shell">
          <NavLink className="wordmark" to="/sobre-mi" aria-label="Franco González, inicio">
            Franco González
          </NavLink>

          <nav className="site-nav" aria-label="Navegación principal">
            {navigation.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link${isActive ? ' is-active' : ''}`
                }
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
            aria-pressed={theme === 'dark'}
            className="theme-toggle"
            onClick={toggleTheme}
            type="button"
          >
            {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
          </button>
        </div>
      </header>

      <main className="page-main" id="main-content" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-inner page-shell">
          <NavLink className="wordmark footer-wordmark" to="/sobre-mi">
            Franco González
          </NavLink>
          <p>Hecho con curiosidad en Temuco, Chile.</p>
          <a
            className="footer-link"
            href="https://github.com/FrancoGonzalez-B"
            rel="noreferrer"
            target="_blank"
          >
            Mi GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="footer-bottom page-shell">
          <span>© 2026 Franco González</span>
          <span>Portafolio personal · React + TypeScript</span>
        </div>
      </footer>
    </>
  )
}

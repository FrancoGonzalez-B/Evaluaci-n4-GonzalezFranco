import { useEffect, useRef } from 'react'
import { NavLink, Outlet, useLocation, type NavLinkRenderProps } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { navigation, profile } from '../data/portfolio'
import './SiteLayout.css'

export function SiteLayout() {
  const { theme, toggleTheme } = useTheme()
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement | null>(null)
  const previousPath = useRef<string>(pathname)

  useEffect(() => {
    const currentPage = navigation.find((item) => item.to === pathname)
    document.title = `${currentPage?.label ?? 'Página no encontrada'} | ${profile.name}`
    if (previousPath.current !== pathname) {
      mainRef.current?.focus()
      window.scrollTo(0, 0)
      previousPath.current = pathname
    }
  }, [pathname])

  function focusMainContent(): void {
    mainRef.current?.focus()
  }

  return (
    <>
      <button className="skip-link" type="button" onClick={focusMainContent}>
        Saltar al contenido
      </button>
      <header className="site-header">
        <div className="site-header__inner page-shell">
          <NavLink className="site-header__name" to="/sobre-mi" aria-label={`${profile.name}, inicio`}>
            {profile.name}
          </NavLink>
          <nav className="navbar" aria-label="Navegación principal">
            {navigation.map((item) => (
              <NavLink
                className={({ isActive }: NavLinkRenderProps) =>
                  `navbar__link${isActive ? ' navbar__link--active' : ''}`
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
            className="site-header__theme"
            onClick={toggleTheme}
            type="button"
          >
            {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
          </button>
        </div>
      </header>
      <main className="site-main" id="main-content" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="site-footer__inner page-shell">
          <NavLink className="site-footer__name" to="/sobre-mi">{profile.name}</NavLink>
          <p className="site-footer__note">Hecho con curiosidad en {profile.city.split(',')[0]}, Chile.</p>
          <a className="site-footer__link" href={profile.githubUrl} rel="noopener noreferrer" target="_blank">
            Mi GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="site-footer__bottom page-shell">
          <span>© 2026 {profile.name}</span>
          <span>Diseñado para personas, hecho para la web.</span>
        </div>
      </footer>
    </>
  )
}

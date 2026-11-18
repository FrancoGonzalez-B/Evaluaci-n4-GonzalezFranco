import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export function NotFoundPage() {
  return (
    <section className="not-found page-shell">
      <p className="not-found__eyebrow">404 / PÁGINA NO ENCONTRADA</p>
      <h1 className="not-found__title">No encuentro esa sección.</h1>
      <Link className="button button--primary" to="/sobre-mi">Volver al inicio</Link>
    </section>
  )
}

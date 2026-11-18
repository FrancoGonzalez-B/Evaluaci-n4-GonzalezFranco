import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <section className="page-shell page-section not-found">
      <p className="eyebrow">404 / PÁGINA NO ENCONTRADA</p>
      <h1 className="page-title">No encuentro esa sección.</h1>
      <Link className="button button-primary" to="/sobre-mi">
        Volver al inicio
      </Link>
    </section>
  )
}

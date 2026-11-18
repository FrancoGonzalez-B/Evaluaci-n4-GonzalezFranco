import { Link } from 'react-router-dom'
import { profile } from '../data/portfolio'
import './HomePage.css'

export function HomePage() {
  return (
    <section aria-labelledby="hero-title" className="hero page-shell">
      <div className="hero__copy">
        <p className="hero__eyebrow">
          <span aria-hidden="true" className="hero__status" />
          Estudiante de informática · {profile.city}
        </p>
        <h1 className="hero__title" id="hero-title">
          {profile.heroTitle.map((line, index) => (
            <span className={index === 1 ? 'hero__line hero__line--accent' : 'hero__line'} key={line}>
              {line}
            </span>
          ))}
        </h1>
        <p className="hero__intro">
          Hola, soy <strong>{profile.name}</strong>, estudiante de {profile.degree} en la {profile.university}. {profile.intro}
        </p>
        <p className="hero__note">{profile.note}</p>
        <div className="hero__actions">
          <Link className="button button--primary" to="/proyectos">
            Ver mis proyectos <span aria-hidden="true">↗</span>
          </Link>
          <Link className="text-link" to="/contacto">Conversemos</Link>
        </div>
      </div>
      <div className="hero__art">
        <img
          alt={`Foto de presentación de ${profile.name}`}
          className="hero__photo"
          height="640"
          src={`${import.meta.env.BASE_URL}${profile.photoPath}`}
          width="640"
        />
      </div>
    </section>
  )
}

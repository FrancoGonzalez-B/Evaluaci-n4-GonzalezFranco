import { Link } from 'react-router'

export function HomePage() {
  return (
    <div className="page-shell">
      <section aria-labelledby="hero-title" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span aria-hidden="true" className="status-dot" />
            Estudiante de informática · Temuco, Chile
          </p>
          <h1 id="hero-title">
            Ideas claras,
            <br />
            <span>experiencias</span>
            <br />
            que conectan.
          </h1>
          <p className="hero-intro">
            Hola, soy <strong>Franco González</strong>, estudiante de Ingeniería
            Civil en Informática en la Universidad Católica de Temuco. Me interesa
            crear interfaces web claras y fáciles de usar.
          </p>
          <p className="hero-note">En formación · Ingeniería Civil en Informática</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/proyectos">
              Ver mis proyectos <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link" to="/contacto">
              Conversemos
            </Link>
          </div>
        </div>

        <div className="hero-art">
          <img
            alt="Franco González, estudiante de Ingeniería Civil en Informática"
            className="profile-photo"
            height="640"
            src={`${import.meta.env.BASE_URL}images/franco-gonzalez.jpeg`}
            width="640"
          />
          <p className="photo-caption">Aprendiendo y construyendo en Temuco.</p>
        </div>
      </section>

      <section aria-labelledby="about-title" className="about-strip">
        <div>
          <p className="eyebrow">01 / SOBRE MÍ</p>
          <h2 id="about-title">Tecnología con propósito.</h2>
        </div>
        <p>
          Me interesa aprender cómo se conectan el diseño, el desarrollo y las
          necesidades de las personas. Este sitio reúne una selección de mis
          trabajos y mi actividad pública en GitHub.
        </p>
      </section>
    </div>
  )
}

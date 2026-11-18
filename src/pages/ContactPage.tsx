import { useState, type ChangeEvent, type FormEvent } from 'react'

type ContactForm = {
  name: string
  email: string
  message: string
}

const initialForm: ContactForm = { name: '', email: '', message: '' }

export function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm)
  const [mailLink, setMailLink] = useState<string | null>(null)

  function updateField(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.currentTarget
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setMailLink(null)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const subject = encodeURIComponent(`Mensaje desde mi portafolio: ${form.name}`)
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nCorreo: ${form.email}\n\n${form.message}`,
    )
    setMailLink(
      `mailto:franco.gonzalez2026@alu.uct.cl?subject=${subject}&body=${body}`,
    )
  }

  return (
    <div className="contact-page">
      <section aria-labelledby="contact-title" className="contact-grid page-shell">
        <div className="contact-copy">
          <p className="eyebrow">03 / CONTACTO</p>
          <h1 className="page-title" id="contact-title">
            ¿Creamos algo <em>con intención?</em>
          </h1>
          <p>
            Estoy empezando mi camino en tecnología y siempre tengo ganas de
            conversar, colaborar y aprender.
          </p>
          <a className="email-link" href="mailto:franco.gonzalez2026@alu.uct.cl">
            franco.gonzalez2026@alu.uct.cl <span aria-hidden="true">↗</span>
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <p className="form-intro">Déjame un mensaje</p>
          <div className="form-field">
            <label htmlFor="contact-name">Tu nombre</label>
            <input
              autoComplete="name"
              id="contact-name"
              maxLength={80}
              name="name"
              onChange={updateField}
              placeholder="¿Cómo te llamas?"
              required
              value={form.name}
            />
          </div>
          <div className="form-field">
            <label htmlFor="contact-email">Tu correo</label>
            <input
              autoComplete="email"
              id="contact-email"
              maxLength={120}
              name="email"
              onChange={updateField}
              placeholder="nombre@correo.com"
              required
              type="email"
              value={form.email}
            />
          </div>
          <div className="form-field">
            <label htmlFor="contact-message">Tu mensaje</label>
            <textarea
              id="contact-message"
              maxLength={1000}
              name="message"
              onChange={updateField}
              placeholder="Cuéntame en qué estás pensando…"
              required
              rows={4}
              value={form.message}
            />
          </div>
          <button className="button button-light" type="submit">
            Validar mensaje <span aria-hidden="true">↗</span>
          </button>
          {mailLink && (
            <div className="form-feedback" role="status">
              <p>
                Los datos están validados. El mensaje no se envió todavía; usa
                este enlace para abrir tu aplicación de correo.
              </p>
              <a className="text-link" href={mailLink}>
                Abrir correo preparado
              </a>
            </div>
          )}
          <p className="form-note">
            Este formulario valida los datos y prepara un correo; no usa un
            servidor de envío.
          </p>
        </form>
      </section>
    </div>
  )
}

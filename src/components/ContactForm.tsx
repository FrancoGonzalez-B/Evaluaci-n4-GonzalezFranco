import { useState } from 'react'
import type {
  ContactFormData, ContactFormErrors, ContactFormProps,
  ContactInputEvent, ContactResult, ContactSubmitEvent,
} from '../types'
import './ContactForm.css'

const initialForm: ContactFormData = { name: '', email: '', message: '' }

function validateForm(form: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {}
  if (form.name.trim().length < 2) errors.name = 'Escribe un nombre de al menos 2 caracteres.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Escribe un correo válido, por ejemplo nombre@correo.com.'
  }
  if (form.message.trim().length < 10) errors.message = 'Escribe un mensaje de al menos 10 caracteres.'
  return errors
}

export function ContactForm({ email }: ContactFormProps) {
  const [form, setForm] = useState<ContactFormData>(initialForm)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [result, setResult] = useState<ContactResult>({ status: 'idle' })

  function updateField(event: ContactInputEvent): void {
    const { name, value } = event.currentTarget
    if (name !== 'name' && name !== 'email' && name !== 'message') return
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }))
    setResult({ status: 'idle' })
  }

  function handleSubmit(event: ContactSubmitEvent): void {
    event.preventDefault()
    const nextErrors = validateForm(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setResult({ status: 'idle' })
      const firstInvalid = (Object.keys(nextErrors) as (keyof ContactFormData)[])[0]
      const field = event.currentTarget.elements.namedItem(firstInvalid)
      if (field instanceof HTMLElement) field.focus()
      return
    }
    const subject = encodeURIComponent(`Mensaje desde mi portafolio: ${form.name.trim()}`)
    const body = encodeURIComponent(
      `Nombre: ${form.name.trim()}\nCorreo: ${form.email.trim()}\n\n${form.message.trim()}`,
    )
    setResult({ status: 'success', mailLink: `mailto:${email}?subject=${subject}&body=${body}` })
  }

  return (
    <form aria-labelledby="contact-form-title" className="contact-form" noValidate onSubmit={handleSubmit}>
      <h2 className="contact-form__title" id="contact-form-title">Déjame un mensaje</h2>
      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="contact-name">Tu nombre</label>
        <input
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          aria-invalid={Boolean(errors.name)} autoComplete="name" className="contact-form__input"
          id="contact-name" maxLength={80} name="name" onChange={updateField}
          placeholder="¿Cómo te llamas?" required value={form.name}
        />
        {errors.name && <p className="contact-form__error" id="contact-name-error">{errors.name}</p>}
      </div>
      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="contact-email">Tu correo</label>
        <input
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          aria-invalid={Boolean(errors.email)} autoComplete="email" className="contact-form__input"
          id="contact-email" maxLength={120} name="email" onChange={updateField}
          placeholder="nombre@correo.com" required type="email" value={form.email}
        />
        {errors.email && <p className="contact-form__error" id="contact-email-error">{errors.email}</p>}
      </div>
      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="contact-message">Tu mensaje</label>
        <textarea
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          aria-invalid={Boolean(errors.message)} className="contact-form__input contact-form__input--message"
          id="contact-message" maxLength={1000} name="message" onChange={updateField}
          placeholder="Cuéntame en qué estás pensando…" required rows={4} value={form.message}
        />
        {errors.message && <p className="contact-form__error" id="contact-message-error">{errors.message}</p>}
      </div>
      <button className="button button--light" type="submit">Preparar mensaje <span aria-hidden="true">↗</span></button>
      {Object.values(errors).some(Boolean) && (
        <p className="contact-form__feedback" role="alert">Revisa los campos indicados antes de continuar.</p>
      )}
      {result.status === 'success' && (
        <div className="contact-form__feedback" role="status">
          <p>Mensaje validado. Abre tu aplicación de correo para enviarlo.</p>
          <a className="contact-form__mail-link" href={result.mailLink}>Abrir correo preparado</a>
        </div>
      )}
      <p className="contact-form__note">Este formulario prepara un correo; no envía mensajes a un servidor.</p>
    </form>
  )
}

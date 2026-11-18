import { ContactForm } from '../components/ContactForm'
import { profile } from '../data/portfolio'
import './ContactPage.css'

export function ContactPage() {
  return (
    <section aria-labelledby="contact-title" className="contact-page">
      <div className="contact-page__inner page-shell">
        <div className="contact-page__copy">
          <p className="contact-page__eyebrow">03 / CONTACTO</p>
          <h1 className="contact-page__title" id="contact-title">
            {profile.contactTitle}<br /><em className="contact-page__highlight">{profile.contactHighlight}</em>
          </h1>
          <p className="contact-page__intro">{profile.contactIntro}</p>
          <a className="contact-page__email" href={`mailto:${profile.email}`}>
            {profile.email} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <ContactForm email={profile.email} />
      </div>
    </section>
  )
}

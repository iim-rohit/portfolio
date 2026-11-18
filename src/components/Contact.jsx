import {
  ArrowUpRight,
  Check,
  Copy,
  MapPin,
  Send
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import portfolio from '../data/portfolio.json'
import Icon from './Icon'
import Magnetic from './Magnetic'
import Reveal from './Reveal'
import { scrollToSection } from '../lib/scroll'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState('')
  const copyTimerRef = useRef(null)
  const { person, sections, contact } = portfolio

  useEffect(
    () => () => {
      window.clearTimeout(copyTimerRef.current)
    },
    []
  )

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email)
      setCopied(true)
      copyTimerRef.current = window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${person.email}`
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()

    if (!name || !email || !message) {
      setStatus('Please fill in all three fields before sending.')
      return
    }

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)

    setStatus('Opening your email app with the message ready to send.')
    window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`
  }

  return (
    <section
      id="contact"
      className="section contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-backdrop" aria-hidden="true">
        <span className="contact-ghost">HELLO</span>
        <span className="contact-orb contact-orb--one" />
        <span className="contact-orb contact-orb--two" />
        <span className="contact-grid" />
      </div>

      <div className="container-wide contact-grid-layout">
        <div className="contact-intro">
          <Reveal className="section-kicker">
            <span className="section-index">{sections.contact.index}</span>
            <span className="section-kicker-line" aria-hidden="true" />
            <span>{sections.contact.eyebrow}</span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="section-title contact-title" id="contact-title">
              {sections.contact.title}{' '}
              <span className="gradient-text">{sections.contact.accent}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="section-description">
              {sections.contact.description}
            </p>
          </Reveal>

          <Reveal className="contact-details" delay={0.16}>
            <button
              type="button"
              className="contact-email-card"
              onClick={copyEmail}
              aria-label={`Copy email address ${person.email}`}
            >
              <span className="contact-email-label">EMAIL ME AT</span>
              <span className="contact-email-value">{person.email}</span>
              <span className="contact-email-action" aria-hidden="true">
                {copied ? <Check size={17} /> : <Copy size={17} />}
              </span>
              <span className="visually-hidden" role="status">
                {copied ? 'Email address copied' : ''}
              </span>
            </button>

            <div className="contact-meta">
              <span>
                <MapPin size={14} aria-hidden="true" />
                {person.location}
              </span>
              <span className="contact-availability">
                <span className="status-dot" aria-hidden="true" />
                {person.availability}
              </span>
            </div>
          </Reveal>

          <Reveal className="contact-socials" delay={0.2}>
            <span className="contact-socials-label">FIND ME ONLINE</span>
            <div className="social-links">
              {portfolio.socials.map((social) =>
                social.url ? (
                  <a
                    key={social.label}
                    className="social-link"
                    href={social.url}
                    target={social.url.startsWith('http') ? '_blank' : undefined}
                    rel={social.url.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    <Icon name={social.icon} size={17} />
                    <span>{social.label}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ) : (
                  <span
                    key={social.label}
                    className="social-link social-link--disabled"
                    aria-disabled="true"
                    title={social.placeholder}
                  >
                    <Icon name={social.icon} size={17} />
                    <span>{social.label}</span>
                    <span className="social-soon">SOON</span>
                  </span>
                )
              )}
            </div>
            <p className="contact-socials-note">
              LinkedIn will be linked here as soon as it&apos;s available.
            </p>
          </Reveal>
        </div>

        <Reveal className="contact-form-wrap" delay={0.1}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-top">
              <span>START A CONVERSATION</span>
              <span className="contact-form-index">01 / 01</span>
            </div>

            <div className="form-field">
              <label htmlFor="contact-name">{contact.fields.name}</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jane Doe"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-email">{contact.fields.email}</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="jane@company.com"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-message">{contact.fields.message}</label>
              <textarea
                id="contact-message"
                name="message"
                rows="4"
                placeholder="A role, a project, or just a good conversation..."
                required
              />
            </div>

            <Magnetic className="contact-submit-wrap">
              <button
                type="submit"
                className="btn btn--primary contact-submit"
              >
                Send message
                <Send size={16} aria-hidden="true" />
              </button>
            </Magnetic>

            <p className="form-note">
              This form opens your email app. No data is stored on this site.
            </p>
            <p className="form-status" role="status" aria-live="polite">
              {status}
            </p>
          </form>

          <div className="contact-form-side" aria-hidden="true">
            <span>AVAILABLE FOR</span>
            <strong>Internships<br />& entry-level roles</strong>
            <span className="contact-form-side-rule" />
            <span>PATNA · INDIA</span>
          </div>
        </Reveal>
      </div>

      <div className="container-wide contact-bottom">
        <p>Let&apos;s make something worth remembering.</p>
        <button
          type="button"
          className="contact-bottom-link"
          onClick={() => scrollToSection('#home')}
        >
          Back to top
          <ArrowUpRight size={15} aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}

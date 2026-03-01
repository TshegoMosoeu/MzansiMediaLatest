// src/pages/Contact.jsx (or ContactPage.jsx)
import { useState, useEffect, useRef } from 'react'
import { useForm } from '@formspree/react'
import CTAButton from '../components/CTAButton.jsx'
import { useCompanyInfo } from '../components/CompanyInfoProvider.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import leadGen from '../assets/LeadGen.png'

export default function ContactPage() {
  const { contact, hours } = useCompanyInfo()

  const initialForm = {
    name: '',
    email: '',
    phone: '',
    company: '',
    timeline: '',
    details: '',
  }

  const [formData, setFormData] = useState(initialForm)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: null, message: '' })
  const statusRef = useRef(null)

  // Formspree Hook
  const [state, formspreeSubmit] = useForm('xreavkgw')

  // -------- Validation
  const validators = {
    name: (value) => (value.trim().length >= 2 ? '' : 'Please enter your full name.'),
    email: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Enter a valid email address.',
    // Simple phone check (accepts +, spaces, (), -). Optional field:
    phone: (value) => {
      const v = value.trim()
      if (!v) return ''
      return /^[+]?[\d\s()-]{7,}$/.test(v) ? '' : 'Enter a valid phone number.'
    },
    company: () => '',
    timeline: (value) => (value ? '' : 'Let us know when you would like to get started.'),
    details: (value) =>
      value.trim().length === 0 || value.trim().length >= 10
        ? ''
        : 'Add a bit more detail (10+ characters).',
  }

  const validateField = (name, value) => (validators[name] ? validators[name](value) : '')
  const validateForm = (fields) => {
    const nextErrors = {}
    Object.entries(fields).forEach(([name, value]) => {
      const err = validateField(name, value)
      if (err) nextErrors[name] = err
    })
    return nextErrors
  }

  // -------- Handlers
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const nextErrors = validateForm(formData)
    setErrors(nextErrors)
    setTouched({
      name: true,
      email: true,
      phone: true,
      company: true,
      timeline: true,
      details: true,
    })

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields and try again.' })
      return
    }

    try {
      setStatus({ type: null, message: 'Sending...' })

      // Formspree accepts FormData
      const payload = new FormData()
      payload.append('name', formData.name)
      payload.append('email', formData.email)
      payload.append('phone', formData.phone)
      payload.append('company', formData.company)
      payload.append('timeline', formData.timeline)
      payload.append('message', formData.details)
      payload.append('_subject', 'New contact enquiry')

      const result = await formspreeSubmit(payload)

      const ok =
        result?.body?.ok === true ||
        result?.response?.ok === true ||
        state.succeeded === true ||
        state.errors?.length === 0

      if (ok) {
        setStatus({ type: 'success', message: "Thanks! We'll be in touch." })
        setFormData(initialForm)
        setTouched({})
        setErrors({})
      } else {
        setStatus({ type: 'error', message: 'Something went wrong. Please try again.' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' })
    }
  }

  // -------- a11y: focus the status + scroll into view
  useEffect(() => {
    if (status.message && statusRef.current) {
      statusRef.current.focus()
      statusRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [status])

  // -------- Auto-dismiss success after 6s
  useEffect(() => {
    if (status.type === 'success') {
      const id = setTimeout(() => setStatus({ type: null, message: '' }), 6000)
      return () => clearTimeout(id)
    }
  }, [status])

  return (
    <div className="page page--contact">
      {/* HERO */}
      <section className="page-hero page-hero--split section--demos">
        <div className="page-hero__content">
          <SectionHeading
            eyebrow="Contact"
            title="Tell us about your next chapter"
            description="Share a few details below and we'll respond with availability and next steps."
          />
        </div>

        <aside className="page-hero__media" aria-hidden="true">
          <img src={leadGen} alt="" className="img--color" loading="eager" />
        </aside>
      </section>

      {/* FORM */}
      <section className="section section--contact">
        <div className="split split--contact">
          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="form__row">
              <label>
                <span className="form__label">
                    Full name <span className="form__required">*</span>
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  autoComplete="name"
                />
                {errors.name && touched.name && (
                  <span id="contact-name-error" className="form__error">
                    {errors.name}
                  </span>
                )}
              </label>

              <label>
                <span className="form__label">
                    Email address <span className="form__required">*</span>
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  autoComplete="email"
                />
                {errors.email && touched.email && (
                  <span id="contact-email-error" className="form__error">
                    {errors.email}
                  </span>
                )}
              </label>
            </div>

            <div className="form__row">
              <label>
                Phone number
                <input
                  type="tel"
                  name="phone"
                  placeholder="+27 01 234 5678"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                  autoComplete="tel"
                  inputMode="tel"
                />
                {errors.phone && touched.phone && (
                  <span id="contact-phone-error" className="form__error">
                    {errors.phone}
                  </span>
                )}
              </label>

              <label>
                Organisation
                <input
                  type="text"
                  name="company"
                  placeholder="Company or project"
                  value={formData.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="organization"
                />
                <span className="form__error" aria-hidden="true">
                  {' '}
                </span>
              </label>
            </div>

            <div className="form__row">
              <label>
                <span className="form__label">
                    Timeline <span className="form__required">*</span>
                </span>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={errors.timeline ? 'true' : 'false'}
                  aria-describedby={errors.timeline ? 'contact-timeline-error' : undefined}
                >
                  <option value="" disabled>
                    Select a timeframe
                  </option>
                  <option value="urgent">Urgent (0 - 4 weeks)</option>
                  <option value="soon">Soon (1 - 3 months)</option>
                  <option value="later">Planning ahead (3+ months)</option>
                </select>
                {errors.timeline && touched.timeline && (
                  <span id="contact-timeline-error" className="form__error">
                    {errors.timeline}
                  </span>
                )}
              </label>
            </div>

            <label>
              What are you working on?
              <textarea
                name="details"
                rows="4"
                placeholder="Launch campaign, community program, product storytelling..."
                value={formData.details}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={errors.details ? 'true' : 'false'}
                aria-describedby={errors.details ? 'contact-details-error' : undefined}
              />
              {errors.details && touched.details && (
                <span id="contact-details-error" className="form__error">
                  {errors.details}
                </span>
              )}
            </label>

            <div className="form__actions">
              <CTAButton
                type="submit"
                variant="primary-fill"
                disabled={state.submitting}
                aria-disabled={state.submitting ? 'true' : 'false'}
              >
                {state.submitting ? 'Sending…' : 'Request discovery call'}
              </CTAButton>
            </div>

            {/* Optional: show Formspree errors if submission fails */}
            {state.errors?.length > 0 && status.type !== 'success' && (
              <div className="form__error" role="alert" aria-live="assertive">
                {state.errors.map((err, i) => (
                  <div key={i}>{err.message}</div>
                ))}
              </div>
            )}

            {status.message && (
              <div
                ref={statusRef}
                tabIndex={-1}
                className={`form__status ${status.type === 'error' ? 'is-error' : 'is-success'}`}
                role={status.type === 'error' ? 'alert' : 'status'}
                aria-live={status.type === 'error' ? 'assertive' : 'polite'}
              >
                <span>{status.message}</span>
                <button
                  type="button"
                  className="form__status-dismiss"
                  onClick={() => setStatus({ type: null, message: '' })}
                  aria-label="Dismiss"
                >
                  ×
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  )
}
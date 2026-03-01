import { useState } from 'react'
import CTAButton from '../components/CTAButton.jsx'
import { useCompanyInfo } from '../components/CompanyInfoProvider.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import heroImg from '../assets/BaobabDay.png' // ← adjust path/filename

export default function PortfolioPage() {
  const { demoProjects = [], caseStudies = [] } = useCompanyInfo()

  const inclusions = [
    'Responsive design',
    'SSL + hosting setup',
    'Basic SEO & analytics',
    'Speed optimisation',
    'Contact forms & spam protection',
    '2 revision rounds',
    '30-day post-launch support',
  ]

  const process = [
    { title: 'Discovery', desc: 'Goals, audience and examples you like (30 - 45 mins).' },
    { title: 'Wireframe & copy', desc: 'Structure + draft messaging for quick feedback.' },
    { title: 'Visual design', desc: 'Look & feel, components and key screens.' },
    { title: 'Build & launch', desc: 'Responsive build, QA, handover & training.' },
  ]

  const faqs = [
    { q: 'How fast can we launch?', a: 'A focused one-pager can ship in ~10 days. Multi-page sites usually take 2 - 4 weeks depending on scope and assets.' },
    { q: 'Who owns the site?', a: 'You do. Everything is set up in your accounts (domain, hosting, analytics) and handed over at launch.' },
    { q: 'Can you work with our content?', a: 'Yes—send your copy/images, or I can draft and we refine together.' },
  ]

  // --- TRUE ACCORDION STATE ---
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="page page--portfolio">
      {/* HERO */}
      <section className="page-hero page-hero--split section--demos">
        <div className="page-hero__content">
          <SectionHeading
            eyebrow="Portfolio"
            title="Selected examples & recent builds"
            description="Clean, fast, conversion-ready websites tailored to your brand and goals."
          />
          {/* <div className="hero__actions">
            
          </div> */}
          <CTAButton to="/contact" variant="primary-fill">Get a tailored demo</CTAButton>
        </div>

        {/* Right: image */}
        <aside className="page-hero__media" aria-hidden="true">
          <img
            src={heroImg}
            alt=""
            className="img--color"
            loading="eager"
          />
        </aside>
      </section>

      {/* LIVE EXAMPLES */}
      <section id="examples" className="section section--demos">
        <SectionHeading
          eyebrow="Live examples"
          title="Explore working demos"
          description="These show typical layouts, components and performance. Every build is customised to your brand."
        />

        
        {demoProjects.length > 0 ? (
            <div className="card-grid">
                {demoProjects.slice(0,6).map((demo)=> (
                    <article key={demo.title} className="case-card">
                        <span className="case-card__eyebrow">{demo.category}</span>
                        <h3>{demo.title}</h3>
                        <p>{demo.summary}</p>

                        {demo.previewImage && (
                            <div className="device-frame">
                            <div className="device-frame__topbar">
                                <span className="device-frame__dot" />
                                <span className="device-frame__dot" />
                                <span className="device-frame__dot" />
                                <span className="device-frame__url">
                                {/* {demo.link?.replace("https://", "").replace("http://", "")} */}
                                </span>
                            </div>

                            <div className="device-frame__screen">
                                <img
                                className="device-frame__img"
                                src={demo.previewImage}
                                alt={`${demo.title} preview`}
                                loading="lazy"
                                />
                            </div>
                            </div>
                        )}

                        {demo.link && (
                            <a className="text-link" href={demo.link} target="_blank" rel="noopener noreferrer">
                            View live demo {"->"}
                            </a>
                        )}
                    </article>
                ))}
            </div>
        ) : (
          <div className="empty-state">
            <p>Looking for something specific? I can spin up a quick example.</p>
            <CTAButton to="/contact" variant="primary-fill">Request an example</CTAButton>
          </div>
        )}
      </section>

      {/* PROCESS */}
      <section className="section section--demos">
        <SectionHeading
          eyebrow="Process"
          title="Simple, transparent and fast"
          description="Short feedback loops and visible progress from day one."
        />
        <div className="timeline">
          {process.map((step, idx) => (
            <div key={step.title} className="timeline__item section--demos">
              <span className="timeline__index">{String(idx + 1).padStart(2, '0')}</span>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ (Accordion) */}
      <section className="section section--demos">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions"
          description="If something's not here, we will gladly answer it on a quick call."
        />

        <div className="accordion">
          {faqs.map(({ q, a }, i) => (
            <details
              className="accordion__item"
              key={q}
              open={openIndex === i}
              onToggle={(e) => {
                // when this item tries to open, set it active; when it closes, clear
                setOpenIndex(e.currentTarget.open ? i : null)
              }}
            >
              <summary className="accordion__summary">
                <span className="accordion__question">{q}</span>
                <span className="accordion__chev" aria-hidden="true" />
              </summary>
              <div className="accordion__panel">
                <p>{a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section section--cta section--demos">
        <div className="section__inner">
          <h2>Ready to see your brand on one of these layouts?</h2>
          <CTAButton to="/contact" variant="primary-fill">Get a tailored demo</CTAButton>
        </div>
      </section>
    </div>
  )
}

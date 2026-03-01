// src/pages/AboutPage.jsx
import React from 'react';
import { CompanyInfoField, useCompanyInfo } from '../components/CompanyInfoProvider.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import teamPic from '../assets/Team.png' // ← adjust path/filename

// --- Principles from your current page ---
const pillars = [
  {
    title: 'Human-centred, market-aware',
    copy:
      'We combine qualitative research, first-party data, and cultural context across regions—localising messages without losing brand coherence.',
  },
  {
    title: 'Systems over one-offs',
    copy:
      'We build modular design and content systems—component libraries, CMS schemas, and translation workflows—that scale across languages and markets.',
  },
  {
    title: 'Channel-native storytelling',
    copy:
      'Ideas are adapted for web, social, email, and product surfaces—optimised for format, language, and behaviour in each channel.',
  },
  {
    title: 'Measurable, ethical growth',
    copy:
      'We set clear outcomes and use privacy-safe analytics, experimentation, and transparent dashboards to drive continuous improvement.',
  },
];



const values = [
  {
    title: 'Our Mission',
    description:
      'To be your complete digital growth partner, providing end-to-end solutions that connect you and your business to success.',
  },
  {
    title: 'Our Approach',
    description:
      'We believe in building lasting relationships through transparent pricing, quality service, and genuine care for your success.',
  },
  {
    title: 'Our Promise',
    description:
      'Reliable hosting, stunning websites, effective lead generation, and responsive support — all from one trusted partner.',
  },
];

// --- Simple benefits list (no Lucide icons) ---
const benefits = [
  'Competitive, transparent pricing',
  'No hidden fees or surprise charges',
  'Fast turnaround from kickoff to launch',
  'Local, responsive support',
];

// --- Optional tech stack (uses react-icons) ---
/** If you don’t have react-icons installed, run:
 *   npm i react-icons
 */
import {
  SiFigma,
  SiWordpress,
  SiPython,
  SiJavascript,
  SiReact,
  SiOpenai,
  SiCanva,
  SiGoogleanalytics,
} from 'react-icons/si';

const expertise = [
  {
    icon: <SiFigma size={32} />,
    label: 'Figma',
    desc: 'UI/UX prototyping and collaboration for pixel-perfect results.',
  },
  {
    icon: <SiCanva size={32} />,
    label: 'Canva',
    desc: 'Branding, social graphics, and on-brand visuals for your business.',
  },
  {
    icon: <SiWordpress size={32} />,
    label: 'WordPress',
    desc: 'High-converting, easy-to-manage business websites.',
  },
  {
    icon: <SiReact size={32} />,
    label: 'React',
    desc: 'Fast, interactive web apps with reusable components.',
  },
  {
    icon: <SiPython size={32} />,
    label: 'Python',
    desc: 'Automations, integrations, and backend scripts.',
  },
  {
    icon: <SiJavascript size={32} />,
    label: 'JavaScript',
    desc: 'Modern front-end interactions and app logic.',
  },
  {
    icon: <SiOpenai size={32} />,
    label: 'AI',
    desc: 'Automation, content workflows, and smart assistants.',
  },
  {
    icon: <SiGoogleanalytics size={32} />,
    label: 'Google Analytics',
    desc: 'Tracking, measurement, and optimization for growth.',
  },
];

export default function AboutPage() {
  const { description } = useCompanyInfo();

  return (
    <div className="page page--about">
      {/* Hero */}
    <section className="page-hero page-hero--split">
      <div className="page-hero__content">
        <SectionHeading
          eyebrow="About"
          title="Mzansi Media Hub in a nutshell"
          description={description}
        />
      </div>

      <aside className="page-hero__media" aria-hidden="true">
        <img
          src={teamPic}
          alt=""
          className="img--color"   // bypass global grayscale/shadow
          loading="eager"
        />
      </aside>
    </section>

      {/* What drives us (merged value statements) */}
      <section className="section section--light">
        <SectionHeading
          eyebrow="What drives us"
          title="Mission, approach, and promise"
          description="Clear principles guide how we collaborate and the outcomes we aim for on every project."
        />
        <div className="card-grid">
          {values.map((v) => (
            <article key={v.title} className="value-card">
              <h4>{v.title}</h4>
              <p>{v.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Principles (your original pillars) */}


      {/* Why choose us (no Lucide, simple checklist) */}
      <section className="section section--light">
        <SectionHeading
          eyebrow="Why choose us"
          title="Built for founders and marketing teams"
          description="From hosting to lead funnels, we deliver dependable digital systems so you can focus on running the business."
        />
        <ul className="checklist">
          {benefits.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      {/* Expertise (react-icons only, no Lucide) */}
      <section className="section section--light">
        <SectionHeading
          eyebrow="Capabilities"
          title="Tools we use to ship great work"
          description="A blend of design, engineering, and automation to move fast without breaking the brand."
        />
        <div className="card-grid section--demo">
          {expertise.map((item, i) => (
            <article key={i} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div aria-hidden="true">{item.icon}</div>
                <h3 style={{ margin: 0 }}>{item.label}</h3>
              </div>
              <p className="muted" style={{ marginTop: '.35rem' }}>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Where we create */}
{/*       <section className="section section--demos">
        <SectionHeading
          eyebrow="Where we create"
          title="Remote-first with a Johannesburg HQ"
          description="We collaborate with clients across Africa and beyond, while staying rooted in Joburg’s creative pulse."
        />
        <div className="contact-card contact-card--wide">
          <span className="contact-card__label">Visit us</span>
          <CompanyInfoField path="contact.address" className="contact-card__value" />
        </div>
      </section> */}
    </div>
  );
}

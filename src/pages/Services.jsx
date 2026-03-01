import CTAButton from '../components/CTAButton.jsx'
import { CompanyInfoField, useCompanyInfo } from '../components/CompanyInfoProvider.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import PricingBlock from '../components/PricingBlock.jsx'
import sideImage from '../assets/laptopsCoffee.png'

const processSteps = [
  {
    title: 'Kickoff & discovery',
    description:
      "We sit with your team, review what you’ve tried, and conduct research to understand what’s working and what isn’t.",
  },
  {
    title: 'Co-create & test',
    description:
      'We sketch ideas, build quick prototypes, and test them together—fast feedback and clear decisions at each step.',
  },
  {
    title: 'Launch & grow',
    description:
      'We roll it out and track results so we can tweak and improve post-launch.',
  },
]


const addOns = [
  'SEO setup',
  'Analytics & tracking',
  'CRM & lead capture',
  'Email automations',
  'Booking & calendar integrations (Calendly, Google)',
  'Content calendar & social templates',
  'Monthly care plan (updates, backups, security)',
]



export default function Services() {
    const { services} = useCompanyInfo();
    
    return (
        <div className='page'>
            <section className='page-hero page-hero--split section--demos'>
                <div className='page-hero__content'>
                    <SectionHeading 
                        eyebrow="services"
                        title="Digital solutions to grow your business online"
                        description="We help businesses succeed with professional web design, reliable hosting, targeted social media marketing, and lead generation strategies that drive results."
                    />
                    <CTAButton to='/contact' variant='primary-fill'>Let's build together</CTAButton>
                </div>
                <div className='page-hero__media'>
                    <img src={sideImage} alt='' className='img--color' loading='lazy' />
                </div>
            </section>
            <section className="section section--demos">
                <SectionHeading
                eyebrow="Core offerings"
                title="Designed to meet you at each stage of growth"
                description="Choose a once off package or an integrated retainer. We adapt our services to match the scale of your ambitions."
                />
                <div className="card-grid card-grid--services">
                {services.map((service) => (
                    <article key={service.title} className="card card--tall">
                    <h3>{service.title}</h3>
                    <p>{service.body}</p>
                    <h4>Deliverables</h4>
                    <ul className="tag-list tag-list--columns">
                        {service.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                        ))}
                    </ul>
                    </article>
                ))}
                </div>
            </section>
            <section className="section section--process">
                <SectionHeading
                eyebrow="How we partner"
                title="Collaborative by design"
                description="Our process is transparent, inclusive, and agile, ensuring we co-create every milestone with your team."
                />
                <div className="process">
                {processSteps.map((step, index) => (
                    <article key={step.title} className="process-step">
                    <span className="process-step__index">0{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                    </article>
                ))}
                </div>
            </section>
            <PricingBlock showAddonsTab={false} />
            <section className="section section--accent section--addons">
                <div className="split">
                <div>
                    <SectionHeading
                    eyebrow="Other Add-on services"
                    title="Plug-and-play enhancements"
                    description="When you need an extra push, tap into specialist skills to round out your launch."
                    />
                    <ul className="checklist">
                    {addOns.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                    </ul>
                </div>
                </div>
            </section>


        </div>
    )
}
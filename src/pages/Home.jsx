import {Link} from "react-router-dom"
import heroBackground from '../assets/laptopDesk.png'
import serviceOne from '../assets/laptopsCoffee.png'
import serviceTwo from '../assets/webHosting.png'
import serviceThree from '../assets/SocialMediaService.png'
import serviceFour from '../assets/LeadGen.png'
import Demo1 from '../assets/VantageBlack.jpg'

import {useCompanyInfo} from '../components/CompanyInfoProvider.jsx'
import SectionHeading from "../components/SectionHeading.jsx"
import ServiceCard from '../components/ServiceCard.jsx'
import CTAButton from '../components/CTAButton.jsx'

export default function Home() {
    const {
        brandPillars,
        services,
        demoProjects,
        benefits = {},
    } = useCompanyInfo();

    const serviceIcons = [
    // Web Design & Development
    () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="14" stroke="#F5900D"/>
        <path d="M8 20h8" stroke="#F5900D"/>
      </svg>
    ),
    // Web Hosting & Maintenance
    () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="6" stroke="#F5900D"/>
        <rect x="3" y="11" width="18" height="6" stroke="#F5900D"/>
        <circle cx="7" cy="7" r="1" fill="#F5900D"/>
        <circle cx="7" cy="14" r="1" fill="#F5900D"/>
      </svg>
    ),
    // Social Media Marketing
    () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M4 8l8-4 8 4v8l-8 4-8-4V8z" stroke="#F5900D"/>
        <path d="M8 12h8M8 15h5" stroke="#F5900D"/>
      </svg>
    ),
    // Lead Generation & Growth
    () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M4 17l6-6 4 4 6-6" stroke="#F5900D"/>
        <path d="M16 5h4v4" stroke="#F5900D"/>
      </svg>
    ),
    ]

    const {
    eyebrow: benefitsEyebrow,
    title: benefitsTitle,
    description: benefitsDescription,
    items: benefitItems = [],
    ctaHref = '/contact',
    ctaLabel = 'Book a discovery session',
    } = benefits ?? {}


    


    return (
        <div className="page page--home">
            <section className="hero section--header" style={{'--hero-background': `url(${heroBackground})`}}>
                <div className="hero__content">
                    <h1>Building Digital Experiences That Inspire Action</h1>
                    <p className="lead">
                        At Mzansi Media Hub, we craft websites, brands and strategies that help businesses connect, stand out, and grow.
                    </p>
                    <div className="hero__actions">
                        <CTAButton to="/contact" variant="primary-fill">Find Out More</CTAButton>
                        <CTAButton to="/portfolio" variant="primary-fill">View Our Work</CTAButton>
                    </div>
                    <div className="hero__pillars">
                        {brandPillars.map((pillar) => (
                            <div key={pillar.label} className="pillar-card">
                                <span className="pillar-card__label">{pillar.label}</span>
                                <span className="pillar-card__value">{pillar.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="hero__media">
                    <div className="hero__panel">
                        <h3>What we do</h3>
                        <ul>
                            {services.map((service)=>(
                                <li key={service.title}>{service.title}</li>
                            ))}
                        </ul>
                        <Link to="/services" className="text-link">
                        Explore services {'->'}
                        </Link>
                    </div>
                    <div className="hero__media-image">
                        <img src={heroBackground} alt="Workspace setup"/>
                    </div>
                </div>
            </section>
            <section className="section section--services">
                <SectionHeading
                    eyebrow="Our Services"
                    title="Digital solutions to grow your business online"
                    description="We help businesses succeed with professional web design, reliable hosting, targeted social media marketing, and lead generation strategies that drive results."     
                />
                <div className="card-grid">
                    {services.map((service,index)=>{
                        // prevents undefined errors if icons are less than the number of service icons. It cycles back
                        const Icon = serviceIcons[index % serviceIcons.length];
                        return (
                            <ServiceCard 
                            key={service.title}
                            className="service-card"
                            service={service}
                            variant="icon"
                            icon={<Icon />}
                            />
                        );
                    })}
                </div>
            </section>

            {benefitItems.length>0 && (
                <section className="section section--benefits">
                    <SectionHeading 
                        eyebrow={benefitsEyebrow}
                        title={benefitsTitle}
                        // description={benefitsDescription}
                    />
                    <div className="split">
                        <div>
                            <p className="section-heading__description">{benefitsDescription}</p>
                            <p>
                                Launch confidently with conversion-first web design, secure hosting, and marketing support that scales with your team.
                            </p>
                            <CTAButton to={ctaHref} variant="primary-fill">{ctaLabel}</CTAButton>
                        </div>
                        <div>
                            {benefitItems.map((item)=> (
                                <div key={item.title}>
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
            )}
            <section className="section section--demos">
                <SectionHeading 
                eyebrow="Live demos"
                title="See what we can build for you"
                description="Explore starter templates and example builds. Each demo can be tailored to your brand and goals."
                // align="center"
                />

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
            </section>

            <section className="section section--demos">
                <div className="section__inner">
                <h2>Ready to amplify your next story?</h2>
                <p>
                    Book a 30-minute strategy session with our team to explore brand, content, and community opportunities tailored to your goals.
                </p>
                <div className="home-cta-row">
                    <CTAButton to="/contact" variant="primary-fill">Book a call</CTAButton>

                </div>
                {/* <div className="contact-card">
                    <span className="contact-card__label">Talk to us</span>
                    <CompanyInfoField path="contact.email" className="contact-card__value" />
                </div> */}
                </div>
            </section>
        </div>
    )
    
}
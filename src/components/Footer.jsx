import { Link } from 'react-router-dom'
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
} from 'react-icons/fa'
import { CompanyInfoField, useCompanyInfo } from './CompanyInfoProvider.jsx'
import CTAButton from './CTAButton.jsx'
import logoIcon from '../assets/MzansiMediaHubRoundOpaque.png'

const SOCIAL_ICON_MAP = {
//   linkedin: { label: 'LinkedIn', Icon: FaLinkedinIn },
  whatsapp: { label: 'WhatsApp', Icon: FaWhatsapp },
  facebook: { label: 'Facebook', Icon: FaFacebookF },
  instagram:  { label: 'Instagram', Icon: FaInstagram },
}

export default function Footer() {
    const {contact, social, hours, assets, name, tagline} = useCompanyInfo()

    const socialLinks = Object.entries(SOCIAL_ICON_MAP)
        .map(([key,meta])=>{
            const href=social?.[key]
            return href? {key, href, ...meta} : null
        }).filter(Boolean)

        const logoSrc=assets?.logoIcon || logoIcon;
        const phoneHref = contact?.phone ? contact.phone.replace(/\s+/g,''):''
        const handleFooterLinkClick = () => {
            window.scrollTo({top:0, behavior:'smooth'})
        }

        return (
            <footer className='site-footer'>
                <div className='site-footer__grid'>
                    <div>
                        <Link 
                        to='/'
                        className='brand brand--inverted'
                        aria-label={`${name || 'Home'}`}
                        onClick={handleFooterLinkClick}
                        >
                            <span className="brand__mark" aria-hidden="true">
                                <img
                                    src={logoSrc}
                                    alt=""
                                    className="brand__logo img--color"
                                    width="auto"
                                    height="auto"
                                    loading="eager"
                                    decoding="async"
                                />
                            </span>
                            <div className='brand__meta'>
                                <CompanyInfoField as='span' path='name' className='brand__name'/>
                                <span className='brand__tagline'>
                                    {tagline || 'Digital Experiences That Inspire Action.'}
                                </span>
                            </div>
                        </Link>
                        <ul className="footer-social">
                            {socialLinks.map(({ key, href, label, Icon }) => (
                            <li key={key}>
                                <a href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
                                <Icon size={18} />
                                </a>
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className='footer-heading'>Contact</h3>
                        <ul className='footer-list'>
                            {/* <li>
                                <a href={`mailto:${contact?.email ?? ''}`} className='footer-list__row'>
                                    <FaEnvelope className="footer-list__icon" aria-hidden="true" />
                                    <span>{contact?.email}</span>
                                </a>
                            </li> */}
                            <li>
                                <a href={`tel:${phoneHref}`} className="footer-list__row">
                                    <FaPhoneAlt className="footer-list__icon" aria-hidden="true" />
                                    <span>{contact?.phone}</span>
                                </a>
                            </li>
                            {/* <li className="footer-list__row">
                                <FaMapMarkerAlt className="footer-list__icon" aria-hidden="true" />
                                <span>{contact?.address}</span>
                            </li> */}
                                <li className="footer-list__row">
                                <FaClock className="footer-list__icon" aria-hidden="true" />
                                <span>{hours}</span>
                            </li> 
                        </ul>
                    </div>
                    <div>
                        <h3 className="footer-heading">Navigate</h3>
                        <ul className="footer-list">
                            <li><Link to="/" onClick={handleFooterLinkClick}>Home</Link></li>
                            <li><Link to="/services" onClick={handleFooterLinkClick}>Services</Link></li>
                            <li><Link to="/portfolio" onClick={handleFooterLinkClick}>Portfolio</Link></li>
                            <li><Link to="/about" onClick={handleFooterLinkClick}>About</Link></li>
                            <li><Link to="/contact" onClick={handleFooterLinkClick}>Contact</Link></li>
                        </ul>
                    </div>
                    {/* <div>
                        <h3 className="footer-heading">Stay in the loop</h3>
                        <p className="muted">Monthly inspiration, behind-the-scenes drops, and job board alerts.</p>
                        <CTAButton
                            to="/newsletter"
                            variant="ghost"
                            onClick={handleFooterLinkClick}
                        >
                            Join the newsletter
                        </CTAButton>

                    </div> */}
                </div>
                <div className="site-footer__meta">
                    <small>Copyright: {new Date().getFullYear()} {name}. Crafted in Johannesburg.</small>
                </div>

            </footer>
        )
}
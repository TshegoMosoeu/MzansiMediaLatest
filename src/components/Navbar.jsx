import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {FaBars, FaTimes} from'react-icons/fa'
import { CompanyInfoField, useCompanyInfo} from './CompanyInfoProvider.jsx'
import CTAButton from './CTAButton.jsx'
import logoIcon from '../assets/MzansiMediaHubRoundOpaque.png'


const navItems = [
    {label:'Home', to: '/'},
    {label:'Services', to: '/services'},
    {label:'Portfolio', to: '/portfolio'},
    {label:'About', to: '/about'},
    {label:'Contact', to: '/contact'},
    // {label:'Newsletter', to: '/newsletter'},
]



export default function Navbar() {
    useEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };

    onScroll(); // set initial state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
    
    const {tagline, assets, name} = useCompanyInfo();
    const [menuOpen, setMenuOpen] = useState(false);
    const logoSrc = assets?.logoIcon || logoIcon

    return (
        <header className={`site-header${menuOpen ? ' is-open': ''}`}>
            <div className='site-header__inner'>
                <Link to='/' className='brand' aria-label={`${name || 'Home'}`}>
                    <span className='brand__mark' aria-hidden='true'>
                        <img
                            src={logoSrc}
                            alt=''
                            className='brand__logo img--color'
                            width='50'
                            height='50'
                            loading='eager'
                            decoding='async' 
                        />
                    </span>
                    <div className='brand__meta'>
                        <CompanyInfoField as='span' path='name' className='brand__name' />
                        <span className='brand__tagline'>{tagline}</span>
                    </div>
                </Link>

                <button
                    className='nav-toggle'
                    type='button'
                    onClick={()=>setMenuOpen((open)=> !open)}
                    aria-expanded={menuOpen}
                    aria-controls='primary-navigation'                
                >
                    <span className='nav-toggle__icon' aria-hidden='true'>
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </span>
                    <span className='sr-only'>{menuOpen? 'Close menu' : 'Open menu'}</span>
                </button>

                <nav className='site-nav' id='primary-navigation'>
                    {navItems.map((item)=>(
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({isActive})=> `nav-link${isActive? ' is-active':''}`}
                            onClick={()=>setMenuOpen(false)}
                            end={item.to ==='/'}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className='site-header__cta'>
                    <CTAButton to='/contact' variant='outline'> 
                    Book a discovery call
                    </CTAButton>
                </div>
            </div>
        </header>
    )
}
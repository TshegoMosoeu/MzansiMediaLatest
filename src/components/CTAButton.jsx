import { Link } from 'react-router-dom'

export default function CTAButton({ to, href, children, variant = 'primary', className = '', ...rest }) {
  const classes = `cta-button cta-button--${variant} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}

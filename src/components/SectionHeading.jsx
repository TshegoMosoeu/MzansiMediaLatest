export default function SectionHeading({ eyebrow, title, description, align = 'left', kicker }) {
  return (
    <header className={`section-heading section-heading--${align}`}>
      {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
      {title && <h2 className="section-heading__title">{title}</h2>}
      {description && <p className="section-heading__description">{description}</p>}
      {kicker && <p className="section-heading__kicker">{kicker}</p>}
    </header>
  )
}

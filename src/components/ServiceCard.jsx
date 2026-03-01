export default function ServiceCard({
  service,
  className = '',
  variant = 'icon',
  icon = null,
}) {
  const { title, body, deliverables = [] } = service;

  if (variant === 'icon') {
    return (
      <article className={`card ${className}`}>
        <div className="service-card__icon">{icon}</div>
        <h3>{title}</h3>
        <p className="muted">{body}</p>
        {deliverables.length > 0 && (
          <ul className="tag-list tag-list--columns">
            {deliverables.map((d) => <li key={d}>{d}</li>)}
          </ul>
        )}
      </article>
    );
  }
  return (
    <article className="card card--service" style={{ '--card-background': `url(${backgroundImage})` }}>
      <div className="card__overlay" />
      <div className="card__content">
        <h3>{service.title}</h3>
        <p>{service.body}</p>
        <ul className="tag-list">
          {service.deliverables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

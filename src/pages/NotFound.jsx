import { Link } from 'react-router-dom'
import CTAButton from '../components/CTAButton.jsx'

export default function NotFoundPage() {
  return (
    <div className="page page--not-found">
      <div className="not-found section--demos">
        <h1>404</h1>
        <p>The page you're looking for has moved or no longer exists.</p>
        <div className="hero__actions">
          <CTAButton to="/" variant="primary-fill">Return home</CTAButton>
        </div>
      </div>
    </div>
  )
}

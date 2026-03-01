import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'
import ScrollToTop from './ScrollToTop.jsx'
import Navbar from './Navbar.jsx'

export default function Layout() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}


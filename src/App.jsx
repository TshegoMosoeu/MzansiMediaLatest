import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Newsletter from "./pages/Newsletter"
import NotFound from "./pages/NotFound"
import Portfolio from "./pages/Portfolio"
import Services from "./pages/Services"
import { Analytics } from "@vercel/analytics/react"
import Layout from './components/Layout'

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/portfolio" element={<Portfolio />}/>
          <Route path="/services" element={<Services />}/>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Analytics />
    </div>
  )
}

export default App

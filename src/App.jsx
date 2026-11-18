import { useCallback, useEffect, useState } from 'react'
import About from './components/About'
import Ambient from './components/Ambient'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import Experience from './components/Experience'
import Expertise from './components/Expertise'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import Projects from './components/Projects'
import ScrollProgress from './components/ScrollProgress'
import SmoothScroll from './components/SmoothScroll'
import TechMarquee from './components/TechMarquee'
import WhyMe from './components/WhyMe'
import { ScrollTrigger } from './lib/gsap'
import { scrollToSection } from './lib/scroll'

export default function App() {
  const [ready, setReady] = useState(false)
  const handleLoaded = useCallback(() => setReady(true), [])

  useEffect(() => {
    if (!ready) return undefined

    const refresh = () => ScrollTrigger.refresh()
    const timer = window.setTimeout(refresh, 350)

    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => {})
    }

    window.addEventListener('load', refresh)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('load', refresh)
    }
  }, [ready])

  useEffect(() => {
    if (!ready || !window.location.hash) return undefined

    const hash = window.location.hash
    const timer = window.setTimeout(() => scrollToSection(hash), 450)
    return () => window.clearTimeout(timer)
  }, [ready])

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Ambient />
      <Preloader onDone={handleLoaded} />
      <ScrollProgress />
      <Cursor />
      <SmoothScroll />
      <Navbar />

      <main id="main-content">
        <Hero ready={ready} />
        <TechMarquee />
        <About />
        <Projects />
        <Expertise />
        <Experience />
        <WhyMe />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

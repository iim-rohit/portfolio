import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import portfolio from '../data/portfolio.json'
import { scrollToSection } from '../lib/scroll'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const menuRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ids = portfolio.nav.map((item) => item.href.slice(1))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -52% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1081px)')
    const closeOnDesktop = (event) => {
      if (event.matches) setMenuOpen(false)
    }

    desktopQuery.addEventListener('change', closeOnDesktop)
    return () => desktopQuery.removeEventListener('change', closeOnDesktop)
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const menu = menuRef.current
    const toggle = toggleRef.current
    const menuLinks = menu
      ? Array.from(menu.querySelectorAll('a[href], button:not([disabled])'))
      : []
    const focusables = [toggle, ...menuLinks].filter(Boolean)

    const focusTimer = window.setTimeout(() => {
      menuLinks[0]?.focus({ preventScroll: true })
    }, 80)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        return
      }

      if (event.key !== 'Tab' || !focusables.length) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)

      if (
        window.matchMedia('(max-width: 1080px)').matches &&
        menu?.contains(document.activeElement)
      ) {
        toggle?.focus({ preventScroll: true })
      }
    }
  }, [menuOpen])

  const navigate = (event, href) => {
    event.preventDefault()
    setMenuOpen(false)
    window.setTimeout(() => scrollToSection(href), menuOpen ? 260 : 0)
  }

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-shell">
          <a
            href="#home"
            className="brand"
            onClick={(event) => navigate(event, '#home')}
            aria-label="Rohit Kumar — back to top"
          >
            <span className="brand-mark" aria-hidden="true">
              <span>RK</span>
            </span>
            <span className="brand-copy">
              <span className="brand-name">rohit kumar</span>
              <span className="brand-role">frontend developer</span>
            </span>
          </a>

          <nav className="nav-links" aria-label="Primary navigation">
            {portfolio.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link ${active === item.href ? 'is-active' : ''}`}
                aria-current={active === item.href ? 'location' : undefined}
                onClick={(event) => navigate(event, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <span className="nav-status">
              <span className="status-dot" aria-hidden="true" />
              Available
            </span>

            <a
              href="#contact"
              className="nav-cta"
              onClick={(event) => navigate(event, '#contact')}
            >
              Let&apos;s Talk
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>

            <button
              ref={toggleRef}
              type="button"
              className="menu-toggle"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ clipPath: 'circle(0% at 94% 6%)' }}
            animate={{ clipPath: 'circle(150% at 94% 6%)' }}
            exit={{ clipPath: 'circle(0% at 94% 6%)' }}
            transition={{ duration: 0.66, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mobile-menu-orb" aria-hidden="true" />
            <div className="mobile-menu-inner">
              <div className="mobile-menu-head">
                <span className="section-kicker">
                  <span className="section-index">NAV</span>
                  <span className="kicker-line" aria-hidden="true" />
                  MENU
                </span>
                <span className="mobile-menu-location">
                  {portfolio.person.location}
                </span>
              </div>

              <div className="mobile-links">
                {portfolio.nav.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="mobile-link"
                    onClick={(event) => navigate(event, item.href)}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      delay: 0.12 + index * 0.06,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <span className="mobile-link-index">0{index + 1}</span>
                    <span>{item.label}</span>
                    <ArrowUpRight size={22} aria-hidden="true" />
                  </motion.a>
                ))}
              </div>

              <motion.div
                className="mobile-menu-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4 }}
              >
                <a href={`mailto:${portfolio.person.email}`}>
                  {portfolio.person.email}
                </a>
                <div className="mobile-menu-socials">
                  <a
                    href="https://github.com/iim-rohit"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                  >
                    <GithubIcon size={17} />
                  </a>
                  <span aria-label="LinkedIn link coming soon" title="LinkedIn link coming soon">
                    <LinkedinIcon size={17} />
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

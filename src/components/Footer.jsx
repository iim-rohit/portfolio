import { ArrowUp, ArrowUpRight } from 'lucide-react'
import portfolio from '../data/portfolio.json'
import { scrollToTop } from '../lib/scroll'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container-wide">
        <div className="footer-top">
          <a
            href="#home"
            className="footer-brand"
            onClick={(event) => {
              event.preventDefault()
              scrollToTop()
            }}
            aria-label="Rohit Kumar — back to top"
          >
            <span className="brand-mark" aria-hidden="true">
              <span>RK</span>
            </span>
            <span>
              <strong>{portfolio.person.name}</strong>
              <small>{portfolio.person.role}</small>
            </span>
          </a>

          <nav className="footer-nav" aria-label="Footer navigation">
            {portfolio.nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="footer-socials">
            <a
              href="https://github.com/iim-rohit"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
            >
              <GithubIcon size={17} />
            </a>
            <span
              className="footer-social--disabled"
              aria-label="LinkedIn link coming soon"
              title="LinkedIn link coming soon"
            >
              <LinkedinIcon size={17} />
            </span>
            <a
              href={`mailto:${portfolio.person.email}`}
              className="footer-email-link"
            >
              {portfolio.person.email}
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {portfolio.person.name}. All rights reserved.
          </span>
          <span className="footer-credit">
            Designed &amp; built with React, GSAP and Framer Motion.
          </span>
          <button
            type="button"
            className="footer-top-button"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <ArrowUp size={15} aria-hidden="true" />
            Top
          </button>
        </div>
      </div>
    </footer>
  )
}

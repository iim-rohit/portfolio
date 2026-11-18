import {
  ArrowDown,
  ArrowUpRight,
  BadgeCheck,
  Download,
  GraduationCap,
  MapPin
} from 'lucide-react'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import portfolio from '../data/portfolio.json'
import { gsap } from '../lib/gsap'
import { scrollToSection } from '../lib/scroll'
import Magnetic from './Magnetic'
import TechIcon from './TechIcon'

const portraitChips = [
  { name: 'React', label: 'React', className: 'portrait-chip--react' },
  { name: 'Node.js', label: 'Node.js', className: 'portrait-chip--node' },
  { name: 'MongoDB', label: 'MongoDB', className: 'portrait-chip--mongo' }
]

export default function Hero({ ready }) {
  const heroRef = useRef(null)
  const portraitRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { person } = portfolio

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          [
            '.hero-kicker',
            '.hero-hello',
            '.hero-role',
            '.hero-description',
            '.hero-actions',
            '.hero-meta',
            '.hero-scroll',
            '.portrait-frame',
            '.portrait-chip',
            '.hero-side-note'
          ],
          { opacity: 1, y: 0, scale: 1 }
        )
        gsap.set('.hero-title .hero-line-inner', { yPercent: 0 })
        return
      }

      gsap.set(
        [
          '.hero-kicker',
          '.hero-hello',
          '.hero-role',
          '.hero-description',
          '.hero-actions',
          '.hero-meta',
          '.hero-scroll',
          '.hero-side-note'
        ],
        { opacity: 0, y: 18 }
      )
      gsap.set('.hero-title .hero-line-inner', { yPercent: 115 })
      gsap.set('.portrait-frame', { opacity: 0, y: 34, scale: 0.95 })
      gsap.set('.portrait-chip', { opacity: 0, scale: 0.85 })
    }, heroRef)

    return () => context.revert()
  }, [reduceMotion])

  useEffect(() => {
    if (!ready || reduceMotion) return undefined

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power4.out' }
      })

      timeline
        .to('.hero-kicker', { opacity: 1, y: 0, duration: 0.6 }, 0.05)
        .to('.hero-hello', { opacity: 1, y: 0, duration: 0.55 }, 0.14)
        .to(
          '.hero-title .hero-line-inner',
          { yPercent: 0, duration: 1.08, stagger: 0.09 },
          0.2
        )
        .to('.hero-role', { opacity: 1, y: 0, duration: 0.6 }, 0.72)
        .to('.hero-description', { opacity: 1, y: 0, duration: 0.7 }, 0.8)
        .to('.hero-actions', { opacity: 1, y: 0, duration: 0.65 }, 0.9)
        .to('.hero-meta', { opacity: 1, y: 0, duration: 0.65 }, 0.98)
        .to(
          '.portrait-frame',
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' },
          0.34
        )
        .to(
          '.portrait-chip',
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'back.out(1.7)'
          },
          1.02
        )
        .to('.hero-scroll', { opacity: 1, y: 0, duration: 0.7 }, 1.08)
        .to('.hero-side-note', { opacity: 1, y: 0, duration: 0.7 }, 1.1)
    }, heroRef)

    return () => context.revert()
  }, [ready, reduceMotion])

  useEffect(() => {
    if (
      reduceMotion ||
      window.matchMedia('(pointer: coarse)').matches ||
      !portraitRef.current
    ) {
      return undefined
    }

    const portrait = portraitRef.current
    const rotateX = gsap.quickTo(portrait, 'rotationX', {
      duration: 0.7,
      ease: 'power3.out'
    })
    const rotateY = gsap.quickTo(portrait, 'rotationY', {
      duration: 0.7,
      ease: 'power3.out'
    })

    const handleMove = (event) => {
      const bounds = portrait.getBoundingClientRect()
      const px = (event.clientX - bounds.left) / bounds.width - 0.5
      const py = (event.clientY - bounds.top) / bounds.height - 0.5
      rotateX(py * -5)
      rotateY(px * 6)
    }

    const handleLeave = () => {
      rotateX(0)
      rotateY(0)
    }

    portrait.addEventListener('pointermove', handleMove)
    portrait.addEventListener('pointerleave', handleLeave)

    return () => {
      portrait.removeEventListener('pointermove', handleMove)
      portrait.removeEventListener('pointerleave', handleLeave)
    }
  }, [reduceMotion])

  return (
    <section
      id="home"
      ref={heroRef}
      className={`hero ${ready ? 'is-ready' : ''}`}
      aria-labelledby="hero-title"
    >
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-backdrop__grid" />
        <div className="hero-backdrop__glow hero-backdrop__glow--a" />
        <div className="hero-backdrop__glow hero-backdrop__glow--b" />
        <div className="hero-backdrop__line hero-backdrop__line--a" />
        <div className="hero-backdrop__line hero-backdrop__line--b" />
      </div>

      <div className="container-wide hero-inner">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="hero-kicker-dot" aria-hidden="true" />
            <span>{person.availability}</span>
          </div>

          <p className="hero-hello">
            <span>{person.heroHeading.line1}</span>
            <span className="hero-hello-name">
              {person.heroHeading.line2} {person.heroHeading.line3}
            </span>
          </p>

          <h1
            id="hero-title"
            className="hero-title"
            aria-label="Building digital experiences that matter"
          >
            <span className="hero-line" aria-hidden="true">
              <span className="hero-line-inner">{person.heroStatement.line1}</span>
            </span>
            <span className="hero-line hero-line--accent" aria-hidden="true">
              <span className="hero-line-inner">{person.heroStatement.line2}</span>
            </span>
            <span className="hero-line hero-line--last" aria-hidden="true">
              <span className="hero-line-inner">{person.heroStatement.line3}</span>
            </span>
          </h1>

          <div className="hero-role">
            {person.tagline.split(' · ').map((item, index, all) => (
              <span className="hero-role-item" key={item}>
                <span>{item}</span>
                {index < all.length - 1 ? (
                  <span className="hero-role-dot" aria-hidden="true" />
                ) : null}
              </span>
            ))}
          </div>

          <p className="hero-description">{person.heroDescription}</p>

          <div className="hero-actions">
            <Magnetic>
              <a
                className="btn btn--primary"
                href="#contact"
                onClick={(event) => {
                  event.preventDefault()
                  scrollToSection('#contact')
                }}
              >
                Let&apos;s Talk
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </Magnetic>

            <Magnetic>
              <a
                className="btn btn--ghost"
                href={person.resumeUrl}
                download
              >
                {person.resumeLabel}
                <Download size={16} aria-hidden="true" />
              </a>
            </Magnetic>
          </div>

          <div className="hero-meta">
            <span>
              <MapPin size={14} aria-hidden="true" />
              {person.location.split(',')[0]}, India
            </span>
            <span>
              <GraduationCap size={14} aria-hidden="true" />
              B.Tech IT · 2026
            </span>
            <span>
              <BadgeCheck size={14} aria-hidden="true" />
              MERN certified
            </span>
          </div>
        </div>

        <div className="hero-portrait" aria-hidden="true">
          <div className="hero-portrait__grid" />
          <div className="hero-portrait__glow" />
          <div className="portrait-orbit portrait-orbit--outer" />
          <div className="portrait-orbit portrait-orbit--inner" />
          <span className="portrait-cross portrait-cross--tl" />
          <span className="portrait-cross portrait-cross--br" />

          <div className="portrait-frame" ref={portraitRef}>
            <div className="portrait-frame-top">
              <span>PORTRAIT / 2026</span>
              <span className="portrait-frame-status">
                <span className="status-dot" />
                OPEN TO WORK
              </span>
            </div>

            <div className="portrait-media">
              <img
                src={person.portrait}
                alt=""
                width="900"
                height="1120"
                fetchPriority="high"
              />
              <span className="portrait-media__wash" />
              <span className="portrait-media__scan" />
              <span className="portrait-media__corner portrait-media__corner--tl" />
              <span className="portrait-media__corner portrait-media__corner--br" />

              <div className="portrait-caption">
                <span className="portrait-caption-label">THE DEVELOPER</span>
                <strong>{person.name}</strong>
                <span>{person.role} · MERN learner</span>
              </div>
            </div>

            <div className="portrait-frame-bottom">
              <span>BASED IN PATNA, IN</span>
              <span className="portrait-frame-rule" />
              <span>SCROLL TO EXPLORE</span>
            </div>
          </div>

          {portraitChips.map((chip) => (
            <span
              key={chip.label}
              className={`portrait-chip ${chip.className}`}
            >
              <span className="portrait-chip-icon">
                <TechIcon name={chip.name} size={15} />
              </span>
              {chip.label}
            </span>
          ))}

          <span className="portrait-side-note hero-side-note">
            CRAFTED WITH INTENT
          </span>
        </div>
      </div>

      <button
        type="button"
        className="hero-scroll"
        onClick={() => scrollToSection('#projects')}
        aria-label="Scroll to selected projects"
      >
        <span className="hero-scroll-ring" aria-hidden="true">
          <ArrowDown size={14} />
        </span>
        <span>Scroll to explore</span>
      </button>

      <div className="hero-baseline" aria-hidden="true">
        <span>FRONTEND DEVELOPER</span>
        <span />
        <span>PORTFOLIO / 2026</span>
      </div>
    </section>
  )
}

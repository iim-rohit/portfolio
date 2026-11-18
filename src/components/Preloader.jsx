import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import portfolio from '../data/portfolio.json'

function shouldShowPreloader() {
  try {
    return !sessionStorage.getItem('rk-visited')
  } catch {
    return true
  }
}

export default function Preloader({ onDone }) {
  const [visible, setVisible] = useState(shouldShowPreloader)
  const [progress, setProgress] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    let finished = false
    let frame
    let timeout

    const hasVisited = () => {
      try {
        return Boolean(sessionStorage.getItem('rk-visited'))
      } catch {
        return false
      }
    }

    const finish = () => {
      if (finished) return
      finished = true
      setProgress(100)
      try {
        sessionStorage.setItem('rk-visited', 'true')
      } catch {
        // Storage can be unavailable in privacy-restricted contexts.
      }
      timeout = window.setTimeout(
        () => {
          setVisible(false)
          onDone()
        },
        reduceMotion ? 0 : 420
      )
    }

    if (hasVisited()) {
      setVisible(false)
      onDone()
      return undefined
    }

    const duration = reduceMotion ? 250 : 1350
    const start = performance.now()

    const fallback = window.setTimeout(finish, duration + 700)

    const tick = (now) => {
      const next = Math.min(100, ((now - start) / duration) * 100)
      setProgress(Math.round(next))

      if (next < 100) {
        frame = requestAnimationFrame(tick)
      } else {
        finish()
      }
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(fallback)
      window.clearTimeout(timeout)
    }
  }, [onDone, reduceMotion])

  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', visible)
    return () => document.documentElement.classList.remove('is-loading')
  }, [visible])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="preloader"
          aria-hidden="true"
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="preloader-grid" aria-hidden="true" />
          <div className="preloader-glow" aria-hidden="true" />
          <span className="preloader-watermark">RK</span>

          <div className="preloader-top">
            <span className="preloader-mark">RK</span>
            <span className="preloader-meta">PORTFOLIO / 2026</span>
          </div>

          <div className="preloader-center">
            <span className="preloader-label">LOADING THE EXPERIENCE</span>
            <motion.p
              className="preloader-name"
              initial={{ y: 34, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              {portfolio.person.name.toUpperCase()}
            </motion.p>
            <p className="preloader-role">{portfolio.person.role.toUpperCase()}</p>
          </div>

          <div className="preloader-bottom">
            <span>PATNA · INDIA</span>
            <div className="preloader-track" aria-hidden="true">
              <motion.span
                className="preloader-progress"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="preloader-count">
              {String(progress).padStart(3, '0')}%
            </span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

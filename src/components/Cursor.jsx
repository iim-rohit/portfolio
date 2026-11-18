import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (!finePointer || reduceMotion) return undefined

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return undefined

    document.body.classList.add('has-custom-cursor')

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.42, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.42, ease: 'power3.out' })

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 })

    const handlePointerMove = (event) => {
      dotX(event.clientX)
      dotY(event.clientY)
      ringX(event.clientX)
      ringY(event.clientY)
      gsap.to([dot, ring], { opacity: 1, duration: 0.2, overwrite: 'auto' })
    }

    const handlePointerOver = (event) => {
      const interactive = event.target.closest(
        'a, button, input, textarea, select, [data-cursor="hover"]'
      )
      ring.classList.toggle('cursor-ring--active', Boolean(interactive))
    }

    const handlePointerDown = () => {
      gsap.to(ring, { scale: 0.82, duration: 0.18, overwrite: 'auto' })
    }

    const handlePointerUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.3, ease: 'back.out(2)', overwrite: 'auto' })
    }

    const handlePointerLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2, overwrite: 'auto' })
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerover', handlePointerOver, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    document.documentElement.addEventListener('mouseleave', handlePointerLeave)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerover', handlePointerOver)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave)
    }
  }, [])

  return (
    <div className="cursor-layer" aria-hidden="true">
      <span ref={dotRef} className="cursor-dot" />
      <span ref={ringRef} className="cursor-ring" />
    </div>
  )
}

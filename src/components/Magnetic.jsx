import { useRef } from 'react'
import { gsap } from '../lib/gsap'

export default function Magnetic({ children, strength = 0.22, className = '' }) {
  const ref = useRef(null)

  const handlePointerMove = (event) => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return
    }

    const bounds = ref.current.getBoundingClientRect()
    const x = (event.clientX - bounds.left - bounds.width / 2) * strength
    const y = (event.clientY - bounds.top - bounds.height / 2) * strength

    gsap.to(ref.current, {
      x,
      y,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: 'auto'
    })
  }

  const handlePointerLeave = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto'
    })
  }

  return (
    <span
      ref={ref}
      className={`magnetic ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </span>
  )
}

import { useRef } from 'react'

export default function TiltCard({
  children,
  className = '',
  max = 6,
  as: Component = 'div',
  ...props
}) {
  const ref = useRef(null)

  const reset = () => {
    const element = ref.current
    if (!element) return
    element.style.setProperty('--rx', '0deg')
    element.style.setProperty('--ry', '0deg')
    element.style.setProperty('--mx', '50%')
    element.style.setProperty('--my', '50%')
  }

  const handlePointerMove = (event) => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return
    }

    const element = ref.current
    const bounds = element.getBoundingClientRect()
    const px = (event.clientX - bounds.left) / bounds.width
    const py = (event.clientY - bounds.top) / bounds.height

    element.style.setProperty('--rx', `${(0.5 - py) * max * 2}deg`)
    element.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`)
    element.style.setProperty('--mx', `${px * 100}%`)
    element.style.setProperty('--my', `${py * 100}%`)
  }

  return (
    <Component
      ref={ref}
      className={`tilt-card ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      {...props}
    >
      {children}
    </Component>
  )
}

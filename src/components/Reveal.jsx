import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  once = true,
  as = 'div'
}) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as] || motion.div

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-70px' }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </Component>
  )
}

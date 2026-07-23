// Helpers shared across the homepage section components in this folder — extracted
// from the former monolithic App.jsx so each section file only imports what it needs.
import { useEffect, useRef, useState } from 'react'
import { motion, animate, useInView, useReducedMotion } from 'framer-motion'

/* ── Motion presets — enter recipe: opacity + y, smooth easing (GPU-cheap, no filter) ── */
export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
export const container = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }
export const viewport = { once: true, margin: '-60px' }

/* ── Animated counter (respects reduced-motion) ── */
export function Counter({ to, prefix = '', suffix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  // Start at `to` so SSG pre-renders the real number (not 0).
  // Client-side: animate from 0 when element enters view.
  const [val, setVal] = useState(to)
  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to, reduce, duration])
  return <span ref={ref}>{prefix}{val}{suffix}</span>
}

/* ── Cursor-following spotlight on cards (scoped, hover-only) ── */
export const onSpot = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

/* ── Reveal wrapper ── */
export const Reveal = ({ children, className = '', ...rest }) => (
  <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className={className} {...rest}>
    {children}
  </motion.div>
)

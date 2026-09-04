/* ── HC Contracting — site-specific motion ──────────────────────────────────
   Four techniques written for this brand on top of the shared kit. Each one is
   a real entry from references/animation-and-motion-richness.md, composed for
   an ultra-condensed all-caps display face and a colour-block visual language:

     1. ClipLines    — Clip Reveal, masked per line instead of per block.
     2. ConduitRule  — Sequential Line Draw with a delayed square terminal.
     3. Voltage Sweep (CSS, in app.css) — Underline Sweep as a colour block.
     4. Odometer     — Step-by-Step Reveal expressed as a masked numeral reel.

   Every one has an explicit reduced-motion fallback (see the media block at the
   foot of app.css, plus the guards in this file).
   ───────────────────────────────────────────────────────────────────────── */
import { useEffect, useRef, useState } from 'react'
import { useInView, prefersReducedMotion } from './motion.jsx'

/* 1 — Line-by-line clip reveal for the Six Caps stacks.
   trigger 'load' for above-the-fold copy that will never receive a scroll
   event; 'scroll' everywhere else, at the repo's 0.18 / -12% timing. */
export function ClipLines({
  lines,
  as: Tag = 'span',
  trigger = 'scroll',
  step = 110,
  start = 0,
  className = '',
  lineClassName = '',
  ...rest
}) {
  const [ref, inView] = useInView({ threshold: 0.18, rootMargin: '0px 0px -12% 0px' })
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (trigger !== 'load') return
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [trigger])
  const on = trigger === 'load' ? loaded : inView
  return (
    <Tag
      ref={trigger === 'load' ? undefined : ref}
      className={`hcx-lines ${className}`}
      data-in={on ? 'true' : 'false'}
      {...rest}
    >
      {lines.map((line, i) => (
        <span className={`hcx-line ${lineClassName}`} key={i}>
          <span className="hcx-line__in" style={{ '--reveal-delay': `${start + i * step}ms` }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}

/* 2 — Conduit rule: a hairline draws left to right, then a square terminal
   lands on the end of the run. */
export function ConduitRule({ trigger = 'scroll', delay = 0, className = '', width }) {
  const [ref, inView] = useInView({ threshold: 0.2, rootMargin: '0px 0px -10% 0px' })
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (trigger !== 'load') return
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [trigger])
  const on = trigger === 'load' ? loaded : inView
  return (
    <span
      ref={trigger === 'load' ? undefined : ref}
      className={`hcx-rule ${className}`}
      data-in={on ? 'true' : 'false'}
      aria-hidden="true"
      style={{ '--reveal-delay': `${delay}ms`, ...(width ? { '--rule-line-w': width } : null) }}
    >
      <span className="hcx-rule__line" />
      <span className="hcx-rule__cap" />
    </span>
  )
}

/* 4 — Odometer reel. Renders every cell and translates the reel, so the
   outgoing and incoming numerals are physically connected. */
export function Odometer({ cells, index, className = '' }) {
  return (
    <span className={`hcx-odo ${className}`} aria-hidden="true">
      <span
        className="hcx-odo__reel"
        style={{ transform: `translate3d(0, calc(${-index} * var(--odo-h, 1em)), 0)` }}
      >
        {cells.map((c, i) => (
          <span className="hcx-odo__cell" key={i}>{c}</span>
        ))}
      </span>
    </span>
  )
}

/* Button Magnetic Hover — a few pixels of pull, desktop pointers only.
   Premium execution note on that entry: keep the pull small. */
export function useMagnet(strength = 5) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    if (window.matchMedia('(hover: none)').matches) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
      el.style.transform = `translate3d(${(dx * strength).toFixed(2)}px, ${(dy * strength * 0.5).toFixed(2)}px, 0)`
    }
    const leave = () => { el.style.transform = '' }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [strength])
  return ref
}

/* Fires once the page has painted — the load-in trigger for hero content that
   sits above the fold and would otherwise wait for a scroll that never comes. */
export function useLoaded(delay = 60) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setOn(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  return on
}

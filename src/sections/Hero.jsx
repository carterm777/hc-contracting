import { HeartHandshake, ShieldCheck, ClipboardList, Truck, Phone, ArrowDownRight } from 'lucide-react'
import { useMediaQuery, useParallax } from '../lib/motion.jsx'
import { ClipLines, ConduitRule, useLoaded, useMagnet } from '../lib/hcmotion.jsx'
import { BIZ } from '../data/site.js'
import PhotoDiagnosis from './PhotoDiagnosis.jsx'
import './hero.css'

const H1_LINES = ['Trusted Electrical', 'Contractors Serving', 'Edmonton Since 2010']

const BADGES = [
  { icon: HeartHandshake, label: 'Satisfaction Guarantee' },
  { icon: ShieldCheck, label: 'Licensed & Insured' },
  { icon: ClipboardList, label: 'Free Estimates' },
  { icon: Truck, label: 'Mobile Service Calls' },
]

const NEARBY = ['Edmonton', 'Sherwood Park', 'St. Albert', 'Spruce Grove', 'Leduc', 'Fort Saskatchewan']

export default function Hero() {
  const wide = useMediaQuery('(min-width: 900px)')
  const on = useLoaded(80)
  const callRef = useMagnet(4)
  const photoRef = useParallax(0.06, { disableBelow: 900 })

  return (
    <section className="hero" id="home">
      {/* Layer 1 — the photographic field, bleeding off the right edge. The
          widget panel overhangs its left edge, so the photo stays visible as
          an L wrapping the panel rather than a strip behind it. */}
      {wide ? (
        <div className="hero__field">
          <img
            className="hero__photo"
            ref={photoRef}
            src="/images/home-hero.webp"
            alt="A white service van parked at the curb of an Edmonton bungalow with its rear doors open on a stocked interior."
            width="2000"
            height="1125"
            fetchpriority="high"
            decoding="async"
          />
          <span className="hero__field-scrim" aria-hidden="true" />
          <span className="hero__corner" aria-hidden="true" />
        </div>
      ) : null}

      <div className="shell shell--wide hero__grid">
        <div className="hero__copy" data-in={on ? 'true' : 'false'}>
          <p className="hero__eyebrow-row">
            <ConduitRule trigger="load" delay={0} width="2.75rem" />
            <span className="eyebrow">Residential · Commercial · Mobile</span>
          </p>

          <h1 className="hero__h1 disp">
            <ClipLines lines={H1_LINES} trigger="load" start={180} step={120} />
          </h1>

          <p className="hero__sub" data-load style={{ '--reveal-delay': '560ms' }}>
            Licensed electrical and contracting work for homes and businesses, handled by a crew
            that names the problem straight and gets it fixed, not talked around.
          </p>

          <ul className="hero__badges list-reset" data-load style={{ '--reveal-delay': '680ms' }}>
            {BADGES.map((b) => (
              <li className="hero__badge" key={b.label}>
                <span className="hero__badge-icon" aria-hidden="true"><b.icon className="lucide" /></span>
                <span className="hero__badge-label">{b.label}</span>
              </li>
            ))}
          </ul>

          <div className="hero__cta" data-load style={{ '--reveal-delay': '800ms' }}>
            <a className="btn btn--primary btn--lg hero__call" href={BIZ.tel} ref={callRef}>
              <Phone className="lucide" aria-hidden="true" />
              <span className="hero__call-full">Call {BIZ.phoneDisplay}</span>
              <span className="hero__call-short">Call Now</span>
            </a>
            <a className="btn btn--ghost btn--lg hero__services" href="#services">
              <span>See The Services</span>
              <ArrowDownRight className="lucide" aria-hidden="true" />
            </a>
          </div>

          <div className="hero__strip" data-load style={{ '--reveal-delay': '940ms' }}>
            <span className="hero__strip-label">Where The Crew Works</span>
            <ul className="hero__strip-list list-reset">
              {NEARBY.map((n) => <li key={n}>{n}</li>)}
              <li className="hero__strip-more"><a className="tlink" href="#coverage">+ four more</a></li>
            </ul>
          </div>
        </div>

        <div className="hero__panel" data-load style={{ '--reveal-delay': '420ms' }}>
          <PhotoDiagnosis />
        </div>
      </div>
    </section>
  )
}

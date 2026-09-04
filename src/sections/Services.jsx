import { ArrowUpRight, Phone } from 'lucide-react'
import { Reveal } from '../lib/motion.jsx'
import { ClipLines, ConduitRule } from '../lib/hcmotion.jsx'
import { SERVICES, BIZ } from '../data/site.js'
import './services.css'

export default function Services() {
  const [feature, ...rest] = SERVICES

  return (
    <section className="section svc" id="services" aria-labelledby="svc-title">
      <div className="shell">
        <div className="svc__head">
          <div>
            <p className="sec-head__eyebrow">
              <ConduitRule width="2.75rem" />
              <span className="eyebrow">Core Services</span>
            </p>
            <h2 className="svc__title disp" id="svc-title">
              <ClipLines lines={['Six Kinds Of Work,', 'One Standard']} step={110} />
            </h2>
          </div>
          <Reveal technique="rise" delay={140} className="svc__head-aside">
            <p className="svc__lede lede">
              Residential, commercial, outdoor lighting and mobile service calls — most weeks
              include a mix of all four, plus panel and renovation work booked around the other
              trades.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Flagship band — the mobile service side of the business is the real
          differentiator, so it gets the full-width showcase treatment. */}
      <Reveal technique="focus" className="svc__feature">
        <img
          className="svc__feature-img"
          data-ambient
          src={feature.img}
          alt={feature.alt}
          loading="lazy"
          decoding="async"
          width="2000"
          height="1125"
        />
        <span className="svc__feature-scrim" aria-hidden="true" />
        <div className="shell svc__feature-inner">
          <p className="svc__feature-tag">The One Most People Call About</p>
          <h3 className="svc__feature-title disp">{feature.title}</h3>
          <p className="svc__feature-copy">{feature.body}</p>
          <a className="btn btn--on-blue svc__feature-btn" href={BIZ.tel}>
            <Phone className="lucide" aria-hidden="true" />
            <span>Book A Service Call</span>
          </a>
        </div>
      </Reveal>

      <div className="shell">
        <ul className="svc__mosaic list-reset">
          {rest.map((s, i) => (
            <Reveal
              as="li"
              technique="rise"
              className={`svc__tile svc__tile--${i + 1}`}
              delay={i * 90}
              key={s.title}
            >
              <img
                className="svc__tile-img"
                src={s.img}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                width="2000"
                height="1125"
              />
              <span className="svc__tile-scrim" aria-hidden="true" />
              <div className="svc__tile-caption">
                <h3 className="svc__tile-title disp">{s.title}</h3>
                <span className="svc__tile-rule" aria-hidden="true" />
                <p className="svc__tile-copy">{s.body}</p>
              </div>
              <span className="svc__tile-arrow" aria-hidden="true"><ArrowUpRight className="lucide" /></span>
            </Reveal>
          ))}
        </ul>

        <Reveal technique="rise" delay={100} className="svc__foot">
          <p className="svc__foot-copy">
            Not sure which one the job falls under? Describe it and we’ll tell you straight.
          </p>
          <a className="btn btn--primary svc__foot-btn" href={BIZ.tel}>
            <Phone className="lucide" aria-hidden="true" />
            <span>Call {BIZ.phoneDisplay}</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}

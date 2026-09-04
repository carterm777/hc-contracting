import { Wrench, Truck, Award, ShieldCheck, Phone } from 'lucide-react'
import { Reveal, useCursorGlow } from '../lib/motion.jsx'
import { ClipLines, ConduitRule } from '../lib/hcmotion.jsx'
import { WHY, BIZ } from '../data/site.js'
import './why.css'

const ICONS = { Wrench, Truck, Award, ShieldCheck }

export default function WhyUs() {
  const glowRef = useCursorGlow()

  return (
    <section className="section why" id="why" aria-labelledby="why-title" ref={glowRef} data-glow-surface>
      <div className="shell why__inner">
        <div className="why__head">
          <p className="sec-head__eyebrow">
            <ConduitRule className="hcx-rule--bright" width="2.75rem" />
            <span className="eyebrow eyebrow--on-dark">Why This Crew</span>
          </p>
          <h2 className="why__title disp" id="why-title">
            <ClipLines lines={['Four Reasons', 'People Call Back']} step={110} />
          </h2>
          <Reveal technique="rise" delay={140}>
            <p className="why__lede">
              Nothing here is a promise about someone else’s work. It is how this crew has run
              residential and commercial jobs across Edmonton since 2010.
            </p>
          </Reveal>
        </div>

        <ol className="why__list list-reset">
          {WHY.map((item, i) => {
            const Icon = ICONS[item.icon]
            return (
              <Reveal as="li" technique="rise" className="why__item" delay={i * 120} key={item.n}>
                <span className="why__n disp" aria-hidden="true">{item.n}</span>
                <div className="why__body">
                  <h3 className="why__h3 disp">{item.title}</h3>
                  <span className="why__rule" aria-hidden="true" />
                  <p className="why__copy">{item.body}</p>
                </div>
                <span className="why__icon" aria-hidden="true"><Icon className="lucide" /></span>
              </Reveal>
            )
          })}
        </ol>

        <Reveal technique="rise" delay={120} className="why__cta">
          <p className="why__cta-copy">Got something that needs looking at today?</p>
          <a className="btn btn--on-dark why__cta-btn" href={BIZ.tel}>
            <Phone className="lucide" aria-hidden="true" />
            <span>Call {BIZ.phoneDisplay}</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}

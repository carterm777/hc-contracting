import { Phone } from 'lucide-react'
import { Reveal, useAccordion } from '../lib/motion.jsx'
import { ClipLines, ConduitRule } from '../lib/hcmotion.jsx'
import { FAQS, BIZ } from '../data/site.js'
import './faq.css'

export default function Faq() {
  const { toggle, isOpen } = useAccordion(0)

  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="shell">
        <div className="faq__head">
          <div>
            <p className="sec-head__eyebrow">
              <ConduitRule width="2.75rem" />
              <span className="eyebrow">Questions, Answered</span>
            </p>
            <h2 className="faq__title disp" id="faq-title">
              <ClipLines lines={['The Things', 'People Ask First']} step={110} />
            </h2>
          </div>
          <Reveal technique="rise" delay={140} className="faq__head-aside">
            <p className="faq__lede lede">
              Six straight answers, written the way the crew would say them on the phone. If
              yours isn’t here, the fastest route to one is still the phone.
            </p>
          </Reveal>
        </div>

        <ul className="faq__grid list-reset">
          {FAQS.map((f, i) => (
            <Reveal
              as="li"
              technique="rise"
              className="faq__card"
              delay={(i % 2) * 90}
              data-open={isOpen(i) ? 'true' : 'false'}
              key={f.q}
            >
              <h3 className="faq__q">
                <button
                  type="button"
                  className="faq__trigger"
                  aria-expanded={isOpen(i)}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  onClick={() => toggle(i)}
                >
                  <span className="faq__q-text">{f.q}</span>
                  <span className="faq__icon" aria-hidden="true">
                    <span className="faq__icon-bar" />
                    <span className="faq__icon-bar" />
                  </span>
                </button>
              </h3>
              <div
                className="faq__panel"
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-trigger-${i}`}
              >
                <div className="faq__panel-inner">
                  <p className="faq__a">{f.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal technique="rise" delay={100} className="faq__foot">
          <p className="faq__foot-copy">Still stuck on something?</p>
          <a className="btn btn--primary faq__foot-btn" href={BIZ.tel}>
            <Phone className="lucide" aria-hidden="true" />
            <span>Call {BIZ.phoneDisplay}</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}

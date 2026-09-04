import { Phone, MessageSquareText, Check, RotateCcw, ArrowRight } from 'lucide-react'
import { Reveal } from '../lib/motion.jsx'
import { ClipLines, ConduitRule, useMagnet } from '../lib/hcmotion.jsx'
import { useDemoForm } from '../lib/usePhotoDiagnosis.js'
import { BIZ, REASSURANCE } from '../data/site.js'
import './cta.css'

export default function FinalCta() {
  const form = useDemoForm(
    { name: '', phone: '', detail: '' },
    { required: ['name', 'phone', 'detail'] }
  )
  const callRef = useMagnet(4)
  const done = form.status === 'done'

  return (
    <section className="section cta" id="contact" aria-labelledby="cta-title">
      <img
        className="cta__texture"
        src="/images/flatlay-materials.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width="2000"
        height="1125"
      />
      <span className="cta__wash" aria-hidden="true" />
      <span className="cta__ghost disp" aria-hidden="true">Fixed</span>

      <div className="shell cta__grid">
        <div className="cta__copy">
          <p className="sec-head__eyebrow">
            <ConduitRule className="hcx-rule--bright" width="2.75rem" />
            <span className="eyebrow eyebrow--on-blue">Get It Booked</span>
          </p>
          <h2 className="cta__title disp" id="cta-title">
            <ClipLines lines={['Ready For A Crew', 'That Just Fixes It?']} step={110} />
          </h2>
          <Reveal technique="rise" delay={140}>
            <p className="cta__lede">
              Call now for a free estimate on residential, commercial, or mobile electrical service
              in Edmonton and the surrounding area.
            </p>
          </Reveal>
          <Reveal technique="rise" delay={200} className="cta__actions">
            <a className="btn btn--on-blue btn--lg cta__call" href={BIZ.tel} ref={callRef}>
              <Phone className="lucide" aria-hidden="true" />
              <span>Call {BIZ.phoneDisplay}</span>
            </a>
            <a className="btn btn--outline-blue btn--lg cta__text" href={`${BIZ.sms}?&body=Hi%20HC%20Contracting%2C%20I%27d%20like%20a%20quote%20on%20some%20electrical%20work.`}>
              <MessageSquareText className="lucide" aria-hidden="true" />
              <span>Text Us Instead</span>
            </a>
          </Reveal>
          <Reveal technique="fade" delay={260}>
            <p className="cta__hours">
              Prefer not to call? Send a text and you’ll get the same straight answer back in
              writing.
            </p>
          </Reveal>
        </div>

        <Reveal technique="rise" delay={120} className="cta__panel">
          <div className="cta__panel-head">
            <p className="cta__panel-kicker">Or Leave It Here</p>
            <p className="cta__panel-title disp">Ask For A Free Estimate</p>
          </div>

          {done ? (
            <div className="cta__success" role="status">
              <span className="cta__success-mark" aria-hidden="true"><Check className="lucide" /></span>
              <h3 className="cta__success-title disp">That’s In. Talk Soon.</h3>
              <p className="cta__success-copy">
                Thanks {form.fields.name.trim().split(' ')[0]} — the crew has your note and will call
                {' '}{form.fields.phone} with a straight answer on scope and cost.
              </p>
              <div className="cta__success-actions">
                <a className="btn btn--primary cta__success-btn" href={BIZ.tel}>
                  <Phone className="lucide" aria-hidden="true" />
                  <span>Call Now Instead</span>
                </a>
                <button type="button" className="cta__reset" onClick={form.reset}>
                  <RotateCcw className="lucide" aria-hidden="true" />
                  <span>Send another</span>
                </button>
              </div>
            </div>
          ) : (
            <form className="cta__form" onSubmit={form.submit} noValidate>
              <div className="cta__field">
                <label className="cta__label" htmlFor="cta-name">Your Name</label>
                <input
                  id="cta-name"
                  className="cta__input"
                  type="text"
                  autoComplete="name"
                  placeholder="Dana Whitfield"
                  value={form.fields.name}
                  onChange={form.setField('name')}
                  aria-invalid={form.errors.name ? 'true' : 'false'}
                  aria-describedby={form.errors.name ? 'cta-name-error' : undefined}
                />
                {form.errors.name ? <p className="cta__error" id="cta-name-error">We need a name to get back to you.</p> : null}
              </div>
              <div className="cta__field">
                <label className="cta__label" htmlFor="cta-phone">Best Number</label>
                <input
                  id="cta-phone"
                  className="cta__input"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(780) 555-0163"
                  value={form.fields.phone}
                  onChange={form.setField('phone')}
                  aria-invalid={form.errors.phone ? 'true' : 'false'}
                  aria-describedby={form.errors.phone ? 'cta-phone-error' : undefined}
                />
                {form.errors.phone ? <p className="cta__error" id="cta-phone-error">Enter a 10-digit phone number.</p> : null}
              </div>
              <div className="cta__field">
                <label className="cta__label" htmlFor="cta-detail">What Needs Doing?</label>
                <textarea
                  id="cta-detail"
                  className="cta__input cta__textarea"
                  rows={3}
                  placeholder="Panel upgrade on a 1970s bungalow in Beaumont."
                  value={form.fields.detail}
                  onChange={form.setField('detail')}
                  aria-invalid={form.errors.detail ? 'true' : 'false'}
                  aria-describedby={form.errors.detail ? 'cta-detail-error' : undefined}
                />
                {form.errors.detail ? <p className="cta__error" id="cta-detail-error">A sentence about the job is plenty.</p> : null}
              </div>
              <button type="submit" className="btn btn--primary btn--block cta__submit" disabled={form.status === 'sending'}>
                <span>{form.status === 'sending' ? 'Sending…' : 'Send It To The Crew'}</span>
                <ArrowRight className="lucide" aria-hidden="true" />
              </button>
              <p className="cta__reassure">{REASSURANCE}</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

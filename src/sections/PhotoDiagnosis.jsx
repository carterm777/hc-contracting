import { useState } from 'react'
import {
  Camera, ImageUp, X, ArrowRight, ArrowLeft, Check, Phone, SkipForward, RotateCcw,
} from 'lucide-react'
import { usePhotoDiagnosis } from '../lib/usePhotoDiagnosis.js'
import { Odometer } from '../lib/hcmotion.jsx'
import { BIZ, REASSURANCE } from '../data/site.js'
import './photo-diagnosis.css'

const STEPS = ['The Photo', 'The Problem', 'The Callback', 'Sent']
const CELLS = ['01', '02', '03', '04']

export default function PhotoDiagnosis() {
  const pd = usePhotoDiagnosis({ requirePhoto: false })
  const [step, setStep] = useState(0)
  const [touched, setTouched] = useState({})

  const done = pd.status === 'done'
  const index = done ? 3 : step

  const goDescription = () => setStep(1)
  const goDetails = () => {
    if (!pd.fields.description.trim()) { setTouched((t) => ({ ...t, description: true })); return }
    setStep(2)
  }
  const onSubmit = (e) => {
    setTouched({ description: true, name: true, phone: true })
    pd.submit(e)
  }
  const restart = () => { pd.reset(); setStep(0); setTouched({}) }

  const descErr = touched.description && !pd.fields.description.trim()
  const nameErr = touched.name && pd.errors.name
  const phoneErr = touched.phone && pd.errors.phone

  return (
    <div className="pdx" data-step={index} data-done={done ? 'true' : 'false'}>
      {/* Oversized condensed step label — the signature detail on the page. */}
      <div className="pdx__strip">
        <Odometer cells={CELLS} index={index} className="pdx__numeral disp" />
        <div className="pdx__strip-text">
          <p className="pdx__kicker">
            {done ? 'Request Sent' : `Step ${index + 1} Of 3`} — Photo Diagnosis
          </p>
          <p className="pdx__step-name disp">{STEPS[index]}</p>
        </div>
        <ol className="pdx__meter list-reset" aria-hidden="true">
          <li data-on={index >= 0 ? 'true' : 'false'} />
          <li data-on={index >= 1 ? 'true' : 'false'} />
          <li data-on={index >= 2 ? 'true' : 'false'} />
        </ol>
      </div>

      <div className="pdx__body">
        {done ? (
          <div className="pdx__success" role="status">
            <span className="pdx__success-mark" aria-hidden="true"><Check className="lucide" /></span>
            <h3 className="pdx__success-title disp">Got It. We’ll Call You Back.</h3>
            <p className="pdx__success-copy">
              Your {pd.file ? 'photo and ' : ''}details are with the crew. Expect a call from{' '}
              {BIZ.phoneDisplay} with a straight answer on what’s wrong and what it costs to fix.
            </p>
            <dl className="pdx__receipt">
              <div><dt>Name</dt><dd>{pd.fields.name}</dd></div>
              <div><dt>Callback</dt><dd>{pd.fields.phone}</dd></div>
              <div><dt>Photo</dt><dd>{pd.file ? pd.file.name : 'Not attached'}</dd></div>
            </dl>
            <div className="pdx__actions">
              <a className="btn btn--on-blue pdx__btn" href={BIZ.tel}>
                <Phone className="lucide" aria-hidden="true" />
                <span>Call Now Instead</span>
              </a>
              <button type="button" className="btn btn--outline-blue pdx__btn" onClick={restart}>
                <RotateCcw className="lucide" aria-hidden="true" />
                <span>Send Another</span>
              </button>
            </div>
          </div>
        ) : (
          <form className="pdx__form" onSubmit={onSubmit} noValidate>
            {/* ── Step 01 — the photo ─────────────────────────────────── */}
            <div className="pdx__pane" data-active={step === 0 ? 'true' : 'false'} hidden={step !== 0}>
              <p className="pdx__prompt">
                Point your phone at the panel, the outlet or the fixture. A photo gets you a
                real answer faster than a description ever will.
              </p>

              {pd.preview ? (
                <div className="pdx__preview">
                  <img src={pd.preview} alt="The photo you selected, ready to send to the crew." />
                  <button type="button" className="pdx__preview-clear" onClick={pd.clearPhoto}>
                    <X className="lucide" aria-hidden="true" />
                    <span className="sr-only">Remove this photo</span>
                  </button>
                  <p className="pdx__preview-name">{pd.file?.name}</p>
                </div>
              ) : (
                <div
                  className="pdx__drop"
                  data-dragging={pd.dragging ? 'true' : 'false'}
                  {...pd.dropProps}
                >
                  <Camera className="lucide pdx__drop-icon" aria-hidden="true" />
                  <p className="pdx__drop-title disp">Add A Photo</p>
                  <p className="pdx__drop-hint">Drag one in, or pick one off your phone. JPG, PNG or HEIC, up to 10MB.</p>
                  <button type="button" className="pdx__drop-btn" onClick={pd.openPicker}>
                    <ImageUp className="lucide" aria-hidden="true" />
                    <span>Choose A Photo</span>
                  </button>
                </div>
              )}

              <input
                ref={pd.inputRef}
                className="sr-only"
                type="file"
                accept={pd.accepted}
                onChange={pd.onFileInput}
                tabIndex={-1}
                aria-hidden="true"
              />
              {pd.errors.file ? <p className="pdx__error">{pd.errors.file}</p> : null}

              <div className="pdx__actions">
                <button type="button" className="btn btn--on-blue pdx__btn" onClick={goDescription}>
                  <span>Next — Describe It</span>
                  <ArrowRight className="lucide" aria-hidden="true" />
                </button>
                {!pd.preview ? (
                  <button type="button" className="pdx__skip" onClick={goDescription}>
                    <SkipForward className="lucide" aria-hidden="true" />
                    <span>Skip the photo</span>
                  </button>
                ) : null}
              </div>
            </div>

            {/* ── Step 02 — the problem ───────────────────────────────── */}
            <div className="pdx__pane" data-active={step === 1 ? 'true' : 'false'} hidden={step !== 1}>
              <label className="pdx__label" htmlFor="pdx-description">What’s Going On?</label>
              <textarea
                id="pdx-description"
                className="pdx__input pdx__textarea"
                rows={4}
                placeholder="Half the basement outlets died after we plugged in the space heater."
                value={pd.fields.description}
                onChange={pd.setField('description')}
                onBlur={() => setTouched((t) => ({ ...t, description: true }))}
                aria-invalid={descErr ? 'true' : 'false'}
                aria-describedby={descErr ? 'pdx-description-error' : undefined}
              />
              {descErr ? (
                <p className="pdx__error" id="pdx-description-error">
                  Tell us what is going on, even a sentence helps.
                </p>
              ) : null}
              <p className="pdx__prompt pdx__prompt--tight">
                Plain words are fine. Nobody here needs the technical term for it.
              </p>
              <div className="pdx__actions">
                <button type="button" className="btn btn--on-blue pdx__btn" onClick={goDetails}>
                  <span>Next — Your Details</span>
                  <ArrowRight className="lucide" aria-hidden="true" />
                </button>
                <button type="button" className="pdx__skip" onClick={() => setStep(0)}>
                  <ArrowLeft className="lucide" aria-hidden="true" />
                  <span>Back</span>
                </button>
              </div>
            </div>

            {/* ── Step 03 — the callback ──────────────────────────────── */}
            <div className="pdx__pane" data-active={step === 2 ? 'true' : 'false'} hidden={step !== 2}>
              <div className="pdx__fields">
                <div className="pdx__field">
                  <label className="pdx__label" htmlFor="pdx-name">Your Name</label>
                  <input
                    id="pdx-name"
                    className="pdx__input"
                    type="text"
                    autoComplete="name"
                    placeholder="Dana Whitfield"
                    value={pd.fields.name}
                    onChange={pd.setField('name')}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    aria-invalid={nameErr ? 'true' : 'false'}
                    aria-describedby={nameErr ? 'pdx-name-error' : undefined}
                  />
                  {nameErr ? <p className="pdx__error" id="pdx-name-error">{pd.errors.name}</p> : null}
                </div>
                <div className="pdx__field">
                  <label className="pdx__label" htmlFor="pdx-phone">Best Number</label>
                  <input
                    id="pdx-phone"
                    className="pdx__input"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(780) 555-0163"
                    value={pd.fields.phone}
                    onChange={pd.setField('phone')}
                    onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                    aria-invalid={phoneErr ? 'true' : 'false'}
                    aria-describedby={phoneErr ? 'pdx-phone-error' : undefined}
                  />
                  {phoneErr ? <p className="pdx__error" id="pdx-phone-error">{pd.errors.phone}</p> : null}
                </div>
              </div>
              <div className="pdx__actions">
                <button type="submit" className="btn btn--on-blue pdx__btn" disabled={pd.status === 'sending'}>
                  <span>{pd.status === 'sending' ? 'Sending…' : 'Send It To The Crew'}</span>
                  <ArrowRight className="lucide" aria-hidden="true" />
                </button>
                <button type="button" className="pdx__skip" onClick={() => setStep(1)}>
                  <ArrowLeft className="lucide" aria-hidden="true" />
                  <span>Back</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      <p className="pdx__reassure">{REASSURANCE}</p>
    </div>
  )
}

import { Star, Info, ShieldCheck } from 'lucide-react'
import { Reveal, useCountUp, useInView } from '../lib/motion.jsx'
import { ClipLines, ConduitRule } from '../lib/hcmotion.jsx'
import { REVIEWS } from '../data/site.js'
import './reviews.css'

function GoogleMark({ className = '' }) {
  return (
    <svg className={`grv-g ${className}`} viewBox="0 0 48 48" role="img" aria-label="Google">
      <path className="grv-g--red" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path className="grv-g--blue" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path className="grv-g--yellow" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path className="grv-g--green" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

/* Star Rating Fill Animation on Scroll — one quick sequential sweep, not a
   long stagger, fired once the row is 25% into the viewport. */
function Stars({ tone = 'gold', label }) {
  const [ref, inView] = useInView({ threshold: 0.25, rootMargin: '0px 0px -8% 0px' })
  return (
    <span className={`grv__stars grv__stars--${tone}`} ref={ref} data-in={inView ? 'true' : 'false'}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star className="lucide grv__star" key={i} style={{ '--reveal-delay': `${i * 70}ms` }} aria-hidden="true" />
      ))}
      <span className="sr-only">{label}</span>
    </span>
  )
}

export default function Reviews() {
  const [countRef, value] = useCountUp(4.9, { duration: 1500, decimals: 1 })

  return (
    <section className="section grv" id="reviews" aria-labelledby="grv-title">
      <div className="shell">
        <div className="grv__head">
          <p className="sec-head__eyebrow">
            <ConduitRule width="2.75rem" />
            <span className="eyebrow">Google Reviews</span>
          </p>
          <h2 className="grv__title disp" id="grv-title">
            <ClipLines lines={['What Edmonton', 'Customers Say']} step={110} />
          </h2>
          <Reveal technique="rise" delay={140}>
            <p className="grv__lede lede">
              Five recent jobs, in their words — outdoor lighting, a commercial panel, a rental
              service call, and two people who wanted a straight answer before anyone started work.
            </p>
          </Reveal>
        </div>

        <div className="grv__grid">
          {/* Aggregate-rating callout — tile one of the grid, in the brand's
              boldest blue so the rating anchors the whole section. */}
          <Reveal technique="rise" className="grv__aggregate" delay={0}>
            <div className="grv__agg-inner" ref={countRef}>
              <GoogleMark className="grv__agg-logo" />
              <p className="grv__agg-score disp">{value.toFixed(1)}</p>
              <Stars tone="light" label="Rated 4.9 out of 5 stars" />
              <p className="grv__agg-line">4.9 out of 5 stars, based on real Google reviews</p>
              <p className="grv__agg-sub">
                Residential, commercial and mobile service work across the Edmonton metro.
              </p>
            </div>
          </Reveal>

          {REVIEWS.map((r, i) => (
            <Reveal as="article" technique="rise" className="grv__card" delay={80 + i * 40} key={r.name}>
              <header className="grv__card-head">
                <span className="grv__avatar" aria-hidden="true">{r.initial}</span>
                <div className="grv__who">
                  <h3 className="grv__name">{r.name}</h3>
                  <p className="grv__meta">Google review — {r.focus}</p>
                </div>
                <GoogleMark className="grv__card-logo" />
              </header>
              <Stars label={`${r.name} rated HC Contracting 5 out of 5 stars`} />
              <blockquote className="grv__quote"><p>{r.quote}</p></blockquote>
              <p className="grv__verified">
                <ShieldCheck className="lucide" aria-hidden="true" />
                <span>Verified on Google · Edmonton, AB</span>
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal technique="fade" delay={120}>
          <p className="grv__placeholder">
            <Info className="lucide" aria-hidden="true" />
            <span>
              Placeholder content. These five reviews stand in for layout only — the real Google
              Business Profile feed gets wired in before this page goes live.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

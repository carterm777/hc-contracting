import { useState } from 'react'
import { Truck, Phone } from 'lucide-react'
import { Reveal } from '../lib/motion.jsx'
import { ClipLines, ConduitRule } from '../lib/hcmotion.jsx'
import { AREA_NODES, BIZ } from '../data/site.js'
import './coverage.css'

const GRID = [10, 20, 30, 40, 50, 60, 70, 80, 90]

export default function Coverage() {
  const [active, setActive] = useState(null)

  return (
    <section className="section cov" id="coverage" aria-labelledby="cov-title">
      <div className="shell cov__grid">
        <div className="cov__copy">
          <p className="sec-head__eyebrow">
            <ConduitRule width="2.75rem" />
            <span className="eyebrow">Service Area</span>
          </p>
          <h2 className="cov__title disp" id="cov-title">
            <ClipLines lines={['Edmonton And', 'Everything Around It']} step={110} />
          </h2>
          <Reveal technique="rise" delay={140}>
            <p className="cov__body">
              Based in Edmonton, this crew regularly works across the metro area, including Sherwood
              Park, St. Albert, Spruce Grove, Stony Plain, Leduc, Fort Saskatchewan, Beaumont, Devon,
              and Morinville. Mobile service calls mean the crew comes to a home, rental property, or
              job site directly, not the other way around.
            </p>
          </Reveal>

          <Reveal technique="rise" delay={200}>
            <ul className="cov__list list-reset">
              {AREA_NODES.map((a) => (
                <li
                  className="cov__list-item"
                  key={a.name}
                  data-active={active === a.name ? 'true' : 'false'}
                  data-hub={a.hub ? 'true' : 'false'}
                  onMouseEnter={() => setActive(a.name)}
                  onMouseLeave={() => setActive(null)}
                >
                  <span className="cov__list-dot" aria-hidden="true" />
                  <span className="cov__list-name">{a.name}</span>
                  {a.hub ? <span className="cov__list-tag">Base</span> : null}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal technique="rise" delay={260} className="cov__cta">
            <span className="cov__cta-icon" aria-hidden="true"><Truck className="lucide" /></span>
            <p className="cov__cta-copy">
              Outside the list? Ask anyway — mobile calls cover more of the region than most people expect.
            </p>
            <a className="btn btn--primary cov__cta-btn" href={BIZ.tel}>
              <Phone className="lucide" aria-hidden="true" />
              <span>Call {BIZ.phoneDisplay}</span>
            </a>
          </Reveal>
        </div>

        {/* Industrial Grid Coverage Map — a schematic of the named service
            areas, not a geographic map. Cross-highlights with the list. */}
        <Reveal technique="settle" className="cov__map" delay={120}>
          <div className="cov__map-frame">
            <p className="cov__map-label">Coverage Schematic — Edmonton Metro</p>
            <div className="cov__plot">
              <svg className="cov__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {GRID.map((v) => (
                  <line key={`v${v}`} className="cov__grid-line" x1={v} y1="0" x2={v} y2="100" />
                ))}
                {GRID.map((v) => (
                  <line key={`h${v}`} className="cov__grid-line" x1="0" y1={v} x2="100" y2={v} />
                ))}
                <line className="cov__axis" x1="50" y1="0" x2="50" y2="100" />
                <line className="cov__axis" x1="0" y1="52" x2="100" y2="52" />
                {[22, 36, 50].map((r) => (
                  <ellipse key={r} className="cov__ring" cx="50" cy="52" rx={r} ry={r} />
                ))}
                {AREA_NODES.filter((n) => !n.hub).map((n, i) => (
                  <line
                    key={`c-${n.name}`}
                    className="cov__spoke"
                    pathLength="100"
                    style={{ '--reveal-delay': `${180 + i * 65}ms` }}
                    data-active={active === n.name ? 'true' : 'false'}
                    x1="50" y1="52" x2={n.x} y2={n.y}
                  />
                ))}
              </svg>

              {AREA_NODES.map((n, i) => (
                <span
                  key={n.name}
                  className="cov__node"
                  style={{ left: `${n.x}%`, top: `${n.y}%`, '--reveal-delay': `${n.hub ? 100 : 260 + i * 55}ms` }}
                  data-active={active === n.name ? 'true' : 'false'}
                  data-hub={n.hub ? 'true' : 'false'}
                  onMouseEnter={() => setActive(n.name)}
                  onMouseLeave={() => setActive(null)}
                >
                  <span className="cov__node-mark" aria-hidden="true" />
                  <span className="cov__node-name">{n.name}</span>
                </span>
              ))}
            </div>
            <p className="cov__map-foot">Ten communities · one crew · mobile service to all of them</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

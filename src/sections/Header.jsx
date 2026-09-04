import { useEffect, useRef, useState } from 'react'
import { Phone, Mail, MapPin, ChevronDown } from 'lucide-react'
import { useScrollY } from '../lib/motion.jsx'
import { useMagnet } from '../lib/hcmotion.jsx'
import { BIZ, SERVICE_LINKS, AREA_LINKS } from '../data/site.js'
import './header.css'

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#story' },
  { label: 'Services', href: '#services', panel: 'services' },
  { label: 'Service Areas', href: '#coverage', panel: 'areas' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Blog', href: '#footer' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const y = useScrollY()
  const [open, setOpen] = useState(null)
  const closeTimer = useRef(null)
  const callRef = useMagnet(3)
  const condensed = y > 24

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const hold = (id) => { clearTimeout(closeTimer.current); setOpen(id) }
  const release = () => { closeTimer.current = setTimeout(() => setOpen(null), 140) }

  return (
    <header className="hdr" data-condensed={condensed ? 'true' : 'false'}>
      <div className="hdr__contact">
        <div className="shell hdr__contact-inner">
          <p className="hdr__tagline">We Fix Stuff. It’s What We Do.</p>
          <ul className="hdr__contact-list list-reset">
            <li>
              <a className="hdr__contact-link" href={BIZ.tel}>
                <Phone className="lucide" aria-hidden="true" />
                <span>{BIZ.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a className="hdr__contact-link" href={`mailto:${BIZ.email}`}>
                <Mail className="lucide" aria-hidden="true" />
                <span>{BIZ.email}</span>
              </a>
            </li>
            <li>
              <span className="hdr__contact-link hdr__contact-link--static">
                <MapPin className="lucide" aria-hidden="true" />
                <span>{BIZ.address}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="hdr__bar">
        <div className="shell shell--wide hdr__bar-inner">
          <a className="hdr__brand" href="#home">
            <span className="hdr__brand-mark disp">HC</span>
            <span className="hdr__brand-rule" aria-hidden="true" />
            <span className="hdr__brand-word">Contracting</span>
            <span className="sr-only">— Edmonton electrical contractors, home</span>
          </a>

          <nav className="hdr__nav" aria-label="Primary">
            <ul className="hdr__nav-list list-reset">
              {NAV.map((item) => (
                <li
                  key={item.label}
                  className="hdr__nav-item"
                  onMouseEnter={item.panel ? () => hold(item.panel) : undefined}
                  onMouseLeave={item.panel ? release : undefined}
                  onFocus={item.panel ? () => hold(item.panel) : undefined}
                  onBlur={item.panel ? release : undefined}
                >
                  <a
                    className="hdr__nav-link"
                    href={item.href}
                    {...(item.panel
                      ? { 'aria-expanded': open === item.panel, 'aria-controls': `hdr-panel-${item.panel}` }
                      : null)}
                  >
                    {item.label}
                    {item.panel ? <ChevronDown className="lucide hdr__caret" aria-hidden="true" /> : null}
                  </a>

                  {item.panel === 'services' ? (
                    <div
                      id="hdr-panel-services"
                      className="hdr__panel hdr__panel--wide"
                      data-open={open === 'services' ? 'true' : 'false'}
                    >
                      <p className="hdr__panel-label">Electrical Work We Take On</p>
                      <ul className="hdr__panel-list list-reset">
                        {SERVICE_LINKS.map((s) => (
                          <li key={s}>
                            <a className="hdr__panel-link" href="#services">{s}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {item.panel === 'areas' ? (
                    <div
                      id="hdr-panel-areas"
                      className="hdr__panel"
                      data-open={open === 'areas' ? 'true' : 'false'}
                    >
                      <p className="hdr__panel-label">Where The Crew Works</p>
                      <ul className="hdr__panel-list hdr__panel-list--two list-reset">
                        {AREA_LINKS.map((a) => (
                          <li key={a}>
                            <a className="hdr__panel-link" href="#coverage">{a}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <a className="btn btn--on-blue hdr__call" href={BIZ.tel} ref={callRef}>
            <Phone className="lucide" aria-hidden="true" />
            <span>{BIZ.phoneDisplay}</span>
          </a>
        </div>
      </div>

      {/* Mobile: no hamburger. A single scrollable link rail that collapses to
          click-to-call the moment the visitor starts scrolling. */}
      <div className="hdr__rail">
        <div className="hcx-scroller hdr__rail-scroll">
          <ul className="hdr__rail-list list-reset">
            {NAV.filter((n) => n.label !== 'Blog').map((item) => (
              <li key={item.label}>
                <a className="hdr__rail-link" href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}

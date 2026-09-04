import { Facebook, Instagram, Linkedin, Phone, MessageSquareText, MapPin, Mail } from 'lucide-react'
import { Reveal } from '../lib/motion.jsx'
import { BIZ } from '../data/site.js'
import './footer.css'

const SERVICES = [
  'Residential Wiring',
  'Commercial Electrical',
  'Outdoor & Landscape Lighting',
  'Mobile Electrical Service Calls',
  'Panel Upgrades',
]

const QUICK = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#story' },
  { label: 'Services', href: '#services' },
  { label: 'Service Areas', href: '#coverage' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const SOCIAL = [
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Linkedin, label: 'LinkedIn' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="ftr" id="footer">
      <div className="shell shell--wide">
        <div className="ftr__grid">
          <Reveal technique="rise" delay={0} className="ftr__col ftr__col--brand">
            <h2 className="ftr__brand disp">
              <span className="ftr__brand-mark">HC</span>
              <span className="ftr__brand-word">Contracting</span>
            </h2>
            <p className="ftr__mission">
              We’re a licensed electrical and contracting crew that’s served Edmonton since 2010,
              from single-family homes to commercial builds. Mobile service calls mean we come to
              you, whether that’s a house, a rental property, or a job site.
            </p>
            <ul className="ftr__social list-reset">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a className="ftr__social-link" href="#footer" aria-label={`${s.label} — profile link added at launch`}>
                    <s.Icon className="lucide" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="ftr__social-note">Social profiles get connected before launch.</p>
          </Reveal>

          <Reveal technique="rise" delay={110} className="ftr__col">
            <h3 className="ftr__h3">Our Services</h3>
            <ul className="ftr__list list-reset">
              {SERVICES.map((s) => (
                <li key={s}><a className="ftr__link tlink" href="#services">{s}</a></li>
              ))}
            </ul>
          </Reveal>

          <Reveal technique="rise" delay={220} className="ftr__col">
            <h3 className="ftr__h3">Quick Links</h3>
            <ul className="ftr__list list-reset">
              {QUICK.map((q) => (
                <li key={q.label}><a className="ftr__link tlink" href={q.href}>{q.label}</a></li>
              ))}
            </ul>
          </Reveal>

          <Reveal technique="rise" delay={330} className="ftr__col">
            <h3 className="ftr__h3">HC Contracting</h3>
            <p className="ftr__legal">He Creates Contracting</p>
            <ul className="ftr__contact list-reset">
              <li>
                <MapPin className="lucide" aria-hidden="true" />
                <span>{BIZ.address}</span>
              </li>
              <li>
                <Phone className="lucide" aria-hidden="true" />
                <a className="ftr__link tlink" href={BIZ.tel}>{BIZ.phoneDisplay}</a>
              </li>
              <li>
                <MessageSquareText className="lucide" aria-hidden="true" />
                <a className="ftr__link tlink" href={`${BIZ.sms}?&body=Hi%20HC%20Contracting%2C%20I%27d%20like%20a%20quote.`}>
                  Text the crew
                </a>
              </li>
              <li>
                <Mail className="lucide" aria-hidden="true" />
                <a className="ftr__link tlink" href={`mailto:${BIZ.email}`}>{BIZ.email}</a>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="ftr__base">
          <p className="ftr__copy">© {year} HC Contracting. All rights reserved.</p>
          <p className="ftr__note">
            Demo site. Contact details, reviews and imagery are placeholders pending the real thing.
          </p>
        </div>
      </div>
    </footer>
  )
}

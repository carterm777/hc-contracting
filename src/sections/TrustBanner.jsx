import { BadgeCheck, MapPin, Award, ThumbsUp } from 'lucide-react'
import { Reveal } from '../lib/motion.jsx'
import { ClipLines } from '../lib/hcmotion.jsx'
import './trust.css'

const BADGES = [
  { icon: BadgeCheck, label: 'Licensed & Insured', note: 'Covered from the first call to the final test' },
  { icon: MapPin, label: 'Locally Owned & Operated', note: 'Edmonton crew, Edmonton jobs' },
  { icon: Award, label: 'Years Of Experience', note: 'Working this city since 2010' },
  { icon: ThumbsUp, label: 'Satisfaction Guaranteed', note: 'We stand behind our own work' },
]

export default function TrustBanner() {
  return (
    <section className="section section--band trb" aria-labelledby="trb-title">
      <div className="shell shell--wide">
        <h2 className="trb__title disp" id="trb-title">
          <ClipLines lines={['The Basics, Covered']} step={0} />
        </h2>
        <ul className="trb__row list-reset">
          {BADGES.map((b, i) => (
            <Reveal as="li" technique="rise" className="trb__badge" delay={i * 110} key={b.label}>
              <span className="trb__icon" aria-hidden="true"><b.icon className="lucide" /></span>
              <h3 className="trb__label">{b.label}</h3>
              <p className="trb__note">{b.note}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

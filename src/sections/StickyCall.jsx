import { Phone } from 'lucide-react'
import { useScrollY, useMediaQuery } from '../lib/motion.jsx'
import { BIZ } from '../data/site.js'
import './sticky.css'

export default function StickyCall() {
  const y = useScrollY()
  const small = useMediaQuery('(max-width: 899px)')
  const shown = small && y > 420

  return (
    <div className="stk" data-shown={shown ? 'true' : 'false'} aria-hidden={shown ? undefined : 'true'}>
      <a className="stk__btn" href={BIZ.tel} tabIndex={shown ? 0 : -1}>
        <Phone className="lucide" aria-hidden="true" />
        <span className="stk__label">Call {BIZ.phoneDisplay}</span>
      </a>
    </div>
  )
}

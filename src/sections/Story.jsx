import { Reveal } from '../lib/motion.jsx'
import { ClipLines, ConduitRule } from '../lib/hcmotion.jsx'
import './story.css'

const VALUES = [
  { title: 'Name It Straight', body: 'The diagnosis comes in plain words before anybody talks about money.' },
  { title: 'Fix It Properly', body: 'The repair is sized for how the property actually draws power today.' },
  { title: 'Skip The Runaround', body: 'One crew, one number, and a job site left better than it was found.' },
]

export default function Story() {
  return (
    <section className="section sty" id="story" aria-labelledby="sty-title">
      <div className="shell sty__grid">
        <div className="sty__media">
          <figure className="sty__figure">
            <img
              className="sty__img"
              src="/images/about-crew.webp"
              alt="Five members of the HC Contracting crew lined up in front of two service vans inside their shop."
              loading="lazy"
              decoding="async"
              width="2000"
              height="1125"
            />
            <span className="sty__corner" aria-hidden="true" />
            <figcaption className="sty__plate">
              <span className="sty__plate-label">Working In Edmonton Since</span>
              <span className="sty__plate-n disp">2010</span>
            </figcaption>
          </figure>
        </div>

        <div className="sty__copy">
          <p className="sec-head__eyebrow">
            <ConduitRule width="2.75rem" />
            <span className="eyebrow">Our Story</span>
          </p>
          <h2 className="sty__title disp" id="sty-title">
            <ClipLines lines={['Straight Answers', 'Since 2010']} step={110} />
          </h2>

          <Reveal technique="rise" delay={120}>
            <p className="sty__p">
              This business has been doing electrical and contracting work in Edmonton since 2010,
              built on a simple approach: name the problem straight, fix it properly, and skip the
              runaround that usually comes with hiring a contractor. That’s the idea behind the
              “we fix stuff” mindset the crew still works by today.
            </p>
          </Reveal>

          {/* Bold Pull-Quote Colour Block — the source business's own line,
              set in the display face at the largest size on the page. */}
          <Reveal technique="settle" delay={80} className="sty__quote-wrap">
            <blockquote className="sty__quote">
              <p className="sty__quote-text disp">
                <span>We Fix Stuff.</span>
                <span>It’s What We Do.</span>
              </p>
              <cite className="sty__quote-cite">The line the crew has worked by since day one</cite>
            </blockquote>
          </Reveal>

          <Reveal technique="rise" delay={120}>
            <p className="sty__p">
              A big part of what sets the day-to-day apart is the mobile service side of the
              business. Instead of every job requiring a customer to be home and available, the crew
              coordinates directly with tenants, property managers, and site contacts — a real fit
              for a city where plenty of electrical work happens on rental properties and active job
              sites.
            </p>
          </Reveal>

          <Reveal technique="rise" delay={140}>
            <p className="sty__p">
              More than a decade in, the work has grown from single-room jobs to full commercial
              builds, but the standard hasn’t moved: a straight answer about what’s wrong, a fair
              number for fixing it, and a job site left in better shape than it was found.
            </p>
          </Reveal>

          <ul className="sty__values list-reset">
            {VALUES.map((v, i) => (
              <Reveal as="li" technique="rise" className="sty__value" delay={i * 110} key={v.title}>
                <span className="sty__value-rule" aria-hidden="true" />
                <h3 className="sty__value-title disp">{v.title}</h3>
                <p className="sty__value-copy">{v.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

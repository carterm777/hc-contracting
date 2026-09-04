import Header from './sections/Header.jsx'
import Hero from './sections/Hero.jsx'
import Reviews from './sections/Reviews.jsx'
import TrustBanner from './sections/TrustBanner.jsx'
import WhyUs from './sections/WhyUs.jsx'
import Services from './sections/Services.jsx'
import Coverage from './sections/Coverage.jsx'
import Story from './sections/Story.jsx'
import Faq from './sections/Faq.jsx'
import FinalCta from './sections/FinalCta.jsx'
import Footer from './sections/Footer.jsx'
import StickyCall from './sections/StickyCall.jsx'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip To Content</a>
      <Header />
      <main id="main">
        <Hero />
        <Reviews />
        <TrustBanner />
        <WhyUs />
        <Services />
        <Coverage />
        <Story />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCall />
    </>
  )
}

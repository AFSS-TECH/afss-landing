import { Head } from 'vite-react-ssg'
import { useLocale } from '../i18n/context.jsx'
import { useHreflangTags } from '../i18n/HreflangTags.jsx'
import { withLocale } from '../i18n/locales.js'
import { SITE_URL } from '../site.js'
import { Hero } from './Hero.jsx'
import { StatsBand } from './StatsBand.jsx'
import { TrustBar } from './TrustBar.jsx'
import { Services } from './Services.jsx'
import { DemoTeaser } from './DemoTeaser.jsx'
import { WhyUs } from './WhyUs.jsx'
import { Testimonials } from './Testimonials.jsx'
import { Process } from './Process.jsx'
import { Estimator } from './Estimator.jsx'
import { AddOns } from './AddOns.jsx'
import { TechStack } from './TechStack.jsx'
import { FaqTeaser } from './FaqTeaser.jsx'
import { BlogTeaser } from './BlogTeaser.jsx'
import { CtaBand } from './CtaBand.jsx'

/* ════════════════════════════════════════════════ HOME PAGE */
export function Home() {
  const { locale, t } = useLocale()
  const hreflangTags = useHreflangTags()
  const canonical = `${SITE_URL}${withLocale(locale, '/')}`
  return (
    <>
      <Head>
        <title>{t('seo.home.title')}</title>
        <meta name="description" content={t('seo.home.description')} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={t('seo.home.title')} />
        <meta property="og:description" content={t('seo.home.ogDescription')} />
        <meta name="twitter:title" content={t('seo.home.title')} />
        <meta name="twitter:description" content={t('seo.home.ogDescription')} />
        <meta property="og:image" content={`${SITE_URL}/og.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content={`${SITE_URL}/og.png`} />
        {hreflangTags}
      </Head>
      <Hero />
      <StatsBand />
      <TrustBar />
      <Services />
      <DemoTeaser />
      <WhyUs />
      <Testimonials />
      <Process />
      <Estimator />
      <AddOns />
      <TechStack />
      <FaqTeaser />
      <BlogTeaser />
      <CtaBand />
    </>
  )
}

import { motion } from 'framer-motion'
import { Icon } from '../Icon.jsx'
import { Link } from '../i18n/link.jsx'
import { useLocale, pick } from '../i18n/context.jsx'
import { postsMeta } from '../blog-meta.js'
import { formatDate } from '../site.js'
import { fadeUp, container, viewport, Reveal } from './shared.jsx'

/* ════════════════════════════════════════════════ BLOG TEASER (internal linking from home) */
export function BlogTeaser() {
  const { locale, t } = useLocale()
  const latest = postsMeta.slice(0, 3).map((p) => pick(p, locale))
  return (
    <section className="blog-teaser" id="blog-teaser">
      <div className="container">
        <Reveal className="sec-header center">
          <div className="eyebrow"><Icon icon="fa-solid fa-newspaper" /> {t('blogTeaser.eyebrow')}</div>
          <h2 className="sec-title">{t('blogTeaser.titlePre')}<span className="ital">{t('blogTeaser.titleItal')}</span>{t('blogTeaser.titlePost')}</h2>
          <p className="sec-sub">{t('blogTeaser.sub')}</p>
        </Reveal>
        <motion.div className="blog-grid" variants={container} initial="hidden" whileInView="show" viewport={viewport}>
          {latest.map((p) => (
            <motion.article key={p.slug} className="blog-card" variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
              <Link to={`/blog/${p.slug}`} className="blog-card-link">
                <div className="blog-cover" style={{ '--c': p.c, '--c2': p.c2 }}>
                  <img src={locale === 'id' ? `/blog/${p.slug}.png` : `/blog/${locale}/${p.slug}.png`} alt={p.title} width="1200" height="630" loading="lazy" onError={(e) => { e.target.style.display = 'none' }} />
                </div>
                <div className="blog-card-body">
                  <div className="blog-meta">{formatDate(p.date, locale)} · {p.readMinutes} {t('blogTeaser.readMinutes')}</div>
                  <h3 className="blog-card-title">{p.title}</h3>
                  <p className="blog-card-excerpt">{p.excerpt}</p>
                  <span className="blog-readmore">{t('blogTeaser.readMore')} <Icon icon="fa-solid fa-arrow-right" /></span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
        <div className="blog-teaser-all">
          <Link to="/blog" className="btn btn-ghost btn-lg">{t('blogTeaser.viewAll')} <Icon icon="fa-solid fa-arrow-right" /></Link>
        </div>
      </div>
    </section>
  )
}


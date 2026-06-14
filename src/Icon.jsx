// Inline-SVG icon component using Font Awesome's official icon path DATA only
// (no fontawesome-svg-core, no react-fontawesome — keeps the bundle small).
// Renders the FA <svg> inside an <i> wrapper so all existing `... i {}` CSS keeps working.
// Usage is unchanged: <Icon icon="fa-solid fa-check" />
import {
  faWindowMaximize, faMobileScreenButton, faChartLine, faPenRuler, faHeadset,
  faCode, faGaugeHigh, faHandshake, faReceipt, faComments, faFileInvoice, faRocket,
  faN, faWind, faDatabase, faMobileScreen, faMicrochip, faTriangleExclamation,
  faCircleNodes, faAward, faLayerGroup, faImages, faHeart, faRoute, faTags,
  faCircleQuestion, faBriefcase, faNewspaper, faStar, faCheck, faCircleCheck,
  faArrowRight, faArrowTrendUp, faArrowUp, faEnvelope, faLocationDot, faMinus, faPlus, faClock,
} from '@fortawesome/free-solid-svg-icons'
import {
  faWhatsapp, faReact, faNodeJs, faLaravel, faAws, faFigma, faDocker,
  faInstagram, faLinkedinIn, faTiktok, faYoutube,
} from '@fortawesome/free-brands-svg-icons'

// keyed by the FA name without the "fa-" prefix
const REGISTRY = {
  'window-maximize': faWindowMaximize, 'mobile-screen-button': faMobileScreenButton,
  'chart-line': faChartLine, 'pen-ruler': faPenRuler, headset: faHeadset, code: faCode,
  'gauge-high': faGaugeHigh, handshake: faHandshake, receipt: faReceipt, comments: faComments,
  'file-invoice': faFileInvoice, rocket: faRocket, n: faN, wind: faWind, database: faDatabase,
  'mobile-screen': faMobileScreen, microchip: faMicrochip, 'triangle-exclamation': faTriangleExclamation,
  'circle-nodes': faCircleNodes, award: faAward, 'layer-group': faLayerGroup, images: faImages,
  heart: faHeart, route: faRoute, tags: faTags, 'circle-question': faCircleQuestion,
  briefcase: faBriefcase, newspaper: faNewspaper, star: faStar, check: faCheck,
  'circle-check': faCircleCheck, 'arrow-right': faArrowRight, 'arrow-trend-up': faArrowTrendUp,
  'arrow-up': faArrowUp, envelope: faEnvelope, 'location-dot': faLocationDot, minus: faMinus, plus: faPlus, clock: faClock,
  whatsapp: faWhatsapp, react: faReact, 'node-js': faNodeJs, laravel: faLaravel, aws: faAws,
  figma: faFigma, docker: faDocker, instagram: faInstagram, 'linkedin-in': faLinkedinIn,
  tiktok: faTiktok, youtube: faYoutube,
}

export function Icon({ icon = '', className, ...rest }) {
  const tokens = String(icon).trim().split(/\s+/)
  const faTok = tokens.find((t) => t.startsWith('fa-') && t !== 'fa-solid' && t !== 'fa-brands' && t !== 'fa-regular')
  const def = faTok ? REGISTRY[faTok.slice(3)] : null
  if (!def) return null
  const [w, h, , , data] = def.icon
  const d = Array.isArray(data) ? data[data.length - 1] : data
  const extra = tokens.filter((t) => !t.startsWith('fa-')).join(' ')
  const cls = [extra, className].filter(Boolean).join(' ') || undefined
  return (
    <i className={cls} {...rest}>
      <svg className="svg-inline--fa" viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <path fill="currentColor" d={d} />
      </svg>
    </i>
  )
}

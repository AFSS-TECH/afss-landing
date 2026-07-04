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
  faArrowDown, faArrowLeft, faArrowUpRightFromSquare, faBagShopping, faBell, faBoxOpen,
  faBoxesStacked, faBuilding, faBuildingColumns, faBullseye, faCalculator, faCalendarCheck,
  faCalendar, faCartShopping, faCertificate, faChartBar, faChartColumn, faChartPie,
  faChevronLeft, faChevronRight, faCircleExclamation, faClockRotateLeft, faCoins,
  faCreditCard, faDiagramProject, faEye, faFileCircleQuestion, faFileExport,
  faFileInvoiceDollar, faFilePen, faFolderOpen, faGlobe, faGraduationCap, faInbox,
  faLaptopHouse, faListCheck, faLock, faMagnifyingGlass, faMagnifyingGlassChart,
  faPaperPlane, faPenToSquare, faPeopleGroup, faPeopleRoof, faPercentage, faPhone,
  faPlug, faPuzzlePiece, faRectangleAd, faRectangleList, faRotateLeft, faSeedling,
  faServer, faShieldHalved, faStarHalfStroke, faStore, faTag, faTrash, faTruck,
  faUsers, faUsersGear, faWandMagicSparkles, faWarehouse, faXmark,
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
  'arrow-down': faArrowDown, 'arrow-left': faArrowLeft, 'arrow-up-right-from-square': faArrowUpRightFromSquare,
  'bag-shopping': faBagShopping, bell: faBell, 'box-open': faBoxOpen, 'boxes-stacked': faBoxesStacked,
  building: faBuilding, 'building-columns': faBuildingColumns, bullseye: faBullseye,
  calculator: faCalculator, 'calendar-check': faCalendarCheck, calendar: faCalendar,
  'cart-shopping': faCartShopping, certificate: faCertificate, 'chart-bar': faChartBar,
  'chart-column': faChartColumn, 'chart-pie': faChartPie, 'chevron-left': faChevronLeft,
  'chevron-right': faChevronRight, 'circle-exclamation': faCircleExclamation,
  'clock-rotate-left': faClockRotateLeft, coins: faCoins, 'credit-card': faCreditCard,
  'diagram-project': faDiagramProject, eye: faEye, 'file-circle-question': faFileCircleQuestion,
  'file-export': faFileExport, 'file-invoice-dollar': faFileInvoiceDollar, 'file-pen': faFilePen,
  'folder-open': faFolderOpen, globe: faGlobe, 'graduation-cap': faGraduationCap, inbox: faInbox,
  'laptop-house': faLaptopHouse, 'list-check': faListCheck, lock: faLock,
  'magnifying-glass': faMagnifyingGlass, 'magnifying-glass-chart': faMagnifyingGlassChart,
  'paper-plane': faPaperPlane, 'pen-to-square': faPenToSquare, 'people-group': faPeopleGroup,
  'people-roof': faPeopleRoof, percentage: faPercentage, phone: faPhone, plug: faPlug,
  'puzzle-piece': faPuzzlePiece, 'rectangle-ad': faRectangleAd, 'rectangle-list': faRectangleList,
  'rotate-left': faRotateLeft, seedling: faSeedling, server: faServer, 'shield-halved': faShieldHalved,
  'star-half-stroke': faStarHalfStroke, store: faStore, tag: faTag, trash: faTrash, truck: faTruck,
  users: faUsers, 'users-gear': faUsersGear, 'wand-magic-sparkles': faWandMagicSparkles,
  warehouse: faWarehouse, xmark: faXmark,
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

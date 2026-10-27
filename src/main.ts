import './style.css'
import './portfolio/ProjectDemos.css'
import { createRoot, type Root } from 'react-dom/client'
import { createElement } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { ProjectDemo } from './portfolio/ProjectDemos'

const header = document.querySelector<HTMLElement>('.site-header')
const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle')
const navigation = document.querySelector<HTMLElement>('#primary-navigation')
const navItems = navigation?.querySelectorAll<HTMLAnchorElement>('a')
const year = document.querySelector<HTMLElement>('#year')

if (year) year.textContent = String(new Date().getFullYear())

// Mount Vercel Analytics without changing the site's existing HTML structure.
const analyticsMount = document.createElement('div')
analyticsMount.setAttribute('aria-hidden', 'true')
document.body.appendChild(analyticsMount)
createRoot(analyticsMount).render(createElement(Analytics))

const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 28)
}

updateHeader()
window.addEventListener('scroll', updateHeader, { passive: true })

const closeMenu = () => {
  if (!menuButton || !navigation) return
  menuButton.setAttribute('aria-expanded', 'false')
  menuButton.setAttribute('aria-label', 'Open navigation menu')
  navigation.classList.remove('is-open')
}

menuButton?.addEventListener('click', () => {
  if (!menuButton || !navigation) return
  const expanded = menuButton.getAttribute('aria-expanded') === 'true'
  menuButton.setAttribute('aria-expanded', String(!expanded))
  menuButton.setAttribute('aria-label', expanded ? 'Open navigation menu' : 'Close navigation menu')
  navigation.classList.toggle('is-open', !expanded)
})

navItems?.forEach((item) => item.addEventListener('click', closeMenu))

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu()
})

const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]')
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    })
  }, { threshold: 0.14, rootMargin: '0px 0px -24px 0px' })

  revealItems.forEach((item) => revealObserver.observe(item))
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'))
}

const serviceCards = [...document.querySelectorAll<HTMLElement>('.service-card')]
const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

if (!reduceMotion && hasFinePointer) {
  serviceCards.forEach((card) => {
    card.addEventListener('pointerenter', () => {
      card.classList.add('is-active')
      serviceCards.forEach((other) => {
        if (other !== card) other.classList.add('is-neighbor')
      })
    })

    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect()
      const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width))
      const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height))
      const tiltX = ((x - 0.5) * 3).toFixed(2)
      const tiltY = ((0.5 - y) * 2.4).toFixed(2)

      card.style.setProperty('--spot-x', `${(x * 100).toFixed(1)}%`)
      card.style.setProperty('--spot-y', `${(y * 100).toFixed(1)}%`)
      card.style.setProperty('--tilt-x', `${tiltX}deg`)
      card.style.setProperty('--tilt-y', `${tiltY}deg`)
    })

    card.addEventListener('pointerleave', () => {
      card.classList.remove('is-active')
      card.style.setProperty('--tilt-x', '0deg')
      card.style.setProperty('--tilt-y', '0deg')
      card.style.setProperty('--spot-x', '50%')
      card.style.setProperty('--spot-y', '50%')
      serviceCards.forEach((other) => other.classList.remove('is-neighbor'))
    })
  })
}

const workNote = document.querySelector<HTMLElement>('.work-note')
if (workNote) {
  workNote.className = 'vertigo-projects'
  workNote.innerHTML = `
    <div class="vertigo-projects-heading"><div><p class="eyebrow">Portfolio · Concept projects</p><h2 id="work-heading">Ideas made <em>interactive.</em></h2></div><p>Explore four self-initiated concepts built to demonstrate thoughtful web experiences and practical agent workflows.</p></div>
    <a class="vertigo-live-store" href="https://emerald-beauty-store.vercel.app/#shop" target="_blank" rel="noopener noreferrer" aria-label="Visit Emerald Beauty Store, opens in a new tab">
      <div class="vertigo-live-store-art" aria-hidden="true"><span class="vertigo-store-spark">✳</span><span class="vertigo-store-art-name">EMERALD<br><i>BEAUTY</i></span><span class="vertigo-store-art-caption">BEAUTY · CARE · EVERYDAY</span></div>
      <div class="vertigo-live-store-copy"><div class="vertigo-live-store-meta"><span class="eyebrow">Featured live project · E-commerce</span><span class="vertigo-live-pill"><i></i> LIVE STOREFRONT</span></div><h3>Emerald Beauty Store</h3><p>A dedicated beauty storefront designed to make discovering products feel simple, polished, and welcoming.</p><span class="vertigo-live-store-link">Visit the storefront <b aria-hidden="true">↗</b></span></div>
    </a>
    <div class="vertigo-section-label"><span>01</span><div><h3>Websites &amp; e-commerce</h3><p>Digital storefronts and polished websites built around real business needs.</p></div></div>
    <div class="vertigo-project-grid">
      <article class="vertigo-project-card"><a class="vertigo-project-image" href="#demo/hearth-form"><img src="./demo-assets/hearth-vase.webp" alt="Handmade ceramic vase for Hearth & Form"><span>01 · E-COMMERCE</span></a><div class="vertigo-project-copy"><p class="eyebrow">Storefront concept</p><h3>Hearth &amp; Form</h3><p>A considered small-batch homeware shop with product filters and an interactive basket.</p><a href="#demo/hearth-form">Explore demo <span>↗</span></a></div></article>
      <article class="vertigo-project-card"><a class="vertigo-project-image" href="#demo/sunday-bakehouse"><img src="./demo-assets/sunday-bakehouse.webp" alt="Warm bakery scene for Sunday Bakehouse"><span>02 · WEBSITE</span></a><div class="vertigo-project-copy"><p class="eyebrow">Local business concept</p><h3>Sunday Bakehouse</h3><p>A neighbourhood bakery experience with menu, visit details, and a simulated preorder.</p><a href="#demo/sunday-bakehouse">Explore demo <span>↗</span></a></div></article>
      <article class="vertigo-project-card vertigo-upcoming"><div class="vertigo-upcoming-art vertigo-service-art"><span>COMING TO THE PORTFOLIO</span><strong>Local services,<br><em>made simple.</em></strong></div><div class="vertigo-project-copy"><p class="eyebrow">Website concept · In development</p><h3>Local Services</h3><p>A lead-ready website for cleaners, tradespeople, and local service businesses, with service pages and enquiry forms.</p><span class="vertigo-coming-label">Planned project</span></div></article>
      <article class="vertigo-project-card vertigo-upcoming"><div class="vertigo-upcoming-art vertigo-pro-art"><span>COMING TO THE PORTFOLIO</span><strong>Built on<br><em>trust.</em></strong></div><div class="vertigo-project-copy"><p class="eyebrow">Website concept · In development</p><h3>Professional Business</h3><p>A refined online presence for consultants and agencies, with service details, testimonials, and lead capture.</p><span class="vertigo-coming-label">Planned project</span></div></article>
    </div>
    <div class="vertigo-section-label vertigo-agent-section"><span>02</span><div><h3>AI agents &amp; automation</h3><p>Interactive assistants that help customers find answers and help teams move faster.</p></div></div>
    <div class="vertigo-project-grid">
      <article class="vertigo-project-card"><a class="vertigo-project-image vertigo-agent-art" href="#demo/findwell"><span>03 · AI AGENT</span><strong>Find something<br><em>that fits.</em></strong><small>FINDWELL / PRODUCT DISCOVERY</small></a><div class="vertigo-project-copy"><p class="eyebrow">Product discovery agent</p><h3>Findwell</h3><p>A guided product finder that turns plain-language needs into curated recommendations.</p><a href="#demo/findwell">Explore demo <span>↗</span></a></div></article>
      <article class="vertigo-project-card"><a class="vertigo-project-image vertigo-order-art" href="#demo/orderwise"><span>04 · AI AGENT</span><strong>ORDER STATUS <i>IN REVIEW</i></strong><div><b>Sample order #1048</b><small>Delivery update · Support handoff</small></div></a><div class="vertigo-project-copy"><p class="eyebrow">Post-purchase support agent</p><h3>Orderwise</h3><p>A support workspace for sample order status, address-change requests, and human handoff.</p><a href="#demo/orderwise">Explore demo <span>↗</span></a></div></article>
      <article class="vertigo-project-card vertigo-upcoming"><div class="vertigo-upcoming-art vertigo-support-art"><span>COMING TO THE PORTFOLIO</span><strong>Helpful answers,<br><em>anytime.</em></strong></div><div class="vertigo-project-copy"><p class="eyebrow">AI agent · In development</p><h3>Customer Support</h3><p>An assistant for common questions, service guidance, and escalation to a human when needed.</p><span class="vertigo-coming-label">Planned agent</span></div></article>
      <article class="vertigo-project-card vertigo-upcoming"><div class="vertigo-upcoming-art vertigo-lead-art"><span>COMING TO THE PORTFOLIO</span><strong>Better leads.<br><em>Clear next steps.</em></strong></div><div class="vertigo-project-copy"><p class="eyebrow">AI agent · In development</p><h3>Lead Qualification</h3><p>Collects useful context from prospective customers and helps teams prioritise enquiries.</p><span class="vertigo-coming-label">Planned agent</span></div></article>
      <article class="vertigo-project-card vertigo-upcoming"><div class="vertigo-upcoming-art vertigo-booking-art"><span>COMING TO THE PORTFOLIO</span><strong>Make time<br><em>for what matters.</em></strong></div><div class="vertigo-project-copy"><p class="eyebrow">AI agent · In development</p><h3>Booking Assistant</h3><p>Guides visitors through appointment selection and a clear booking journey.</p><span class="vertigo-coming-label">Planned agent</span></div></article>
      <article class="vertigo-project-card vertigo-upcoming"><div class="vertigo-upcoming-art vertigo-auto-art"><span>COMING TO THE PORTFOLIO</span><strong>Less busywork.<br><em>More momentum.</em></strong></div><div class="vertigo-project-copy"><p class="eyebrow">Automation · In development</p><h3>Business Automation</h3><p>Demonstrates workflows for organising enquiries, preparing follow-ups, and reducing repetitive tasks.</p><span class="vertigo-coming-label">Planned agent</span></div></article>
    </div><p class="vertigo-project-disclaimer">Hearth &amp; Form, Sunday Bakehouse, Findwell, and Orderwise are interactive concept demos. Emerald Beauty Store is a separate live storefront. Projects marked “Planned” are portfolio concepts, not yet built. AI responses, orders, and handoffs in the current demos are simulated; no live customer data, payments, or fulfilment systems are connected.</p>`
}
const projectStyles = document.createElement('style')
projectStyles.textContent = `
.vertigo-projects{display:block!important;margin-top:36px;color:#14232b}
.vertigo-projects .vertigo-project-card,.vertigo-live-store{border:1px solid rgba(255,255,255,.72);background:linear-gradient(135deg,rgba(255,255,255,.78),rgba(247,250,247,.52));backdrop-filter:blur(18px) saturate(135%);-webkit-backdrop-filter:blur(18px) saturate(135%);box-shadow:0 18px 50px rgba(25,49,48,.09),inset 0 1px 0 rgba(255,255,255,.85);transition:transform .35s cubic-bezier(.2,.75,.25,1),box-shadow .35s ease,border-color .35s ease,background .35s ease}
.vertigo-projects .vertigo-project-card:hover{transform:translateY(-6px);border-color:rgba(83,133,120,.48);box-shadow:0 24px 60px rgba(25,49,48,.15),inset 0 1px 0 rgba(255,255,255,.95)}
.vertigo-section-label{display:flex;align-items:flex-start;gap:16px;margin:44px 0 20px;padding:0 0 15px;border-bottom:1px solid rgba(66,99,91,.2)}
.vertigo-section-label>span{display:grid;place-items:center;width:34px;height:34px;flex:none;border:1px solid rgba(56,103,91,.25);border-radius:50%;background:rgba(255,255,255,.52);color:#35695a;font:700 .65rem 'Space Mono',monospace}
.vertigo-section-label h3{margin:0;color:#183f50;font:400 clamp(1.7rem,3vw,2.5rem)/1.05 'DM Serif Display',serif}
.vertigo-section-label p{margin:7px 0 0;color:#647178;font-size:.84rem;line-height:1.6}
.vertigo-upcoming-art{position:relative;display:flex;min-height:250px;flex-direction:column;justify-content:center;gap:24px;overflow:hidden;padding:34px;background:rgba(229,237,229,.74);color:#183f50}
.vertigo-upcoming-art:after{position:absolute;right:-34px;bottom:-75px;width:190px;height:190px;border:1px solid rgba(50,100,83,.18);border-radius:50%;box-shadow:0 0 0 24px rgba(255,255,255,.12),0 0 0 48px rgba(255,255,255,.09);content:"";pointer-events:none}
.vertigo-upcoming-art>span{position:relative;z-index:1;align-self:flex-start;padding:7px 9px;border:1px solid rgba(64,111,95,.25);border-radius:999px;background:rgba(255,255,255,.46);font:700 .52rem 'Space Mono',monospace;letter-spacing:.07em}
.vertigo-upcoming-art strong{position:relative;z-index:1;font:400 clamp(2rem,3.8vw,3rem)/.98 'DM Serif Display',serif;letter-spacing:-.03em}
.vertigo-upcoming-art strong em{color:#417365;font-weight:400}
.vertigo-service-art{background:linear-gradient(135deg,rgba(225,239,230,.9),rgba(212,229,221,.72))}
.vertigo-pro-art{background:linear-gradient(135deg,rgba(232,230,218,.9),rgba(215,226,222,.72))}
.vertigo-support-art{background:linear-gradient(135deg,rgba(222,235,240,.9),rgba(212,226,220,.72))}
.vertigo-lead-art{background:linear-gradient(135deg,rgba(238,231,213,.9),rgba(224,230,211,.72))}
.vertigo-booking-art{background:linear-gradient(135deg,rgba(229,224,241,.9),rgba(217,231,226,.72))}
.vertigo-auto-art{background:linear-gradient(135deg,rgba(220,234,229,.9),rgba(218,225,239,.72))}
.vertigo-coming-label{display:inline-flex;align-self:flex-start;margin-top:8px;padding:7px 10px;border:1px solid rgba(67,107,93,.22);border-radius:999px;background:rgba(255,255,255,.5);color:#527166;font:700 .55rem 'Space Mono',monospace;text-transform:uppercase;letter-spacing:.04em}
@media(prefers-reduced-motion:reduce){.vertigo-projects *, .vertigo-projects *:before,.vertigo-projects *:after{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
@media(max-width:680px){.vertigo-section-label{margin-top:32px}.vertigo-upcoming-art{min-height:210px}}.vertigo-projects-heading{display:grid;grid-template-columns:1fr minmax(240px,.7fr);gap:30px;align-items:end;margin-bottom:30px}.vertigo-projects-heading h2{margin:12px 0 0;font:400 clamp(2.5rem,5vw,4.6rem)/.95 'DM Serif Display',serif;letter-spacing:-.05em}.vertigo-projects-heading h2 em{color:#1b627c}.vertigo-projects-heading>p{max-width:440px;margin:0;color:#647178;line-height:1.75}.vertigo-live-store{display:grid;grid-template-columns:minmax(220px,.82fr) 1.18fr;gap:clamp(24px,5vw,64px);align-items:stretch;margin:0 0 28px;padding:clamp(16px,2.5vw,28px);background:#fff;border:1px solid #d7dcda;box-shadow:0 16px 44px #1220270b;transition:transform .25s ease,box-shadow .25s ease}.vertigo-live-store:hover{transform:translateY(-3px);box-shadow:0 22px 52px #12202714}.vertigo-live-store-art{position:relative;display:flex;min-height:245px;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(ellipse at 50% 30%,#e9f0dc 0,transparent 44%),linear-gradient(145deg,#163d32,#235748 62%,#b7c99d);color:#f8f5e9}.vertigo-store-spark{position:absolute;top:20px;right:22px;color:#dce8a9;font-size:35px}.vertigo-store-art-name{font:400 clamp(2.5rem,5vw,4.4rem)/.78 "DM Serif Display",Georgia,serif;letter-spacing:-.06em;text-align:center}.vertigo-store-art-name i{color:#d8e6a4;font-weight:400}.vertigo-store-art-caption{position:absolute;bottom:18px;left:18px;font:700 .52rem "Space Mono",monospace;letter-spacing:.12em;color:#e0e9d5}.vertigo-live-store-copy{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;padding:12px 0}.vertigo-live-store-meta{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;width:100%}.vertigo-live-pill{display:inline-flex;align-items:center;gap:7px;padding:7px 9px;background:#e9f2e6;color:#2e6245;font:700 .54rem "Space Mono",monospace;letter-spacing:.06em}.vertigo-live-pill i{width:6px;height:6px;border-radius:50%;background:#438c5a}.vertigo-live-store-copy h3{margin:20px 0 10px;font:400 clamp(2.2rem,4vw,3.5rem)/1 "DM Serif Display",serif;letter-spacing:-.04em;color:#183f50}.vertigo-live-store-copy>p{max-width:480px;margin:0;color:#647178;font-size:.9rem;line-height:1.8}.vertigo-live-store-link{display:inline-flex;align-items:center;gap:12px;margin-top:24px;padding-bottom:7px;border-bottom:1px solid #7c9ba3;color:#224e61;font:700 .65rem "Space Mono",monospace;text-transform:uppercase}.vertigo-live-store-link b{font-size:1rem}.vertigo-project-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}.vertigo-project-card{overflow:hidden;background:#fbfaf6;border:1px solid #d7dcda;box-shadow:0 12px 34px #1220270a}.vertigo-project-image{position:relative;display:flex;min-height:250px;align-items:center;justify-content:center;overflow:hidden;background:#e5e1d5}.vertigo-project-image>img{position:absolute;width:100%;height:100%;object-fit:cover;transition:transform .45s ease}.vertigo-project-card:hover .vertigo-project-image>img{transform:scale(1.035)}.vertigo-project-image>span{position:absolute;top:16px;left:16px;padding:8px 10px;background:#fbfaf6e8;color:#244653;font:700 .56rem 'Space Mono',monospace;letter-spacing:.08em}.vertigo-project-copy{padding:22px 24px 25px}.vertigo-project-copy h3{margin:8px 0;font:400 clamp(1.9rem,3vw,2.6rem)/1 'DM Serif Display',serif;color:#183f50}.vertigo-project-copy>p:not(.eyebrow){min-height:3.2em;color:#647178;font-size:.86rem;line-height:1.65}.vertigo-project-copy>a{display:inline-flex;gap:12px;padding-bottom:5px;border-bottom:1px solid #7c9ba3;color:#224e61;font:700 .65rem 'Space Mono',monospace;text-transform:uppercase}.vertigo-project-disclaimer{margin:24px 0 0;color:#718087;font-size:.76rem;line-height:1.7}.vertigo-agent-art{align-items:flex-start;flex-direction:column;padding:45px;background:radial-gradient(circle at 85% 10%,#c6d9bd,transparent 30%),linear-gradient(140deg,#dce9e2,#c9d9d2 55%,#e9e7d9);color:#163b3a}.vertigo-agent-art strong{font:400 clamp(2rem,4vw,3.5rem)/.95 'DM Serif Display',serif}.vertigo-agent-art strong em{color:#417365}.vertigo-agent-art small{font:700 .58rem 'Space Mono',monospace;letter-spacing:.1em;color:#55716b}.vertigo-order-art{align-items:stretch;flex-direction:column;gap:24px;padding:45px;background:#172a3a;color:#f4f4ef}.vertigo-order-art strong{font:700 .85rem 'Space Mono',monospace;letter-spacing:.04em}.vertigo-order-art strong i{float:right;color:#b6e177;font-style:normal;font-size:.65rem}.vertigo-order-art div{display:grid;gap:7px;padding:18px;border:1px solid #b5e1db2b;background:#ffffff0d}.vertigo-order-art small{color:#b6d8c2;font-size:.72rem}#vertigo-demo-root{position:fixed;inset:0;z-index:9999;overflow:auto;background:#f3f2ed}#vertigo-demo-root .demo-page{min-height:100%;overflow:visible}@media(max-width:680px){.vertigo-projects-heading{grid-template-columns:1fr;gap:14px}.vertigo-live-store{grid-template-columns:1fr;gap:20px;padding:14px}.vertigo-live-store-art{min-height:210px}.vertigo-live-store-copy{padding:8px 4px 10px}.vertigo-live-store-meta{align-items:flex-start}.vertigo-project-grid{grid-template-columns:1fr}.vertigo-project-image{min-height:230px}.vertigo-agent-art,.vertigo-order-art{padding:34px}.vertigo-project-copy{padding:20px}.vertigo-project-copy>p:not(.eyebrow){min-height:0}}
`
document.head.appendChild(projectStyles)
let demoRoot: Root | null = null
let demoMount: HTMLDivElement | null = null
const syncPortfolioDemo = () => {
  const match = window.location.hash.match(/^#demo\/(hearth-form|sunday-bakehouse|findwell|orderwise)$/)
  if (match) {
    if (!demoMount) { demoMount=document.createElement('div'); demoMount.id='vertigo-demo-root'; document.body.appendChild(demoMount); demoRoot=createRoot(demoMount) }
    demoRoot?.render(createElement(ProjectDemo,{slug:match[1]}))
    window.scrollTo({top:0})
  } else if (demoMount) { demoRoot?.unmount(); demoMount.remove(); demoMount=null; demoRoot=null }
}
window.addEventListener('hashchange',syncPortfolioDemo)
syncPortfolioDemo()

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

// Keep the service cards calm and readable; no pointer-tracking effects.

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
.vertigo-projects{display:block!important;margin-top:0;color:#20241f}
.vertigo-projects-heading{display:grid;grid-template-columns:1fr .7fr;gap:32px;align-items:end;margin-bottom:42px}
.vertigo-projects-heading h2{margin:12px 0 0;font:500 clamp(2.7rem,5vw,5rem)/.96 'DM Sans',sans-serif;letter-spacing:-.075em}
.vertigo-projects-heading h2 em{color:#d65b3d;font-family:'Playfair Display',serif}
.vertigo-projects-heading>p{max-width:420px;margin:0;color:#6e7169;font-size:.88rem;line-height:1.8}
.vertigo-projects .eyebrow{color:#77796f;font:500 .56rem 'DM Mono',monospace;letter-spacing:.1em;text-transform:uppercase}
.vertigo-live-store{display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(22px,5vw,58px);align-items:stretch;margin:0 0 48px;padding:0 0 30px;border-bottom:1px solid #c9c5ba;color:#20241f}
.vertigo-live-store-art{position:relative;display:flex;min-height:250px;align-items:center;justify-content:center;overflow:hidden;background:#263d32;color:#f8f6f0}
.vertigo-store-spark{position:absolute;top:18px;right:22px;color:#e89a7f;font-size:30px}
.vertigo-store-art-name{font:500 clamp(2.6rem,5vw,4.4rem)/.78 'Playfair Display',serif;letter-spacing:-.06em;text-align:center}
.vertigo-store-art-name i{color:#e7a28a;font-weight:500}
.vertigo-store-art-caption{position:absolute;bottom:17px;left:18px;font:400 .48rem 'DM Mono',monospace;letter-spacing:.1em;color:#e4e3d8}
.vertigo-live-store-copy{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;padding:12px 0}
.vertigo-live-store-meta{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;width:100%}
.vertigo-live-pill{display:inline-flex;align-items:center;gap:7px;padding:7px 9px;background:#e5e9dc;color:#345440;font:500 .5rem 'DM Mono',monospace;letter-spacing:.06em}
.vertigo-live-pill i{width:6px;height:6px;border-radius:50%;background:#477a51}
.vertigo-live-store-copy h3{margin:19px 0 9px;font:500 clamp(2rem,4vw,3.2rem)/1 'DM Sans',sans-serif;letter-spacing:-.07em;color:#263d32}
.vertigo-live-store-copy>p{max-width:470px;margin:0;color:#6e7169;font-size:.88rem;line-height:1.8}
.vertigo-live-store-link{display:inline-flex;align-items:center;gap:12px;margin-top:22px;padding-bottom:6px;border-bottom:1px solid #aaa79e;color:#263d32;font:500 .56rem 'DM Mono',monospace;letter-spacing:.04em;text-transform:uppercase}
.vertigo-live-store-link b{color:#d65b3d;font-size:1rem}
.vertigo-section-label{display:flex;align-items:flex-start;gap:16px;margin:52px 0 22px;padding:0 0 15px;border-bottom:1px solid #c9c5ba}
.vertigo-section-label>span{color:#d65b3d;font:500 .6rem 'DM Mono',monospace}
.vertigo-section-label h3{margin:0;color:#20241f;font:600 1.45rem 'DM Sans',sans-serif;letter-spacing:-.045em}
.vertigo-section-label p{margin:5px 0 0;color:#77796f;font-size:.8rem;line-height:1.6}
.vertigo-project-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:30px 22px}
.vertigo-project-card{overflow:hidden;background:transparent;border:0;border-bottom:1px solid #c9c5ba;box-shadow:none}
.vertigo-project-image{position:relative;display:flex;min-height:260px;align-items:center;justify-content:center;overflow:hidden;background:#dedbd1}
.vertigo-project-image>img{position:absolute;width:100%;height:100%;object-fit:cover;transition:transform .45s ease}
.vertigo-project-card:hover .vertigo-project-image>img{transform:scale(1.025)}
.vertigo-project-image>span{position:absolute;top:14px;left:14px;padding:7px 9px;background:#f1eee7;color:#454a42;font:500 .5rem 'DM Mono',monospace;letter-spacing:.06em}
.vertigo-project-copy{padding:18px 0 23px}
.vertigo-project-copy h3{margin:7px 0;font:600 clamp(1.65rem,3vw,2.35rem)/1 'DM Sans',sans-serif;letter-spacing:-.06em;color:#263d32}
.vertigo-project-copy>p:not(.eyebrow){min-height:3.2em;margin:0;color:#6e7169;font-size:.82rem;line-height:1.7}
.vertigo-project-copy>a{display:inline-flex;gap:12px;margin-top:14px;padding-bottom:5px;border-bottom:1px solid #aaa79e;color:#20241f;font:500 .55rem 'DM Mono',monospace;letter-spacing:.04em;text-transform:uppercase}
.vertigo-project-copy>a span{color:#d65b3d}
.vertigo-upcoming-art{position:relative;display:flex;min-height:260px;flex-direction:column;justify-content:center;gap:24px;overflow:hidden;padding:30px;background:#dedbd1;color:#263d32}
.vertigo-upcoming-art:after{position:absolute;right:-65px;bottom:-115px;width:240px;height:240px;border:1px solid #b9b6aa;border-radius:50%;box-shadow:0 0 0 24px rgba(255,255,255,.12),0 0 0 48px rgba(255,255,255,.1);content:"";pointer-events:none}
.vertigo-upcoming-art>span{position:relative;z-index:1;align-self:flex-start;padding:7px 9px;border:1px solid #b9b6aa;font:500 .48rem 'DM Mono',monospace;letter-spacing:.07em}
.vertigo-upcoming-art strong{position:relative;z-index:1;font:500 clamp(1.9rem,3.5vw,2.8rem)/.98 'Playfair Display',serif;letter-spacing:-.04em}
.vertigo-upcoming-art strong em{color:#d65b3d;font-weight:500}
.vertigo-service-art{background:#e3e8dc}.vertigo-pro-art{background:#e6e0d5}.vertigo-support-art{background:#dce4df}.vertigo-lead-art{background:#eadfd7}.vertigo-booking-art{background:#e4e0e9}.vertigo-auto-art{background:#dfe5dc}
.vertigo-coming-label{display:inline-flex;align-self:flex-start;margin-top:8px;padding:6px 8px;border:1px solid #b9b6aa;color:#696c64;font:500 .48rem 'DM Mono',monospace;text-transform:uppercase;letter-spacing:.04em}
.vertigo-agent-art{align-items:flex-start;flex-direction:column;padding:40px;background:#dfe7df;color:#263d32}
.vertigo-agent-art strong{font:500 clamp(2rem,4vw,3.3rem)/.95 'Playfair Display',serif}
.vertigo-agent-art strong em{color:#d65b3d}
.vertigo-agent-art small{font:500 .5rem 'DM Mono',monospace;letter-spacing:.1em;color:#657367}
.vertigo-order-art{align-items:stretch;flex-direction:column;gap:22px;padding:40px;background:#263d32;color:#f8f6f0}
.vertigo-order-art strong{font:500 .8rem 'DM Mono',monospace;letter-spacing:.04em}
.vertigo-order-art strong i{float:right;color:#e7a28a;font-style:normal;font-size:.6rem}
.vertigo-order-art div{display:grid;gap:7px;padding:17px;border:1px solid #ffffff2a;background:#ffffff0a}
.vertigo-order-art small{color:#d1d8cd;font-size:.68rem}
.vertigo-project-disclaimer{margin:30px 0 0;color:#85877e;font-size:.72rem;line-height:1.7}
@media(max-width:680px){.vertigo-projects-heading{grid-template-columns:1fr;gap:14px;margin-bottom:30px}.vertigo-live-store{grid-template-columns:1fr;gap:17px;padding-bottom:24px}.vertigo-live-store-art{min-height:210px}.vertigo-live-store-copy{padding:0 2px}.vertigo-live-store-meta{align-items:flex-start}.vertigo-section-label{margin-top:39px}.vertigo-project-grid{grid-template-columns:1fr;gap:24px}.vertigo-project-image,.vertigo-upcoming-art{min-height:225px}.vertigo-agent-art,.vertigo-order-art{padding:32px}.vertigo-project-copy>p:not(.eyebrow){min-height:0}}
@media(prefers-reduced-motion:reduce){.vertigo-projects *,.vertigo-projects *:before,.vertigo-projects *:after{transition:none!important;animation:none!important}}
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

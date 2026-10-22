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
    <div class="vertigo-project-grid">
      <article class="vertigo-project-card"><a class="vertigo-project-image" href="#demo/hearth-form"><img src="./demo-assets/hearth-vase.webp" alt="Handmade ceramic vase for Hearth & Form"><span>01 · E-COMMERCE</span></a><div class="vertigo-project-copy"><p class="eyebrow">Storefront concept</p><h3>Hearth &amp; Form</h3><p>A considered small-batch homeware shop with product filters and an interactive basket.</p><a href="#demo/hearth-form">Explore demo <span>↗</span></a></div></article>
      <article class="vertigo-project-card"><a class="vertigo-project-image" href="#demo/sunday-bakehouse"><img src="./demo-assets/sunday-bakehouse.webp" alt="Warm bakery scene for Sunday Bakehouse"><span>02 · WEBSITE</span></a><div class="vertigo-project-copy"><p class="eyebrow">Local business concept</p><h3>Sunday Bakehouse</h3><p>A neighbourhood bakery experience with menu, visit details, and a simulated preorder.</p><a href="#demo/sunday-bakehouse">Explore demo <span>↗</span></a></div></article>
      <article class="vertigo-project-card"><a class="vertigo-project-image vertigo-agent-art" href="#demo/findwell"><span>03 · AI AGENT</span><strong>Find something<br><em>that fits.</em></strong><small>FINDWELL / PRODUCT DISCOVERY</small></a><div class="vertigo-project-copy"><p class="eyebrow">Product discovery agent</p><h3>Findwell</h3><p>A guided product finder that turns plain-language needs into curated recommendations.</p><a href="#demo/findwell">Explore demo <span>↗</span></a></div></article>
      <article class="vertigo-project-card"><a class="vertigo-project-image vertigo-order-art" href="#demo/orderwise"><span>04 · AI AGENT</span><strong>ORDER STATUS <i>IN REVIEW</i></strong><div><b>Sample order #1048</b><small>Delivery update · Support handoff</small></div></a><div class="vertigo-project-copy"><p class="eyebrow">Post-purchase support agent</p><h3>Orderwise</h3><p>A support workspace for sample order status, address-change requests, and human handoff.</p><a href="#demo/orderwise">Explore demo <span>↗</span></a></div></article>
    </div><p class="vertigo-project-disclaimer">All four are self-initiated concept demos. AI responses, orders, and handoffs are simulated; no live customer data, payments, or fulfilment systems are connected.</p>`
}
const projectStyles = document.createElement('style')
projectStyles.textContent = `
.vertigo-projects{display:block!important;margin-top:36px;color:#14232b}.vertigo-projects-heading{display:grid;grid-template-columns:1fr minmax(240px,.7fr);gap:30px;align-items:end;margin-bottom:30px}.vertigo-projects-heading h2{margin:12px 0 0;font:400 clamp(2.5rem,5vw,4.6rem)/.95 'DM Serif Display',serif;letter-spacing:-.05em}.vertigo-projects-heading h2 em{color:#1b627c}.vertigo-projects-heading>p{max-width:440px;margin:0;color:#647178;line-height:1.75}.vertigo-project-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}.vertigo-project-card{overflow:hidden;background:#fbfaf6;border:1px solid #d7dcda;box-shadow:0 12px 34px #1220270a}.vertigo-project-image{position:relative;display:flex;min-height:250px;align-items:center;justify-content:center;overflow:hidden;background:#e5e1d5}.vertigo-project-image>img{position:absolute;width:100%;height:100%;object-fit:cover;transition:transform .45s ease}.vertigo-project-card:hover .vertigo-project-image>img{transform:scale(1.035)}.vertigo-project-image>span{position:absolute;top:16px;left:16px;padding:8px 10px;background:#fbfaf6e8;color:#244653;font:700 .56rem 'Space Mono',monospace;letter-spacing:.08em}.vertigo-project-copy{padding:22px 24px 25px}.vertigo-project-copy h3{margin:8px 0;font:400 clamp(1.9rem,3vw,2.6rem)/1 'DM Serif Display',serif;color:#183f50}.vertigo-project-copy>p:not(.eyebrow){min-height:3.2em;color:#647178;font-size:.86rem;line-height:1.65}.vertigo-project-copy>a{display:inline-flex;gap:12px;padding-bottom:5px;border-bottom:1px solid #7c9ba3;color:#224e61;font:700 .65rem 'Space Mono',monospace;text-transform:uppercase}.vertigo-project-disclaimer{margin:24px 0 0;color:#718087;font-size:.76rem;line-height:1.7}.vertigo-agent-art{align-items:flex-start;flex-direction:column;padding:45px;background:radial-gradient(circle at 85% 10%,#c6d9bd,transparent 30%),linear-gradient(140deg,#dce9e2,#c9d9d2 55%,#e9e7d9);color:#163b3a}.vertigo-agent-art strong{font:400 clamp(2rem,4vw,3.5rem)/.95 'DM Serif Display',serif}.vertigo-agent-art strong em{color:#417365}.vertigo-agent-art small{font:700 .58rem 'Space Mono',monospace;letter-spacing:.1em;color:#55716b}.vertigo-order-art{align-items:stretch;flex-direction:column;gap:24px;padding:45px;background:#172a3a;color:#f4f4ef}.vertigo-order-art strong{font:700 .85rem 'Space Mono',monospace;letter-spacing:.04em}.vertigo-order-art strong i{float:right;color:#b6e177;font-style:normal;font-size:.65rem}.vertigo-order-art div{display:grid;gap:7px;padding:18px;border:1px solid #b5e1db2b;background:#ffffff0d}.vertigo-order-art small{color:#b6d8c2;font-size:.72rem}#vertigo-demo-root{position:fixed;inset:0;z-index:9999;overflow:auto;background:#f3f2ed}#vertigo-demo-root .demo-page{min-height:100%;overflow:visible}@media(max-width:680px){.vertigo-projects-heading{grid-template-columns:1fr;gap:14px}.vertigo-project-grid{grid-template-columns:1fr}.vertigo-project-image{min-height:230px}.vertigo-agent-art,.vertigo-order-art{padding:34px}.vertigo-project-copy{padding:20px}.vertigo-project-copy>p:not(.eyebrow){min-height:0}}
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

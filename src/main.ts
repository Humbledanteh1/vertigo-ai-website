import './style.css'

const header = document.querySelector<HTMLElement>('.site-header')
const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle')
const navigation = document.querySelector<HTMLElement>('#primary-navigation')
const navItems = navigation?.querySelectorAll<HTMLAnchorElement>('a')
const year = document.querySelector<HTMLElement>('#year')

if (year) year.textContent = String(new Date().getFullYear())

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

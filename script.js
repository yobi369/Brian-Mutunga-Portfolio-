const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open', !expanded);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  }));
}
const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

// Keep the compact mobile navigation in sync when returning to desktop width.
window.addEventListener('resize', () => {
  if (window.matchMedia('(min-width: 721px)').matches && toggle && nav) {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  }
});


/* Progressive reveal: content remains visible when scripting or observer support is unavailable. */
const revealTargets = document.querySelectorAll(
  '.hero-main, .hero-visual, .section-head, .bm-product, .gallery-card, .service-card, .delivery-note, .capability-grid article, .about-content, .contact-section h2'
);
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach((element, index) => {
    element.setAttribute('data-reveal', '');
    if (element.matches('.bm-product, .service-card, .capability-grid article')) {
      element.setAttribute('data-delay', String((index % 3) + 1));
    }
  });
  document.documentElement.classList.add('motion-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealTargets.forEach((element) => revealObserver.observe(element));
}

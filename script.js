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

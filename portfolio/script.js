/* ========= script.js ========= */

/* Theme toggle (stores preference in localStorage).
   Applies class "dark" to <body> for dark mode. */
(function () {
  const themeToggle = document.getElementById('theme-toggle');
  function applyTheme(theme) {
    if (theme === 'dark') document.body.classList.add('dark');
    else document.body.classList.remove('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Light' : '🌙 Dark';
    localStorage.setItem('preferred-theme', theme);
  }

  const saved = localStorage.getItem('preferred-theme');
  applyTheme(saved || 'light');

  themeToggle.addEventListener('click', () => {
    const now = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(now);
  });
})();

/* Mobile nav toggle */
(function () {
  const mobileToggle = document.getElementById('mobile-toggle');
  const nav = document.querySelector('.main-nav');
  mobileToggle && mobileToggle.addEventListener('click', () => {
    if (nav.style.display === 'flex') {
      nav.style.display = '';
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '12px';
    }
  });
})();

/* Smooth scroll for nav links */
document.querySelectorAll('.main-nav a').forEach(a => {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if (!target) return;
    const headerOffset = 80;
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
    // close mobile nav if open
    const nav = document.querySelector('.main-nav');
    if (window.innerWidth <= 700) nav.style.display = '';
  });
});

/* Footer year */
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

/* Carousel (Graphics & Layouts) - single image at a time, arrows + autoplay + pause */
(function () {
  const container = document.querySelector('.carousel-container');
  if (!container) return;

  const slides = Array.from(container.querySelectorAll('.carousel-slide'));
  const prevBtn = container.querySelector('.carousel-prev');
  const nextBtn = container.querySelector('.carousel-next');
  let idx = 0;
  let timer = null;
  const interval = 3500;

  function show(i) {
    slides.forEach(s => s.classList.remove('active'));
    idx = (i + slides.length) % slides.length;
    slides[idx].classList.add('active');
  }

  function next() { show(idx + 1); }
  function prev() { show(idx - 1); }

  nextBtn && nextBtn.addEventListener('click', () => { next(); restart(); });
  prevBtn && prevBtn.addEventListener('click', () => { prev(); restart(); });

  function start() {
    timer = setInterval(() => next(), interval);
  }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }

  // pause on hover
  container.addEventListener('mouseenter', stop);
  container.addEventListener('mouseleave', start);

  // init
  show(0);
  start();
})();

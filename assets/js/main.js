/* The People Work Company — site JS */

(function () {
  'use strict';

  /* ── Navigation ─────────────────────────────────────── */
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const mobileNav = document.querySelector('.nav__mobile');

  // Scroll: transparent → solid
  function handleScroll() {
    if (!nav) return;
    const isHero = nav.classList.contains('nav--on-dark');
    if (window.scrollY > 40) {
      nav.classList.remove('nav--transparent', 'nav--on-dark');
      nav.classList.add('nav--solid');
      if (nav.dataset.logoLight) {
        const logoEl = nav.querySelector('.nav__logo img');
        if (logoEl) logoEl.src = nav.dataset.logoLight;
      }
      nav.querySelectorAll('.nav__toggle span').forEach(s => s.style.background = '');
      nav.querySelectorAll('.nav__link').forEach(l => l.style.color = '');
    } else {
      nav.classList.remove('nav--solid');
      nav.classList.add('nav--transparent');
      if (document.querySelector('.hero')) {
        nav.classList.add('nav--on-dark');
        if (nav.dataset.logoDark) {
          const logoEl = nav.querySelector('.nav__logo img');
          if (logoEl) logoEl.src = nav.dataset.logoDark;
        }
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      const open = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Close mobile menu on link click
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
      });
    });
  }

  // Active nav link
  (function setActiveLink() {
    const path = window.location.pathname.replace(/\/$/, '');
    document.querySelectorAll('.nav__link, .nav__mobile .nav__link').forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkPath = href.replace(/\/$/, '');
      if (path === linkPath || (linkPath !== '' && linkPath !== '/' && path.startsWith(linkPath))) {
        link.classList.add('active');
      }
    });
  })();

  /* ── Smooth anchor scrolling ─────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Intersection Observer: fade-in on scroll ─────────── */
  const fadeEls = document.querySelectorAll('[data-fade]');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const style = document.createElement('style');
    style.textContent = `
      [data-fade] { opacity: 0; transform: translateY(20px); transition: opacity 0.55s ease, transform 0.55s ease; }
      [data-fade].visible { opacity: 1; transform: none; }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 80 + 'ms';
      observer.observe(el);
    });
  }

})();

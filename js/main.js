/* ==========================================================================
   Valtrices landing page – main.js
   Dependency-free. Site-wide settings live in CONFIG below.
   ========================================================================== */
(function () {
  'use strict';

  /* ---- Site configuration ------------------------------------------------
     Every element with a data-link attribute is pointed at these URLs on
     page load; the hrefs in index.html are only no-JS fallbacks and should
     be kept in sync.

     downloadUrl    - where "Download Valtrices" points. Currently the site's
                      own riot.txt. TODO: switch to the GitHub Releases URL
                      once the Windows build is published, e.g.
                      'https://github.com/your-org/valtrices/releases/latest'
     downloadAsFile - true forces a file download (same-origin URLs only);
                      set to false when pointing at GitHub Releases.
     repoUrl        - TODO: replace with the real repository. */
  var CONFIG = {
    repoUrl: 'https://github.com/your-org/valtrices',
    downloadUrl: 'riot.txt',
    downloadAsFile: true
  };

  var html = document.documentElement;
  html.classList.add('js');

  /* ---- Links driven by CONFIG ------------------------------------------- */
  var linkTargets = {
    download: CONFIG.downloadUrl,
    repo: CONFIG.repoUrl,
    releases: CONFIG.repoUrl + '/releases',
    issues: CONFIG.repoUrl + '/issues'
  };
  document.querySelectorAll('[data-link]').forEach(function (el) {
    var kind = el.getAttribute('data-link');
    var href = linkTargets[kind];
    if (href) el.setAttribute('href', href);
    if (kind === 'download') {
      if (CONFIG.downloadAsFile) el.setAttribute('download', '');
      else el.removeAttribute('download');
    }
  });

  /* ---- Header: scrolled state ------------------------------------------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile navigation ------------------------------------------------- */
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('primary-nav');

  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function () {
    setMenu(!menu.classList.contains('is-open'));
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });
  var desktopQuery = window.matchMedia('(min-width: 860px)');
  desktopQuery.addEventListener('change', function (e) {
    if (e.matches) setMenu(false);
  });

  /* ---- Active section highlighting in the nav --------------------------- */
  var navLinks = Array.prototype.slice.call(menu.querySelectorAll('.nav__links a[href^="#"]'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---- Reveal on scroll -------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- Footer year -------------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

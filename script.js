// DJDS — 10 Years of Designing Justice
// Small, dependency-free interaction layer.

document.addEventListener('DOMContentLoaded', function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Reveal-on-scroll (fade up) ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Timeline reveal (slide in from left/right) ---------- */
  var sideEls = document.querySelectorAll('[data-reveal-side]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var sideIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          sideIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });
    sideEls.forEach(function (el) { sideIo.observe(el); });
  } else {
    sideEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Animated stat counters ---------- */
  var counters = document.querySelectorAll('[data-count-to]');
  function animateCount(el) {
    var raw = el.getAttribute('data-count-to');
    var target = parseFloat(raw);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'), 10) : 0;
    if (isNaN(target)) {
      // Non-numeric placeholder (e.g. "XXX") — show as-is, no count animation.
      el.textContent = prefix + raw + suffix;
      el.classList.add('stat-pending');
      return;
    }
    if (reduceMotion) {
      el.textContent = prefix + target.toLocaleString() + suffix;
      return;
    }
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      el.textContent = prefix + value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterIO.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Timeline spine: hand-drawn line "draws" as you scroll ---------- */
  var spinePath = document.getElementById('spine-draw');
  var vtimeline = document.getElementById('vtimeline');
  if (spinePath && vtimeline) {
    if (reduceMotion) {
      spinePath.style.strokeDashoffset = 0;
    } else {
      var pathLength = spinePath.getTotalLength();
      spinePath.style.strokeDasharray = pathLength;
      spinePath.style.strokeDashoffset = pathLength;
      var updateSpine = function () {
        var rect = vtimeline.getBoundingClientRect();
        var vh = window.innerHeight || document.documentElement.clientHeight;
        var total = rect.height + vh * 0.6;
        var scrolled = vh * 0.85 - rect.top;
        var progress = Math.max(0, Math.min(1, scrolled / total));
        spinePath.style.strokeDashoffset = pathLength * (1 - progress);
      };
      window.addEventListener('scroll', updateSpine, { passive: true });
      window.addEventListener('resize', updateSpine);
      updateSpine();
    }
  }

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
});

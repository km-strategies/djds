// DJDS — 10 Years of Designing Justice
// Small, dependency-free interaction layer.

document.addEventListener('DOMContentLoaded', function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Nav background on scroll ---------- */
  var siteNav = document.querySelector('.site-nav');
  if (siteNav) {
    var updateNav = function () {
      siteNav.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ---------- Hero background video: pause/play toggle + perf/a11y handling ---------- */
  var heroVideo = document.getElementById('heroVideo');
  var heroToggle = document.getElementById('heroVideoToggle');
  if (heroVideo && heroToggle) {
    var setToggleState = function (playing) {
      heroToggle.setAttribute('aria-pressed', playing ? 'false' : 'true');
      heroToggle.setAttribute('aria-label', playing ? 'Pause background video' : 'Play background video');
      heroToggle.querySelector('.icon-pause').hidden = !playing;
      heroToggle.querySelector('.icon-play').hidden = playing;
    };

    if (reduceMotion) {
      // Respect reduced-motion: never autoplay, show poster only.
      heroVideo.pause();
      heroVideo.removeAttribute('autoplay');
      setToggleState(false);
    }

    heroToggle.addEventListener('click', function () {
      if (heroVideo.paused) {
        heroVideo.play();
        setToggleState(true);
      } else {
        heroVideo.pause();
        setToggleState(false);
      }
    });

    // Pause the video when it's scrolled out of view to save resources.
    if ('IntersectionObserver' in window) {
      var heroIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!heroToggle.getAttribute('aria-pressed') || heroToggle.getAttribute('aria-pressed') === 'false') {
            if (entry.isIntersecting && !reduceMotion) {
              heroVideo.play().catch(function () {});
            } else {
              heroVideo.pause();
            }
          }
        });
      }, { threshold: 0.1 });
      heroIo.observe(heroVideo);
    }
  }

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

  /* ---------- Timeline scroll progress (horizontal) + arrow navigation ---------- */
  var track = document.getElementById('timelineTrack');
  var bar = document.querySelector('.timeline-progress-bar');
  var tlPrev = document.querySelector('.timeline-prev');
  var tlNext = document.querySelector('.timeline-next');

  if (track && bar) {
    var updateBar = function () {
      var max = track.scrollWidth - track.clientWidth;
      var pct = max > 0 ? (track.scrollLeft / max) * 100 : 0;
      bar.style.width = Math.max(6, pct) + '%';

      if (tlPrev && tlNext) {
        tlPrev.disabled = track.scrollLeft <= 2;
        tlNext.disabled = track.scrollLeft >= max - 2;
      }
    };
    track.addEventListener('scroll', updateBar, { passive: true });
    window.addEventListener('resize', updateBar);
    updateBar();
  }

  if (track && tlPrev && tlNext) {
    var scrollByCard = function (direction) {
      var firstCard = track.querySelector('.tl-card');
      var cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 420;
      var gapStr = window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap || '26px';
      var gap = parseFloat(gapStr) || 26;
      track.scrollBy({ left: direction * (cardWidth + gap), behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    tlPrev.addEventListener('click', function () { scrollByCard(-1); });
    tlNext.addEventListener('click', function () { scrollByCard(1); });
  }

  /* ---------- Partner quote carousel ---------- */
  var carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('[data-slide]'));
    var dots = Array.prototype.slice.call(carousel.querySelectorAll('.quote-dot'));
    var prevBtn = carousel.querySelector('.quote-prev');
    var nextBtn = carousel.querySelector('.quote-next');
    var current = 0;
    var autoplayMs = 8000;
    var timer = null;

    function goTo(index) {
      index = (index + slides.length) % slides.length;
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      dots[current].setAttribute('aria-selected', 'false');
      current = index;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
      dots[current].setAttribute('aria-selected', 'true');
    }

    function startAutoplay() {
      if (reduceMotion) return;
      stopAutoplay();
      timer = setInterval(function () { goTo(current + 1); }, autoplayMs);
    }
    function stopAutoplay() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); startAutoplay(); });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); startAutoplay(); });
    });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    startAutoplay();
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

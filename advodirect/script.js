/* ==========================================================================
   Advocaat Ward Van Loo — interactie
   Gebouwd door Digital Impression
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- iconen ---------- */
  function drawIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }
  window.addEventListener('load', drawIcons);
  document.addEventListener('DOMContentLoaded', drawIcons);

  /* ---------- jaartal ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- scrollvoortgang + sticky header + actiebalk ---------- */
  var progress   = document.getElementById('scrollProgress');
  var header     = document.getElementById('siteHeader');
  var actionBar  = document.getElementById('actionBar');
  var ticking    = false;

  function onScroll() {
    var top    = window.scrollY || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - window.innerHeight;

    if (progress) {
      progress.style.width = (height > 0 ? (top / height) * 100 : 0) + '%';
    }
    if (header) {
      header.classList.toggle('is-stuck', top > 12);
    }
    if (actionBar) {
      actionBar.classList.toggle('is-visible', top > 420);
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* ---------- mobiel menu ---------- */
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');

  function closeMenu() {
    if (!mobileMenu || !navToggle) return;
    mobileMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Menu openen');
    navToggle.innerHTML = '<i data-lucide="menu"></i>';
    document.body.style.overflow = '';
    drawIcons();
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
      navToggle.innerHTML = '<i data-lucide="' + (open ? 'x' : 'menu') + '"></i>';
      document.body.style.overflow = open ? 'hidden' : '';
      drawIcons();
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) closeMenu();
    });
  }

  /* ---------- dropdown toegankelijk maken (toetsenbord) ---------- */
  document.querySelectorAll('.nav__group').forEach(function (group) {
    var trigger = group.querySelector('.nav__trigger');
    if (!trigger) return;
    group.addEventListener('focusin', function () { trigger.setAttribute('aria-expanded', 'true'); });
    group.addEventListener('focusout', function () {
      if (!group.contains(document.activeElement)) trigger.setAttribute('aria-expanded', 'false');
    });
    group.addEventListener('mouseenter', function () { trigger.setAttribute('aria-expanded', 'true'); });
    group.addEventListener('mouseleave', function () { trigger.setAttribute('aria-expanded', 'false'); });
  });

  /* ---------- scroll-reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        window.setTimeout(function () { el.classList.add('is-in'); }, delay);
        observer.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- FAQ ---------- */
  document.querySelectorAll('.faq__item').forEach(function (item) {
    var btn    = item.querySelector('.faq__q');
    var answer = item.querySelector('.faq__a');
    if (!btn || !answer) return;

    btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      // andere sluiten
      item.parentElement.querySelectorAll('.faq__item.is-open').forEach(function (other) {
        if (other === item) return;
        other.classList.remove('is-open');
        other.querySelector('.faq__a').style.maxHeight = null;
        other.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
      });

      item.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';
    });
  });

  window.addEventListener('resize', function () {
    document.querySelectorAll('.faq__item.is-open .faq__a').forEach(function (a) {
      a.style.maxHeight = a.scrollHeight + 'px';
    });
  });

  /* ==========================================================================
     Schade-checker
     ========================================================================== */
  var widget = document.getElementById('checkerWidget');

  if (widget) {
    var steps    = widget.querySelectorAll('.checker__step');
    var bar      = document.getElementById('checkerBar');
    var counter  = document.getElementById('checkerCount');
    var backBtn  = document.getElementById('checkerBack');
    var summary  = document.getElementById('checkerSummary');
    var form     = document.getElementById('checkerForm');

    var TOTAL   = 4;               // stap 5 = bevestiging
    var current = 1;
    var answers = {};

    var LABELS = {
      situatie: 'Situatie',
      letsel:   'Letsel',
      status:   'Stand van zaken'
    };

    function render() {
      steps.forEach(function (step) {
        step.classList.toggle('is-active', Number(step.getAttribute('data-step')) === current);
      });

      var done = Math.min(current, TOTAL);
      if (bar) bar.style.width = (done / TOTAL) * 100 + '%';

      if (counter) {
        counter.textContent = current > TOTAL ? 'Verzonden' : 'Stap ' + current + ' van ' + TOTAL;
      }
      if (backBtn) backBtn.hidden = (current === 1 || current > TOTAL);

      if (current === TOTAL) buildSummary();
      drawIcons();
    }

    function buildSummary() {
      if (!summary) return;
      summary.innerHTML = '';
      Object.keys(LABELS).forEach(function (key) {
        if (!answers[key]) return;
        var row = document.createElement('p');
        row.className = 'checker__summary-row';
        row.innerHTML = '<b>' + LABELS[key] + '</b><span>' + answers[key] + '</span>';
        summary.appendChild(row);
      });
    }

    function goTo(step, scroll) {
      current = step;
      render();
      if (scroll !== false) {
        var y = widget.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    }

    widget.querySelectorAll('.opt').forEach(function (opt) {
      opt.addEventListener('click', function () {
        var field = opt.getAttribute('data-field');
        var value = opt.getAttribute('data-value');
        answers[field] = value;

        var group = opt.closest('.opts');
        if (group) {
          group.querySelectorAll('.opt').forEach(function (o) { o.classList.remove('is-selected'); });
        }
        opt.classList.add('is-selected');

        window.setTimeout(function () {
          if (current < TOTAL) goTo(current + 1);
        }, 220);
      });
    });

    if (backBtn) {
      backBtn.addEventListener('click', function () {
        if (current > 1) goTo(current - 1);
      });
    }

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        // eenvoudige validatie
        var invalid = false;
        form.querySelectorAll('[required]').forEach(function (input) {
          var ok = input.type === 'checkbox' ? input.checked : input.value.trim() !== '';
          if (input.type === 'email' && ok) ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
          if (!ok) {
            invalid = true;
            var target = input.type === 'checkbox' ? input.parentElement : input;
            target.style.outline = '2px solid #8A1C2B';
            target.style.outlineOffset = '2px';
            input.addEventListener('input', function once() {
              target.style.outline = '';
              input.removeEventListener('input', once);
            });
          }
        });
        if (invalid) return;

        answers.naam     = form.naam.value.trim();
        answers.telefoon = form.telefoon.value.trim();
        answers.email    = form.email.value.trim();
        answers.bericht  = form.bericht.value.trim();

        // TODO backend: stuur `answers` naar het gekozen formulier-endpoint.
        // Zie README — bv. Formspree, Netlify Forms of een eigen mailscript.
        submitLead(answers, 'dossiercheck');

        goTo(TOTAL + 1);
      });
    }
  }

  /* ---------- contactformulieren ---------- */
  document.querySelectorAll('[data-contact-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var invalid = false;
      form.querySelectorAll('[required]').forEach(function (input) {
        var ok = input.type === 'checkbox' ? input.checked : input.value.trim() !== '';
        if (input.type === 'email' && ok) ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        if (!ok) {
          invalid = true;
          var target = input.type === 'checkbox' ? input.parentElement : input;
          target.style.outline = '2px solid #8A1C2B';
          target.style.outlineOffset = '2px';
          input.addEventListener('input', function once() {
            target.style.outline = '';
            input.removeEventListener('input', once);
          });
        }
      });
      if (invalid) return;

      var data = {};
      new FormData(form).forEach(function (value, key) { data[key] = value; });
      submitLead(data, 'contactformulier');

      var card = form.closest('.form-card') || form.parentElement;
      card.innerHTML =
        '<div class="checker__done">' +
          '<div class="checker__done-icon"><i data-lucide="check"></i></div>' +
          '<h3 class="subhead" style="color:var(--navy);margin-bottom:0.75rem">Bedankt, uw bericht is genoteerd</h3>' +
          '<p style="font-size:0.9375rem;color:var(--ink-60);line-height:1.75">' +
            'Ik neem persoonlijk contact met u op, meestal binnen één werkdag. Is het dringend, ' +
            'bel dan gerust rechtstreeks op <a href="tel:+32475457814" style="color:var(--gold-deep);font-weight:600">0475 45 78 14</a>.' +
          '</p>' +
        '</div>';
      drawIcons();
    });
  });

  /* ---------- verzendlaag ----------
     Nog niet gekoppeld aan een backend. Vervang de body van deze functie door
     een fetch() naar het endpoint van keuze (Formspree, Netlify Forms, eigen PHP).
     Zie README.md voor de exacte instructies.                                  */
  function submitLead(data, bron) {
    if (window.console && console.info) {
      console.info('[advodirect] lead (' + bron + ') — nog niet verzonden, backend ontbreekt:', data);
    }
  }
})();

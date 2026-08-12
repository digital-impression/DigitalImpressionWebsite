/* ==========================================================================
   Schrijnwerkerij Kindermans — interactie
   Vanilla JS, geen dependencies. Digital Impression — 2026
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------------------
     Header: compacter zodra je scrollt
     ---------------------------------------------------------------------- */
  var header = document.getElementById('siteHeader');
  if (header) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------------------------------------------------
     Mobiel menu
     ---------------------------------------------------------------------- */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');

  if (burger && drawer) {
    var setMenu = function (open) {
      burger.setAttribute('aria-expanded', String(open));
      drawer.classList.toggle('is-open', open);
      drawer.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
      burger.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
    };

    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });

    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        burger.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024 && burger.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
      }
    });
  }

  /* ----------------------------------------------------------------------
     Scroll-onthulling
     ---------------------------------------------------------------------- */
  var revealables = document.querySelectorAll('.reveal');

  if (revealables.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealables.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var delay = parseFloat(el.getAttribute('data-delay') || '0');
          window.setTimeout(function () { el.classList.add('is-visible'); }, delay * 1000);
          observer.unobserve(el);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

      revealables.forEach(function (el) { observer.observe(el); });
    }
  }

  /* ----------------------------------------------------------------------
     Jaartal in de voettekst
     ---------------------------------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ----------------------------------------------------------------------
     Contactformulier — validatie in het Nederlands
     ---------------------------------------------------------------------- */
  var form = document.getElementById('contactForm');
  if (!form) return;

  var status = document.getElementById('formStatus');

  var rules = {
    naam: function (v) {
      if (!v.trim()) return 'Vul uw naam in.';
      if (v.trim().length < 2) return 'Dat lijkt te kort voor een naam.';
      return '';
    },
    email: function (v) {
      if (!v.trim()) return 'Vul uw e-mailadres in, zodat we kunnen antwoorden.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'Dit e-mailadres lijkt niet te kloppen.';
      return '';
    },
    telefoon: function (v) {
      if (!v.trim()) return '';
      if (!/^[0-9+()./\s-]{6,}$/.test(v.trim())) return 'Gebruik enkel cijfers, spaties en + ( ) - .';
      return '';
    },
    bericht: function (v) {
      if (!v.trim()) return 'Beschrijf kort wat u wilt laten uitvoeren.';
      if (v.trim().length < 10) return 'Iets meer uitleg helpt ons een juiste inschatting te maken.';
      return '';
    },
    akkoord: function (_v, field) {
      return field.checked ? '' : 'Bevestig dat we uw gegevens mogen gebruiken om te antwoorden.';
    }
  };

  var showError = function (field, message) {
    var wrap = field.closest('.field') || field.closest('.form__consent');
    var slot = wrap ? wrap.querySelector('.field__error') : null;
    if (!slot) slot = document.getElementById(field.name + 'Error');

    if (wrap) wrap.classList.toggle('field--error', Boolean(message));
    if (slot) slot.textContent = message;
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
  };

  var validateField = function (field) {
    var rule = rules[field.name];
    if (!rule) return true;
    var message = rule(field.value, field);
    showError(field, message);
    return !message;
  };

  Object.keys(rules).forEach(function (name) {
    var field = form.elements[name];
    if (!field) return;
    field.addEventListener('blur', function () { validateField(field); });
    field.addEventListener('input', function () {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    /* honeypot: bots vullen dit onzichtbare veld in */
    if (form.elements.website && form.elements.website.value) return;

    var firstInvalid = null;
    Object.keys(rules).forEach(function (name) {
      var field = form.elements[name];
      if (!field) return;
      if (!validateField(field) && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      firstInvalid.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      return;
    }

    /* Geen backend: we openen een vooringevulde e-mail.
       Vervang dit door een Formspree/Netlify-endpoint zodra dat er is. */
    var get = function (n) { return form.elements[n] ? form.elements[n].value.trim() : ''; };

    var lines = [
      'Naam: ' + get('naam'),
      'E-mail: ' + get('email'),
      'Telefoon: ' + (get('telefoon') || '—'),
      'Adres werf: ' + (get('adres') || '—'),
      'Type werk: ' + (get('dienst') || '—'),
      '',
      get('bericht')
    ];

    var href = 'mailto:info@schrijnwerkerij-kindermans.be' +
      '?subject=' + encodeURIComponent('Offerteaanvraag via de website — ' + get('naam')) +
      '&body=' + encodeURIComponent(lines.join('\n'));

    window.location.href = href;

    if (status) {
      status.hidden = false;
      status.textContent = 'Uw e-mailprogramma opent met de aanvraag klaar om te versturen. ' +
        'Lukt dat niet? Bel dan gerust 0477 711 236.';
      status.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    }
  });
})();

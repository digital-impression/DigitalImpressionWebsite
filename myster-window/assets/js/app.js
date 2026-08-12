/* ==========================================================================
   Myster Window — site behaviour
   Vanilla JS, no dependencies, no build step.
   Sections: icons · i18n · header · reveal · widgets · forms
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ------------------------------------------------------------------
     1. Icons — inline SVG (geometry from the Lucide icon set, ISC)
     ------------------------------------------------------------------ */
  var ICONS = {
    "phone": '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    "mail": '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    "map-pin": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    "arrow-up": '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
    "arrow-up-right": '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    "menu": '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
    "x": '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    "check": '<path d="M20 6 9 17l-5-5"/>',
    "check-circle": '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
    "chevron-down": '<path d="m6 9 6 6 6-6"/>',
    "ruler": '<path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4z"/><path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/><path d="m4.5 13.5 2 2"/>',
    "shield-check": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    "hammer": '<path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.99"/>',
    "truck": '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    "thermometer": '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"/>',
    "lock": '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    "layers": '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="m22 12.5-9.17 4.16a2 2 0 0 1-1.66 0L2 12.5"/><path d="m22 17.5-9.17 4.16a2 2 0 0 1-1.66 0L2 17.5"/>',
    "building": '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
    "home": '<path d="M3 9.5 12 2l9 7.5"/><path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/><path d="M9 21v-6h6v6"/>',
    "users": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    "clock": '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    "file-text": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v5h6"/><path d="M9 13h6"/><path d="M9 17h6"/>',
    "facebook": '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    "move-horizontal": '<path d="m18 8 4 4-4 4"/><path d="M2 12h20"/><path d="m6 8-4 4 4 4"/>',
    "alert-circle": '<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
    "info": '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    "calendar": '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
    "wrench": '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    "leaf": '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    "award": '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    "plus": '<path d="M5 12h14"/><path d="M12 5v14"/>',
    "sparkles": '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/>',
    "globe": '<circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>',
    "square-pen": '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.4 2.6a2 2 0 0 1 2.8 2.8L12 14.6 8 15.6l1-4z"/>'
  };

  function renderIcons(scope) {
    $$("[data-icon]", scope).forEach(function (el) {
      var name = el.getAttribute("data-icon");
      if (!ICONS[name] || el.dataset.iconDone === "1") return;
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("stroke-width", el.getAttribute("data-icon-weight") || "1.6");
      svg.setAttribute("stroke-linecap", "round");
      svg.setAttribute("stroke-linejoin", "round");
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("class", "icon");
      svg.innerHTML = ICONS[name];
      el.replaceWith(svg);
    });
  }

  /* ------------------------------------------------------------------
     2. i18n — NL is authored in the HTML, other languages come from
        window.MW_I18N. Original NL text is cached on first run so we can
        always switch back without shipping a duplicate NL dictionary.
     ------------------------------------------------------------------ */
  var STORE_KEY = "mw-lang";
  var ATTR_MAP = {
    "data-i18n": "text",
    "data-i18n-placeholder": "placeholder",
    "data-i18n-aria": "aria-label",
    "data-i18n-content": "content",
    "data-i18n-title": "title"
  };

  // dataset keys may not contain a dash followed by a lowercase letter, so
  // "aria-label" has to be flattened before it can be used as a cache key.
  function storeKey(target) {
    return "nl" + target.replace(/[^a-z0-9]/gi, "");
  }

  function cacheOriginals() {
    Object.keys(ATTR_MAP).forEach(function (attr) {
      $$("[" + attr + "]").forEach(function (el) {
        var target = ATTR_MAP[attr];
        var store = storeKey(target);
        if (el.dataset[store] !== undefined) return;
        el.dataset[store] = target === "text" ? el.innerHTML : (el.getAttribute(target) || "");
      });
    });
  }

  function applyLang(lang) {
    var dict = lang === "nl" ? null : (window.MW_I18N && window.MW_I18N[lang]);
    if (lang !== "nl" && !dict) lang = "nl";

    Object.keys(ATTR_MAP).forEach(function (attr) {
      $$("[" + attr + "]").forEach(function (el) {
        var key = el.getAttribute(attr);
        var target = ATTR_MAP[attr];
        var fallback = el.dataset[storeKey(target)];
        var value = dict ? dict[key] : fallback;
        if (dict && value === undefined) value = fallback;
        if (value === undefined || value === null) return;
        if (target === "text") el.innerHTML = value;
        else el.setAttribute(target, value);
      });
    });

    document.documentElement.setAttribute("lang", lang);
    $$("[data-lang-btn]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang-btn") === lang));
    });
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* private mode */ }
    document.dispatchEvent(new CustomEvent("mw:langchange", { detail: { lang: lang } }));
  }

  function initI18n() {
    cacheOriginals();
    var stored;
    try { stored = localStorage.getItem(STORE_KEY); } catch (e) { stored = null; }
    if (stored && stored !== "nl") applyLang(stored);
    else applyLang("nl");

    $$("[data-lang-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-lang-btn"));
      });
    });
  }

  function t(nl, key) {
    var lang = document.documentElement.getAttribute("lang");
    if (lang === "nl") return nl;
    var dict = window.MW_I18N && window.MW_I18N[lang];
    return (dict && dict[key]) || nl;
  }

  /* ------------------------------------------------------------------
     3. Header, drawer, scroll chrome
     ------------------------------------------------------------------ */
  function initHeader() {
    var header = $("#siteHeader");
    var drawer = $("#drawer");
    var openBtn = $("#navToggle");
    var closeBtn = $("#drawerClose");
    var progress = $("#scrollProgress");
    var toTop = $("#toTop");
    var mobileCta = $("#mobileCta");

    function onScroll() {
      var y = window.scrollY;
      if (header) header.classList.toggle("is-stuck", y > 8);
      if (toTop) toTop.classList.toggle("is-visible", y > 700);
      if (mobileCta) mobileCta.classList.toggle("is-visible", y > 420);
      if (progress) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    function setDrawer(open) {
      if (!drawer) return;
      drawer.classList.toggle("is-open", open);
      document.body.classList.toggle("is-locked", open);
      if (openBtn) openBtn.setAttribute("aria-expanded", String(open));
      if (open) { var first = $("a, button", drawer); if (first) first.focus(); }
      else if (openBtn) openBtn.focus();
    }
    if (openBtn) openBtn.addEventListener("click", function () { setDrawer(true); });
    if (closeBtn) closeBtn.addEventListener("click", function () { setDrawer(false); });
    if (drawer) $$("a", drawer).forEach(function (a) {
      a.addEventListener("click", function () { setDrawer(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (drawer && drawer.classList.contains("is-open")) setDrawer(false);
        var lb = $("#lightbox");
        if (lb && lb.classList.contains("is-open")) closeLightbox();
      }
    });
    if (toTop) toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ------------------------------------------------------------------
     4. Scroll reveal + counters
     ------------------------------------------------------------------ */
  function initReveal() {
    var items = $$("[data-reveal]");
    if (!items.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  function initCounters() {
    var nodes = $$("[data-count]");
    if (!nodes.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach(function (n) { n.textContent = n.getAttribute("data-count"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute("data-count"));
        var start = performance.now();
        var dur = 1300;
        (function tick(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        })(start);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ------------------------------------------------------------------
     5. FAQ accordion
     ------------------------------------------------------------------ */
  function initFaq() {
    $$(".faq__q").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        var group = btn.closest(".faq");
        if (group && !open) {
          $$(".faq__q[aria-expanded='true']", group).forEach(function (other) {
            other.setAttribute("aria-expanded", "false");
          });
        }
        btn.setAttribute("aria-expanded", String(!open));
      });
    });
  }

  /* ------------------------------------------------------------------
     6. Project filters
     ------------------------------------------------------------------ */
  function initFilters() {
    var bar = $("#projectFilters");
    if (!bar) return;
    var projects = $$("[data-category]");
    var empty = $("#projectsEmpty");

    $$(".filter", bar).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var value = btn.getAttribute("data-filter");
        $$(".filter", bar).forEach(function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });
        var shown = 0;
        projects.forEach(function (card) {
          var match = value === "all" || card.getAttribute("data-category").split(" ").indexOf(value) !== -1;
          card.classList.toggle("is-hidden", !match);
          if (match) shown++;
        });
        if (empty) empty.hidden = shown !== 0;
      });
    });
  }

  /* ------------------------------------------------------------------
     7. Lightbox
     ------------------------------------------------------------------ */
  function closeLightbox() {
    var lb = $("#lightbox");
    if (!lb) return;
    lb.classList.remove("is-open");
    document.body.classList.remove("is-locked");
  }

  function initLightbox() {
    var lb = $("#lightbox");
    if (!lb) return;
    var img = $("#lightboxImg");
    var cap = $("#lightboxCaption");

    $$("[data-lightbox]").forEach(function (trigger) {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        img.src = trigger.getAttribute("data-lightbox");
        img.alt = trigger.getAttribute("data-lightbox-alt") || "";
        cap.textContent = trigger.getAttribute("data-lightbox-caption") || "";
        lb.classList.add("is-open");
        document.body.classList.add("is-locked");
        $("#lightboxClose").focus();
      });
    });
    $("#lightboxClose").addEventListener("click", closeLightbox);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
  }

  /* ------------------------------------------------------------------
     8. Before / after slider
     ------------------------------------------------------------------ */
  function initBeforeAfter() {
    $$("[data-ba]").forEach(function (ba) {
      var dragging = false;
      function setPos(clientX) {
        var rect = ba.getBoundingClientRect();
        var pct = ((clientX - rect.left) / rect.width) * 100;
        pct = Math.max(0, Math.min(100, pct));
        ba.style.setProperty("--pos", pct + "%");
        var input = $("input[type=range]", ba);
        if (input) input.value = String(Math.round(pct));
      }
      ba.addEventListener("pointerdown", function (e) {
        dragging = true; ba.setPointerCapture(e.pointerId); setPos(e.clientX);
      });
      ba.addEventListener("pointermove", function (e) { if (dragging) setPos(e.clientX); });
      ba.addEventListener("pointerup", function () { dragging = false; });
      ba.addEventListener("pointercancel", function () { dragging = false; });

      var input = $("input[type=range]", ba);
      if (input) input.addEventListener("input", function () {
        ba.style.setProperty("--pos", input.value + "%");
      });
    });
  }

  /* ------------------------------------------------------------------
     9. Multi-step quote form
     ------------------------------------------------------------------ */
  function initForm() {
    var form = $("#quoteForm");
    if (!form) return;

    var steps = $$(".fieldset", form);
    var indicators = $$(".progress__step");
    var btnPrev = $("#formPrev");
    var btnNext = $("#formNext");
    var btnSubmit = $("#formSubmit");
    var okBox = $("#formSuccess");
    var errBox = $("#formError");
    var current = 0;

    function showStep(i) {
      current = Math.max(0, Math.min(steps.length - 1, i));
      steps.forEach(function (s, idx) { s.classList.toggle("is-active", idx === current); });
      indicators.forEach(function (ind, idx) {
        ind.classList.toggle("is-active", idx === current);
        ind.classList.toggle("is-done", idx < current);
      });
      btnPrev.hidden = current === 0;
      btnNext.hidden = current === steps.length - 1;
      btnSubmit.hidden = current !== steps.length - 1;
      var head = $(".form-wrap");
      if (head && current > 0) {
        var top = head.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
      }
    }

    function fieldError(field, message) {
      field.classList.add("has-error");
      var box = $(".field__error", field);
      if (box) box.textContent = message;
    }

    function clearError(field) {
      field.classList.remove("has-error");
    }

    function validateStep(index) {
      var ok = true;
      var scope = steps[index];
      $$("[required]", scope).forEach(function (input) {
        var field = input.closest(".field") || input.closest(".choices-field");
        if (!field) return;
        var valid = true;

        if (input.type === "radio") {
          valid = !!form.querySelector("input[name='" + input.name + "']:checked");
        } else if (input.type === "checkbox") {
          valid = input.checked;
        } else {
          valid = input.value.trim() !== "";
          if (valid && input.type === "email") {
            valid = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(input.value.trim());
          }
          if (valid && input.type === "tel") {
            valid = input.value.replace(/[^0-9]/g, "").length >= 8;
          }
        }

        if (!valid) {
          ok = false;
          var msg = input.type === "email"
            ? t("Vul een geldig e-mailadres in.", "err_email")
            : input.type === "tel"
              ? t("Vul een geldig telefoonnummer in.", "err_phone")
              : t("Dit veld is verplicht.", "err_required");
          fieldError(field, msg);
        } else {
          clearError(field);
        }
      });
      if (!ok) {
        var firstBad = $(".has-error", scope);
        if (firstBad) {
          var focusable = $("input, select, textarea", firstBad);
          if (focusable) focusable.focus();
        }
      }
      return ok;
    }

    btnNext.addEventListener("click", function () {
      if (validateStep(current)) showStep(current + 1);
    });
    btnPrev.addEventListener("click", function () { showStep(current - 1); });

    $$("input, select, textarea", form).forEach(function (input) {
      input.addEventListener("input", function () {
        var field = input.closest(".field") || input.closest(".choices-field");
        if (field) clearError(field);
      });
      input.addEventListener("change", function () {
        var field = input.closest(".field") || input.closest(".choices-field");
        if (field) clearError(field);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      okBox.classList.remove("is-visible");
      errBox.classList.remove("is-visible");

      if (!validateStep(current)) return;
      if ($("#website") && $("#website").value !== "") return; // honeypot

      var endpoint = form.getAttribute("data-endpoint");
      var original = btnSubmit.innerHTML;
      btnSubmit.disabled = true;
      btnSubmit.textContent = t("Versturen…", "form_sending");

      // No endpoint configured yet: fall back to a prefilled e-mail so the
      // form is never a dead end while the client picks a form service.
      if (!endpoint || endpoint === "REPLACE_WITH_FORM_ENDPOINT") {
        var data = new FormData(form);
        var lines = [];
        data.forEach(function (value, key) {
          if (key === "website" || !String(value).trim()) return;
          lines.push(key + ": " + value);
        });
        var mailto = "mailto:" + (form.getAttribute("data-fallback-email") || "info@myster-window.be")
          + "?subject=" + encodeURIComponent(t("Offerteaanvraag via website", "form_subject"))
          + "&body=" + encodeURIComponent(lines.join("\n"));
        window.location.href = mailto;
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = original;
        okBox.classList.add("is-visible");
        return;
      }

      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (!res.ok) throw new Error("bad status");
          form.reset();
          okBox.classList.add("is-visible");
          steps.forEach(function (s) { s.style.display = "none"; });
          $(".form-nav").style.display = "none";
          $(".progress").style.display = "none";
        })
        .catch(function () {
          errBox.classList.add("is-visible");
        })
        .finally(function () {
          btnSubmit.disabled = false;
          btnSubmit.innerHTML = original;
        });
    });

    showStep(0);
  }

  /* ------------------------------------------------------------------
     10. Prefill the quote form from link parameters
         e.g. offerte.html?type=project&materiaal=aluminium
     ------------------------------------------------------------------ */
  function initPrefill() {
    if (!$("#quoteForm") || !window.URLSearchParams) return;
    var params = new URLSearchParams(window.location.search);

    function pick(name, value) {
      if (!value) return;
      var input = document.querySelector("input[name='" + name + "'][value='" + value + "']");
      if (input) input.checked = true;
    }

    var type = params.get("type");
    if (type === "project") pick("aanvrager", "professional");
    if (type === "particulier") pick("aanvrager", "particulier");
    if (type === "renovatie") { pick("aanvrager", "particulier"); pick("soortwerk", "renovatie"); }

    var materiaal = params.get("materiaal");
    if (materiaal === "pvc" || materiaal === "aluminium") pick("materiaal", materiaal);
    if (materiaal === "houtlook") {
      pick("materiaal", "advies");
      var note = $("#bericht");
      if (note && !note.value) note.value = t("Interesse in hout-look profielen.", "prefill_woodlook");
    }

    var product = params.get("product");
    if (product === "deur") pick("product", "deuren");
    if (product === "raam") pick("product", "ramen");
  }

  /* ------------------------------------------------------------------
     11. Misc
     ------------------------------------------------------------------ */
  function initYear() {
    $$("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------ */
  function boot() {
    renderIcons(document);
    initI18n();
    initHeader();
    initReveal();
    initCounters();
    initFaq();
    initFilters();
    initLightbox();
    initBeforeAfter();
    initForm();
    initPrefill();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

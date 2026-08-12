/* ==========================================================================
   Zen Thai Therapy — interaction layer
   Vanilla JS, no dependencies. Built by Digital Impression.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ======================================================================
     i18n — Nederlands is de basis in de HTML, EN/FR worden hier ingeladen
     ====================================================================== */
  var I18N = {
    en: {
      skip: "Skip to content",
      top_address: "Frans Mombaersstraat 221, 3071 Kortenberg",
      top_hours: "Daily 2 pm – 9 pm, by appointment",
      brand_sub: "Therapy · Kortenberg",
      nav_massage: "The massage", nav_treatments: "Treatments", nav_visit: "Your visit",
      nav_about: "About Somphit", nav_contact: "Contact", nav_gift: "Gift voucher",
      cta_call_short: "Call for an appointment",

      hero_eyebrow: "Traditional Thai massage · Kortenberg",
      hero_h1_a: "Where tension", hero_h1_b: "lets go",
      hero_lead: "Authentic Thai massage therapy by Somphit Wongmak — trained at the Thai Traditional Medicine Society in Bangkok. For aching muscles and stiff joints, or simply for deep rest.",
      cta_call: "Call 0477 94 00 08",
      cta_treatments: "View treatments",
      trust_1: "10+ years of experience", trust_2: "Trained in Thailand",
      trust_3: "By appointment only", trust_4: "Parking on site",

      mass_eyebrow: "The treatment",
      mass_h2_a: "No oil. No table.", mass_h2_b: "A centuries-old technique.",
      mass_p1: "Traditional Thai massage is part of classical Thai culture and combines gentle yoga movements, acupressure, reflexology and stretching. You lie fully clothed on a mat — no oil is involved.",
      mass_p2: "Using thumbs, palms, elbows, knees and feet, rhythmic pressure is applied along the body's energy lines. Somphit works with her own body weight: slow, deliberate and always attuned to what your body needs that day.",
      feat_1_t: "You stay dressed", feat_1_d: "Wear loose clothing you can move freely in.",
      feat_2_t: "Without oil", feat_2_d: "No greasy feeling, no shower needed afterwards.",
      feat_3_t: "On a mat", feat_3_d: "More room to stretch than on a massage table.",
      feat_4_t: "Actively stretched", feat_4_d: "Your joints are opened gently and under control.",

      ben_eyebrow: "Why people come",
      ben_h2_a: "More than", ben_h2_b: "relaxation",
      ben_aside: "Some arrive with a specific complaint. Others come simply to have nothing to do for a while. Both are equally welcome.",
      ben_1_t: "Chronic tension", ben_1_d: "Deep, settled tension is released layer by layer rather than only superficially loosened.",
      ben_2_t: "Back and neck pain", ben_2_d: "Targeted pressure on the muscle groups that suffer most from desk work and stress.",
      ben_3_t: "Arthritis and migraine", ben_3_d: "A treatment many people experience as relieving for stiff joints and recurring headaches.",
      ben_4_t: "Better circulation", ben_4_d: "Rhythmic pressure and stretching stimulate blood flow down to the smallest muscle fibres.",
      ben_5_t: "Suppleness and mobility", ben_5_d: "Passive yoga stretches widen your range of movement — noticeable from the very first session.",
      ben_6_t: "Mental calm", ben_6_d: "Ninety minutes without a phone, without a schedule. For many people, that is the real result.",
      stat_1: "years of experience", stat_2: "treatments", stat_3: "days open", stat_4: "by appointment",

      tr_eyebrow: "Treatments & prices",
      tr_h2_a: "Choose what your", tr_h2_b: "body is asking for",
      tr_aside: "Every treatment starts with a short conversation. Combinations are always possible — just tell us on the phone what is bothering you.",
      tag_signature: "Signature",
      tr_1_t: "Complete treatment",
      tr_1_m: "Thai Yoga Massage + herbal compress · 90 min",
      tr_1_d: "The full experience. First the body is thoroughly loosened and stretched with Thai Yoga Massage, then the warm herbal compress follows to relax the muscles deeply. If you only book one treatment a year, book this one.",
      tr_2_t: "Thai Yoga Massage",
      tr_2_m: "45 or 90 min · clothed, on a mat",
      tr_2_d: "The classic Thai treatment: acupressure along the energy lines combined with passive yoga stretches. Most effective for stiffness and chronic tension.",
      tr_2_p1: "/ 45 min", tr_2_p2: "/ 90 min",
      tr_3_t: "Herbal compress massage",
      tr_3_m: "30 min · with warm herbal compresses",
      tr_3_d: "Cloth pouches filled with Thai herbs are warmed and rolled over the muscles. The heat penetrates deeply — especially welcome in winter and after sport.",
      tr_4_t: "Thai Classic Relaxation",
      tr_4_m: "60 min · gentle pressure",
      tr_4_d: "The same technique, but with softer pressure and more emphasis on relaxation than on treatment. Ideal as a first introduction to Thai massage.",

      pl_title: "Short treatments",
      pl_sub: "Perfect as an addition, or when you are short on time.",
      pl_1_n: "Neck and shoulder massage",
      pl_2_n: "Head and face massage",
      pl_3_n: "Neck, shoulder, head & face",
      pl_4_n: "Foot massage & reflexology",
      pl_foot: "Combinations are possible. Feel free to call so we can choose the right treatment together.",

      vis_eyebrow: "Your visit",
      vis_h2_a: "What to", vis_h2_b: "expect",
      vis_aside: "We work strictly by appointment. That way you are the only client at that moment and the practice stays quiet.",
      step_1_t: "You call for an appointment",
      step_1_d: "Briefly explain what is bothering you and how much time you have. Somphit suggests a suitable treatment and schedules a slot.",
      step_2_t: "A personal welcome",
      step_2_d: "You are received personally. Before the treatment we discuss your complaints, your sensitivities and the pressure you prefer.",
      step_3_t: "The treatment",
      step_3_d: "Clothed, on a mat, in a quiet room. Pressure, pace and stretches are adjusted along the way — do say what feels right.",
      step_4_t: "Take a moment",
      step_4_d: "After the massage, take your time to come round. Drink plenty of water that day — it helps the body clear out.",

      about_caption: "Thai massage therapist",
      about_eyebrow: "About Zen Thai Therapy",
      about_h2_a: "One therapist,", about_h2_b: "no conveyor belt",
      about_p1: "At Zen Thai Therapy you are personally received and treated by Somphit Wongmak. No changing faces, no production line: one therapist who gets to know your body across sessions.",
      about_p2: "Somphit learned her craft at the renowned Thai Traditional Medicine Society and has well over ten years of experience in Thai massage therapy. She works from a quiet practice in Kortenberg, where time deliberately runs a little slower.",
      about_quote: "“Every body tells a different story. My work is to listen with my hands.”",
      badge_1: "Thai Traditional Medicine Society",
      badge_2: "10+ years in practice",
      badge_3: "Personal intake at every session",
      notice_t: "A therapeutic practice.",
      notice_d: "Zen Thai Therapy offers traditional, professional massage therapy only. No erotic massage.",

      gal_eyebrow: "The practice",
      gal_h2_a: "A place to", gal_h2_b: "come to a stop",
      gal_aside: "A quiet treatment room in Kortenberg, with parking at the door and the bus and train stop 350 metres away.",

      gift_eyebrow: "Gift voucher",
      gift_h2_a: "Give someone", gift_h2_b: "ninety minutes of quiet",
      gift_lead: "A gift voucher for a massage session of their choice — for a birthday, as a thank you, or simply because someone deserves it. Call to reserve one.",
      gift_cta: "Request a gift voucher",

      faq_eyebrow: "Frequently asked questions",
      faq_h2_a: "Good to", faq_h2_b: "know beforehand",
      faq_aside: "Question not listed? Just call — Somphit is happy to explain over the phone.",
      faq_1_q: "Do I have to undress?",
      faq_1_a: "No. In traditional Thai massage you stay fully clothed and no oil is used. Wear loose, comfortable clothing you can move freely in — jogging bottoms and a T-shirt are ideal.",
      faq_2_q: "How do I make an appointment?",
      faq_2_a: "By phone only, on 0477 94 00 08, daily between 2 pm and 9 pm. We work by appointment only so that you receive full attention in a quiet setting. Walk-ins are unfortunately not possible.",
      faq_3_q: "Is Thai massage painful?",
      faq_3_a: "The pressure is always adapted to your body and your wishes. With stubborn tension it can feel intense — like a good stretch — but never painful. Do say so during the treatment; it is adjusted immediately.",
      faq_4_q: "Do you offer erotic massage?",
      faq_4_a: "No. Zen Thai Therapy is a therapeutic practice. We offer traditional Thai massage only, performed by a professionally trained therapist. Requests of that nature are declined.",
      faq_5_q: "I'm not flexible — can I still come?",
      faq_5_a: "Absolutely. Thai massage suits young and old, and those who are stiff often benefit the most. The stretches are fully adapted to your range of movement — you don't need to be able to do anything yourself.",
      faq_6_q: "How long is a session and how often should I come?",
      faq_6_a: "Sessions last 30 to 90 minutes. For a specific complaint, a series of sessions close together works best; after that a maintenance session every few weeks is usually enough. Somphit will advise you after the first treatment.",
      faq_7_q: "Is there anything that would rule out a treatment?",
      faq_7_a: "In case of pregnancy, fever, recent surgery, fractures, thrombosis or serious medical conditions: please mention this when booking. If in doubt we ask you to consult your doctor first. The treatment is then adapted or postponed.",
      faq_8_q: "How can I pay and is there parking?",
      faq_8_a: "There is parking on site and the bus and train stop are about 350 metres away. Feel free to ask about payment options when you book.",

      con_eyebrow: "Contact & appointment",
      con_h2_a: "Give us a call,", con_h2_b: "and we'll schedule it",
      con_aside: "Booking is quickest by phone. That way Somphit can immediately help you choose the right treatment.",
      con_phone_l: "By phone — the quickest",
      con_mail_l: "E-mail", con_addr_l: "Address", con_hours_l: "Opening hours",
      con_hours_v: "Monday to Sunday<br />2 pm – 9 pm, by appointment only",
      con_extra_1: "Parking on site",
      con_extra_2: "Bus and train stop 350 m away",
      con_extra_3: "Nederlands · English · Français",

      foot_tag: "Traditional Thai massage therapy for aching muscles and joints, or for pure relaxation.",
      foot_nav_t: "Navigation", foot_faq: "Frequently asked questions", foot_con_t: "Contact",
      foot_hours: "Daily 2 pm – 9 pm, by appointment",
      foot_rights: "All rights reserved.", foot_by: "Website by",
      callbar_t: "Book an appointment", callbar_d: "0477 94 00 08 · daily 2–9 pm"
    },

    fr: {
      skip: "Aller au contenu",
      top_address: "Frans Mombaersstraat 221, 3071 Kortenberg",
      top_hours: "Tous les jours 14h – 21h, sur rendez-vous",
      brand_sub: "Therapy · Kortenberg",
      nav_massage: "Le massage", nav_treatments: "Soins", nav_visit: "Votre visite",
      nav_about: "À propos de Somphit", nav_contact: "Contact", nav_gift: "Chèque-cadeau",
      cta_call_short: "Appeler pour un rendez-vous",

      hero_eyebrow: "Massage thaïlandais traditionnel · Kortenberg",
      hero_h1_a: "Là où la tension", hero_h1_b: "se relâche",
      hero_lead: "Massothérapie thaïlandaise authentique par Somphit Wongmak — formée à la Thai Traditional Medicine Society de Bangkok. Pour les muscles douloureux et les articulations raides, ou simplement pour un repos profond.",
      cta_call: "Appelez le 0477 94 00 08",
      cta_treatments: "Voir les soins",
      trust_1: "10+ ans d'expérience", trust_2: "Formée en Thaïlande",
      trust_3: "Uniquement sur rendez-vous", trust_4: "Parking sur place",

      mass_eyebrow: "Le soin",
      mass_h2_a: "Sans huile. Sans table.", mass_h2_b: "Une technique séculaire.",
      mass_p1: "Le massage thaïlandais traditionnel fait partie de la culture thaïlandaise classique et combine mouvements de yoga doux, acupression, réflexologie et étirements. Vous restez habillé, allongé sur un tapis — aucune huile n'est utilisée.",
      mass_p2: "Avec les pouces, les paumes, les coudes, les genoux et les pieds, une pression rythmée est appliquée le long des lignes d'énergie du corps. Somphit utilise son propre poids : lentement, précisément et toujours en fonction de ce que votre corps demande ce jour-là.",
      feat_1_t: "Vous restez habillé", feat_1_d: "Portez des vêtements amples dans lesquels vous bougez librement.",
      feat_2_t: "Sans huile", feat_2_d: "Aucune sensation grasse, pas de douche nécessaire ensuite.",
      feat_3_t: "Sur un tapis", feat_3_d: "Plus d'espace pour s'étirer que sur une table de massage.",
      feat_4_t: "Étirements actifs", feat_4_d: "Vos articulations sont ouvertes en douceur et en contrôle.",

      ben_eyebrow: "Pourquoi les gens viennent",
      ben_h2_a: "Plus que de la", ben_h2_b: "détente",
      ben_aside: "Certains arrivent avec une plainte précise. D'autres viennent simplement pour n'avoir rien à faire pendant un moment. Les deux sont également les bienvenus.",
      ben_1_t: "Tension chronique", ben_1_d: "Les tensions profondes et installées sont dénouées couche par couche, et non seulement en surface.",
      ben_2_t: "Douleurs de dos et de nuque", ben_2_d: "Une pression ciblée sur les groupes musculaires qui souffrent le plus du travail de bureau et du stress.",
      ben_3_t: "Arthrite et migraine", ben_3_d: "Un soin que beaucoup ressentent comme soulageant en cas d'articulations raides et de maux de tête récurrents.",
      ben_4_t: "Meilleure circulation", ben_4_d: "La pression rythmée et les étirements stimulent la circulation jusqu'aux plus petites fibres musculaires.",
      ben_5_t: "Souplesse et mobilité", ben_5_d: "Les étirements de yoga passifs élargissent votre amplitude de mouvement — perceptible dès la première séance.",
      ben_6_t: "Calme mental", ben_6_d: "Quatre-vingt-dix minutes sans téléphone, sans agenda. Pour beaucoup, c'est là le vrai résultat.",
      stat_1: "ans d'expérience", stat_2: "soins", stat_3: "jours ouverts", stat_4: "sur rendez-vous",

      tr_eyebrow: "Soins & tarifs",
      tr_h2_a: "Choisissez ce que votre", tr_h2_b: "corps demande",
      tr_aside: "Chaque soin commence par un bref entretien. Les combinaisons sont toujours possibles — dites-nous par téléphone ce qui vous gêne.",
      tag_signature: "Signature",
      tr_1_t: "Soin complet",
      tr_1_m: "Thai Yoga Massage + compresses aux herbes · 90 min",
      tr_1_d: "L'expérience complète. Le corps est d'abord profondément dénoué et étiré par le Thai Yoga Massage, puis les compresses chaudes aux herbes viennent relâcher les muscles en profondeur. Si vous ne réservez qu'un soin par an, réservez celui-ci.",
      tr_2_t: "Thai Yoga Massage",
      tr_2_m: "45 ou 90 min · habillé, sur un tapis",
      tr_2_d: "Le soin thaïlandais classique : acupression le long des lignes d'énergie, combinée à des étirements de yoga passifs. Le plus efficace contre la raideur et les tensions chroniques.",
      tr_2_p1: "/ 45 min", tr_2_p2: "/ 90 min",
      tr_3_t: "Massage aux compresses d'herbes",
      tr_3_m: "30 min · avec compresses chaudes",
      tr_3_d: "Des pochons de tissu remplis d'herbes thaïlandaises sont chauffés et roulés sur les muscles. La chaleur pénètre en profondeur — particulièrement agréable en hiver et après le sport.",
      tr_4_t: "Thai Classic Relaxation",
      tr_4_m: "60 min · pression douce",
      tr_4_d: "La même technique, mais avec une pression plus douce et davantage l'accent sur la détente que sur le traitement. Idéal comme première découverte du massage thaïlandais.",

      pl_title: "Soins courts",
      pl_sub: "Parfait en complément, ou lorsque vous avez peu de temps.",
      pl_1_n: "Massage nuque et épaules",
      pl_2_n: "Massage tête et visage",
      pl_3_n: "Nuque, épaules, tête & visage",
      pl_4_n: "Massage des pieds & réflexologie",
      pl_foot: "Les combinaisons sont possibles. Appelez-nous pour choisir ensemble le soin le plus adapté.",

      vis_eyebrow: "Votre visite",
      vis_h2_a: "À quoi vous", vis_h2_b: "attendre",
      vis_aside: "Nous travaillons exclusivement sur rendez-vous. Vous êtes ainsi le seul client à ce moment-là et le calme est garanti.",
      step_1_t: "Vous appelez pour un rendez-vous",
      step_1_d: "Expliquez brièvement ce qui vous gêne et de combien de temps vous disposez. Somphit propose un soin adapté et fixe un moment.",
      step_2_t: "Un accueil personnel",
      step_2_d: "Vous êtes reçu personnellement. Avant le soin, nous discutons de vos plaintes, de vos sensibilités et de la pression souhaitée.",
      step_3_t: "Le soin",
      step_3_d: "Habillé, sur un tapis, dans une pièce calme. Pression, rythme et étirements sont ajustés en cours de route — dites ce qui vous convient.",
      step_4_t: "Prenez un moment",
      step_4_d: "Après le massage, prenez le temps de revenir à vous. Buvez suffisamment d'eau ce jour-là — cela aide le corps à éliminer.",

      about_caption: "Massothérapeute thaïlandaise",
      about_eyebrow: "À propos de Zen Thai Therapy",
      about_h2_a: "Une seule thérapeute,", about_h2_b: "aucune chaîne",
      about_p1: "Chez Zen Thai Therapy, vous êtes reçu et traité personnellement par Somphit Wongmak. Pas de visages changeants, pas de travail à la chaîne : une seule thérapeute qui apprend à connaître votre corps au fil des séances.",
      about_p2: "Somphit a appris son métier auprès de la réputée Thai Traditional Medicine Society et possède bien plus de dix ans d'expérience en massothérapie thaïlandaise. Elle travaille depuis un cabinet calme à Kortenberg, où le temps s'écoule volontairement un peu plus lentement.",
      about_quote: "« Chaque corps raconte une histoire différente. Mon travail est d'écouter avec mes mains. »",
      badge_1: "Thai Traditional Medicine Society",
      badge_2: "10+ ans de pratique",
      badge_3: "Entretien personnel à chaque séance",
      notice_t: "Un cabinet thérapeutique.",
      notice_d: "Zen Thai Therapy propose uniquement de la massothérapie traditionnelle et professionnelle. Pas de massage érotique.",

      gal_eyebrow: "Le cabinet",
      gal_h2_a: "Un endroit pour", gal_h2_b: "s'arrêter",
      gal_aside: "Une salle de soin paisible à Kortenberg, avec parking devant la porte et l'arrêt de bus et de train à 350 mètres.",

      gift_eyebrow: "Chèque-cadeau",
      gift_h2_a: "Offrez", gift_h2_b: "quatre-vingt-dix minutes de calme",
      gift_lead: "Un chèque-cadeau pour une séance de massage au choix — pour un anniversaire, en remerciement, ou simplement parce que quelqu'un le mérite. Appelez pour en réserver un.",
      gift_cta: "Demander un chèque-cadeau",

      faq_eyebrow: "Questions fréquentes",
      faq_h2_a: "Bon à", faq_h2_b: "savoir à l'avance",
      faq_aside: "Votre question n'y figure pas ? Appelez-nous — Somphit vous l'explique volontiers par téléphone.",
      faq_1_q: "Dois-je me déshabiller ?",
      faq_1_a: "Non. Lors d'un massage thaïlandais traditionnel, vous restez entièrement habillé et aucune huile n'est utilisée. Portez des vêtements amples et confortables dans lesquels vous bougez librement — un jogging et un T-shirt sont parfaits.",
      faq_2_q: "Comment prendre rendez-vous ?",
      faq_2_a: "Uniquement par téléphone au 0477 94 00 08, tous les jours entre 14h et 21h. Nous travaillons exclusivement sur rendez-vous afin de vous offrir toute notre attention dans un cadre calme. Les visites sans rendez-vous ne sont malheureusement pas possibles.",
      faq_3_q: "Le massage thaïlandais est-il douloureux ?",
      faq_3_a: "La pression est toujours adaptée à votre corps et à vos souhaits. En cas de tension tenace, cela peut être intense — comme un bon étirement — mais jamais douloureux. Dites-le pendant le soin : l'ajustement est immédiat.",
      faq_4_q: "Proposez-vous des massages érotiques ?",
      faq_4_a: "Non. Zen Thai Therapy est un cabinet thérapeutique. Nous proposons exclusivement du massage thaïlandais traditionnel, réalisé par une thérapeute professionnellement formée. Toute demande en ce sens est refusée.",
      faq_5_q: "Je ne suis pas souple — puis-je quand même venir ?",
      faq_5_a: "Bien sûr. Le massage thaïlandais convient aux jeunes comme aux moins jeunes, et ceux qui sont raides en profitent souvent le plus. Les étirements sont entièrement adaptés à votre amplitude de mouvement — vous n'avez rien à savoir faire.",
      faq_6_q: "Combien de temps dure une séance et à quelle fréquence venir ?",
      faq_6_a: "Les séances durent de 30 à 90 minutes. En cas de plainte précise, une série de séances rapprochées fonctionne le mieux ; ensuite, une séance d'entretien toutes les quelques semaines suffit généralement. Somphit vous conseille après le premier soin.",
      faq_7_q: "Y a-t-il des cas où il vaut mieux ne pas venir ?",
      faq_7_a: "En cas de grossesse, de fièvre, d'opération récente, de fractures, de thrombose ou d'affections médicales sérieuses : signalez-le lors de la prise de rendez-vous. En cas de doute, nous vous demandons de consulter d'abord votre médecin. Le soin est alors adapté ou reporté.",
      faq_8_q: "Comment puis-je payer et y a-t-il un parking ?",
      faq_8_a: "Il y a un parking sur place et l'arrêt de bus et de train se trouve à environ 350 mètres. N'hésitez pas à demander les moyens de paiement lors de la réservation.",

      con_eyebrow: "Contact & rendez-vous",
      con_h2_a: "Un coup de fil,", con_h2_b: "et c'est réservé",
      con_aside: "La prise de rendez-vous est plus rapide par téléphone. Somphit peut ainsi vous aider directement à choisir le bon soin.",
      con_phone_l: "Par téléphone — le plus rapide",
      con_mail_l: "E-mail", con_addr_l: "Adresse", con_hours_l: "Heures d'ouverture",
      con_hours_v: "Du lundi au dimanche<br />14h – 21h, uniquement sur rendez-vous",
      con_extra_1: "Parking sur place",
      con_extra_2: "Arrêt de bus et de train à 350 m",
      con_extra_3: "Nederlands · English · Français",

      foot_tag: "Massothérapie thaïlandaise traditionnelle pour les muscles et articulations douloureux, ou pour une pure détente.",
      foot_nav_t: "Navigation", foot_faq: "Questions fréquentes", foot_con_t: "Contact",
      foot_hours: "Tous les jours 14h – 21h, sur rendez-vous",
      foot_rights: "Tous droits réservés.", foot_by: "Site web par",
      callbar_t: "Prendre rendez-vous", callbar_d: "0477 94 00 08 · tous les jours 14–21h"
    }
  };

  var LANGS = ["nl", "en", "fr"];
  var nlCache = null;

  function cacheDutch() {
    if (nlCache) return;
    nlCache = {};
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      nlCache[el.getAttribute("data-i18n")] = el.innerHTML;
    });
  }

  function applyLang(lang) {
    cacheDutch();
    var dict = lang === "nl" ? nlCache : I18N[lang];
    if (!dict) return;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = dict[key];
      if (typeof val === "string") el.innerHTML = val;
    });

    document.documentElement.lang = lang;
    var label = document.getElementById("langLabel");
    if (label) label.textContent = lang.toUpperCase();

    document.querySelectorAll("#langMenu [data-lang]").forEach(function (b) {
      b.setAttribute("aria-selected", String(b.getAttribute("data-lang") === lang));
    });

    try { localStorage.setItem("ztt-lang", lang); } catch (e) {}
  }

  function initI18n() {
    var wrap  = document.getElementById("lang");
    var btn   = document.getElementById("langBtn");
    var menu  = document.getElementById("langMenu");
    if (!wrap || !btn || !menu) return;

    var stored = null;
    try { stored = localStorage.getItem("ztt-lang"); } catch (e) {}
    var param = new URLSearchParams(window.location.search).get("lang");
    var browser = (navigator.language || "nl").slice(0, 2).toLowerCase();
    var initial = [param, stored, browser].find(function (l) { return LANGS.indexOf(l) > -1; }) || "nl";

    cacheDutch();
    if (initial !== "nl") applyLang(initial);
    else applyLang("nl");

    function close() {
      menu.hidden = true;
      wrap.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }
    function open() {
      menu.hidden = false;
      wrap.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    }

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      menu.hidden ? open() : close();
    });

    menu.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () {
        applyLang(b.getAttribute("data-lang"));
        close();
        btn.focus();
      });
    });

    document.addEventListener("click", function (e) {
      if (!wrap.contains(e.target)) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) { close(); btn.focus(); }
    });
  }

  /* ======================================================================
     Header: shrink on scroll + scroll progress
     ====================================================================== */
  function initScroll() {
    var header = document.getElementById("siteHeader");
    var bar    = document.getElementById("scrollProgress");
    var callbar = document.getElementById("callbar");
    var ticking = false;

    function update() {
      var y = window.scrollY || window.pageYOffset;
      var max = document.documentElement.scrollHeight - window.innerHeight;

      if (header) header.classList.toggle("is-stuck", y > 40);
      if (bar) bar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
      if (callbar) callbar.classList.toggle("is-visible", y > window.innerHeight * 0.65 && y < max - 220);

      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });

    update();
  }

  /* ======================================================================
     Mobile menu
     ====================================================================== */
  function initMobileMenu() {
    var toggle = document.getElementById("navToggle");
    var menu   = document.getElementById("mobileMenu");
    if (!toggle || !menu) return;

    function close() {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Menu openen");
    }

    toggle.addEventListener("click", function () {
      var open = menu.hidden;
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
    });

    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) { close(); toggle.focus(); }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1060 && !menu.hidden) close();
    });
  }

  /* ======================================================================
     Reveal on scroll
     ====================================================================== */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.style.setProperty("--reveal-delay", (el.getAttribute("data-reveal-delay") || 0) + "ms");
        el.classList.add("is-in");
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ======================================================================
     Count-up stats
     ====================================================================== */
  function initCountUp() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);

        var target = parseFloat(el.getAttribute("data-count")) || 0;
        var suffix = el.getAttribute("data-suffix") || "";
        var start  = performance.now();
        var dur    = 1400;

        function tick(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        el.textContent = "0" + suffix;
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });

    nums.forEach(function (el) { io.observe(el); });
  }

  /* ======================================================================
     FAQ — accordion (one open at a time)
     ====================================================================== */
  function initFaq() {
    var list = document.getElementById("faqList");
    if (!list) return;
    var items = list.querySelectorAll("details");

    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        items.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  /* ======================================================================
     Gallery lightbox
     ====================================================================== */
  function initLightbox() {
    var box   = document.getElementById("lightbox");
    var img   = document.getElementById("lightboxImg");
    var close = document.getElementById("lightboxClose");
    var items = document.querySelectorAll(".gallery__item");
    if (!box || !img || !items.length) return;

    var lastFocus = null;

    function show(src, alt) {
      img.src = src;
      img.alt = alt || "";
      box.hidden = false;
      document.body.style.overflow = "hidden";
      close.focus();
    }
    function hide() {
      box.hidden = true;
      img.removeAttribute("src");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }

    items.forEach(function (btn) {
      btn.addEventListener("click", function () {
        lastFocus = btn;
        var inner = btn.querySelector("img");
        show(btn.getAttribute("data-full"), inner ? inner.alt : "");
      });
    });

    close.addEventListener("click", hide);
    box.addEventListener("click", function (e) { if (e.target === box) hide(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !box.hidden) hide();
    });
  }

  /* ======================================================================
     Active nav link
     ====================================================================== */
  function initActiveNav() {
    var links = document.querySelectorAll(".nav a[href^='#']");
    if (!links.length || !("IntersectionObserver" in window)) return;

    var map = {};
    links.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var section = document.getElementById(id);
      if (section) map[id] = a;
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove("is-active"); });
        var a = map[entry.target.id];
        if (a) a.classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    Object.keys(map).forEach(function (id) {
      io.observe(document.getElementById(id));
    });
  }

  /* ======================================================================
     Boot
     ====================================================================== */
  function init() {
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    initI18n();
    initScroll();
    initMobileMenu();
    initReveal();
    initCountUp();
    initFaq();
    initLightbox();
    initActiveNav();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

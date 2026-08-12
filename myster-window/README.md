# Myster Window — website

Statische website voor **Myster Window BV** (Ascopstraat 10, 9270 Laarne — BE 0798.872.895),
gebouwd door Digital Impression.

Geen build-stap, geen framework, geen dependencies: HTML, CSS en vanilla JS.
Alles is te openen door `index.html` in een browser te openen, of te deployen door
de map integraal te uploaden.

## Designrichting

**Architecturaal & licht.** Off-white en warm grijs als basis, koele glastinten voor
de beeldvlakken, brons als enige accentkleur. Fraunces (display) voor titels, Inter
voor alle UI-tekst. De vormentaal leunt op dunne rasterlijnen — het raster van een
raamverdeling — in plaats van op ronde hoeken en schaduwen.

## Structuur

```
index.html              Home — B2B eerst, met tweede pad voor particulieren
ramen-en-deuren.html    Materialen, raamtypes, deuren, schuiframen, beglazing, merken
projecten.html          Filterbare galerij + voor/na-slider + lightbox
werkwijze.html          Zes stappen, verschil B2B/particulier, plaatsing, FAQ
over-ons.html           Verhaal, waarden, cijfers, bedrijfsgegevens, kaart
offerte.html            Offerteformulier in drie stappen
privacy.html            Privacybeleid (GDPR)
404.html                Foutpagina
robots.txt sitemap.xml  SEO
_headers                Security- en cache-headers (Netlify/Cloudflare Pages)

assets/
  css/styles.css        Volledig designsysteem (tokens bovenaan)
  css/fonts.css         Self-hosted webfonts
  fonts/                Fraunces + Inter, woff2, latin & latin-ext
  js/app.js             Icons, i18n-engine, navigatie, filters, slider, formulier
  js/i18n.js            Vertaalwoordenboek (EN)
  img/                  Beeldmateriaal + og-image.png
  brand/                Logo en favicon (SVG)
```

De header, drawer en footer staan in elke pagina identiek. Pas je er iets aan,
pas het dan in alle acht de HTML-bestanden aan (of gebruik zoek-en-vervang over
het hele mapje).

## Talen

Nederlands staat rechtstreeks in de HTML en is de bron. Engels zit in
`assets/js/i18n.js`. De schakelaar onthoudt de keuze in `localStorage`.

**Frans toevoegen:** voeg in `i18n.js` een `fr: { ... }`-object toe met dezelfde
sleutels, en zet in elke pagina een derde knop in de `.lang`-groep:

```html
<button class="lang__btn" type="button" data-lang-btn="fr" aria-pressed="false">FR</button>
```

Verder is er niets te wijzigen — de engine leest gewoon uit `window.MW_I18N`.

## Offerteformulier

Het formulier in `offerte.html` heeft nog geen verzendadres. Zet het endpoint op
het `<form>`-element:

```html
<form id="quoteForm" data-endpoint="https://formspree.io/f/XXXXXXX" ...>
```

Zolang `data-endpoint` op `REPLACE_WITH_FORM_ENDPOINT` staat, valt het formulier
terug op een vooringevulde e-mail naar het adres in `data-fallback-email`. Het
formulier is dus nooit een doodlopend spoor, maar dit is een noodoplossing —
zet zo snel mogelijk een echt endpoint in (Formspree, Netlify Forms, Basin, of
een eigen script).

Links kunnen het formulier vooraf invullen:
`offerte.html?type=project`, `?type=particulier`, `?type=renovatie`,
`?materiaal=pvc|aluminium|houtlook`, `?product=raam|deur`.

## Toegankelijkheid & performance

- Alle interactieve elementen zijn met het toetsenbord bedienbaar; focus is
  altijd zichtbaar (bronzen ring).
- `prefers-reduced-motion` schakelt alle animaties, de marquee en de
  scroll-reveals uit.
- Geen externe verzoeken: fonts zijn self-hosted, icons zijn inline SVG.
  Enige uitzondering is de OpenStreetMap-iframe op `over-ons.html`.
- Afbeeldingen zijn `loading="lazy"` met vaste `width`/`height` tegen layout shift.

## Nog te doen vóór livegang

Zie **CONTENT-CHECKLIST.md** — daar staat elk stuk placeholder-inhoud opgesomd.

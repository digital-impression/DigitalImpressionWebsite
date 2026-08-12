# Schrijnwerkerij Kindermans — website

Statische website voor Schrijnwerkerij Kindermans bvba (Heverlee).
Gebouwd door Digital Impression, 2026.

**Ontwerprichting:** Dark Craft — houtskool en messing, editorial serif,
procedurele houtnerf-textuur. Gekozen omdat ze ook zonder fotobibliotheek
overtuigt, en dat is precies de situatie bij deze klant.

---

## Openstaande punten vóór livegang

Deze moeten bevestigd worden bij de klant. Ze staan bovenaan omdat de site
zonder deze antwoorden niet correct live kan.

| # | Punt | Status |
|---|------|--------|
| 1 | **E-mailadres** — `info@schrijnwerkerij-kindermans.be` is een **aanname**, niet geverifieerd. Het staat nergens op hun huidige site of in de bedrijfsregisters. Vraag het echte adres op en vervang het in `contact.html` (twee plaatsen) en in `script.js`. | ⚠️ Te bevestigen |
| 2 | **Formulier-backend** — het formulier opent nu een vooringevulde e-mail via `mailto:`. Dat werkt overal, maar is niet elegant. Zie *Formulier* hieronder om een echte backend aan te sluiten. | ⚠️ Aan te sluiten |
| 3 | **Foto's** — de site draait momenteel op materiaalpanelen in plaats van foto's. Zie `FOTOBRIEFING.md` voor de shotlist die de klant kan doorgeven aan een fotograaf. | ⚠️ In afwachting |
| 4 | **Openingsuren** — nergens gepubliceerd. Zodra bekend: toevoegen aan `contact.html` én als `openingHoursSpecification` in de JSON-LD op `index.html`. | ⚠️ Onbekend |
| 5 | **Reviews** — geen enkele online. Dit is het zwaarste ontbrekende verkoopargument. Adviseer de klant om Google-reviews te verzamelen bij bestaande klanten. | ⚠️ Aanbevolen |
| 6 | **Lettertypes** — zeven woff2-bestanden toevoegen aan `assets/fonts/`. Tot dan draait de site op Georgia als fallback. Zie `assets/fonts/README.md`. | ⚠️ Toe te voegen |

---

## Structuur

```
kindermans/
├── index.html                    Home
├── binnenschrijnwerk.html        Dienst 01
├── buitenschrijnwerk.html        Dienst 02
├── gyproc-zolderrenovatie.html   Dienst 03
├── realisaties.html              Portfolio
├── over-ons.html                 Bedrijfsinfo + werkgebied
├── contact.html                  NAP + offerteformulier
├── privacy.html                  Privacybeleid (noindex)
├── styles.css                    Volledig ontwerpsysteem
├── script.js                     Nav, scroll-reveal, formuliervalidatie
├── assets/
│   ├── logo-mark.svg             Zwaluwstaartverbinding, messing
│   └── favicon.svg
├── robots.txt
├── sitemap.xml
├── _headers                      Security- en cache-headers (Netlify/Cloudflare Pages)
└── FOTOBRIEFING.md               Shotlist voor de klant
```

Geen build-stap, geen dependencies. Openen met een statische server volstaat:

```bash
cd kindermans && python3 -m http.server 8080
```

---

## Ontwerpsysteem

Alle tokens staan bovenaan `styles.css`.

| Rol | Waarde |
|-----|--------|
| Basis | `#16191B` houtskool |
| Secundair vlak | `#1B2620` diep groen |
| Accent | `#B08D57` messing |
| Tekst | `#EDE7DC` bot |
| Koppen | Cormorant Garamond 300 |
| Tekst | Inter 400/500/600 |
| Labels | systeem-monospace, `letter-spacing: 0.2em` |

**Lettertypes zijn self-hosted, niet via Google Fonts.** Een verzoek naar
`fonts.gstatic.com` stuurt het IP van elke bezoeker naar Google — dat valt onder
de AVG en zou de privacypagina onwaar maken. De `@font-face`-regels staan bovenaan
`styles.css`; de bestanden horen in `assets/fonts/` (zie de README daar).
Ontbreken ze, dan valt alles netjes terug op Georgia.

De site doet daardoor **geen enkel automatisch verzoek naar een externe host**.

**Houtnerf zonder foto's.** De klassen `.woodgrain` en `.grain` genereren textuur
met een SVG `feTurbulence`-filter als data-URI: lage frequentie in x, hoge in y
geeft horizontale nerf. Schaalt oneindig, weegt niets, geen licentiekwesties.
De `.panel--*` varianten (`oak`, `walnut`, `pine`, `slate`) zijn de houttinten.

Wanneer er echte foto's zijn: vervang de `.panel`- en `.work__img`-blokken door
`<img>` en behoud de verhoudingen (`4/5` staand, `16/10` breed, `4/3` in de
realisatiegrid).

---

## Formulier

`script.js` valideert in het Nederlands, heeft een honeypot tegen bots en opent
daarna een vooringevulde e-mail.

Een echte backend aansluiten (aanbevolen) — vervang in `contact.html`:

```html
<form class="form" id="contactForm" novalidate>
```

door bijvoorbeeld Formspree:

```html
<form class="form" id="contactForm" novalidate
      action="https://formspree.io/f/XXXXXXXX" method="POST">
```

en verwijder in `script.js` het `mailto:`-blok onderaan de submit-handler
(vanaf `/* Geen backend: ... */`) plus de bijhorende `e.preventDefault()`.
De validatie blijft dan gewoon werken.

Op Netlify volstaat `netlify` + `name="contact"` op het `<form>`-element.

---

## Hosting

Geschikt voor Cloudflare Pages of Netlify. `_headers` werkt op beide.

**Domein:** `schrijnwerkerij-kindermans.be` is nog actief en van de klant.
Het redirect momenteel naar hun WordPress-site. De DNS moet dus enkel
omgezet worden — er is geen nieuw domein nodig.

Vergeet niet om na livegang:
- de oude WordPress-site op `schrijnwerkerijkindermans.wordpress.com` te laten
  redirecten of offline te halen, zodat er geen dubbele content ontstaat;
- de site in te dienen bij Google Search Console;
- het Google Bedrijfsprofiel te claimen of bij te werken met het nieuwe adres.

---

## Toegankelijkheid

- Skip-link, zichtbare focusstates, correcte `aria-current` per pagina
- Mobiel menu met `aria-expanded`, sluit op Escape en bij resize
- `prefers-reduced-motion` schakelt alle animatie en scroll-reveal uit
- Formulierfouten via `aria-live` en `aria-invalid`
- Contrastverhoudingen op het donkere thema gecontroleerd tegen WCAG AA

---

## Inhoudelijke bron

Alle dienstenbeschrijvingen komen uit de bestaande teksten van de klant op
`schrijnwerkerijkindermans.wordpress.com`. Bedrijfsgegevens (oprichtingsdatum,
BTW-nummer, adres) zijn geverifieerd via Staatsbladmonitor en de Kruispuntbank
van Ondernemingen.

De FAQ-antwoorden en de werkwijze-stappen zijn nieuw geschreven op basis van
vakkennis, niet overgenomen van de klant. **Laat de klant deze nalezen** — zij
weten het best of dit overeenkomt met hoe ze effectief werken.

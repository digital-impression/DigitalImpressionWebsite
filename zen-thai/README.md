# Zen Thai Therapy — website

Premium one-pager voor **Zen Thai Therapy**, Frans Mombaersstraat 221, 3071 Kortenberg.
Gebouwd door Digital Impression.

---

## Design

**Richting:** "Warm Sand & Jade" — licht, warm en rustgevend, met diep jade als anker en
messing als accent. Bewust géén donkere "avondspa"-look: de praktijk is therapeutisch, en
een licht canvas draagt dat vertrouwen beter.

| Token | Hex | Gebruik |
|---|---|---|
| `--sand` | `#FAF6F0` | hoofdachtergrond |
| `--sand-deep` | `#F4EDE3` | afwisselende secties |
| `--jade` | `#14372F` | donkere secties, koppen |
| `--jade-deep` | `#0E2721` | header, footer, hero-scrim |
| `--brass` | `#B08D57` | CTA's, accenten |
| `--brass-soft` | `#C9A97A` | accenten op donkere achtergrond |
| `--ink` | `#23201C` | body-tekst |

**Typografie:** Cormorant Garamond (koppen, prijzen) + Inter (tekst).
Beide **zelf-gehost** in `fonts/` — geen requests naar Google, dus sneller én GDPR-veilig.

---

## Structuur

Eén pagina, anchor-navigatie:

`#home` hero → `#massage` wat is Thaise massage → `#voordelen` → `#behandelingen` prijzen →
`#verloop` uw bezoek → `#over` Somphit → `#ruimte` galerij → `#cadeaubon` → `#faq` → `#contact`

---

## Techniek

Vanilla HTML/CSS/JS, geen build-stap, geen dependencies. Upload de map en klaar.

- **Talen:** NL (basis in de HTML) + EN/FR via de `I18N`-dictionary bovenaan `script.js`.
  Keuze wordt onthouden in `localStorage`, te forceren met `?lang=en` / `?lang=fr`.
- **SEO:** `HealthAndBeautyBusiness` + `FAQPage` JSON-LD, hreflang, OG-tags, sitemap, robots.
- **Toegankelijkheid:** skip-link, zichtbare focus-states, ARIA op menu/taalkiezer/lightbox,
  `prefers-reduced-motion` gerespecteerd.
- **Performance:** WebP met JPEG-fallback, `loading="lazy"`, hero gepreload, aparte mobiele
  hero-crop, caching-regels in `_headers`.
- **Print:** eigen stylesheet — de prijslijst print netjes op papier.

### Bestanden

```
index.html      alle content (NL)
styles.css      designsysteem + componenten
fonts.css       @font-face voor de zelf-gehoste fonts
script.js       i18n, nav, reveal, lightbox, FAQ, tellers
fonts/          Cormorant Garamond + Inter (woff2, latin + latin-ext)
images/         alle beelden, in .jpg én .webp
assets/         favicon
_headers        security- en cachingheaders (Netlify/Cloudflare Pages)
robots.txt, sitemap.xml
```

---

## ⚠️ Vóór livegang — moet nog gebeuren

Drie dingen zijn placeholder en moeten door de klant bevestigd of aangeleverd worden:

1. **Prijzen verifiëren.** De prijslijst komt van de bestaande site en is *geldig verklaard
   vanaf 1 maart 2013*. Alle bedragen staan in `index.html` (sectie `#behandelingen`) én in
   de JSON-LD bovenaan — pas beide aan.
2. **Foto's vervangen.** Alle beelden zijn gegradeerde stockfoto's (Unsplash + StockSnap,
   vrij voor commercieel gebruik). Ze zijn bewust in één warme kleurgrading gezet zodat de
   set als geheel leest. Vervang bij voorkeur door echte foto's van de praktijk en van
   Somphit — vooral `hero`, `somphit` en `ruimte`. Behoud de bestandsnamen en verhoudingen,
   dan hoeft er niets aan de code te veranderen.
3. **Openingsuren bevestigen.** "Dagelijks 14–21u" komt uit externe bedrijvengidsen, niet
   van de klant zelf. Staat op vier plekken: topbar, contact, footer en JSON-LD.

Verder nog te bekijken:

- **Reviews.** Er staat bewust géén reviewsectie op de site: echte klantquotes moeten eerst
  verzameld worden (bv. via hun Facebookpagina). Verzin die niet — zodra er echte reviews
  zijn, is er ruimte tussen `#ruimte` en `#cadeaubon`.
- **Betaalmogelijkheden** staan nu vaag omschreven in de FAQ. Aanvullen zodra bekend.
- **Coördinaten** in de JSON-LD (`50.8836, 4.5432`) zijn een benadering van Kortenberg —
  vervang door de exacte locatie.

---

## Beelden opnieuw genereren

De kleurgrading (split-tone: schaduwen naar jade, hooglichten naar zand + warme curve) zit in
het script waarmee `images/` is gemaakt. Nieuwe foto's door dezelfde grading halen houdt de
set consistent. Vraag Digital Impression om het script als er beelden bijkomen.

---

## Deploy

Statische map — werkt op Netlify, Cloudflare Pages, Vercel of gewone hosting.
`_headers` wordt opgepikt door Netlify en Cloudflare Pages; op andere hosting moeten de
security- en cachingheaders in de serverconfiguratie.

Lokaal bekijken:

```bash
cd zen-thai && python3 -m http.server 8099
```

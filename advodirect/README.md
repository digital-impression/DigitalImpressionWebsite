# Advocaat Ward Van Loo — website

Statische website (HTML/CSS/JS, geen build-stap) voor **Advocaat Ward Van Loo**,
Antwerpen. Gebouwd door Digital Impression.

---

## Ontwerprichting

**"Klinisch Vertrouwen"** — dennengroen, klei en been, met Newsreader als serif
en Public Sans als basis.

De identiteit komt uit Ward zelf, niet uit een bureau-huisstijl. Zijn cliënten zijn
slachtoffers: mensen met pijn, vaak op leeftijd, vaak bang dat ze te weinig zullen
krijgen. Die hebben geen luxe-uitstraling nodig maar rust en helderheid. Vandaar:

- **Dennengroen `#123A2E`** — herstel en continuïteit, en het kalmeert waar
  corporate marineblauw afstand schept.
- **Klei `#A94F2B`** — het menselijke, warme accent; ook de kleur die de aandacht
  naar de call-to-action trekt zonder te schreeuwen.
- **Been `#F7F3EB`** — papier. De hele site is licht, met donkergroene vlakken als
  rustpunten, precies omgekeerd aan een donkere "premium" site.
- **Millimeterraster** in de hero — het ruitjesblad van een medisch dossier.
- **Newsreader** heeft meer stam en rust dan een hoog-contrast Garamond; het leest
  vlot op een schermgrootte die zestigplussers gebruiken.

**Positionering:** letselschade-specialist, met als hoofdtroef dat Ward naast zijn
rechtenstudie gerechtelijke geneeskunde, medische expertise, verzekeringsgeneeskunde
en menselijke schadebepaling volgde. Dat is het unieke verkoopargument en het loopt
als rode draad door de hele site. Overige rechtstakken komen aan bod via A12 Advocaten.

### Kleuren

| Rol | Token | Hex |
| --- | --- | --- |
| Dennengroen (donkere vlakken) | `--pine` | `#123A2E` |
| Dennengroen diep | `--pine-deep` | `#0B2620` |
| Klei (accent, CTA) | `--clay` | `#A94F2B` |
| Klei licht (accent op donker) | `--clay-light` | `#E3A07A` |
| Been (papier) | `--bone` | `#F7F3EB` |
| Zand (secties) | `--sand` | `#EDE5D7` |

Alle tokens staan bovenaan `styles.css` in `:root`. Klei is te donker om op groen te
lezen; op donkere vlakken gebruikt de site consequent `--clay-light`. Die overrides
staan gebundeld in één blok onderaan `styles.css`, zodat ze niet verspreid raken.

---

## Structuur

```
index.html            Home — hero, twee sporen, expertise-index, medische tijdlijn,
                      werkwijze, dossiercheck, A12-netwerk, kosten, FAQ, contact
letselschade.html     Rechtsgebied 01 — lichamelijk letsel
arbeidsongeval.html   Rechtsgebied 02 — arbeidsongeval & beroepsziekte
medische-fout.html    Rechtsgebied 03 — medische fout & ziekenhuisaansprakelijkheid
verkeersongeval.html  Rechtsgebied 04 — verkeersongeval & politierechtbank
over-ward.html        Profiel, opleiding, werkwijze
contact.html          Contactgegevens, formulier, kaart
privacy.html          Privacyverklaring, cookies, algemene voorwaarden
styles.css            Volledige stijl (design tokens bovenaan)
script.js             Navigatie, scroll-reveal, FAQ, dossiercheck-wizard
assets/               Logo-merk en favicon (SVG)
```

Elke expertise-pagina is opgezet rond dezelfde zoekintentie die zijn cliënten
werkelijk gebruiken ("advocaat arbeidsongeval Antwerpen"), met een eigen `<title>`,
meta-description en canonical.

---

## Nog te doen vóór livegang

### 1. Formulieren koppelen (verplicht)

De dossiercheck en de contactformulieren valideren en tonen een bevestiging, maar
**versturen nog niets**. In `script.js` staat onderaan de functie `submitLead()`.
Vervang de inhoud daarvan door een `fetch()` naar het gekozen endpoint:

```js
function submitLead(data, bron) {
  return fetch('https://formspree.io/f/XXXXXXX', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(Object.assign({ bron: bron }, data))
  });
}
```

Werkt even goed met Netlify Forms, een eigen PHP-mailscript of een webhook.

### 2. Fotografie

Er staat momenteel **geen fotografie** in het ontwerp — bewust, want een premium site
met slechte stockfoto's oogt slechter dan een site zonder. Wat het meeste zou opleveren:

- Een goed portret van Ward (kantoor of bibliotheek, warm zijlicht, geen witte studio).
- Een sfeerbeeld van het kantoor aan de Jan van Rijswijcklaan.

De hero en de sectie "Over Ward" zijn zo opgebouwd dat een portret er zonder
herwerking in past.

### 3. Juridische teksten laten nalezen

`privacy.html` is een degelijk vertrekpunt maar **moet door Ward worden aangevuld en
nagelezen**: ondernemingsnummer, BTW-nummer, balie van inschrijving,
beroepsaansprakelijkheidsverzekeraar en polisnummer. Ook de inhoudelijke juridische
passages op de expertise-pagina's horen door hem bevestigd te worden vóór publicatie —
ze zijn algemeen geformuleerd en vermijden bewust concrete termijnen, maar hij blijft
deontologisch verantwoordelijk voor wat er staat.

### 4. Domeinen samenvoegen

Ward heeft nu minstens vijf losse sites: `advodirect.com`, `lichamelijk-letsel.be`,
`arbeidsongevallen-recht.be`, `arbeidsletsel-advocaat.be` en `advo.be`. Die
versnippering kost hem Google-autoriteit en verwart bezoekers. Advies: één hoofdsite,
met 301-redirects van de overige domeinen naar de best passende pagina hier.

Ook de e-mailadressen lopen door elkaar (`vanloo@advodirect.com` versus
`advocaat.ward.van.loo@skynet.be`). Eén professioneel adres consequent doorvoeren.

### 5. Kleine punten

- `sitemap.xml` en de canonicals gaan uit van `https://www.advodirect.com/`. Bij een
  ander domein moeten die worden aangepast.
- Een Google Business-profiel met dit adres en telefoonnummer versterkt de lokale
  vindbaarheid aanzienlijk.
- Webstatistiek is nog niet ingebouwd. Wordt die toegevoegd, dan hoort daar een
  cookiebanner bij en moet `privacy.html#cookies` worden aangevuld.

---

## Technisch

- Geen build-stap, geen dependencies om te installeren — de bestanden zijn direct te hosten.
- **Geen enkel verzoek naar derden.** Lettertypes (Cormorant Garamond + Inter, latin-subset)
  en de Lucide-iconen worden lokaal meegeleverd in `assets/`. Dat is bewust: bij een
  advocatenkantoor is het slecht te verdedigen dat het IP-adres van elke bezoeker — vaak
  een slachtoffer dat een gevoelige pagina raadpleegt — naar Google gaat. Het scheelt
  meteen ook een paar honderd milliseconden laadtijd.
  De enige uitzondering is het kaartfragment op de contactpagina; wil je ook dat vermijden,
  dan kan er een statische kaartafbeelding met een link in de plaats.
- Responsief getest op 390px en 1440px, zonder horizontale overflow.
- Toegankelijkheid: skip-link, zichtbare focusstijlen, `aria-expanded` op menu en FAQ,
  en respect voor `prefers-reduced-motion`.
- `_headers` bevat basis-securityheaders en cachingregels (Netlify/Cloudflare Pages).

### Lokaal bekijken

```bash
cd advodirect
python3 -m http.server 8000
# → http://localhost:8000
```

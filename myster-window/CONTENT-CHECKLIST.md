# Checklist vóór livegang

Alles hieronder is placeholder of moet door de klant bevestigd worden.
De site is verder volledig af.

## 1. Harde gegevens — moet bevestigd worden

| Wat | Huidige waarde | Waar |
|---|---|---|
| **Telefoonnummer** | `+32 XX XX XX XX` (en `tel:+32000000000`) | topbar, drawer, CTA-blok, footer, over-ons, offerte-zijpaneel — in **alle** pagina's |
| **E-mailadres** | `info@myster-window.be` (aangenomen, niet geverifieerd) | overal + `data-fallback-email` in offerte.html |
| **Openingsuren** | `Ma–vr 08:00–17:00` | topbar (`top_hours`) |
| Adres | Ascopstraat 10, 9270 Laarne | ✅ uit KBO, geverifieerd |
| Ondernemingsnummer | BE 0798.872.895 | ✅ uit KBO, geverifieerd |
| Handelsnaam | M & W building group | ✅ uit KBO, geverifieerd |
| Oprichting | 2023 | ✅ uit KBO (27-02-2023) |
| Facebook | profiel-URL uit de oude site | ✅ overgenomen |

> Zoek-en-vervang `+32 XX XX XX XX` en `tel:+32000000000` in alle `.html`-bestanden
> zodra het echte nummer bekend is. Zolang het placeholder is, kan niemand per
> ongeluk een verkeerd nummer bellen.

## 2. Fotografie — nu allemaal placeholders

Alle beelden in `assets/img/` zijn getekende placeholders met het label
"VERVANG DOOR EIGEN FOTO". Ze zijn zo gemaakt dat de site er ook zonder foto's
verzorgd uitziet, maar echte fotografie is het grootste verschil dat nog te maken valt.

Nodig:

- `project-01` t/m `project-06.svg` → 6 projectfoto's (4:3, minimaal 1600 px breed)
- `ba-before.svg` / `ba-after.svg` → één voor/na-paar van dezelfde gevel (16:10)
- `atelier.svg` → opmeting of atelier
- `plaatsing.svg` → plaatsing op de werf
- `team.svg` → team of bedrijfspand

Vervang de bestanden door `.jpg` en pas het `src`-attribuut aan (of bewaar de
namen en zet de extensie om).

## 3. Projectteksten — placeholder

De zes projecten op `projecten.html` (en de drie op de homepage) hebben
generieke titels, locaties, jaartallen en specificaties. **Dit zijn geen echte
referenties.** Ze moeten vervangen worden door werkelijk uitgevoerde projecten
vóór de site live gaat. Sleutels: `p1_t` t/m `p6_x` in `assets/js/i18n.js` en de
Nederlandse tekst rechtstreeks in de HTML.

## 4. Beloftes die de klant moet bevestigen

Deze staan nu als concrete belofte in de tekst. Klopt het niet, dan aanpassen:

- "Gratis opmeting en advies bij u thuis" (homepage, `path_b2c_1`)
- "Afwerking en opruim inbegrepen" (homepage, `path_b2c_4`)
- "Plaatsing door ons eigen team" (homepage + werkwijze)
- "Demontage en afvoer van het oude schrijnwerk kan mee in de offerte" (werkwijze, `wf3_a`)
- "Meerpuntssluiting als standaard" (ramen-en-deuren, `door_1`)
- "Wij komen terug bij nazorg" (werkwijze + over ons)
- Materiaalgamma: PVC, aluminium én hout-look — biedt Myster Window alle drie aan?
- Werkgebied "heel Oost-Vlaanderen en omstreken"

## 5. Technisch

- [ ] Formulier-endpoint invullen (`data-endpoint` in `offerte.html`) — zie README
- [ ] Domein koppelen; `sitemap.xml`, `robots.txt` en alle `canonical`-tags gaan uit
      van `https://myster-window.be/`
- [ ] Google Search Console + Bing Webmaster koppelen
- [ ] Google Business-profiel aanmaken/claimen (grote winst voor lokale SEO)
- [ ] `_headers` werkt op Netlify en Cloudflare Pages; op een klassieke host moet
      dit naar `.htaccess` of de serverconfig
- [ ] Eventueel FR toevoegen (zie README)

## 6. Optioneel, maar de moeite

- Echte klantengetuigenissen (er staan er bewust géén verzonnen op de site)
- Referenties per gemeente, voor lokale zoekresultaten
- Een pagina per profielmerk (Salamander, Aluplast, Kömmerling, Veka) — sterk
  voor zoekopdrachten als "Kömmerling ramen Oost-Vlaanderen"

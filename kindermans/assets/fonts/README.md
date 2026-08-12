# Lettertypes

De site laadt **geen** lettertypes van Google Fonts. Dat is bewust: een verzoek naar
`fonts.gstatic.com` stuurt het IP-adres van elke bezoeker naar Google, en dat valt
onder de AVG. Een Duitse rechtbank oordeelde daar in 2022 al over (LG München I,
3 O 17493/20). Voor een Belgische kmo die op haar privacypagina schrijft dat er
niets naar derden gaat, moet dat dus kloppen.

## Wat er nog moet gebeuren

Plaats deze zeven bestanden in deze map. Zolang ze ontbreken valt de site netjes
terug op Georgia en de systeem-grotesk — het ontwerp blijft volledig overeind,
alleen de letter is dan minder verfijnd.

| Bestand | Familie | Gewicht |
|---|---|---|
| `CormorantGaramond-Light.woff2` | Cormorant Garamond | 300 |
| `CormorantGaramond-LightItalic.woff2` | Cormorant Garamond | 300 cursief |
| `CormorantGaramond-Regular.woff2` | Cormorant Garamond | 400 |
| `CormorantGaramond-Italic.woff2` | Cormorant Garamond | 400 cursief |
| `Inter-Regular.woff2` | Inter | 400 |
| `Inter-Medium.woff2` | Inter | 500 |
| `Inter-SemiBold.woff2` | Inter | 600 |

## Waar halen

Beide families staan onder de SIL Open Font License, dus zelf hosten mag zonder meer.

- **google-webfonts-helper** — `gwfh.mranftl.com`, kies de familie, vink de gewichten
  aan, download het woff2-pakket. Snelste weg.
- **Inter** rechtstreeks: `rsms.me/inter/`
- **Cormorant Garamond** rechtstreeks: `github.com/CatharsisFonts/Cormorant`

Beperk je tot `woff2`. Elk modern browser ondersteunt het, en het is fors kleiner
dan `woff` of `ttf`. Subsetten naar latin + latin-ext volstaat voor het Nederlands.

De `@font-face`-regels staan al bovenaan `styles.css` en verwijzen naar exact
deze bestandsnamen. Er hoeft verder niets aangepast te worden.

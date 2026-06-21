# Aarau – Info-Seite

Eine statische Informationsseite über die Stadt Aarau mit Fokus auf **Geschichte**, die
**Zeitreise-Karte** und die Traditionen **Maienzug** und **Bachfischet**.

Design in den **Stadtfarben Rot / Schwarz / Weiss**, angelehnt an den Auftritt von maienzug.info.

## Seiten

- `index.html` – Home / Übersicht mit Teaser-Kacheln
- `geschichte.html` – Geschichte (Kelten, Römer/Vindonissa, Gründung, Berner Zeit) + historische Bauten
- `zeitreise.html` – **Zeitreise-Karte** mit Jahres-Schieberegler (Dufour ≈1850 → Siegfried ≈1880 → heute)
- `karte.html` – interaktive Karte mit Markern, Fotos und umschaltbaren historischen Karten
- `maienzug.html` – Maienzug + Programm 2026 für die Kids
- `bachfischet.html` – Bachfischet (Laternenfest am Stadtbach, 2026: 500-Jahr-Jubiläum)

## Weitere Dateien

- `style.css` – das Styling (modernes, responsives Layout in Rot/Schwarz/Weiss)
- `map.js` – die interaktive Marker-Karte (Leaflet)
- `zeitreise.js` – die Zeitreise-Karte mit Epochen-Schieberegler
- `images/` – Logo, Favicon und Platz für eigene Fotos (siehe `images/README.md`)
- `.github/workflows/deploy-pages.yml` – automatisches Deployment auf GitHub Pages

## Ansehen

Einfach `index.html` im Browser öffnen – keine Installation oder Build nötig.
(Karten und Schriften laden externe Inhalte und brauchen eine Internetverbindung.)

Live: https://michifrey.github.io/aarau/

## Anpassen

- **Fotos** für die Karten-Marker: siehe `images/README.md`
- **Logo**: `images/logo.svg` durch das Original von maienzug.info ersetzen
- **Programm-Zeiten**: jährlich in `maienzug.html` bzw. `bachfischet.html` aktualisieren

> Hinweis: Historische Angaben und Programmzeiten dienen der Übersicht – bitte vor den Festen
> mit den offiziellen Quellen der Stadt Aarau abgleichen.

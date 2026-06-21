// Interaktive Karte von Aarau
// - Marker mit Bildern für Sehenswürdigkeiten und Maienzug-Stationen
// - Umschaltbare historische Karten (Dufour-/Siegfriedkarte) von swisstopo
//
// Bilder: lege eigene Fotos unter "images/<datei>.jpg" ab (z. B. von maienzug.info).
// Fehlt ein Bild, wird automatisch ein Platzhalter angezeigt.

(function () {
  "use strict";

  // ---- Grundkarte zentriert auf die Altstadt von Aarau ----
  var map = L.map("map", { scrollWheelZoom: false }).setView([47.3915, 8.0445], 15);

  var osmAttr = '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende';
  var swisstopoAttr =
    'Historische Karten © <a href="https://www.swisstopo.admin.ch/">swisstopo</a>';

  // WMTS-Vorlage (öffentlich, ohne API-Key) von swisstopo
  function swisstopo(layer, format) {
    return L.tileLayer(
      "https://wmts.geo.admin.ch/1.0.0/" +
        layer +
        "/default/current/3857/{z}/{x}/{y}." +
        (format || "jpeg"),
      { attribution: swisstopoAttr, maxZoom: 19, maxNativeZoom: 18 }
    );
  }

  // ---- Basiskarten ----
  var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: osmAttr,
    maxZoom: 19,
  }).addTo(map);

  var luftbild = swisstopo("ch.swisstopo.swissimage", "jpeg");
  luftbild.options.attribution = "Luftbild © swisstopo";

  // ---- Historische Karten (um 1850 / Ende 19. Jh.) ----
  var dufour = swisstopo("ch.swisstopo.hiks-dufour", "jpeg");
  var siegfried = swisstopo("ch.swisstopo.hiks-siegfried", "jpeg");

  L.control
    .layers(
      {
        "Strassenkarte (OSM)": osm,
        "Luftbild (swisstopo)": luftbild,
        "Historisch: Dufour (≈1845–1865)": dufour,
        "Historisch: Siegfried (ab ≈1870)": siegfried,
      },
      null,
      { collapsed: false }
    )
    .addTo(map);

  // ---- Platzhalterbild als SVG, falls ein Foto fehlt ----
  function placeholder(title) {
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="140">' +
      '<rect width="240" height="140" fill="#161616"/>' +
      '<rect width="240" height="6" fill="#d4002b"/>' +
      '<text x="120" y="66" fill="#ffffff" font-family="sans-serif" font-size="14" ' +
      'text-anchor="middle">📷 Foto hier einfügen</text>' +
      '<text x="120" y="88" fill="#e2b8c0" font-family="sans-serif" font-size="11" ' +
      'text-anchor="middle">' +
      title.replace(/[<>&]/g, "") +
      "</text></svg>";
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  // ---- Marker / Punkte von Interesse ----
  var points = [
    {
      lat: 47.3919,
      lng: 8.0438,
      title: "Altstadt &amp; schöne Giebel",
      img: "images/altstadt.jpg",
      text: "Mittelalterliche Gassen mit den berühmten bemalten Dachuntersichten.",
    },
    {
      lat: 47.3902,
      lng: 8.045,
      title: "Oberer Turm (Obertorturm)",
      img: "images/oberer-turm.jpg",
      text: "Höchster erhaltener mittelalterlicher Stadtturm der Schweiz (62 m). Uhr von 1532, bis 1890 Gefängnis.",
    },
    {
      lat: 47.3918,
      lng: 8.0436,
      title: "Roreturm / Rathaus",
      img: "images/roreturm.jpg",
      text: "Ältester Teil des Rathauses – ein Wohnturm («Burg in der Stadt») aus dem 13. Jahrhundert.",
    },
    {
      lat: 47.3926,
      lng: 8.0432,
      title: "Schlössli &amp; Stadtmuseum",
      img: "images/schloessli.jpg",
      text: "Das älteste Gebäude der Stadt – heute Teil des Stadtmuseums.",
    },
    {
      lat: 47.3923,
      lng: 8.0451,
      title: "Stadtkirche Aarau",
      img: "images/stadtkirche.jpg",
      text: "Reformierte Stadtkirche im Herzen der Altstadt.",
    },
    {
      lat: 47.3905,
      lng: 8.0466,
      title: "Aargauer Kunsthaus",
      img: "images/kunsthaus.jpg",
      text: "Bedeutende Sammlung Schweizer Kunst vom 18. Jahrhundert bis heute.",
    },
    {
      lat: 47.3884,
      lng: 8.0452,
      title: "Alte Kantonsschule",
      img: "images/kantonsschule.jpg",
      text: "Traditionsreiche Schule mit überregionalem Ruf.",
    },
    {
      lat: 47.3917,
      lng: 8.0512,
      title: "Bahnhof Aarau",
      img: "images/bahnhof.jpg",
      text: "Verkehrsknoten zwischen Zürich, Basel und Bern.",
    },
    {
      lat: 47.3949,
      lng: 8.0588,
      title: "Schachen – Maienzug-Festplatz",
      img: "images/schachen.jpg",
      text: "Festwiese, auf der traditionell das Maienzug-Bankett und Fest stattfinden.",
    },
    {
      lat: 47.3912,
      lng: 8.0501,
      title: "Fundstelle Bahnhofstrasse",
      img: "images/fundstelle-bahnhofstrasse.jpg",
      text: "Hier wurden Reste einer bronzezeitlichen Siedlung (um 1000 v. Chr.) ausgegraben. Der Strassenverlauf entspricht der römischen Fernstrasse Salodurum–Vindonissa. (ungefähre Lage)",
    },
    {
      lat: 47.394,
      lng: 8.046,
      title: "Spätrömischer Aareübergang",
      img: "images/aareuebergang.jpg",
      text: "1976 fanden Taucher im Altlauf der Aare eichene Brückenjoche – wohl spätrömisch, Beleg für einen ~7 m breiten Flussübergang vor der Stadtgründung. (ungefähre Lage)",
    },
    {
      lat: 47.481,
      lng: 8.219,
      title: "Vindonissa (Windisch)",
      img: "images/vindonissa.jpg",
      text: "Rund 15 km östlich von Aarau: keltisches Oppidum und einziges römisches Legionslager der Schweiz. Hierhin führte die Römerstrasse durch Aarau. (zum Anzeigen herauszoomen)",
    },
  ];

  points.forEach(function (p) {
    var html =
      '<div class="popup">' +
      '<img class="popup-img" alt="' +
      p.title +
      '" src="' +
      p.img +
      '" onerror="this.onerror=null;this.src=\'' +
      placeholder(p.title) +
      "'\" />" +
      '<h4 class="popup-title">' +
      p.title +
      "</h4>" +
      '<p class="popup-text">' +
      p.text +
      "</p>" +
      "</div>";

    L.marker([p.lat, p.lng]).addTo(map).bindPopup(html, { maxWidth: 260 });
  });
})();

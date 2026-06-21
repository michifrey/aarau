// Zeitreise-Karte: per Schieberegler durch die Epochen von Aarau reisen
// Dufourkarte (≈1850) → Siegfriedkarte (≈1880) → Landeskarte heute → Luftbild
// Kartenebenen: swisstopo (öffentliches WMTS, ohne API-Key)

(function () {
  "use strict";

  var map = L.map("map", { scrollWheelZoom: false }).setView([47.3915, 8.0445], 15);

  var swisstopoAttr = 'Karten © <a href="https://www.swisstopo.admin.ch/">swisstopo</a>';

  function swisstopo(layer) {
    return L.tileLayer(
      "https://wmts.geo.admin.ch/1.0.0/" + layer + "/default/current/3857/{z}/{x}/{y}.jpeg",
      { maxZoom: 19, maxNativeZoom: 18, attribution: swisstopoAttr }
    );
  }

  // Epochen von alt nach neu
  var eras = [
    { name: "Dufourkarte", year: "≈ 1845–1865", note: "Erste präzise Landeskarte der Schweiz.", layer: swisstopo("ch.swisstopo.hiks-dufour") },
    { name: "Siegfriedkarte", year: "ab ≈ 1870", note: "Detaillierte Topografie des späten 19. Jahrhunderts.", layer: swisstopo("ch.swisstopo.hiks-siegfried") },
    { name: "Landeskarte", year: "heute", note: "Aktuelle Landeskarte.", layer: swisstopo("ch.swisstopo.pixelkarte-farbe") },
    { name: "Luftbild", year: "heute", note: "Aktuelle Luftaufnahme (SWISSIMAGE).", layer: swisstopo("ch.swisstopo.swissimage") },
  ];

  var current = 0;
  eras[0].layer.addTo(map);

  // Marker mit Orientierungspunkten
  var points = [
    { lat: 47.3919, lng: 8.0438, title: "Altstadt" },
    { lat: 47.3902, lng: 8.045, title: "Oberer Turm" },
    { lat: 47.3926, lng: 8.0432, title: "Schlössli" },
    { lat: 47.3923, lng: 8.0451, title: "Stadtkirche" },
  ];
  points.forEach(function (p) {
    L.marker([p.lat, p.lng]).addTo(map).bindPopup("<strong>" + p.title + "</strong>");
  });

  // Steuerung
  var slider = document.getElementById("time-slider");
  var nameEl = document.getElementById("era-name");
  var yearEl = document.getElementById("era-year");
  var noteEl = document.getElementById("era-note");

  function show(i) {
    if (i === current) return;
    map.removeLayer(eras[current].layer);
    current = i;
    eras[i].layer.addTo(map);
    render();
  }

  function render() {
    nameEl.textContent = eras[current].name;
    yearEl.textContent = eras[current].year;
    noteEl.textContent = eras[current].note;
    slider.value = String(current);
  }

  slider.addEventListener("input", function () {
    show(parseInt(this.value, 10));
  });

  render();
})();

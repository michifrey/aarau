// Zeichnet eine (schematische) Umzugsroute auf eine kleine Karte.
// Jede Seite definiert vorher window.AARAU_ROUTE = { path, start, end, color }.

(function () {
  "use strict";
  var cfg = window.AARAU_ROUTE;
  if (!cfg || !document.getElementById("route-map")) return;

  var map = L.map("route-map", { scrollWheelZoom: false });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende',
  }).addTo(map);

  var line = L.polyline(cfg.path, {
    color: cfg.color || "#d4002b",
    weight: 5,
    opacity: 0.9,
  }).addTo(map);

  map.fitBounds(line.getBounds().pad(0.18));

  function dot(latlng, label, color) {
    return L.circleMarker(latlng, {
      radius: 8,
      color: "#fff",
      weight: 2,
      fillColor: color,
      fillOpacity: 1,
    })
      .addTo(map)
      .bindPopup("<strong>" + label + "</strong>");
  }

  dot(cfg.path[0], "Start: " + cfg.start, "#161616");
  dot(cfg.path[cfg.path.length - 1], "Ziel: " + cfg.end, cfg.color || "#d4002b");
})();

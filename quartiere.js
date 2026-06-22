// Quartiere von Aarau.
//
// 1) Liegt eine Datei "quartiere.geojson" (in WGS84 / EPSG:4326) im Projekt,
//    werden die ECHTEN Grenzen daraus gezeichnet (z. B. Export aus GeoView Aarau).
// 2) Sonst wird eine schematische Übersicht der Stadtteile angezeigt.

(function () {
  "use strict";
  if (!document.getElementById("map")) return;

  var map = L.map("map", { scrollWheelZoom: false }).setView([47.395, 8.05], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende',
  }).addTo(map);

  // ---------- schematische Stadtteile (Fallback) ----------
  var stadtteile = [
    {
      name: "Zentrum",
      color: "#d4002b",
      poly: [[47.3965, 8.0400], [47.3958, 8.0585], [47.3878, 8.0545], [47.3882, 8.0405]],
      quarters: [
        { n: "Altstadt", lat: 47.3915, lng: 8.0438 },
        { n: "Innenstadt", lat: 47.3903, lng: 8.0470 },
        { n: "Damm", lat: 47.3898, lng: 8.0418 },
        { n: "Schachen", lat: 47.3948, lng: 8.0565 },
        { n: "Rössligut", lat: 47.3888, lng: 8.0492 },
        { n: "Torfeld Nord", lat: 47.3883, lng: 8.0522 },
      ],
    },
    {
      name: "Telli",
      color: "#1f6b4f",
      poly: [[47.3960, 8.0470], [47.4000, 8.0480], [47.3995, 8.0560], [47.3955, 8.0560]],
      quarters: [{ n: "Telli", lat: 47.3975, lng: 8.0518 }],
    },
    {
      name: "Aare Nord",
      color: "#2f6fb0",
      poly: [[47.3975, 8.0380], [47.4025, 8.0390], [47.4015, 8.0470], [47.3965, 8.0460]],
      quarters: [
        { n: "Scheibenschachen", lat: 47.3990, lng: 8.0428 },
        { n: "Hungerberg", lat: 47.4008, lng: 8.0398 },
      ],
    },
    {
      name: "Aarau Süd A",
      color: "#e08a00",
      poly: [[47.3885, 8.0410], [47.3890, 8.0480], [47.3845, 8.0475], [47.3845, 8.0415]],
      quarters: [
        { n: "Zelgli", lat: 47.3865, lng: 8.0455 },
        { n: "Binzenhof", lat: 47.3878, lng: 8.0428 },
      ],
    },
    {
      name: "Aarau Süd B",
      color: "#7a3b9a",
      poly: [[47.3880, 8.0490], [47.3885, 8.0560], [47.3825, 8.0540], [47.3828, 8.0455], [47.3860, 8.0462]],
      quarters: [
        { n: "Torfeld Süd", lat: 47.3870, lng: 8.0525 },
        { n: "Gönhard", lat: 47.3850, lng: 8.0485 },
        { n: "Goldern", lat: 47.3835, lng: 8.0445 },
      ],
    },
    {
      name: "Rohr",
      color: "#0c7b73",
      poly: [[47.4010, 8.0590], [47.4090, 8.0640], [47.4070, 8.0710], [47.4000, 8.0670]],
      quarters: [
        { n: "Siebenmatten", lat: 47.4030, lng: 8.0635 },
        { n: "Ausserfeld", lat: 47.4062, lng: 8.0682 },
        { n: "Hinterdorf", lat: 47.4078, lng: 8.0648 },
      ],
    },
  ];

  function addLegend(rows) {
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
      var div = L.DomUtil.create("div", "map-legend");
      var html = "<strong>Stadtteile</strong>";
      rows.forEach(function (r) {
        html += '<span class="legend-row"><i style="background:' + r.color + '"></i>' + r.name + "</span>";
      });
      div.innerHTML = html;
      return div;
    };
    legend.addTo(map);
  }

  function renderSchematic() {
    stadtteile.forEach(function (st) {
      L.polygon(st.poly, { color: st.color, weight: 2, fillColor: st.color, fillOpacity: 0.12 })
        .addTo(map)
        .bindTooltip("Stadtteil " + st.name, { sticky: true });

      st.quarters.forEach(function (q) {
        L.circleMarker([q.lat, q.lng], {
          radius: 6, color: "#fff", weight: 2, fillColor: st.color, fillOpacity: 1,
        })
          .addTo(map)
          .bindTooltip(q.n, { permanent: true, direction: "right", className: "q-label" })
          .bindPopup("<strong>" + q.n + "</strong><br>Stadtteil " + st.name);
      });
    });
    addLegend(stadtteile);
  }

  // ---------- echte Grenzen aus GeoJSON ----------
  function pickName(props) {
    if (!props) return "";
    var keys = ["name", "NAME", "Name", "quartier", "QUARTIER", "Quartier",
      "bezeichnung", "BEZEICHNUNG", "qname", "QNAME", "label", "LABEL", "statname"];
    for (var i = 0; i < keys.length; i++) if (props[keys[i]]) return props[keys[i]];
    for (var k in props) if (typeof props[k] === "string") return props[k];
    return "";
  }

  function renderGeoJSON(gj) {
    var layer = L.geoJSON(gj, {
      style: function () {
        return { color: "#d4002b", weight: 2, fillColor: "#d4002b", fillOpacity: 0.1 };
      },
      onEachFeature: function (f, l) {
        var nm = pickName(f.properties);
        if (nm) {
          l.bindTooltip(nm, { sticky: true });
          l.bindPopup("<strong>" + nm + "</strong>");
        }
      },
    }).addTo(map);
    try { map.fitBounds(layer.getBounds().pad(0.05)); } catch (e) {}
    var note = document.getElementById("schema-note");
    if (note) note.style.display = "none";
  }

  fetch("quartiere.geojson", { cache: "no-store" })
    .then(function (r) { if (!r.ok) throw new Error("no geojson"); return r.json(); })
    .then(renderGeoJSON)
    .catch(renderSchematic);
})();

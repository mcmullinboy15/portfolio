/* Roadless — discover new routes to a destination.
 * Geocoding: Nominatim (OpenStreetMap). Routing: public OSRM demo server.
 * Travel history & journal live in localStorage on this device only.
 */
(function () {
  "use strict";

  // ----- Config ----------------------------------------------------------
  var NOMINATIM = "https://nominatim.openstreetmap.org/search";
  var OSRM = "https://router.project-osrm.org/route/v1/driving";
  var MILES_PER_KM = 0.621371;
  var STORE = {
    history: "roadless.history.v1", // { roads: {name: count}, updatedAt }
    journal: "roadless.journal.v1", // [{dest, date, note, newRoads, miles}]
    pending: "roadless.pending.v1", // {dest, startedAt, etaMin, newRoads, miles}
  };
  // Route colors for the map + swatches.
  var COLORS = ["#c6a86a", "#6fcf97", "#7ab8ff", "#d98ed1"];

  // ----- Tiny DOM helpers ------------------------------------------------
  function $(id) {
    return document.getElementById(id);
  }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function setStatus(msg, isError) {
    var s = $("status");
    s.textContent = msg || "";
    s.classList.toggle("is-error", !!isError);
  }

  // ----- Storage ---------------------------------------------------------
  function load(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* storage full / disabled — non-fatal */
    }
  }
  function getHistory() {
    return load(STORE.history, { roads: {}, updatedAt: null });
  }
  function seenRoadSet() {
    return new Set(Object.keys(getHistory().roads || {}));
  }
  function recordRoads(names) {
    var h = getHistory();
    h.roads = h.roads || {};
    names.forEach(function (n) {
      if (!n) return;
      h.roads[n] = (h.roads[n] || 0) + 1;
    });
    h.updatedAt = new Date().toISOString();
    save(STORE.history, h);
  }

  // ----- Geometry --------------------------------------------------------
  function toRad(d) {
    return (d * Math.PI) / 180;
  }
  function toDeg(r) {
    return (r * 180) / Math.PI;
  }
  // Haversine distance in km between [lon,lat] pairs.
  function haversineKm(a, b) {
    var R = 6371;
    var dLat = toRad(b[1] - a[1]);
    var dLon = toRad(b[0] - a[0]);
    var la1 = toRad(a[1]);
    var la2 = toRad(b[1]);
    var h =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  }
  // Initial bearing (deg) from a -> b, coords [lon,lat].
  function bearing(a, b) {
    var la1 = toRad(a[1]);
    var la2 = toRad(b[1]);
    var dLon = toRad(b[0] - a[0]);
    var y = Math.sin(dLon) * Math.cos(la2);
    var x =
      Math.cos(la1) * Math.sin(la2) -
      Math.sin(la1) * Math.cos(la2) * Math.cos(dLon);
    return (toDeg(Math.atan2(y, x)) + 360) % 360;
  }
  // Move from [lon,lat] along bearing (deg) by distance (km) -> [lon,lat].
  function destPoint(p, bearingDeg, distKm) {
    var R = 6371;
    var d = distKm / R;
    var brng = toRad(bearingDeg);
    var la1 = toRad(p[1]);
    var lo1 = toRad(p[0]);
    var la2 = Math.asin(
      Math.sin(la1) * Math.cos(d) + Math.cos(la1) * Math.sin(d) * Math.cos(brng)
    );
    var lo2 =
      lo1 +
      Math.atan2(
        Math.sin(brng) * Math.sin(d) * Math.cos(la1),
        Math.cos(d) - Math.sin(la1) * Math.sin(la2)
      );
    return [(toDeg(lo2) + 540) % 360 - 180, toDeg(la2)];
  }
  // Point and local bearing at fraction f (0..1) along a [lon,lat] polyline.
  function pointAtFraction(coords, f) {
    if (coords.length < 2) return { point: coords[0], bearing: 0 };
    var total = 0;
    var segs = [];
    for (var i = 0; i < coords.length - 1; i++) {
      var d = haversineKm(coords[i], coords[i + 1]);
      segs.push(d);
      total += d;
    }
    var target = total * f;
    var acc = 0;
    for (var j = 0; j < segs.length; j++) {
      if (acc + segs[j] >= target || j === segs.length - 1) {
        var a = coords[j];
        var b = coords[j + 1];
        var t = segs[j] > 0 ? (target - acc) / segs[j] : 0;
        var pt = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
        return { point: pt, bearing: bearing(a, b) };
      }
      acc += segs[j];
    }
    return { point: coords[coords.length - 1], bearing: 0 };
  }

  // ----- Network: geocode + route ---------------------------------------
  function geocode(query) {
    var url =
      NOMINATIM +
      "?format=jsonv2&limit=1&q=" +
      encodeURIComponent(query);
    return fetch(url, { headers: { Accept: "application/json" } })
      .then(function (r) {
        if (!r.ok) throw new Error("Geocoding failed (" + r.status + ")");
        return r.json();
      })
      .then(function (list) {
        if (!list || !list.length) {
          throw new Error('Could not find "' + query + '". Try a fuller address.');
        }
        var hit = list[0];
        return {
          lat: parseFloat(hit.lat),
          lon: parseFloat(hit.lon),
          label: hit.display_name,
        };
      });
  }

  function reverseGeocode(lat, lon) {
    var url =
      "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
      lat +
      "&lon=" +
      lon;
    return fetch(url, { headers: { Accept: "application/json" } })
      .then(function (r) {
        return r.ok ? r.json() : null;
      })
      .then(function (j) {
        return (j && j.display_name) || lat.toFixed(4) + ", " + lon.toFixed(4);
      })
      .catch(function () {
        return lat.toFixed(4) + ", " + lon.toFixed(4);
      });
  }

  // coords: array of [lon,lat]. Returns normalized route or throws.
  function osrmRoute(coords) {
    var path = coords
      .map(function (c) {
        return c[0] + "," + c[1];
      })
      .join(";");
    var url =
      OSRM +
      "/" +
      path +
      "?overview=full&geometries=geojson&steps=true&alternatives=false";
    return fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error("Routing failed (" + r.status + ")");
        return r.json();
      })
      .then(function (j) {
        if (j.code !== "Ok" || !j.routes || !j.routes.length) {
          throw new Error("No drivable route found between those points.");
        }
        var route = j.routes[0];
        var names = [];
        (route.legs || []).forEach(function (leg) {
          (leg.steps || []).forEach(function (step) {
            if (step.name && names.indexOf(step.name) === -1) names.push(step.name);
          });
        });
        return {
          distanceKm: route.distance / 1000,
          durationMin: route.duration / 60,
          geometry: route.geometry.coordinates, // [lon,lat][]
          roadNames: names,
        };
      });
  }

  // ----- Discovery -------------------------------------------------------
  // Build candidate detour routes that bias toward roads not in history.
  function buildCandidates(start, dest, baseline, detours, budgetMiles) {
    var coords = baseline.geometry;
    // Lateral offset magnitudes (km) scaled from the mileage budget.
    var budgetKm = budgetMiles / MILES_PER_KM;
    var mags = [budgetKm * 0.3, budgetKm * 0.55, budgetKm * 0.85];
    var sides = [90, -90]; // right / left of travel direction
    var candidates = [];

    sides.forEach(function (side) {
      mags.forEach(function (mag) {
        var waypoints = [];
        for (var i = 1; i <= detours; i++) {
          var f = i / (detours + 1);
          var at = pointAtFraction(coords, f);
          // Slight along-track jitter per detour so multi-detour routes vary.
          var lateralBearing = (at.bearing + side + 360) % 360;
          waypoints.push(destPoint(at.point, lateralBearing, mag));
        }
        candidates.push({ side: side, mag: mag, waypoints: waypoints });
      });
    });
    return candidates;
  }

  function scoreRoute(route, seen, baselineNames) {
    var names = route.roadNames || [];
    var baseSet = new Set(baselineNames || []);
    var newToYou = names.filter(function (n) {
      return n && !seen.has(n);
    });
    var offDirect = names.filter(function (n) {
      return n && !baseSet.has(n);
    });
    var novelty = names.length ? newToYou.length / names.length : 0;
    return { newToYou: newToYou, offDirect: offDirect, novelty: novelty };
  }

  // ----- Maps handoff ----------------------------------------------------
  function googleMapsUrl(start, dest, waypoints) {
    var u =
      "https://www.google.com/maps/dir/?api=1&travelmode=driving" +
      "&origin=" +
      start.lat +
      "," +
      start.lon +
      "&destination=" +
      dest.lat +
      "," +
      dest.lon;
    if (waypoints && waypoints.length) {
      u +=
        "&waypoints=" +
        waypoints
          .map(function (w) {
            return w[1] + "," + w[0];
          })
          .join("|");
    }
    return u;
  }
  function appleMapsUrl(start, dest, waypoints) {
    // Apple Maps chains stops on daddr with "+to:".
    var stops = [];
    (waypoints || []).forEach(function (w) {
      stops.push(w[1] + "," + w[0]);
    });
    stops.push(dest.lat + "," + dest.lon);
    return (
      "https://maps.apple.com/?saddr=" +
      start.lat +
      "," +
      start.lon +
      "&daddr=" +
      stops.join("+to:") +
      "&dirflg=d"
    );
  }

  // ----- Map rendering ---------------------------------------------------
  var map = null;
  var layers = [];
  function ensureMap() {
    if (map) return map;
    map = L.map("map", { zoomControl: true, attributionControl: true });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap",
    }).addTo(map);
    return map;
  }
  function drawRoutes(routeOptions) {
    ensureMap();
    layers.forEach(function (l) {
      map.removeLayer(l);
    });
    layers = [];
    var allPts = [];
    // Draw lower-ranked first so the best route sits on top.
    routeOptions
      .slice()
      .reverse()
      .forEach(function (opt) {
        var latlngs = opt.route.geometry.map(function (c) {
          return [c[1], c[0]];
        });
        var line = L.polyline(latlngs, {
          color: opt.color,
          weight: opt.isBest ? 6 : 4,
          opacity: opt.isBest ? 0.95 : 0.65,
        }).addTo(map);
        layers.push(line);
        allPts = allPts.concat(latlngs);
      });
    if (allPts.length) {
      map.fitBounds(L.latLngBounds(allPts), { padding: [28, 28] });
    }
    setTimeout(function () {
      map.invalidateSize();
    }, 50);
  }

  // ----- State -----------------------------------------------------------
  var current = { start: null, dest: null };

  // ----- Main flow -------------------------------------------------------
  function findRoutes(start, dest) {
    var detours = parseInt($("detours").value, 10) || 1;
    var budget = parseFloat($("budget").value) || 1;
    var seen = seenRoadSet();
    setStatus("Finding the direct route…");

    var startCoord = [start.lon, start.lat];
    var destCoord = [dest.lon, dest.lat];

    return osrmRoute([startCoord, destCoord]).then(function (baseline) {
      setStatus("Exploring " + detours + " unfamiliar detour" + (detours > 1 ? "s" : "") + "…");
      var candidates = buildCandidates(start, dest, baseline, detours, budget);

      var routePromises = candidates.map(function (cand) {
        var coords = [startCoord].concat(cand.waypoints).concat([destCoord]);
        return osrmRoute(coords)
          .then(function (route) {
            return { cand: cand, route: route };
          })
          .catch(function () {
            return null; // drop unroutable candidates
          });
      });

      return Promise.all(routePromises).then(function (results) {
        var baseMiles = baseline.distanceKm * MILES_PER_KM;
        var tol = 0.15; // miles of slack on the budget
        var scored = [];
        var seenSig = {};

        results.forEach(function (res) {
          if (!res) return;
          var miles = res.route.distanceKm * MILES_PER_KM;
          var added = miles - baseMiles;
          if (added > budget + tol) return; // over the extra-miles budget
          if (added < -0.05) return; // shorter than "direct" => not a detour
          var s = scoreRoute(res.route, seen, baseline.roadNames);
          if (!s.newToYou.length) return; // nothing new — skip
          // De-dupe near-identical candidates by their new-road signature.
          var sig = s.newToYou.slice(0, 4).sort().join("|");
          if (seenSig[sig]) return;
          seenSig[sig] = true;
          scored.push({
            route: res.route,
            waypoints: res.cand.waypoints,
            addedMiles: added,
            miles: miles,
            score: s,
          });
        });

        scored.sort(function (a, b) {
          if (b.score.novelty !== a.score.novelty)
            return b.score.novelty - a.score.novelty;
          return a.addedMiles - b.addedMiles;
        });

        var top = scored.slice(0, detours >= 3 ? 3 : detours + 1).slice(0, 3);

        return {
          baseline: baseline,
          baseMiles: baseMiles,
          discoveries: top,
        };
      });
    });
  }

  function renderResults(data, start, dest) {
    var listEl = $("route-list");
    listEl.innerHTML = "";
    var routeOptions = [];

    if (!data.discoveries.length) {
      setStatus(
        "No new-road detour fit within your budget — try more extra miles or a farther destination.",
        false
      );
    } else {
      setStatus("");
    }

    // Discovery routes (best first).
    data.discoveries.forEach(function (d, i) {
      var color = COLORS[i % COLORS.length];
      var isBest = i === 0;
      routeOptions.push({ route: d.route, color: color, isBest: isBest });
      listEl.appendChild(
        renderRouteCard({
          title: isBest ? "Discovery route" : "Alternative discovery",
          rank: isBest ? "Best new roads" : null,
          color: color,
          isBest: isBest,
          miles: d.miles,
          minutes: d.route.durationMin,
          added: d.addedMiles,
          novelty: d.score.novelty,
          newRoads: d.score.newToYou,
          waypoints: d.waypoints,
          start: start,
          dest: dest,
        })
      );
    });

    // Direct route, for reference.
    var directColor = "#8a8278";
    routeOptions.push({ route: data.baseline, color: directColor, isBest: !data.discoveries.length });
    listEl.appendChild(
      renderRouteCard({
        title: "Direct route",
        rank: null,
        color: directColor,
        isBest: false,
        miles: data.baseMiles,
        minutes: data.baseline.durationMin,
        added: 0,
        novelty: null,
        newRoads: [],
        waypoints: [],
        start: start,
        dest: dest,
      })
    );

    $("results").hidden = false;
    drawRoutes(routeOptions);
  }

  function renderRouteCard(o) {
    var card = el("article", "route" + (o.isBest ? " route--best" : ""));
    if (o.rank) card.appendChild(el("div", "route__rank", esc(o.rank)));

    var head = el("div", "route__head");
    var sw = el("span", "route__swatch");
    sw.style.background = o.color;
    head.appendChild(sw);
    head.appendChild(el("span", "route__name", esc(o.title)));
    card.appendChild(head);

    var stats = el("div", "route__stats");
    stats.innerHTML =
      "<span><b>" +
      o.miles.toFixed(1) +
      "</b> mi</span>" +
      "<span><b>" +
      Math.round(o.minutes) +
      "</b> min</span>" +
      (o.added > 0
        ? "<span>+<b>" + o.added.toFixed(1) + "</b> mi vs direct</span>"
        : "<span>shortest way</span>");
    card.appendChild(stats);

    if (o.novelty != null) {
      var nov = el("div", "novelty");
      var bar = el("div", "novelty__bar");
      var fill = el("div", "novelty__fill");
      fill.style.width = Math.round(o.novelty * 100) + "%";
      bar.appendChild(fill);
      nov.appendChild(bar);
      nov.appendChild(
        el("span", "novelty__label", Math.round(o.novelty * 100) + "% new to you")
      );
      card.appendChild(nov);
    }

    if (o.newRoads && o.newRoads.length) {
      var shown = o.newRoads.slice(0, 5).map(esc).join(", ");
      var more = o.newRoads.length > 5 ? " +" + (o.newRoads.length - 5) + " more" : "";
      card.appendChild(
        el(
          "div",
          "route__new-roads",
          "New roads: <span>" + shown + "</span>" + more
        )
      );
    }

    var actions = el("div", "route__actions");
    var gBtn = el("button", "btn btn--primary", "Open in Google Maps");
    var aBtn = el("button", "btn btn--ghost", "Apple Maps");
    gBtn.addEventListener("click", function () {
      startTrip(o, "google");
    });
    aBtn.addEventListener("click", function () {
      startTrip(o, "apple");
    });
    actions.appendChild(gBtn);
    actions.appendChild(aBtn);
    card.appendChild(actions);
    return card;
  }

  // ----- Trip handoff + reflection --------------------------------------
  function startTrip(o, provider) {
    var url =
      provider === "apple"
        ? appleMapsUrl(current.start, current.dest, o.waypoints)
        : googleMapsUrl(current.start, current.dest, o.waypoints);

    // Record the roads on the chosen route as "driven" so future
    // discoveries treat them as familiar.
    if (o.newRoads && o.newRoads.length) recordRoads(o.newRoads);

    // Stash a pending trip so we can prompt for reflection on return.
    save(STORE.pending, {
      dest: current.dest.label,
      startedAt: Date.now(),
      etaMin: Math.round(o.minutes),
      newRoads: o.newRoads || [],
      miles: o.miles,
    });

    scheduleArrivalReminder(current.dest.label, o.minutes);

    // Open the maps app/site (new tab/window so this app keeps state).
    window.open(url, "_blank", "noopener");
    renderJournal();
  }

  function scheduleArrivalReminder(destLabel, minutes) {
    if (!("Notification" in window)) return;
    function arm() {
      if (Notification.permission !== "granted") return;
      // Fires while this tab/SW stays alive; on reopen we also prompt.
      var delay = Math.max(1, Math.round(minutes)) * 60 * 1000;
      // Cap so testing/short trips still feel responsive.
      delay = Math.min(delay, 90 * 60 * 1000);
      setTimeout(function () {
        showNotification("You made it 👋", {
          body:
            "What did you do, see, or learn that was new on the way to " +
            destLabel.split(",")[0] +
            "?",
          tag: "roadless-arrival",
        });
      }, delay);
    }
    if (Notification.permission === "granted") {
      arm();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(arm);
    }
  }

  function showNotification(title, opts) {
    opts = opts || {};
    opts.icon = opts.icon || "/img/logo.png";
    if (navigator.serviceWorker && navigator.serviceWorker.ready) {
      navigator.serviceWorker.ready
        .then(function (reg) {
          return reg.showNotification(title, opts);
        })
        .catch(function () {
          try {
            new Notification(title, opts);
          } catch (e) {}
        });
    } else {
      try {
        new Notification(title, opts);
      } catch (e) {}
    }
  }

  function maybePromptReflection() {
    var pending = load(STORE.pending, null);
    if (!pending) return;
    $("reflect-title").textContent =
      "How was the road to " + pending.dest.split(",")[0] + "?";
    $("reflect").hidden = false;
  }

  function saveReflection() {
    var pending = load(STORE.pending, null);
    var note = $("reflect-text").value.trim();
    var journal = load(STORE.journal, []);
    journal.unshift({
      dest: pending ? pending.dest : "A drive",
      date: new Date().toISOString(),
      note: note,
      newRoads: pending ? pending.newRoads : [],
      miles: pending ? pending.miles : null,
    });
    save(STORE.journal, journal);
    localStorage.removeItem(STORE.pending);
    $("reflect-text").value = "";
    $("reflect").hidden = true;
    renderJournal();
  }

  function renderJournal() {
    var journal = load(STORE.journal, []);
    var listEl = $("journal-list");
    listEl.innerHTML = "";
    if (!journal.length) {
      $("journal").hidden = true;
      return;
    }
    journal.slice(0, 25).forEach(function (entry) {
      var li = el("li", "journal__item");
      var when = new Date(entry.date);
      var head =
        '<span class="journal__item-dest">' +
        esc(entry.dest.split(",")[0]) +
        "</span>" +
        '<span class="journal__item-date">' +
        when.toLocaleDateString(undefined, { month: "short", day: "numeric" }) +
        "</span>";
      li.innerHTML = head;
      if (entry.note) {
        li.appendChild(el("div", "journal__item-note", esc(entry.note)));
      } else if (entry.newRoads && entry.newRoads.length) {
        li.appendChild(
          el(
            "div",
            "journal__item-note",
            "New roads driven: " + esc(entry.newRoads.slice(0, 4).join(", "))
          )
        );
      }
      listEl.appendChild(li);
    });

    var roadCount = Object.keys(getHistory().roads || {}).length;
    $("journal-meta").textContent =
      journal.length +
      " reflection" +
      (journal.length === 1 ? "" : "s") +
      " · " +
      roadCount +
      " unique roads driven so far";
    $("journal").hidden = false;
  }

  // ----- Wiring ----------------------------------------------------------
  function setBusy(busy) {
    $("find-btn").disabled = busy;
    $("find-btn").textContent = busy ? "Searching…" : "Find a new way there";
  }

  function onSubmit(e) {
    e.preventDefault();
    var startVal = $("start").value.trim();
    var destVal = $("destination").value.trim();
    if (!destVal) {
      setStatus("Enter a destination first.", true);
      return;
    }
    setBusy(true);
    setStatus("Looking up locations…");

    var startPromise;
    // If we hold a fresh geolocation fix (and the user hasn't typed over it,
    // which clears it via the input listener), use those precise coordinates.
    if (current.start && current.start.fromGeo) {
      startPromise = Promise.resolve(current.start);
    } else if (startVal) {
      startPromise = geocode(startVal);
    } else {
      setBusy(false);
      setStatus('Enter a start address or tap "Use my location".', true);
      return;
    }

    Promise.all([startPromise, geocode(destVal)])
      .then(function (pair) {
        current.start = pair[0];
        current.dest = pair[1];
        return findRoutes(current.start, current.dest);
      })
      .then(function (data) {
        renderResults(data, current.start, current.dest);
      })
      .catch(function (err) {
        setStatus(err.message || "Something went wrong. Try again.", true);
      })
      .finally(function () {
        setBusy(false);
      });
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      setStatus("Geolocation isn't available in this browser.", true);
      return;
    }
    setStatus("Getting your location…");
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        var lat = pos.coords.latitude;
        var lon = pos.coords.longitude;
        current.start = { lat: lat, lon: lon, label: "My location", fromGeo: true };
        $("start").value = "My location";
        setStatus("Got it. Now enter a destination.");
        reverseGeocode(lat, lon).then(function (label) {
          current.start.label = label;
          $("start").value = label.split(",").slice(0, 2).join(",");
        });
      },
      function (err) {
        setStatus("Couldn't get your location: " + err.message, true);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function init() {
    // Slider outputs
    $("detours").addEventListener("input", function () {
      $("detours-out").textContent = this.value;
    });
    $("budget").addEventListener("input", function () {
      $("budget-out").textContent = parseFloat(this.value).toFixed(1);
    });
    // When the user types a start, drop any geolocation lock.
    $("start").addEventListener("input", function () {
      if (current.start && current.start.fromGeo) current.start = null;
    });

    $("plan-form").addEventListener("submit", onSubmit);
    $("use-location").addEventListener("click", useMyLocation);
    $("reflect-save").addEventListener("click", saveReflection);
    $("reflect-skip").addEventListener("click", function () {
      localStorage.removeItem(STORE.pending);
      $("reflect").hidden = true;
    });
    $("journal-clear").addEventListener("click", function () {
      if (confirm("Clear all travel history and journal entries on this device?")) {
        localStorage.removeItem(STORE.history);
        localStorage.removeItem(STORE.journal);
        localStorage.removeItem(STORE.pending);
        renderJournal();
        $("reflect").hidden = true;
      }
    });

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(function () {});
    }

    maybePromptReflection();
    renderJournal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

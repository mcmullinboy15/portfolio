# Roadless — route discovery app

A self-contained, no-build web app that suggests ways to a destination over
roads you haven't driven before, hands off to Google or Apple Maps, then asks
what you found that was new.

Deployed at **`/route-discovery/`** on the same Firebase Hosting site (vue-cli
copies everything under `public/` into `dist/` verbatim, so these files ship
as-is — no build step, no impact on the portfolio app).

## How it works

1. **Destination in.** Enter a destination (and a start, or tap *Use my
   location*). Addresses are geocoded with
   [Nominatim](https://nominatim.org/) (OpenStreetMap) — no API key.
2. **Discovery routing.** A baseline driving route is fetched from the public
   [OSRM](https://project-osrm.org/) demo server. The app then generates
   detour candidates by offsetting waypoints perpendicular to the route and
   re-routing through them, biased toward roads not in your history.
   - **New detours (X)** — how many unfamiliar-road detours to weave in.
   - **Extra miles (D)** — hard budget on added road vs. the direct route.
   - Candidates are ranked by *novelty* (share of road names you've never
     driven) and surfaced with a map preview and the specific new roads.
3. **Hand off to Maps.** Each suggestion opens directly in Google Maps or
   Apple Maps with the detour waypoints prefilled, so turn-by-turn navigation
   happens in the app you already use.
4. **Reflect.** Starting a route stashes the trip and (with permission)
   schedules an arrival notification asking *what did you do, see, or learn
   that was new?* Answers are saved to an on-device discovery journal, and the
   roads you drove become "familiar" so future suggestions stay fresh.

## Privacy

Travel history and journal entries live in `localStorage` on your device only.
"Clear history" wipes them. Geocoding/routing requests go to the public OSM
services noted above.

## Notes & limits

- "New road" novelty is inferred from OSRM step road names vs. your accepted-
  route history — a good heuristic, not GPS-trace truth.
- The arrival reminder fires while the tab/service worker is alive; on reopen
  the app also prompts for any pending reflection. True push-while-closed would
  need a push server.
- The public OSRM/Nominatim endpoints are rate-limited demo services — fine for
  personal use, not heavy traffic.

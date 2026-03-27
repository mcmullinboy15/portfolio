# portfolio

I use Vue.js and my frontend framework, with Vuex as my statemanagement system, and Vuetify for design. I use Firebase Hosting to host the built webpage, and FirestoreDB for retrieving/saving any data needed. This is a low-level simple project, so I don't use all the great functionalities that these libraries and frameworks provide.

## Life Weeks backend endpoint

This repo now includes a Firebase HTTPS function that generates a "life in weeks" image for Shortcuts/wallpaper automation.

- Endpoint path: `/api/life-weeks`
- Required query params:
  - `birthDate` (YYYY-MM-DD)
  - `deathDate` (YYYY-MM-DD)
- Optional query params:
  - `format=json` (returns numeric stats instead of SVG)
  - `columns` (default 52)
  - `dotSize`, `gap`, `margin`
  - `completedColor`, `remainingColor`, `backgroundColor`, `textColor`
  - `title`

Example:

`/api/life-weeks?birthDate=1996-06-22&deathDate=2076-06-22&columns=52`

The default response is an SVG image suitable for use in Apple Shortcuts as input to save/set wallpaper.

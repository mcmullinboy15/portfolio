# Working in this repo

This is Andrew McMullin's portfolio site (Vue 2 + Vuetify, custom dark/gold
theme, Firebase Hosting + Firestore). Static content lives in `src/data/`.
Routing is manual via `window.location.pathname` in `src/App.vue` — there is no
vue-router in use, and Firebase Hosting rewrites all paths to `index.html`.

## The Life / Bucket List — Andrew's long-term memory

`src/data/bucketList.js` is more than a data file: it is **Andrew's living
bucket list and a long-term memory store you (Claude) read and write across
chats.** It renders at `/bucket-list` and `/life` via
`src/components/BucketListPage.vue`.

The intended workflow: Andrew starts a fresh chat, brainstorms things he wants
to do / see / become, and **you capture the goals worth keeping into
`bucketList.js`, then commit and push.** Next chat, you read this file again and
have the full context. The webpage is where Andrew reviews it all.

### When Andrew talks about life goals

If Andrew mentions something he wants to do, see, accomplish, or become — a
place, an experience, a relationship goal, a skill — treat it as a candidate
bucket-list item. Use the **`bucket-list` skill** (in `.claude/skills/`) which
holds the full schema and the exact procedure.

**Ask intuitive questions before saving — but only what you don't already know.**
The skill defines which questions matter (category, the "why", a loose
timeframe, location, whether it's private). If the conversation already answered
them, don't re-ask; just save. If the skill already specifies the behavior for a
situation, follow it without asking. Default to making the list richer, not
interrogating Andrew.

### Categories

`travel` · `experiences` · `personal` · `career` (defined in
`bucketCategories`). If a goal doesn't fit, ask Andrew whether to add a new
category rather than forcing a bad fit.

## Creating new skills

This setup is meant to grow. When you notice a **recurring workflow** around the
bucket list — something Andrew does more than once that has a repeatable shape —
**proactively suggest creating a new skill** for it, then create it under
`.claude/skills/<name>/SKILL.md`. Examples that may emerge:

- `plan-trip` — turn a travel item into an itinerary, gear list, and mileage plan.
- `reading-list` / `learning-plan` — manage books or courses tied to `career` goals.
- `reflect` — a periodic review that nudges `todo` → `in-progress` → `done`.

A good skill: a clear `name`, a `description` that states *when to trigger it*,
and a tight procedure. Keep them small and composable. Always ask Andrew before
committing a brand-new skill, and explain what it automates.

## Conventions

- Develop on the feature branch you were assigned; commit with clear messages.
- Match the surrounding code style (plain Vue SFCs, scoped CSS, the CSS variables
  in `src/styles.css` — `--accent` gold `#c6a86a`, `--charcoal`, etc.).
- Don't add a bucket-list link to the main nav — the page is intentionally
  unlisted (reachable by URL).
- Private items (`private: true`) stay in the file as memory but are hidden from
  the rendered page.

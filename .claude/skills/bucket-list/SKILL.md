---
name: bucket-list
description: >-
  Use whenever Andrew talks about something he wants to do, see, accomplish, or
  become — a place to visit, an experience to have, a relationship or personal
  goal, a skill to master — or when he wants to review, update, or complete an
  item on his life/bucket list. Captures goals into src/data/bucketList.js (his
  long-term memory) and the page renders at /bucket-list and /life.
---

# Bucket List

`src/data/bucketList.js` is Andrew's living bucket list and a long-term memory
store. Read it first, then add or update items, then commit and push.

## Item schema

```js
{
  id: "kebab-case-slug",        // required, unique
  title: "Short headline",      // required
  category: "travel",           // required: travel | experiences | personal | career
  status: "todo",               // required: todo | in-progress | done
  detail: "1–2 sentences of specifics.",   // optional
  why: "What it means to me.",  // optional but valuable — capture the motivation
  location: "Place, ST",        // optional
  target: "2027",               // optional loose timeframe: "Summer", "someday", a year
  createdDate: "YYYY-MM-DD",    // optional, the day it was added
  completedDate: "YYYY-MM-DD",  // set when status becomes "done"
  private: false,               // true keeps it in memory but hides it from the page
  tags: ["mountains"],          // optional freeform labels
}
```

Categories live in `bucketCategories`. If something genuinely doesn't fit one,
ask Andrew whether to add a new category instead of forcing it.

## Adding a goal

1. Read `src/data/bucketList.js`.
2. **Ask only the questions you can't already answer from the conversation.**
   Prioritize, in order:
   - **Category** — if ambiguous, confirm which of the four it belongs to.
   - **The "why"** — what does accomplishing this mean to him? This is the most
     valuable field; ask if it isn't obvious.
   - **Specifics** for `detail` (e.g. "the Tetons" → how many miles? backpack or
     visit?).
   - **Timeframe** (`target`) — only if he hints at one; otherwise leave it off
     or use "someday".
   - **Private?** — if it feels personal/sensitive, ask whether to mark it
     `private: true`.
   Don't interrogate. One or two well-chosen questions beats a form. If the chat
   already covered it, just save.
3. Add the object near the top of its category block in `bucketItems`, set
   `createdDate` to today, give it a unique `id`.
4. Commit (e.g. `Add bucket-list goal: <title>`) and push to the working branch.

## Updating / completing a goal

- Progressing: change `status` (`todo` → `in-progress` → `done`).
- Completing: set `status: "done"` and `completedDate` to today.
- Editing details is just an edit to the existing object — keep the same `id`.

## Suggesting new skills

If Andrew starts doing something repeatable with the list — planning trips from
travel items, building a reading/learning plan from career goals, periodic
reviews — proactively suggest spinning that into its own skill under
`.claude/skills/`, and create it once he agrees. See `/CLAUDE.md` for examples.

## Don't

- Don't add the page to the main navigation; it's intentionally unlisted.
- Don't drop `private` items from the file — they're memory; the page hides them.

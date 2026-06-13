// ─────────────────────────────────────────────────────────────────────────────
// Andrew's Life / Bucket List
//
// This file is the source of truth for the bucket-list page (/bucket-list, /life)
// AND a long-term memory store that Claude reads + writes across chats.
//
// HOW TO EDIT (for Claude — see /CLAUDE.md and the `bucket-list` skill for full
// guidance, including which clarifying questions to ask before adding an item):
//   • Add a new goal  -> push a new object onto `bucketItems`.
//   • Complete a goal -> set status: "done" and fill `completedDate`.
//   • Keep newest items near the top of their category for easy scanning.
//
// Item schema:
//   id            string   unique kebab-case slug (required)
//   title         string   short headline (required)
//   category      string   one of bucketCategories[].id (required)
//   status        string   "todo" | "in-progress" | "done" (required)
//   detail        string   1–2 sentences of specifics (optional)
//   why           string   the motivation / what it means to me (optional)
//   location      string   place, if relevant (optional)
//   target        string   loose timeframe, e.g. "2027", "Summer", "someday" (optional)
//   createdDate   string   YYYY-MM-DD the goal was added (optional)
//   completedDate string   YYYY-MM-DD it was accomplished (set when status="done")
//   private       boolean  true hides it from the public page but keeps it in memory
//   tags          string[] freeform labels (optional)
// ─────────────────────────────────────────────────────────────────────────────

export const bucketListIntro = {
  eyebrow: "Life List",
  title: ["Places to go,", "things to feel,", "who to become"],
  blurb:
    "A living list of what I want to do, see, and grow into — kept in sync with Claude. New chats brainstorm goals; the ones worth keeping land here.",
};

export const bucketCategories = [
  {
    id: "travel",
    label: "Travel & Places",
    blurb: "Places to see, visit, and move through.",
    icon: "⛰",
  },
  {
    id: "experiences",
    label: "Experiences & Adventures",
    blurb: "Things to do and feel at least once.",
    icon: "✦",
  },
  {
    id: "personal",
    label: "Personal & Relationships",
    blurb: "Inner growth, love, family, character.",
    icon: "❤",
  },
  {
    id: "career",
    label: "Career & Skills",
    blurb: "What I want to build and master.",
    icon: "◆",
  },
];

export const bucketItems = [
  // ── Travel & Places ──────────────────────────────────────────────────────
  {
    id: "tetons-backpack",
    title: "Backpack the Tetons",
    category: "travel",
    status: "todo",
    detail:
      "Multi-day backpacking trip through Grand Teton National Park — aiming for a serious mileage route, not just a day hike.",
    why: "The Tetons have been pulling at me for a while. I want to earn the views.",
    location: "Grand Teton National Park, WY",
    target: "someday",
    createdDate: "2026-06-13",
    tags: ["backpacking", "mountains"],
  },
  {
    id: "tetons-visit",
    title: "Visit the Tetons",
    category: "travel",
    status: "todo",
    detail: "Even just standing at the base and taking them in counts.",
    location: "Grand Teton National Park, WY",
    target: "someday",
    createdDate: "2026-06-13",
    tags: ["mountains"],
  },

  // ── Experiences & Adventures ─────────────────────────────────────────────
  // (Brainstorm these with Claude — e.g. "see the northern lights", "run a
  // marathon". Add them here as they solidify.)

  // ── Personal & Relationships ─────────────────────────────────────────────
  {
    id: "love",
    title: "Love deeply",
    category: "personal",
    status: "in-progress",
    detail: "Build a relationship I'm all-in on, and keep choosing it.",
    why: "More than anything else on this list.",
    createdDate: "2026-06-13",
    tags: ["relationships"],
  },

  // ── Career & Skills ──────────────────────────────────────────────────────
  {
    id: "ai-ml-mastery",
    title: "Be genuinely great at building with AI",
    category: "career",
    status: "in-progress",
    detail:
      "Not just using AI, but designing the workflows, agents, and tools that make it sing in production.",
    createdDate: "2026-06-13",
    tags: ["ai-ml"],
  },
];

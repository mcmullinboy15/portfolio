<template>
  <div class="app bucket">
    <header class="bucket__topbar">
      <a href="/" class="bucket__back">← Portfolio</a>
      <span class="bucket__brand">AM<span class="bucket__brand-dot">.</span></span>
    </header>

    <section class="section bucket__hero">
      <span class="eyebrow" v-reveal="60">{{ intro.eyebrow }}</span>
      <h1 class="bucket__title" v-reveal="120">
        <span v-for="(line, idx) in intro.title" :key="idx">{{ line }}</span>
      </h1>
      <p class="bucket__blurb" v-reveal="200">{{ intro.blurb }}</p>

      <div class="bucket__stats" v-reveal="260">
        <div class="bucket__stat">
          <span class="bucket__stat-value">{{ stats.done }}</span>
          <span class="bucket__stat-label">Done</span>
        </div>
        <div class="bucket__stat">
          <span class="bucket__stat-value">{{ stats.inProgress }}</span>
          <span class="bucket__stat-label">In progress</span>
        </div>
        <div class="bucket__stat">
          <span class="bucket__stat-value">{{ stats.total }}</span>
          <span class="bucket__stat-label">Total goals</span>
        </div>
        <div class="bucket__stat">
          <span class="bucket__stat-value">{{ stats.percent }}%</span>
          <span class="bucket__stat-label">Lived</span>
        </div>
      </div>
      <div class="bucket__progress" v-reveal="300">
        <div class="bucket__progress-fill" :style="{ width: stats.percent + '%' }"></div>
      </div>
    </section>

    <section class="section bucket__list">
      <div class="bucket__filters" v-reveal="80">
        <button
          class="bucket__chip"
          :class="{ 'is-active': activeCategory === 'all' }"
          @click="activeCategory = 'all'"
        >
          All
        </button>
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="bucket__chip"
          :class="{ 'is-active': activeCategory === cat.id }"
          @click="activeCategory = cat.id"
        >
          <span class="bucket__chip-icon">{{ cat.icon }}</span>{{ cat.label }}
        </button>
      </div>

      <div
        v-for="group in groupedItems"
        :key="group.id"
        class="bucket__group"
      >
        <div class="bucket__group-head" v-reveal="80">
          <h2 class="bucket__group-title">
            <span class="bucket__group-icon">{{ group.icon }}</span>{{ group.label }}
          </h2>
          <p class="bucket__group-blurb">{{ group.blurb }}</p>
        </div>

        <div class="bucket__cards">
          <article
            v-for="(item, idx) in group.items"
            :key="item.id"
            class="bucket__card"
            :class="`is-${item.status}`"
            v-reveal="120 + idx * 60"
          >
            <div class="bucket__card-head">
              <span class="bucket__status" :class="`is-${item.status}`">
                {{ statusLabel(item.status) }}
              </span>
              <span v-if="item.target" class="bucket__target">{{ item.target }}</span>
            </div>
            <h3 class="bucket__card-title">{{ item.title }}</h3>
            <p v-if="item.detail" class="bucket__card-detail">{{ item.detail }}</p>
            <p v-if="item.why" class="bucket__card-why">“{{ item.why }}”</p>
            <div class="bucket__card-foot">
              <span v-if="item.location" class="bucket__loc">⌖ {{ item.location }}</span>
              <span v-if="item.completedDate" class="bucket__done-date">
                ✓ {{ item.completedDate }}
              </span>
            </div>
          </article>
        </div>
      </div>

      <p v-if="!groupedItems.length" class="bucket__empty">
        Nothing here yet. Start a chat and brainstorm — the goals worth keeping
        will land on this page.
      </p>
    </section>

    <footer class="bucket__footer">
      <p>A living document, kept in sync with Claude.</p>
    </footer>
  </div>
</template>

<script>
import {
  bucketListIntro,
  bucketCategories,
  bucketItems,
} from "../data/bucketList";

const STATUS_LABELS = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
};

export default {
  name: "BucketListPage",
  data() {
    return {
      intro: bucketListIntro,
      categories: bucketCategories,
      activeCategory: "all",
    };
  },
  computed: {
    visibleItems() {
      return bucketItems.filter((item) => !item.private);
    },
    stats() {
      const total = this.visibleItems.length;
      const done = this.visibleItems.filter((i) => i.status === "done").length;
      const inProgress = this.visibleItems.filter(
        (i) => i.status === "in-progress"
      ).length;
      const percent = total ? Math.round((done / total) * 100) : 0;
      return { total, done, inProgress, percent };
    },
    groupedItems() {
      return this.categories
        .filter(
          (cat) =>
            this.activeCategory === "all" || this.activeCategory === cat.id
        )
        .map((cat) => ({
          ...cat,
          items: this.sortItems(
            this.visibleItems.filter((item) => item.category === cat.id)
          ),
        }))
        .filter((group) => group.items.length);
    },
  },
  methods: {
    statusLabel(status) {
      return STATUS_LABELS[status] || status;
    },
    sortItems(items) {
      const order = { "in-progress": 0, todo: 1, done: 2 };
      const rank = (status) =>
        order[status] === undefined ? 1 : order[status];
      return [...items].sort((a, b) => rank(a.status) - rank(b.status));
    },
  },
};
</script>

<style scoped>
.bucket {
  min-height: 100vh;
  padding-bottom: 40px;
}

.bucket__topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.bucket__back {
  color: var(--muted);
  font-family: var(--font-display);
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  transition: color 0.3s ease;
}

.bucket__back:hover {
  color: var(--accent);
}

.bucket__brand {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: 0.06em;
}

.bucket__brand-dot {
  color: var(--accent);
}

.bucket__hero {
  padding: 90px 24px 60px;
  max-width: 920px;
  margin: 0 auto;
  text-align: center;
}

.bucket__hero .eyebrow {
  margin-bottom: 20px;
}

.bucket__title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 4rem);
  line-height: 1.08;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.bucket__title span:nth-child(2) {
  background: linear-gradient(135deg, #c6a86a, #e0c189);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.bucket__blurb {
  color: var(--muted);
  max-width: 640px;
  margin: 28px auto 0;
  font-size: 1.05rem;
}

.bucket__stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 48px;
  margin-top: 56px;
}

.bucket__stat {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bucket__stat-value {
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--accent);
}

.bucket__stat-label {
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
}

.bucket__progress {
  height: 4px;
  border-radius: 999px;
  background: var(--charcoal-light);
  margin: 40px auto 0;
  max-width: 480px;
  overflow: hidden;
}

.bucket__progress-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #c6a86a, #e0c189);
  transition: width 0.8s ease;
}

.bucket__list {
  padding: 20px 24px 80px;
  max-width: 1080px;
  margin: 0 auto;
}

.bucket__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 72px;
}

.bucket__chip {
  font-family: var(--font-display);
  font-size: 0.82rem;
  color: var(--muted);
  background: var(--charcoal);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 9px 18px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.bucket__chip:hover {
  color: var(--foreground);
  border-color: var(--accent-tertiary);
}

.bucket__chip.is-active {
  color: var(--background);
  background: var(--accent);
  border-color: var(--accent);
}

.bucket__chip-icon {
  margin-right: 7px;
}

.bucket__group {
  margin-bottom: 72px;
}

.bucket__group-head {
  margin-bottom: 28px;
}

.bucket__group-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
}

.bucket__group-icon {
  color: var(--accent);
}

.bucket__group-blurb {
  color: var(--muted);
  font-size: 0.92rem;
  margin-top: 6px;
}

.bucket__cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.bucket__card {
  background: var(--charcoal);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.bucket__card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-tertiary);
}

.bucket__card.is-done {
  opacity: 0.72;
}

.bucket__card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.bucket__status {
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-family: var(--font-display);
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--muted);
}

.bucket__status.is-in-progress {
  color: var(--accent);
  border-color: var(--accent-tertiary);
}

.bucket__status.is-done {
  color: #7bd88f;
  border-color: rgba(123, 216, 143, 0.4);
}

.bucket__target {
  font-size: 0.78rem;
  color: var(--muted);
}

.bucket__card-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.25;
}

.bucket__card-detail {
  color: var(--muted);
  font-size: 0.92rem;
  margin-top: 10px;
}

.bucket__card-why {
  color: var(--accent-tertiary);
  font-size: 0.88rem;
  font-style: italic;
  margin-top: 12px;
}

.bucket__card-foot {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 16px;
  font-size: 0.78rem;
  color: var(--muted);
}

.bucket__done-date {
  color: #7bd88f;
}

.bucket__empty {
  text-align: center;
  color: var(--muted);
  max-width: 460px;
  margin: 40px auto;
}

.bucket__footer {
  text-align: center;
  color: var(--muted);
  font-size: 0.8rem;
  padding: 40px 24px 0;
  border-top: 1px solid var(--border);
  max-width: 1080px;
  margin: 0 auto;
}

@media (max-width: 600px) {
  .bucket__stats {
    gap: 28px;
  }
  .bucket__stat-value {
    font-size: 1.9rem;
  }
}
</style>

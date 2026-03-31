<template>
  <nav :class="['nav', scrolled ? 'nav--scrolled' : '']">
    <a href="#" class="nav__brand">
      {{ brand }}<span class="nav__brand-dot">.</span>
    </a>
    <div class="nav__links">
      <a v-for="item in items" :key="item" :href="`#${item.toLowerCase()}`" class="nav__link">
        {{ item }}
      </a>
    </div>
    <div class="nav__menu" aria-hidden="true">
      <span></span>
      <span></span>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  props: {
    brand: {
      type: String,
      default: "AM",
    },
  },
  data() {
    return {
      scrolled: false,
      items: ["Projects", "Experience", "Skills", "Contact"],
    };
  },
  mounted() {
    this.onScroll();
    window.addEventListener("scroll", this.onScroll, { passive: true });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      this.scrolled = window.scrollY > 50;
    },
  },
};
</script>

<template>
  <section class="hero">
    <FloatingParticles />
    <div class="hero__glow"></div>

    <div class="hero__content">
      <div class="hero__subtitle hero__fade hero__fade--1">
        {{ profile.subtitle }}
      </div>

      <div class="hero__title" aria-label="Name">
        <div class="hero__line">
          <span
            v-for="(char, idx) in firstChars"
            :key="`first-${idx}`"
            class="hero__char"
            :style="{ animationDelay: `${0.6 + idx * 0.04}s` }"
          >
            {{ char }}
          </span>
        </div>
        <div class="hero__line">
          <span
            v-for="(char, idx) in lastChars"
            :key="`last-${idx}`"
            class="hero__char hero__char--accent"
            :style="{ animationDelay: `${0.6 + (idx + firstChars.length) * 0.04}s` }"
          >
            {{ char }}
          </span>
        </div>
      </div>

      <p class="hero__intro hero__fade hero__fade--2">
        {{ profile.intro }}
      </p>

      <div class="hero__cta hero__fade hero__fade--3">
        <a class="hero__cta-link" href="#projects">
          <MagneticButton>
            <span class="hero__cta-text">View Projects</span>
          </MagneticButton>
        </a>
        <a class="hero__cta-link" href="#experience">
          <MagneticButton>
            <span class="hero__cta-text">View Experience</span>
          </MagneticButton>
        </a>
      </div>
    </div>

    <div class="section__divider hero__divider" aria-hidden="true"></div>
  </section>
</template>

<script>
import FloatingParticles from "./FloatingParticles.vue";
import MagneticButton from "./MagneticButton.vue";

export default {
  name: "HeroSection",
  components: { FloatingParticles, MagneticButton },
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  computed: {
    firstChars() {
      return this.profile.nameFirst.split("");
    },
    lastChars() {
      return this.profile.nameLast.split("");
    },
  },
};
</script>

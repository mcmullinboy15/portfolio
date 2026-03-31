<template>
  <section class="section section--contact">
    <div class="contact__glow"></div>
    <div class="contact">
        <span class="eyebrow" v-reveal="100">Get In Touch</span>
        <h2 class="contact__title" v-reveal="200">
        Let's create
        <span class="text-gradient-gold">something extraordinary</span>
      </h2>
        <p class="contact__copy" v-reveal="300">
        Have an idea that needs to come alive? I'd love to hear about it.
      </p>
        <div class="contact__cta" v-reveal="400">
        <MagneticButton>
          <a class="contact__email" :href="`mailto:${profile.email}`" target="_blank" rel="noreferrer">
            {{ profile.email }}
          </a>
        </MagneticButton>
      </div>

        <div class="contact__links" v-reveal="500">
        <a
          v-for="link in socialLinks"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noreferrer"
        >
          {{ link.label }}
        </a>
      </div>

      <div class="contact__footer" v-reveal="600">
        <p>© 2024 Andrew McMullin. Crafted with obsessive attention to detail.</p>
      </div>
    </div>
  </section>
</template>

<script>
import MagneticButton from "./MagneticButton.vue";

export default {
  name: "ContactSection",
  components: { MagneticButton },
  props: {
    profile: {
      type: Object,
      required: true,
    },
    socialLinks: {
      type: Array,
      required: true,
    },
  },
};
</script>

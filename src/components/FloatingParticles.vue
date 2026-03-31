<template>
  <div class="particles" aria-hidden="true">
    <span
      v-for="particle in particles"
      :key="particle.id"
      class="particle"
      :style="{
        left: particle.x + '%',
        top: particle.y + '%',
        width: particle.size + 'px',
        height: particle.size + 'px',
        opacity: particle.opacity,
        animationDuration: particle.duration + 's',
        animationDelay: particle.delay + 's',
      }"
    ></span>
  </div>
</template>

<script>
export default {
  name: "FloatingParticles",
  data() {
    return {
      particles: Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.3 + 0.05,
      })),
    };
  },
};
</script>

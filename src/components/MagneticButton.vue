<template>
  <div
    ref="root"
    class="magnetic"
    :style="{ transform: `translate3d(${x}px, ${y}px, 0)` }"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <div class="magnetic__inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MagneticButton",
  data() {
    return {
      x: 0,
      y: 0,
    };
  },
  methods: {
    onMove(event) {
      const rect = this.$refs.root.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      this.x = (event.clientX - centerX) * 0.2;
      this.y = (event.clientY - centerY) * 0.2;
    },
    onLeave() {
      this.x = 0;
      this.y = 0;
    },
  },
};
</script>

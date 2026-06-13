<template>
  <div class="resume-page">
    <iframe
      class="resume-page__frame"
      src="/assets/Resume.pdf#toolbar=0&view=Fit"
      type="application/pdf"
      title="Andrew McMullin — Resume"
      frameborder="0"
    />
  </div>
</template>

<script>
// Renders Andrew's resume PDF full-screen at /resume.
// Props mirror the data App.vue passes in so a future data-driven web resume
// can use them; for now the canonical resume is the PDF in /public/assets.
export default {
  name: "ResumePage",
  props: {
    profile: { type: Object, default: () => ({}) },
    experiences: { type: Array, default: () => [] },
    education: { type: Array, default: () => [] },
    courses: { type: Array, default: () => [] },
    projects: { type: Array, default: () => [] },
    skills: { type: Array, default: () => [] },
    tagDefinitions: { type: Object, default: () => ({}) },
  },
};
</script>

<style scoped>
.resume-page {
  position: fixed;
  inset: 0;
  background: var(--background);
}

.resume-page__frame {
  width: 100%;
  height: 100%;
  border: 0;
}
</style>

<template>
  <section class="section">
    <div class="section__header" v-reveal="100">
      <span class="eyebrow">Selected Work</span>
      <h2 class="section__title">
        Projects that push
        <span class="text-gradient-gold">boundaries</span>
      </h2>
    </div>

    <div class="projects">
      <article
        v-for="(project, idx) in visibleFeaturedProjects"
        :key="project.id"
        class="project reveal"
        :class="{ 'is-expanded': isProjectOpen(project.id) }"
        @click="toggleProject(project.id)"
        v-reveal="200 + idx * 80"
      >
        <div
          class="project__media"
          :class="idx < 3 ? 'project__media--large' : 'project__media--small'"
        >
          <div class="project__overlay"></div>
          <div class="project__badge">{{ project.category }}</div>
        </div>
        <div class="project__meta">
          <h3 class="project__title">{{ project.title }}</h3>
          <span class="project__year">{{ project.year }}</span>
        </div>
        <p
          class="project__desc"
          :class="{ 'is-expanded': isProjectOpen(project.id) }"
        >
          {{ project.description }}
        </p>
        <div class="project__footer">
          <div v-if="project.github || project.link" class="project__links">
            <a v-if="project.github" :href="project.github" target="_blank" rel="noreferrer" @click.stop>GitHub</a>
            <a v-if="project.link" :href="project.link" target="_blank" rel="noreferrer" @click.stop>Live</a>
          </div>
          <ul v-if="project.links && project.links.length" class="item-links">
            <li v-for="linkItem in project.links" :key="linkItem.label">
            <a :href="linkItem.href" target="_blank" rel="noreferrer" @click.stop>{{ linkItem.label }}</a>
            </li>
          </ul>
          <div class="project__pill-row">
            <a
              v-for="expId in project.relatedExperience"
              :key="`${project.id}-${expId}`"
              class="project__pill"
              :href="`#exp-${expId}`"
              v-if="experienceMap[expId]"
              @click.stop
            >
              <template v-for="(token, idx) in pillTokens(experienceMap[expId])">
                <span :key="`${project.id}-${expId}-title-${idx}`" class="project__pill-token">{{ token }}</span>
              </template>
              <template v-if="experienceCompanyMap[expId]">
                <span class="project__pill-token">-</span>
                <template v-for="(token, idx) in pillTokens(experienceCompanyMap[expId])">
                  <span :key="`${project.id}-${expId}-company-${idx}`" class="project__pill-token">{{ token }}</span>
                </template>
              </template>
            </a>
            <a
              v-for="courseId in project.relatedCourses"
              :key="`${project.id}-${courseId}`"
              class="project__pill"
              :href="`#course-${courseId}`"
              v-if="courseMap[courseId]"
              @click.stop
            >
              <template v-for="(token, idx) in pillTokens(courseMap[courseId])">
                <span :key="`${project.id}-${courseId}-${idx}`" class="project__pill-token">{{ token }}</span>
              </template>
            </a>
          </div>
        </div>
      </article>
    </div>

  </section>
</template>

<script>
export default {
  name: "ProjectsSection",
  props: {
    projects: {
      type: Array,
      required: true,
    },
    experiences: {
      type: Array,
      required: true,
    },
    courses: {
      type: Array,
      required: true,
    },
  },
  computed: {
    featuredProjects() {
      return this.projects.filter((project) => project.featured !== false);
    },
    visibleFeaturedProjects() {
      if (this.isMobile) {
        return this.featuredProjects.slice(0, 5);
      }
      return this.featuredProjects;
    },
    experienceMap() {
      return this.experiences.reduce((acc, exp) => {
        acc[exp.id] = exp.title;
        return acc;
      }, {});
    },
    experienceCompanyMap() {
      return this.experiences.reduce((acc, exp) => {
        acc[exp.id] = exp.company || exp.subtitle || "";
        return acc;
      }, {});
    },
    courseMap() {
      return this.courses.reduce((acc, course) => {
        acc[course.id] = course.title;
        return acc;
      }, {});
    },
  },
  data() {
    return {
      openProjects: {},
      isMobile: false,
    };
  },
  mounted() {
    this.updateViewport();
    window.addEventListener("resize", this.updateViewport, { passive: true });
    const third = this.visibleFeaturedProjects[2];
    if (third) {
      this.$set(this.openProjects, third.id, true);
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateViewport);
  },
  methods: {
    pillTokens(label) {
      return String(label || "").split(/\s+/).filter(Boolean);
    },
    updateViewport() {
      this.isMobile = window.innerWidth <= 768;
    },
    toggleProject(id) {
      const isOpen = !!this.openProjects[id];
      if (isOpen) return;
      this.openProjects = {};
      this.$set(this.openProjects, id, true);
    },
    isProjectOpen(id) {
      return !!this.openProjects[id];
    },
  },
};
</script>

<template>
  <section class="section section--alt">
    <div class="section__divider" v-reveal="50"></div>

    <div class="about">
      <div class="about__intro" v-reveal="50">
        <span class="eyebrow">About Me</span>
        <p class="about__text">
          I believe the best software balances quality and quantity. I design,
          prototype, and ship systems quickly without sacrificing
          maintainability, scale, or long-term outcomes.
        </p>
      </div>

      <div class="stats" v-reveal="50">
        <div v-for="stat in stats" :key="stat.label" class="stat">
          <div class="stat__value text-gradient-gold">{{ stat.value }}</div>
          <div class="stat__label">{{ stat.label }}</div>
        </div>
      </div>

      <div class="about__grid">
        <div class="about__col" v-reveal="50">
          <h3 class="about__heading">Experience</h3>
          <div class="timeline">
            <div
              v-for="role in experiences"
              :key="role.id"
              class="timeline__item"
              :class="{ 'is-muted': role.featured === false, 'is-clickable': role.featured === false }"
              :id="`exp-${role.id}`"
              @click="role.featured === false && toggleExperienceDetails(role)"
            >
              <div class="timeline__title-row">
                <div class="timeline__title">
                  {{ role.title }}
                </div>
                <span
                  v-if="role.featured === false"
                  class="timeline__chevron"
                  :class="{ 'is-open': isExperienceDetailsOpen(role) }"
                  aria-hidden="true"
                ></span>
              </div>
              <div class="timeline__subtitle">
                {{ role.company || role.subtitle }}
                <template v-if="formatDateRange(role.startDate, role.endDate)">
                  | {{ formatDateRange(role.startDate, role.endDate) }}
                </template>
                <span v-if="role.companyType === 'startup'" class="timeline__tag">(Startup)</span>
                <span v-if="role.employmentType === 'intern'" class="timeline__tag">(Intern)</span>
              </div>
              <button
                v-if="projectsByExperience[role.id] && projectsByExperience[role.id].length > 1"
                type="button"
                class="timeline__meta project-toggle"
                :class="{ 'is-muted': role.featured === false }"
                @click.stop="toggleExperience(role.id)"
              >
                {{ projectsByExperience[role.id].length }} projects
                <span class="project-toggle__chevron" :class="{ 'is-open': isExperienceOpen(role.id) }">▾</span>
              </button>
              <ul
                v-if="isExperienceOpen(role.id) && projectsByExperience[role.id] && projectsByExperience[role.id].length > 1"
                class="project-list"
                :class="{ 'is-open': isExperienceOpen(role.id) }"
              >
                <li
                  v-for="project in projectsByExperience[role.id]"
                  :key="project.id"
                  class="project-list__item"
                >
                  <a
                    v-if="projectPrimaryLink(project)"
                    :href="projectPrimaryLink(project)"
                    target="_blank"
                    rel="noreferrer"
                    class="project-list__link"
                  >
                    {{ project.title }}
                  </a>
                  <span v-else>{{ project.title }}</span>
                </li>
              </ul>
              <div
                v-if="role.featured !== false || isExperienceDetailsOpen(role)"
                class="details"
              >
                <ul class="timeline__list">
                  <li v-for="(line, idx) in role.description" :key="idx">{{ line }}</li>
                </ul>
              </div>
              <ul v-if="role.links && role.links.length" class="item-links">
                <li v-for="link in role.links" :key="link.label">
                  <a :href="link.href" target="_blank" rel="noreferrer">{{ link.label }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="about__col" v-reveal="50">
          <h3 class="about__heading">Education</h3>
          <div class="timeline timeline--compact">
            <div v-for="item in education" :key="item.id" class="timeline__item" :id="`edu-${item.id}`">
              <div class="timeline__title">{{ item.title }}</div>
              <div class="timeline__subtitle">{{ item.subtitle }}</div>
              <button
                v-if="projectsByEducation[item.id] && projectsByEducation[item.id].length"
                type="button"
                class="timeline__meta project-toggle"
                @click.stop="toggleEducation(item.id)"
              >
                {{ projectsByEducation[item.id].length }} projects
                <span class="project-toggle__chevron" :class="{ 'is-open': isEducationOpen(item.id) }">▾</span>
              </button>
              <ul
                v-if="isEducationOpen(item.id) && projectsByEducation[item.id] && projectsByEducation[item.id].length"
                class="project-list"
                :class="{ 'is-open': isEducationOpen(item.id) }"
              >
                <li
                  v-for="project in projectsByEducation[item.id]"
                  :key="project.id"
                  class="project-list__item"
                >
                  <a
                    v-if="projectPrimaryLink(project)"
                    :href="projectPrimaryLink(project)"
                    target="_blank"
                    rel="noreferrer"
                    class="project-list__link"
                  >
                    {{ project.title }}
                  </a>
                  <span v-else>{{ project.title }}</span>
                </li>
              </ul>
              <div class="details">
                <ul class="timeline__list">
                  <li v-for="(line, idx) in item.description" :key="idx">{{ line }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="coursework" v-reveal="50">
        <h3 class="about__heading">Coursework</h3>
        <div class="coursework__grid">
          <div v-for="school in education" :key="`${school.id}-courses`" class="coursework__col">
            <div class="coursework__title-row">
              <div class="coursework__title">{{ school.title }}</div>
              <button
                v-if="isCourseCollapsed(school.id)"
                type="button"
                class="coursework__toggle"
                @click="toggleCourses(school.id)"
              >
                view more
              </button>
              <button
                v-else-if="hasMoreCourses(school.id)"
                type="button"
                class="coursework__toggle"
                @click="toggleCourses(school.id)"
              >
                show fewer
              </button>
            </div>
            <ul class="coursework__list">
              <li
                v-for="(course, idx) in visibleCoursesBySchool[school.id]"
                :key="course.id"
                :id="`course-${course.id}`"
              >
                <div class="coursework__row">
                  <div class="coursework__name">
                    <span>{{ course.title }}</span>
                    <a
                      v-if="course.doc"
                      :href="course.doc"
                      target="_blank"
                      rel="noreferrer"
                      class="coursework__doc"
                      aria-label="Open PDF"
                      title="Open PDF"
                    >
                      <font-awesome-icon
                        class="coursework__doc-icon"
                        :icon="['fas', 'file-lines']"
                      />
                    </a>
                  </div>
                  <div v-if="course.tags && course.tags.length" class="coursework__tags">
                    <span
                      v-for="(tag, idx) in course.tags"
                      :key="tag"
                      class="coursework__tag"
                    >
                      {{ tagLabel(tag) }}<span v-if="idx < course.tags.length - 1"> | </span>
                    </span>
                  </div>
                  <ul v-if="course.links && course.links.length" class="item-links item-links--compact">
                    <li v-for="link in course.links" :key="link.label">
                      <a :href="link.href" target="_blank" rel="noreferrer">{{ link.label }}</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="section__divider section__divider--bottom" v-reveal="50"></div>
  </section>
</template>

<script>
const COURSE_VISIBLE_COUNT = 6;

export default {
  name: "AboutSection",
  props: {
    profile: {
      type: Object,
      required: true,
    },
    stats: {
      type: Array,
      required: true,
    },
    experiences: {
      type: Array,
      required: true,
    },
    education: {
      type: Array,
      required: true,
    },
    courses: {
      type: Array,
      required: true,
    },
    tagDefinitions: {
      type: Object,
      required: true,
    },
    projects: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      openExperience: {},
      openEducation: {},
      openExperienceDetails: {},
      openCourses: {},
    };
  },
  computed: {
    visibleCoursesBySchool() {
      const result = {};
      Object.keys(this.coursesBySchool).forEach((schoolId) => {
        const list = this.coursesBySchool[schoolId] || [];
        if (this.openCourses[schoolId]) {
          result[schoolId] = list;
        } else {
          result[schoolId] = list.slice(0, COURSE_VISIBLE_COUNT);
        }
      });
      return result;
    },
    coursesBySchool() {
      const grouped = this.courses.reduce((acc, course) => {
        if (!acc[course.school]) acc[course.school] = [];
        acc[course.school].push(course);
        return acc;
      }, {});

      const priority = {
        "ai-ml": 1,
        "affective-computing": 1,
        "cog-sci": 1,
        "systems-engineering": 2,
        compilers: 2,
        parallel: 2,
        security: 2,
        algorithms: 2,
        "data-systems": 3,
        "cloud-devops": 3,
        "full-stack": 3,
        frontend: 3,
        backend: 3,
        "databases-sql": 3,
        "developer-tooling": 3,
        mobile: 3,
        iot: 3,
        leadership: 4,
        industry: 4,
        core: 4,
        math: 4,
        research: 4,
        energy: 4,
      };

      const scoreCourse = (course) => {
        const tags = course.tags || [];
        if (!tags.length) return 99;
        return Math.min(...tags.map((tag) => priority[tag] || 50));
      };

      const lowTierOrder = {
        math: 1,
        core: 2,
        industry: 3,
        research: 4,
        leadership: 5,
      };

      const lowTierScore = (course) => {
        const tags = course.tags || [];
        const scores = tags.map((tag) => lowTierOrder[tag]).filter(Boolean);
        return scores.length ? Math.min(...scores) : 99;
      };

      Object.keys(grouped).forEach((school) => {
        grouped[school] = grouped[school]
          .map((course, idx) => ({ course, idx }))
          .sort((a, b) => {
            const scoreA = scoreCourse(a.course);
            const scoreB = scoreCourse(b.course);
            if (scoreA !== scoreB) return scoreA - scoreB;
            if (scoreA === 4) {
              const lowA = lowTierScore(a.course);
              const lowB = lowTierScore(b.course);
              if (lowA !== lowB) return lowA - lowB;
            }
            return a.idx - b.idx;
          })
          .map((entry) => entry.course);
      });

      return grouped;
    },
    experienceProjectCount() {
      return this.experiences.reduce((acc, exp) => {
        acc[exp.id] = this.projects.filter((project) =>
          project.relatedExperience.includes(exp.id)
        ).length;
        return acc;
      }, {});
    },
    educationProjectCount() {
      return this.education.reduce((acc, school) => {
        const schoolCourseIds = new Set(
          (this.coursesBySchool[school.id] || []).map((course) => course.id)
        );
        const projectIds = new Set();
        this.projects.forEach((project) => {
          if (project.relatedCourses.some((id) => schoolCourseIds.has(id))) {
            projectIds.add(project.id);
          }
        });
        acc[school.id] = projectIds.size;
        return acc;
      }, {});
    },
    projectsByExperience() {
      const indexMap = this.projects.reduce((acc, project, idx) => {
        acc[project.id] = idx;
        return acc;
      }, {});
      return this.experiences.reduce((acc, exp) => {
        acc[exp.id] = this.projects
          .filter((project) => project.relatedExperience.includes(exp.id))
          .slice()
          .sort((a, b) => {
            const orderA = a.order != null ? a.order : 9999;
            const orderB = b.order != null ? b.order : 9999;
            if (orderA !== orderB) return orderA - orderB;
            const idxA = indexMap[a.id] != null ? indexMap[a.id] : 0;
            const idxB = indexMap[b.id] != null ? indexMap[b.id] : 0;
            return idxA - idxB;
          });
        return acc;
      }, {});
    },
    projectsByEducation() {
      return this.education.reduce((acc, school) => {
        const schoolCourseIds = new Set(
          (this.coursesBySchool[school.id] || []).map((course) => course.id)
        );
        acc[school.id] = this.projects.filter((project) =>
          project.relatedCourses.some((id) => schoolCourseIds.has(id))
        );
        return acc;
      }, {});
    },
  },
  methods: {
    formatDateRange(startDate, endDate) {
      if (!startDate) return "";
      const startYear = new Date(startDate).getFullYear();
      if (!endDate) {
        return `${startYear} - Present`;
      }
      const endYear = new Date(endDate).getFullYear();
      if (startYear === endYear) return `${startYear}`;
      return `${startYear} - ${endYear}`;
    },
    projectPrimaryLink(project) {
      return project.link || project.github || (project.links && project.links[0] && project.links[0].href) || "";
    },
    toggleExperience(id) {
      this.$set(this.openExperience, id, !this.openExperience[id]);
    },
    isExperienceDetailsOpen(role) {
      if (this.openExperienceDetails[role.id] !== undefined) {
        return !!this.openExperienceDetails[role.id];
      }
      return role.featured !== false;
    },
    toggleExperienceDetails(role) {
      if (role.featured !== false) return;
      const current = this.isExperienceDetailsOpen(role);
      this.$set(this.openExperienceDetails, role.id, !current);
    },
    toggleEducation(id) {
      this.$set(this.openEducation, id, !this.openEducation[id]);
    },
    toggleCourses(schoolId) {
      this.$set(this.openCourses, schoolId, !this.openCourses[schoolId]);
    },
    isCourseCollapsed(schoolId) {
      return !this.openCourses[schoolId] && (this.coursesBySchool[schoolId] || []).length > COURSE_VISIBLE_COUNT;
    },
    hasMoreCourses(schoolId) {
      return (this.coursesBySchool[schoolId] || []).length > COURSE_VISIBLE_COUNT;
    },
    hiddenCourseCount(schoolId) {
      const total = (this.coursesBySchool[schoolId] || []).length;
      return Math.max(0, total - COURSE_VISIBLE_COUNT);
    },
    isExperienceOpen(id) {
      return !!this.openExperience[id];
    },
    isEducationOpen(id) {
      return !!this.openEducation[id];
    },
    tagLabel(tagId) {
      return (this.tagDefinitions[tagId] && this.tagDefinitions[tagId].label) || tagId;
    },
  },
};
</script>

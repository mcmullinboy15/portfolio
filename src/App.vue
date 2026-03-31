<template>
  <div v-if="isResumePage" class="app app--resume">
    <ResumePage
      :profile="profile"
      :experiences="experiences"
      :education="education"
      :courses="courses"
      :projects="projects"
      :skills="computedSkills"
      :tag-definitions="tagDefinitions"
    />
  </div>
  <div v-else class="app">
    <Navigation :brand="brand" />
    <HeroSection :profile="profile" />
    <div id="projects">
      <ProjectsSection
        :projects="projects"
        :experiences="experiences"
        :courses="courses"
      />
    </div>
    <div id="experience">
      <AboutSection
        :profile="profile"
        :stats="computedStats"
        :experiences="experiences"
        :education="education"
        :courses="courses"
        :tag-definitions="tagDefinitions"
        :projects="projects"
      />
    </div>
    <div id="skills">
      <SkillsSection :skills="computedSkills" />
    </div>
    <div id="contact">
      <ContactSection :profile="profile" :social-links="socialLinks" />
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import HeroSection from "./components/HeroSection.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import AboutSection from "./components/AboutSection.vue";
import SkillsSection from "./components/SkillsSection.vue";
import ContactSection from "./components/ContactSection.vue";
import ResumePage from "./components/ResumePage.vue";
import {
  profile,
  stats,
  experiences,
  education,
  courses,
  tagDefinitions,
  skillDefinitions,
  projects,
  socialLinks,
} from "./data/content";

export default {
  name: "App",
  components: {
    Navigation,
    HeroSection,
    ProjectsSection,
    AboutSection,
    SkillsSection,
    ContactSection,
    ResumePage,
  },
  data() {
    return {
      brand: "AM",
      profile,
      stats,
      experiences,
      education,
      courses,
      tagDefinitions,
      skillDefinitions,
      projects,
      socialLinks,
    };
  },
  computed: {
    isResumePage() {
      return (
        window.location.pathname === "/resume" ||
        new URLSearchParams(window.location.search).get("view") === "resume"
      );
    },
    computedSkills() {
      return this.skillDefinitions.map((skill) => {
        const projectCount = this.projects.filter((project) =>
          (project.tags || []).includes(skill.id)
        ).length;
        const courseCount = this.courses.filter((course) =>
          (course.tags || []).includes(skill.id)
        ).length;
        const experienceCount = this.experiences.filter((experience) =>
          (experience.tags || []).includes(skill.id)
        ).length;

        const evidenceParts = [];
        if (projectCount)
          evidenceParts.push(
            `${projectCount} ${this.pluralize("project", projectCount)}`
          );
        if (courseCount)
          evidenceParts.push(
            `${courseCount} ${this.pluralize("course", courseCount)}`
          );
        if (experienceCount)
          evidenceParts.push(
            `${experienceCount} ${this.pluralize("role", experienceCount)}`
          );

        return {
          ...skill,
          evidence: evidenceParts.join(" / "),
          projectCount,
          courseCount,
          experienceCount,
        };
      });
    },
    computedStats() {
      const projectCount = this.projects.length;
      const degreeCount = this.education.length;
      const startupCount = new Set(
        this.experiences
          .filter((exp) => exp.companyType === "startup")
          .map((exp) => (exp.company || "").trim())
          .filter(Boolean)
      ).size;
      const earliest = this.experiences
        .map((exp) => exp.startDate)
        .filter(Boolean)
        .reduce((min, date) => (date < min ? date : min), new Date());
      const now = new Date();
      const years = Math.max(
        1,
        Math.floor((now - earliest) / (1000 * 60 * 60 * 24 * 365.25))
      );

      return this.stats.map((stat) => {
        switch (stat.label) {
          case "Projects Shipped":
            return {
              ...stat,
              value: `${projectCount}+`,
              label: projectCount === 1 ? "Project Shipped" : stat.label,
            };
          case "Degrees":
            return {
              ...stat,
              value: `${degreeCount}`,
              label: degreeCount === 1 ? "Degree" : stat.label,
            };
          case "Startups":
            return {
              ...stat,
              value: `${startupCount}`,
              label: startupCount === 1 ? "Startup" : stat.label,
            };
          case "Years Building":
            return {
              ...stat,
              value: `${years}+`,
              label: years === 1 ? "Year Building" : stat.label,
            };
          default:
            return stat;
        }
      });
    },
  },
  methods: {
    pluralize(word, count) {
      return count === 1 ? word : `${word}s`;
    },
  },
};
</script>

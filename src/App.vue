<template>
  <div class="app">
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
        if (projectCount) evidenceParts.push(`${projectCount} projects`);
        if (courseCount) evidenceParts.push(`${courseCount} courses`);
        if (experienceCount) evidenceParts.push(`${experienceCount} roles`);

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
      const startupCount = this.experiences.filter(
        (exp) => exp.companyType === "startup"
      ).length;
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
            return { ...stat, value: `${projectCount}+` };
          case "Degrees":
            return { ...stat, value: `${degreeCount}` };
          case "Startups":
            return { ...stat, value: `${startupCount}` };
          case "Years Building":
            return { ...stat, value: `${years}+` };
          default:
            return stat;
        }
      });
    },
  },
};
</script>

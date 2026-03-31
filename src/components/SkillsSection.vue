<template>
  <section class="section">
    <div class="section__header section__header--center" v-reveal="100">
      <span class="eyebrow">Expertise</span>
      <h2 class="section__title">
        Skills & <span class="text-gradient-gold">Mastery</span>
      </h2>
    </div>

    <div class="skills">
      <div v-for="(skill, idx) in skills" :key="skill.id || skill.name" class="skill" v-reveal="200 + idx * 80">
        <span class="skill__name">{{ skill.name }}</span>
        <span class="skill__evidence">
          <span
            v-for="(part, idx2) in evidenceParts(skill.evidence)"
            :key="`${skill.id || skill.name}-e-${idx2}`"
            class="skill__evidence-part"
          >
            {{ part }}
            <span
              v-if="idx2 < evidenceParts(skill.evidence).length - 1"
              class="skill__evidence-sep"
            >
              /
            </span>
          </span>
        </span>
        <div v-if="skill.tools && skill.tools.length" class="skill__tools">
          <span v-for="tool in skill.tools" :key="tool" class="skill__tool">
            {{ tool }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SkillsSection",
  props: {
    skills: {
      type: Array,
      required: true,
    },
  },
  methods: {
    evidenceParts(evidence) {
      if (!evidence) return [];
      return evidence.split("/").map((part) => part.trim()).filter(Boolean);
    },
  },
};
</script>

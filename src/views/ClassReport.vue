<template>
  <v-col cols="12" lg="12" md="12" sm="12">
    <v-card class="text-center">
      <v-card-title class="justify-center">
        {{ cls.title }}
      </v-card-title>

      <v-card-text>
        {{ cls.description }}
      </v-card-text>

      <v-card-actions v-if="cls.github" class="justify-center">
        <v-btn :href="cls.github" color="primary" target="_blank" text>
          Github
        </v-btn>
      </v-card-actions>
    </v-card>

    <iframe
      v-if="cls.report !== '/none'"
      :src="`${cls.report}#toolbar=0&view=Fit`"
      type="application/pdf"
      height="80%"
      width="100%"
      frameborder="0"
    />
  </v-col>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["classes"]),
    cls() {
      if (this.$route.params.school === undefined) return {};
      if (this.$route.params.class === undefined) return {};
      return this.classes[this.$route.params.school][this.$route.params.class];
    }
  }
};
</script>

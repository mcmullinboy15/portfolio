<template>
  <v-col cols="12" lg="12" md="12" sm="12">
    <v-card class="text-center">
      <!-- Find the EZsalt Experience -->
      <v-card-title class="justify-center">
        {{ item.title }}
      </v-card-title>

      <v-card-text v-if="Array.isArray(item.description)" class="pb-2">
        <template v-for="line in item.description">
          <div :key="line">{{ line }}</div>
        </template>
      </v-card-text>

      <v-card-text v-else class="pb-2">
        {{ item.description }}
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          color="primary"
          target="_blank"
          text
          href="https://www.ezsalt.xyz/"
          >Info Webpage</v-btn
        >
        <v-btn
          color="primary"
          target="_blank"
          text
          href="https://apps.apple.com/us/app/ezsalt-2-0/id1569693258"
          >IOS Download</v-btn
        >
        <v-btn
          color="primary"
          target="_blank"
          text
          href="https://play.google.com/store/apps/details?id=com.ezsalt.phoneapp"
          >Android Download</v-btn
        >
      </v-card-actions>
    </v-card>

    <embed
      src="/assets/EZsalt - Description.pdf#toolbar=0&view=Fit"
      type="application/pdf"
      height="100%"
      width="100%"
    />
  </v-col>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["experiences"]),
    item() {
      return this.experiences.filter(obj => obj.to === this.$route.name)[0];
    }
  }
};
</script>

<style></style>

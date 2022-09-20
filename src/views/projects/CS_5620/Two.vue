<template>
  <div style="margin-left: 24px">
    <div
      v-for="text in texts"
      :key="typeof text === 'string' ? text : text.header"
    >
      <p v-if="typeof text === 'string'">{{ text }}</p>
      <div v-else>
        <h3>{{ text.header }}</h3>
        <div style="margin-left: 24px">
          <div v-if="Array.isArray(text.text)">
            <p v-for="t in text.text" :key="t">
              {{ t }}
            </p>
          </div>
          <p v-else>{{ text.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    // "This should be specific so the scope of your project is clear. Try not to talk about the method here, just the problem."
    texts: [
      "Same data as Jarom Allen and Bradley Payne",
      {
        header: "Given:",
        text: [
          "Historical weather from the Utah Climate Center in Logan, UT, sampled every hour.",
          "Solar Generation data from the ASPIRE Center in Logan, UT, sampled every seven seconds."
        ]
      },
      {
        header: "Find:",
        text:
          "Predict the Solar Power that will be Generated in one hour, to then decide whether to save power to batteries or not"
      }
    ]
  })
};
</script>

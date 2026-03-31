<template>
  <div style="margin-left: 24px">
    <p v-for="text in texts" :key="text">
      {{ text }}
    </p>
  </div>
</template>

<script>
export default {
  data: () => ({
    texts: [
      '"Buildings contribute to roughly 39 percent of the carbon emissions produced in the United States."( https://www.energysage.com ).',
      "Solar energy allows you to reduce your own carbon emissions and slow the grid’s production of carbon emissions.",
      "The Goal of my project is to Predict Solar Generated Power"
    ]
  })
};
</script>

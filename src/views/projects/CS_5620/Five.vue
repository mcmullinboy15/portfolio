<template>
  <div style="margin-left: 24px">
    <p v-for="text in texts" :key="text">{{ text }}</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    texts: [
      "In conclusion, I think that the weather patterns can predict Solar Power, haha.  " +
        "Especially based on the fact that this is not a profeesionally made Neural Network and someone else could do much better.  " +
        "What I got out of this project is that Neural Networks make a very complicated problem easier to solve, but may not be the best solution.  " +
        "But I did learn through out this process that there things you can do to improve your Neural Network",
      "In order for this Project to improve, there are a few things that need to happen.  " +
        "The first would be to possibly use a Random Forest as Jarom Allen did, or to test other predicting options.  " +
        "Another one that is more specific to this project would be, to explore other options to find the energy percentage that will be saved to the batteries, aside from the onse spoken about above. ",
      "The only new skills I have learned from this class are how a Neural Network, and RL work."
    ]
  })
};
</script>

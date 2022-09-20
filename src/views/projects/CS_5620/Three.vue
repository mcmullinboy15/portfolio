<template>
  <div style="margin-left: 24px">
    <p v-for="text in texts" :key="text">{{ text }}</p>

    <v-row>
      <v-col>
        <v-img
          width="200px"
          src="@/assets/sections.png"
          alt="Predictions Sectioning"
        />
      </v-col>

      <v-col>
        <p>
          The outputs are organized as seen in the Figure below. The design is
          to return a number that correlates to a percentage of Solar energy
          that will be used in the House.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <p v-for="text in texts2" :key="text">{{ text }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    texts: [
      "In this project we are assuming that we are working with a system that will automatically send excess energy to the batteries and then if full, back to the Grid.  " +
        "Therefore, this project is created only to try and use weather data to predict how much of the Solar Power to save to batteries.",

      "The Data for this project is built from the two sets of data mentioned earlier. Each have timestamps which are used to sync the data. " +
        "The Weather data contains many average/min/max values of different weather indicators for each hour. " +
        "The Solar Power data contains of a single column of Power collected every 7-8 seconds."
    ],
    texts2: [
      "I combined the using the timestamps of each dataset from the weather_data.csv and the solar_data.csv. I then removed all rows in that didn't match in each dataset. Because the weather data was every hour I had to remove all extra data from the Solar data. "
    ]
  })
};
</script>

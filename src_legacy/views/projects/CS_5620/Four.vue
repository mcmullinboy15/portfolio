<template>
  <div style="margin-left: 24px">
    <div
      v-for="section in sections"
      :key="typeof section === 'string' ? section : section.id"
    >
      <div v-if="typeof section === 'string'">
        {{ section }}
      </div>
      <div v-else>
        <h4 v-text="section.id"></h4>
        <p style="margin-left: 24px" v-text="section.description"></p>
        <div
          v-for="study in section.studies"
          :key="study.description"
          style="margin-left: 48px"
        >
          <p style="margin-left: 24px" v-text="study.description"></p>

          <h4 class="pl-16 my-10">
            Solar Energy Generated from the Dataset - Sorted
          </h4>
          <div
            v-for="topic in study.topics"
            :key="study.description + topic.id"
            style="margin-left: 48px"
          >
            <v-row>
              <v-col cols="2">
                <h5 v-text="topic.id.toUpperCase()"></h5>
              </v-col>
              <v-col>
                <p v-text="topic.text"></p>
              </v-col>
            </v-row>
            <v-row> </v-row>
            <v-row>
              <v-col>
                <v-img
                  width="384px"
                  v-if="topic.id === 'norm'"
                  src="@/assets/solar_power_norm.png"
                />
                <v-img
                  width="384px"
                  v-if="topic.id === 'cautious'"
                  src="@/assets/solar_power_cautious.png"
                />
                <v-img
                  width="384px"
                  v-if="topic.id === 'tight'"
                  src="@/assets/solar_power_tight.png"
                />
                <v-img
                  width="200px"
                  v-if="topic.id === 'sections'"
                  src="@/assets/sections.png"
                />
                <v-img
                  width="384px"
                  v-if="topic.id === 'solar'"
                  src="@/assets/bad_loss.png"
                />
                <v-img
                  width="384px"
                  v-if="topic.id === 'percentage'"
                  src="@/assets/bad_loss_percentage.png"
                />
              </v-col>
              <v-col>
                <v-img
                  width="340px"
                  v-if="topic.id === 'sections'"
                  src="@/assets/good_loss_module2.png"
                />
              </v-col>
              <v-col>
                <v-img
                  width="340px"
                  v-if="topic.id === 'sections'"
                  src="@/assets/good_loss_module2_later.png"
                />
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    sections: [
      // "What evaluation studies did you perform to see if your system solves the problem you posed?",
      {
        id: "Evaluation Studies to Solve the Problem",
        description:
          "My attempt to solve this problem consisted of two forms of data manipulation, aside from standard removal of bad data and cleaning up the data.  ",
        studies: [
          {
            id: "first",
            description:
              "The first is trimming the data by using a sorting technic that I like a lot, as you can see from the graph, I sorted the Solar_power column and then I was able to pinpoint a spot to trim my data. These three options are what I decided to use. It ended up that the cautious approach one almost everytime in Train/Testing the Neural Network.",
            topics: [
              {
                id: "norm",
                text: "Trim: (low: None), (high: None)"
              },
              {
                id: "cautious",
                text: "Trim: (low: 0), (high: None)"
              },
              {
                id: "tight",
                text: "Trim: (low: 2000), (high: 65000)"
              }
            ]
          },
          {
            description:
              "The second is how I based the prediction. These are the different methods I tried to find the best loss. With all methods I offset the correct value one hour to allow the Neural Net to make a one hour Prediction.",
            topics: [
              {
                id: "solar",
                text:
                  "With the 'solar' method, I left everything the same with the correct Column as the one hour Shifted Solar_power Column.  " +
                  "As we can see the loss was very slow and never go below 20000"
              },
              {
                id: "percentage",
                text:
                  "With the 'percentage' method, I used sklean's MaxMinScalar and scaled the Solar_power column and used those scaled values as the correct values. This would be a good implementaion, because the Neural Net could just put that number into the system to decide what percent solar-power is used.  " +
                  "Here we see that with the data scaled the predictions/loss was almost just as bad as the 'solar' method."
              },
              {
                id: "sections",
                text:
                  "The 'sections' method uses a method called bin-ing, was the best method becasue it make the predictions more accurate because there are lesss options. This method is the one described above where I used 5 options and the Neural Net would return a value [1-5] which corresponded with the percent of solar-power to use.  " +
                  "As you can tell with the loss, the loss starts much lower and gets down to as low as 0.16"
              }
            ]
          }
        ]
      }
      // weather and solar data explained and explain how i combined
      // Make it more clear
      // "Animations are very helpful in allowing you to say a lot in a short amount of time. ",
    ]
  })
};
</script>

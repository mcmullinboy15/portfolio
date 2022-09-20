<template>
  <v-col cols="12" lg="8" md="10" sm="12">
    <v-card class="my-5" elevation="10">
      <v-card-title>
        {{ classes["usu"]["5620"].title }}

        <v-spacer></v-spacer>

        <v-btn
          color="primary"
          href="https://github.com/mcmullinboy15/6620_Solar_Energy_Project"
          target="_blank"
        >
          Github Repository
        </v-btn>
      </v-card-title>
    </v-card>

    <v-card class="my-5" elevation="10">
      <v-card-title>Introduction</v-card-title>
      <v-img src="img/init_slide.png" />
    </v-card>

    <v-card class="my-5" elevation="5" v-for="item in list" :key="item.title">
      <v-card-title @click="item.show_list = !item.show_list">
        {{ item.title }}

        <v-spacer></v-spacer>

        <v-icon color="primary" class="px-3">
          mdi-arrow-{{ !item.show_list ? "down" : "up" }}
        </v-icon>
      </v-card-title>

      <v-list v-if="item.show_list">
        <div v-for="sub_item in item.items" :key="sub_item.title">
          <v-divider></v-divider>

          <v-card elevation="0">
            <v-card-title v-text="sub_item.title"></v-card-title>
            <v-card-text
              v-if="sub_item.description"
              v-text="sub_item.description"
            ></v-card-text>

            <v-card-text v-if="sub_item.component">
              <one v-if="sub_item.component === 'One'" />
              <two v-if="sub_item.component === 'Two'" />
              <three v-if="sub_item.component === 'Three'" />
              <four v-if="sub_item.component === 'Four'" />
              <five v-if="sub_item.component === 'Five'" />
            </v-card-text>

            <v-card-actions v-if="sub_item.resources">
              <v-subheader>Resources:</v-subheader>
              <div v-for="resource in sub_item.resources" :key="resource">
                <a :href="resource">{{ resource }}</a>
              </div>
            </v-card-actions>
          </v-card>
        </div>

        <iframe
          v-if="item.title == 'Elevator Speech (PowerPoint)'"
          src="https://docs.google.com/presentation/d/e/2PACX-1vT7jna6RoILoqzjfsONGcfag6IxVNsuGanRtuMvIfNxL-x8-0j6LDG-oMIvMx2ZukFRO-NarxsaqLrR/embed?start=false&loop=false&delayms=3000"
          frameborder="0"
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allowfullscreen="true"
          width="100%"
          height="569"
        ></iframe>
      </v-list>
    </v-card>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
import { One, Two, Three, Four, Five } from "./Final_Components";

export default {
  name: "CS_6620",
  components: { One, Two, Three, Four, Five },
  computed: mapState(["classes"]),
  data: () => ({
    list: [
      {
        title: "Research Project",
        show_list: true,
        items: [
          {
            title: "Solar Scheduling",
            description:
              "Using Solar Energy data to schedule when power is saved to batteries, or used in the house."
          }
          // Could do it from a home owners point of view.
          // When is a good time to charge your batteries and when to use it.
        ]
      },
      {
        title: "Final Presentation",
        show_list: false,
        items: [
          {
            title: "Solar Scheduling",
            description:
              "Using Solar Energy data to schedule when power is saved to batteries, or used in the house."
          },
          {
            title: "1) Motivations and Objectives",
            component: "One"
          },
          {
            title: "2) Droblem Definition",
            component: "Two"
          },
          {
            title: "3) Solution method",
            component: "Three"
          },
          {
            title: "4) Results",
            component: "Four"
          },
          {
            title: "5) Summary and Conclusion",
            component: "Five"
          }
        ]
      },
      {
        title: "Elevator Speech (PowerPoint)",
        show_list: true
      },
      {
        title: "Past Projects",
        show_list: false,
        items: [
          {
            title: "Optimizing Gold Mine Production",
            description:
              "At my Summer internship I built a nueral net that predicted how fine the output of a Gold Mine would be, based on 4 hour sample data."
          }
        ]
      },
      {
        title: "Tutorials and Informative Websites",
        show_list: true,
        items: [
          {
            title: "Deep Learning and Neural Networks with Python and Pytorch",
            description:
              "This was the most important tutorial for me to start understanding Neural Networks and how they work. After completing this entire tutorial I am able to build a neural network in pytorch and have create a small on in keras.",
            resources: [
              "https://www.youtube.com/watch?v=BzcBsTou0C0&list=PLQVvvaa0QuDdeMyHEYc0gxFpYwHY2Qfdh&index=2"
            ]
          },
          {
            title: "Dynamic Optimization - Deep Learning",
            resources: ["http://apmonitor.com/do/index.php/Main/DeepLearning"]
          },
          {
            title: "AfterAcademy - What Are L1 and L2 Loss Functions?",
            resources: [
              "https://afteracademy.com/blog/what-are-l1-and-l2-loss-functions#:~:text=L2%20Loss%20Function%20is%20used,value%20and%20the%20predicted%20value"
            ]
          },
          {
            title: "Feedforward Control",
            resources: ["https://www.youtube.com/watch?v=wJL5szcus4U"]
          },
          {
            title: "Model Predictive Control",
            resources: ["https://www.youtube.com/watch?v=YHAA-uXhI0E"]
          }
        ]
      },
      {
        title: "Project Ideas",
        show_list: false,
        items: [
          // { title: "", description: ""}, // https://towardsdatascience.com/deep-reinforcement-learning-for-automated-stock-trading-f1dad0126a02 https://medium.com/ether-labs/tradebot-stock-trading-using-reinforcement-learning-part1-8b67c9603f33
          {
            title: "Self Driving Cars",
            description:
              "I would love to do a project on this topic but I just can't think of anyting that would go with clean energy other than mapping.",
            resources: ["https://www.kaggle.com/roydatascience/training-car"]
          },
          {
            title: "EV Mapping",
            description:
              "I have always been Interested in EVs and the things that they can do but I'm more interested in what they can do and not how to best use them."
          }
        ]
      }
    ]
  })
};
</script>

<style></style>

<template>
  <v-col cols="12" xs="10" sm="10" md="10" lg="10" xl="10">
    <!-- Main Screen Row -->
    <v-row class="fill-height">
      <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="4">
        <v-card elevation="0" max-width="550px">
          <v-card-title>
            <v-row>
              <v-col>
                <v-avatar class="rounded" color="grey" size="164" tile>
                  <img src="/assets/profile_pic_face.jpg" />
                </v-avatar>
              </v-col>

              <v-col>
                <v-row>
                  <v-card-title class="justify-center" style="word-break: break-word; min-width: 130px;">
                    Andrew McMullin
                  </v-card-title>
                </v-row>

                <v-row style="min-width: 130px;">
                  <v-btn
                    text
                    :color="color.value"
                    href="https://www.linkedin.com/in/andrew-mcmullin"
                    target="_blank"
                  >
                    <v-icon>mdi-linkedin</v-icon>
                  </v-btn>

                  <v-btn
                    text
                    :color="color.value"
                    href="mailto:mcmullinand@gmail.com"
                    target="_blank"
                  >
                    <v-icon>mdi-gmail</v-icon>
                  </v-btn>

                  <v-btn
                    text
                    :color="color.value"
                    href="https://github.com/mcmullinboy15"
                    target="_blank"
                  >
                    <v-icon>mdi-github</v-icon>
                  </v-btn>
                </v-row>
              </v-col>

            </v-row>
          </v-card-title>

          <v-divider></v-divider>

          <v-row>
            <v-col>
              <v-card elevation="0">
                <v-card-title>
                  Education
                </v-card-title>

                <v-card-subtitle style="min-width: 280px">
                  Masters in CS - University of Michigan <br />
                  Bachelors in CS - Utah State University
                </v-card-subtitle>
              </v-card>
            </v-col>

            <v-col>
              <v-card elevation="0">
                <v-card-title style="min-width: 200px">
                  Work
                  
                  <v-spacer></v-spacer>

                  <v-btn
                    text
                    :color="color.value"
                    to="/resume"
                    target="_blank"
                  >
                    <v-icon left>mdi-file-document</v-icon>
                    Resume
                  </v-btn>
                </v-card-title>

                <v-card-subtitle class="py-0">
                  SWE intern @ Apple
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-card>

        <v-divider
          class="mt-8 mb-n4"
          style="max-width: 550px"
        ></v-divider>

        <!-- UMich Classes, USU Classes, Tutorials -->
        <template
          v-for="{ header, data, school } in [
            { header: 'UMich - Classes', data: classes['um'], school: 'um' },
            { header: 'USU - Classes', data: classes['usu'], school: 'usu' },
            { header: 'Tutorials', data: tutorials }
          ]"
        >
          <v-card
            :key="header"
            class="mt-8"
            max-width="550px"
          >
            <v-expansion-panels focusable accordion>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  {{ header }}
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <v-list class="py-0">
                    <template v-for="(cls, key) in data">
                      <v-divider color="grey" :key="key"></v-divider>

                      <v-list-item :key="cls.title">
                        <v-list-item-content>
                          <v-list-item-title
                            v-html="cls.title"
                          ></v-list-item-title>
                          <v-list-item-subtitle
                            v-html="cls.subtitle"
                          ></v-list-item-subtitle>
                        </v-list-item-content>

                        <template v-if="school">
                          <v-list-item-action class="ma-0">
                            <v-btn
                              text
                              :disabled="!cls.report"
                              :to="{
                                name: 'ClassReport',
                                params: { school, class: key }
                              }"
                              target="_blank"
                            >
                              <v-icon :color="color.value"
                                >mdi-file-document</v-icon
                              >
                            </v-btn>
                          </v-list-item-action>

                          <v-list-item-action class="ma-0">
                            <v-btn
                              text
                              :disabled="!cls.github"
                              :href="cls.github"
                              target="_blank"
                            >
                              <v-icon :color="color.value">mdi-github</v-icon>
                            </v-btn>
                          </v-list-item-action>
                        </template>

                        <template v-else>
                          <v-list-item-action class="ma-0">
                            <v-btn text :href="cls.to" target="_blank">
                              <v-icon :color="color.value">
                                mdi-open-in-new</v-icon
                              >
                            </v-btn>
                          </v-list-item-action>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </template>
      </v-col>

      <!-- Experience and Projects Lists -->
      <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="8">
        <v-row>
          <v-col>
            <v-card>
              <v-card-title class="header">
                <v-row class="header-row">
                  <v-col
                    v-for="header of Object.keys(sections)"
                    :key="header"
                    @click="selected_section = header"
                    :class="['header-col px-0 text-center mx-3', (selected_section === header) ? 'tab selected-tab' : 'tab unselected-tab']"
                    style="word-break: break-word;"
                  >
                      <!-- :style="(selected_section === header) ? `border-bottom: 1px solid grey;` : ''" -->
                    <h3
                      :class="[(selected_section === header) ? 'primary--text' : 'grey--text']"
                    >{{header}}</h3>
                  </v-col>
                </v-row>
              </v-card-title>

              <!-- <v-divider color="grey"></v-divider> -->

              <v-card-text class="pt-1 pb-0"
                v-touch="{
                  left: () => selected_section = Object.keys(sections)[1],
                  right: () => selected_section = Object.keys(sections)[0]
                }"
              >
                <template v-for="(item, idx) in section.data">
                  <v-divider v-if="idx != 0" :key="idx"></v-divider>

                  <v-card
                    :key="item.title + idx"
                    tile
                    elevation="0"
                  >
                    <v-card-title :class="[color.value + '--text', 'pt-1']">
                      {{ item.title }}
                      <v-spacer></v-spacer>
                      <v-btn
                        v-if="item.to"
                        text
                        :color="color.value"
                        target="_blank"
                        :to="item.to"
                        >View</v-btn
                      >
                      <v-btn
                        v-if="item.github"
                        text
                        :color="color.value"
                        target="_blank"
                        :href="item.github"
                        >Github</v-btn
                      >
                    </v-card-title>

                    <v-card-subtitle
                      class="pb-0 white--text"
                      v-text="item.subtitle"
                    ></v-card-subtitle>

                    <v-card-text
                      v-if="Array.isArray(item.description)"
                      class="pb-2"
                    >
                      <ul>
                        <li
                          v-for="(line, i) in item.description"
                          :key="line + i"
                        >
                          {{ line }}
                        </li>
                      </ul>
                    </v-card-text>

                    <v-card-text v-else class="pb-2">
                      {{ item.description }}
                    </v-card-text>
                  </v-card>
                </template>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
import { db, colorRef } from "../firebase";

export default {
  name: "Home",
  data: () => ({
    color: {},
    selected_section: "Experience"
  }),
  firestore: { color: colorRef },
  computed: {
    ...mapState(["experiences", "projects", "tutorials", "classes"]),
    sections() {
      return {
        Experience: this.experiences,
        Projects: this.projects
      };
    },
    section() {
      let data = this.sections[this.selected_section];
      return { header: this.selected_section, data };
    }
  },
  created() {
    (function sendMail() {
      db.collection("mail")
        .add({ time: new Date() })
        .then(() => {})
        .catch(() => {});
    })();
  }
};
</script>

<style scoped>
.v-expansion-panel-content >>> .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
.v-slide-group__prev {
  display: none;
}

.header {
  background-color: rgb(40, 40, 40);

  padding-top: 24px;
  padding-bottom: 12px;
}

.tab {
  cursor: pointer;
  padding: 10px 0px;
  border-radius: 10px 10px 0px 0px;
}

.tab:hover {
  background-color: rgb(35, 35, 35);
}

.selected-tab {
  background-color: rgb(30, 30, 30);
}
</style>

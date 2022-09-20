<template>
  <v-col cols="12" xs="10" sm="10" md="10" lg="10" xl="10">
    <!-- Main Screen Row -->
    <v-row class="fill-height">
      <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="4">
        <v-card elevation="0" min-width="450px" max-width="550px">
          <v-card-title>
            <v-row>
              <v-col cols="4">
                <v-avatar class="rounded" color="grey" size="164" tile>
                  <img src="/assets/profile_pic_face.jpg" />
                </v-avatar>
              </v-col>

              <v-spacer></v-spacer>

              <v-col cols="8">
                <v-row>
                  <v-col cols="12">
                    <v-card-title class="justify-center">
                      Andrew McMullin
                    </v-card-title>
                  </v-col>
                </v-row>

                <v-row v-if="$vuetify.breakpoint.name !== 'xs'">
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    :color="color.value || 'primary'"
                    to="/resume"
                    target="_blank"
                    ><v-icon>mdi-file-document</v-icon></v-btn
                  >
                  <v-btn
                    text
                    :color="color.value || 'primary'"
                    href="https://www.linkedin.com/in/andrew-mcmullin"
                    target="_blank"
                    ><v-icon>mdi-linkedin</v-icon></v-btn
                  >
                  <v-btn
                    text
                    :color="color.value || 'primary'"
                    href="mailto:mcmullinand@gmail.com"
                    target="_blank"
                    ><v-icon>mdi-gmail</v-icon></v-btn
                  >
                  <v-btn
                    text
                    :color="color.value || 'primary'"
                    href="https://github.com/mcmullinboy15"
                    target="_blank"
                    ><v-icon>mdi-github</v-icon></v-btn
                  >
                  <v-spacer></v-spacer>
                </v-row>

                <v-row v-else>
                  <v-spacer></v-spacer>
                  <v-col>
                    <v-btn
                      text
                      :color="color.value || 'primary'"
                      to="/resume"
                      target="_blank"
                      ><v-icon>mdi-file-document</v-icon></v-btn
                    >
                    <v-btn
                      text
                      :color="color.value || 'primary'"
                      href="https://www.linkedin.com/in/andrew-mcmullin"
                      target="_blank"
                      ><v-icon>mdi-linkedin</v-icon></v-btn
                    >
                  </v-col>
                  <v-col>
                    <v-btn
                      text
                      :color="color.value || 'primary'"
                      href="mailto:mcmullinand@gmail.com"
                      target="_blank"
                    >
                      <v-icon>mdi-gmail</v-icon>
                    </v-btn>

                    <v-btn
                      text
                      :color="color.value || 'primary'"
                      href="https://github.com/mcmullinboy15"
                      target="_blank"
                    >
                      <v-icon>mdi-github</v-icon>
                    </v-btn>
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
              </v-col>

              <v-spacer></v-spacer>
            </v-row>
          </v-card-title>

          <v-divider></v-divider>

          <v-row>
            <v-spacer></v-spacer>

            <v-col cols="12" xs="12" sm="7">
              <v-card elevation="0">
                <v-card-title>
                  Education
                </v-card-title>

                <v-card-subtitle>
                  Masters in CS - University of Michigan <br />
                  Bachelors in CS - Utah State University
                </v-card-subtitle>
              </v-card>
            </v-col>

            <v-col cols="12" xs="12" sm="5">
              <v-card elevation="0">
                <v-card-title>
                  Work
                </v-card-title>

                <v-card-subtitle>
                  SWE intern @ Apple
                </v-card-subtitle>
              </v-card>
            </v-col>

            <v-spacer></v-spacer>
          </v-row>
        </v-card>

        <v-divider
          class="mt-8 mb-n4"
          style="min-width: 450px; max-width: 550px"
        ></v-divider>

        <!-- Experience and Project Buttons -->
        <div class="mt-8 mb-0">
          <template v-for="header in Object.keys(sections)">
            <v-card
              :key="header"
              :class="[
                selected_section === header
                  ? (color.value || 'primary') + '--text'
                  : '',
                'mt-8',
                'py-3',
                'pl-6'
              ]"
              min-width="450px"
              max-width="550px"
              @click="selected_section = header"
            >
              {{ header }}
            </v-card>
          </template>
        </div>

        <v-divider
          class="mt-4 mb-n4"
          style="min-width: 450px; max-width: 550px"
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
            min-width="450px"
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
                              <v-icon :color="color.value || 'primary'"
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
                              <v-icon :color="color.value || 'primary'"
                                >mdi-github</v-icon
                              >
                            </v-btn>
                          </v-list-item-action>
                        </template>

                        <template v-else>
                          <v-list-item-action class="ma-0">
                            <v-btn text :href="cls.to" target="_blank">
                              <v-icon :color="color.value || 'primary'"
                                >mdi-open-in-new</v-icon
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
            <v-card min-width="400px">
              <v-card-title>
                <h1>{{ section.header }}</h1>
              </v-card-title>

              <v-divider color="grey"></v-divider>

              <v-card-text class="pt-1 pb-0">
                <template v-for="(item, idx) in section.data">
                  <v-divider v-if="idx != 0" :key="idx"></v-divider>

                  <v-card
                    :key="item.title + idx"
                    tile
                    min-width="400px"
                    elevation="0"
                  >
                    <v-card-title :class="[color.value + '--text', 'pt-1']">
                      {{ item.title }}
                      <v-spacer></v-spacer>
                      <v-btn
                        v-if="item.to"
                        text
                        :color="color.value || 'primary'"
                        target="_blank"
                        :to="item.to"
                        >View</v-btn
                      >
                      <v-btn
                        v-if="item.github"
                        text
                        :color="color.value || 'primary'"
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
</style>

<template>
  <v-app>
    <v-main min-width="350px">
      <v-container fluid class="fill-height mb-16">
        <v-row class="fill-height">
          <v-spacer></v-spacer>
          <router-view />
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


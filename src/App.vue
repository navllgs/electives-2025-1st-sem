<template>
  <!-- <BlogPost></BlogPost>
  <BlogPost title="Vue" description="Vue description"></BlogPost> -->
  <!-- <div class="main-app">
    <div class="top-navigation">
      <RouterLink to="/">Home</RouterLink>|
      <RouterLink to="/about">About</RouterLink>|
      <RouterLink to="/about-me">About Me</RouterLink>
    </div>
    <RouterView />

    <button @click="goHome()">Go to Home</button>

  </div> -->
  <v-app>
    <v-main>
      <component :is="layout">
        <router-view />
      </component>
    </v-main>
  </v-app>
  <!-- <div class="main-app">
    <div class="top-navigation">
      <RouterLink to="/">Home</RouterLink>
      |
      <RouterLink to="/about">About</RouterLink>
    </div>

    <button @click="goHome()">Go to Home</button>

    <RouterView />
  </div> -->
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import DefaultLayout from "./layouts/DefaultLayout.vue";
import NoLayout from "./layouts/NoLayout.vue";

export default {
  // components: { BlogPost },
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },

  data() {
    return {
      layouts: {
        DefaultLayout,
        NoLayout,
      },
    };
  },

  computed: {
    layout() {
      const layoutName = this.$route.meta.layout || "DefaultLayout";
      return this.layouts[layoutName];
    },
  },
};
</script>

<style scoped>
</style>

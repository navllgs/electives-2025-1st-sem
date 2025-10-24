<template>
  <div class="about">
    <h1>This is an about page</h1>
    <BlogPost></BlogPost>
    <BlogPost title="Vue" description="Vue description"></BlogPost>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost.vue";

export default {
  components: {
    BlogPost,
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>

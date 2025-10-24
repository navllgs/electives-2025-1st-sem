<template>
  <div>
    <div>
      <b>{{ title }}</b>
    </div>
    <div>
      {{ description }}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: "Title here"
      },
      description: {
        type: String,
        default: "Description here"
      }
    }
  }
</script>


<style>

</style>
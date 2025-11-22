<template>
  <div>
    <div class="form-item">
      <b>First Name:</b>
      <v-text-field variant="solo-filled" type="text" v-model="firstName" />
    </div>
    <div class="form-item">
      <b>Last Name:</b>
      <v-text-field variant="solo-filled" type="text" v-model="lastName" />
    </div>

    <div>
      FullName: <span>{{ displayName }}</span>
    </div>

    <v-btn variant="outlined" @click="register">Register</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
    };
  },

  computed: {
    displayName() {
      return `${this.firstName} ${this.lastName}`;
    },
  },

  methods: {
    register() {
      var form = {
        firstName: this.firstName,
        lastName: this.lastName,
      };
      alert(JSON.stringify(form));
      // alert(form);
    },
  },

  created() {
    this.firstName = "Neil";
    this.lastName = "Villegas";
  },

  mounted() {},
};
</script>

<style scoped>
.form-item {
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
  align-items: center;
}
</style>

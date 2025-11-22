<template>
  <div class="login-component h-100 w-100 justify-center align-center d-flex">
    <v-card
      style="max-width: 700px; min-height: 300px"
      class="pa-0 ma-8 rounded-lg w-100 d-flex flex-column"
    >
      <v-card-item cont class="pa-0 h-100 flex-grow-1">
        <v-row class="d-flex h-100" no-gutters>
          <v-col
            cols="12"
            class="d-flex justify-center align-center"
          >
            <div class="w-100 pa-10">
              <div class="d-flex justify-center text-h5 font-weight-bold">
                LOGIN
              </div>
              <v-text-field
                v-model="email"
                variant="outlined"
                density="compact"
                hide-details
                label="Email/Username"
                class="pt-2"
              ></v-text-field>
              <v-text-field
                v-model="password"
                variant="outlined"
                density="compact"
                hide-details
                label="Password"
                type="password"
                class="pt-3"
                @keyup.enter="login"
              ></v-text-field>
              <v-btn
                @click="login"
                class="my-2"
                variant="elevated"
                color="primary"
                block
                >Login</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
  </div>
</template>

<style></style>

<script>
import { supabase } from '@/library/supabase';
import VueCookie from 'vue-cookie';
import { toast } from 'vue3-toastify';

export default {
  data() {
    return {
      email: "",
      password: ""
    }
  },

  methods: {
    async login() {
      let _email = this.email;
      if (!this.validEmail(this.email)) {
        _email = `${_email}@gmail.com`;
      }
      const { data, error } = await supabase.auth.signInWithPassword({
        email: _email,
        password: this.password,
      });

      if(error){
        toast.error('invalid credentials')
        return;
      }

      if (data && data.user) {
        window.currentUser = {
          email: data.user.email,
          id: data.user.id,
        };
        VueCookie.set("ELECTIVE_TOKEN", data.session.access_token, "30d");
        this.$router.push("/");
      }
    },

    validEmail(email) {
      if (!email) return "Required.";
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase() || "Invalid e-mail.");
    },
  },
};
</script>

<style lang="scss">
.login-component {
  .v-card-item__content {
    height: 100%;
  }
}
</style>

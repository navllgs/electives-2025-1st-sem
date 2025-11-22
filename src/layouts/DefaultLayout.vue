<template>
  <!-- HEADER -->
  <v-app-bar color="primary" dark elevate-on-scroll>
    <v-app-bar-title @click="goHome" style="cursor: pointer">
      <div class="hover-scale">Inventory System</div>
    </v-app-bar-title>
  </v-app-bar>

  <v-main>
    <v-container fluid class="pa-0" style="height: calc(100vh - 64px)">
      <v-row no-gutters style="height: 100%">
        <!-- LEFT NAVIGATION -->
        <v-navigation-drawer permanent width="220" color="grey-lighten-4" elevation="2" class="py-3">
          <v-list nav density="comfortable">
            <v-list-item to="/" title="Home" prepend-icon="mdi-home" />
            <v-list-item to="/supabase" title="Supabase" prepend-icon="mdi-database" />
            <v-list-item to="/supabase2" title="Supabase2" prepend-icon="mdi-database-outline" />
            <v-list-item to="/book-inventory" title="Inventory" prepend-icon="mdi-database-outline" />
            <v-list-item to="/book-transaction" title="Transaction" prepend-icon="mdi-database-outline" />
            <v-list-item to="/about" title="About" prepend-icon="mdi-account" />

            <!-- SHOW DIALOG INSTEAD OF DIRECT LOGOUT -->
            <v-list-item title="Logout" prepend-icon="mdi-logout" @click="logoutDialog = true" />
          </v-list>
        </v-navigation-drawer>

        <!-- MAIN CONTENT -->
        <v-col class="d-flex flex-column" style="height: 100%; background: #fafafa">
          <div style="flex: 1; overflow-y: auto; padding: 20px">
            <router-view />
          </div>

          <!-- FOOTER -->
          <v-footer height="48" style="max-height: 48px" class="px-4 w-100" color="grey-lighten-3">
            <div class="text-grey-darken-1 text-center w-100">
              version 1.0.0
            </div>
          </v-footer>
        </v-col>
      </v-row>
    </v-container>
  </v-main>

  <!-- LOGOUT CONFIRMATION DIALOG -->
  <v-dialog v-model="logoutDialog" width="400">
    <v-card>
      <v-card-title class="text-h6">Confirm Logout</v-card-title>

      <v-card-text> Are you sure you want to log out? </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn variant="text" @click="logoutDialog = false">Cancel</v-btn>

        <v-btn variant="elevated" color="error" @click="confirmLogout">
          Logout
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import VueCookie from "vue-cookie";

export default {
  data() {
    return {
      logoutDialog: false,
    };
  },

  methods: {
    goHome() {
      this.$router.push("/");
    },

    confirmLogout() {
      VueCookie.delete("ELECTIVE_TOKEN");
      this.logoutDialog = false;
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.hover-scale:hover {
  font-size: 105%;
}
</style>

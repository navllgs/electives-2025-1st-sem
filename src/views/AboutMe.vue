<template>
  <v-container class="py-8" style="max-width: 900px;">
    <v-row justify="center">
      <v-col cols="12" md="8">

        <!-- Profile Card -->
        <v-card elevation="2" class="pa-6">

          <div class="text-center">
            <v-avatar size="120" class="mb-4">
              <img src="https://i.pravatar.cc/300" alt="Profile" />
            </v-avatar>

            <h2 class="text-h5 font-weight-bold">John Doe</h2>
            <p class="text-medium-emphasis">Full-Stack Developer • Vue | Laravel | Supabase</p>
          </div>

          <v-divider class="my-6"></v-divider>

          <!-- Biography -->
          <section>
            <h3 class="text-h6 mb-2">About Me</h3>
            <p>
              Hello! I'm John, a passionate full-stack developer specializing in
              building clean, efficient, and scalable applications.  
              I enjoy frontend work with Vue 3 and backend projects with Laravel
              and Supabase. When I'm not coding, I love gaming, coffee,  
              and exploring new technologies.
            </p>
          </section>

          <v-divider class="my-6"></v-divider>

          <!-- Skills Section -->
          <section>
            <h3 class="text-h6 mb-3">Skills</h3>

            <v-chip-group column>
              <v-chip color="primary" variant="flat">Vue 3</v-chip>
              <v-chip color="primary" variant="flat">Vuetify</v-chip>
              <v-chip color="primary" variant="flat">JavaScript</v-chip>
              <v-chip color="primary" variant="flat">Laravel</v-chip>
              <v-chip color="primary" variant="flat">Supabase</v-chip>
              <v-chip color="primary" variant="flat">Node.js</v-chip>
            </v-chip-group>
          </section>

          <v-divider class="my-6"></v-divider>

          <!-- Contact Info -->
          <section>
            <h3 class="text-h6 mb-3">Contact</h3>

            <v-list density="compact">
              <v-list-item prepend-icon="mdi-email">
                john.doe@example.com
              </v-list-item>

              <v-list-item prepend-icon="mdi-github">
                github.com/johndoe
              </v-list-item>

              <v-list-item prepend-icon="mdi-linkedin">
                linkedin.com/in/johndoe
              </v-list-item>
            </v-list>
          </section>

        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
/* Optional subtle polish */
</style>

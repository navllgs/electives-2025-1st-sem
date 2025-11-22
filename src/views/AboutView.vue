<template>
  <v-container class="pa-0" style="max-width: 900px;">
    <v-row class="pa-0" justify="center">
      <v-col cols="12" md="10">

        <div elevation="2">

          <!-- Title -->
          <h1 class="text-h5 font-weight-bold mb-4">
            About the Inventory System
          </h1>

          <p class="text-body-1 mb-6">
            This inventory management system is designed to help businesses track 
            products, sales, stock levels, and transaction history in an efficient 
            and organized way.  
            It provides real-time updates, analytics, and an intuitive user interface 
            to simplify daily operations.
          </p>

          <v-divider class="my-6"></v-divider>

          <!-- Purpose -->
          <section class="mb-6">
            <h2 class="text-h6 mb-2">Purpose</h2>
            <p>
              The main goal of this system is to deliver a centralized platform where 
              businesses can easily monitor inventory movement, generate insights, 
              and maintain accurate records to support decision-making.
            </p>
          </section>

          <v-divider class="my-6"></v-divider>

          <!-- Key Features -->
          <section class="mb-6">
            <h2 class="text-h6 mb-3">Key Features</h2>

            <v-list density="compact">
              <v-list-item prepend-icon="mdi-database-eye">
                Real-time stock tracking
              </v-list-item>

              <v-list-item prepend-icon="mdi-chart-line">
                Monthly sales analytics and dashboards
              </v-list-item>

              <v-list-item prepend-icon="mdi-receipt-text">
                Transaction history with detailed logs
              </v-list-item>

              <v-list-item prepend-icon="mdi-cart-check">
                Product sales and quantity monitoring
              </v-list-item>

              <v-list-item prepend-icon="mdi-table">
                Organized tables for products, categories, and history
              </v-list-item>

              <v-list-item prepend-icon="mdi-cloud-sync">
                Cloud-based storage using Supabase (if used)
              </v-list-item>
            </v-list>
          </section>

          <v-divider class="my-6"></v-divider>

          <!-- System Workflow -->
          <section class="mb-6">
            <h2 class="text-h6 mb-3">How It Works</h2>

            <v-timeline density="comfortable">
              <v-timeline-item color="primary" icon="mdi-package-variant">
                Add products to inventory with stock levels and details.
              </v-timeline-item>

              <v-timeline-item color="primary" icon="mdi-cart">
                Sales or transactions automatically adjust stock levels.
              </v-timeline-item>

              <v-timeline-item color="primary" icon="mdi-chart-bar">
                Dashboard generates updated insights (sales, quantity, activity).
              </v-timeline-item>

              <v-timeline-item color="primary" icon="mdi-database-clock">
                All changes are stored and logged for review.
              </v-timeline-item>
            </v-timeline>
          </section>

          <v-divider class="my-6"></v-divider>

          <!-- Contact / Support -->
          <section>
            <h2 class="text-h6 mb-3">Support & Updates</h2>
            <p>
              This system continues to improve with new updates, better performance, 
              and enhanced reporting tools. If you have questions, suggestions, 
              or want to upgrade the system, feel free to reach out.
            </p>
          </section>

        </div>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

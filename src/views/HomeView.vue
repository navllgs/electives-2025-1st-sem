<template>
  <div class="dashboard-wrapper">

    <!-- Monthly Overview -->
    <v-card class="pa-4 mb-6" elevation="2">
      <v-card-title class="text-h6">Monthly Overview</v-card-title>

      <v-row dense>
        <v-col cols="12" md="4">
          <v-card class="stat-card sales" elevation="1">
            <h3 class="stat-title">Total Sales</h3>
            <p class="stat-value">₱ {{ monthlyTotalSales.toLocaleString() }}</p>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="stat-card quantity" elevation="1">
            <h3 class="stat-title">Total Quantity Sold</h3>
            <p class="stat-value">{{ monthlyTotalQuantity }}</p>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="stat-card count" elevation="1">
            <h3 class="stat-title">Transactions</h3>
            <p class="stat-value">{{ monthlyTransactionCount }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- Latest Transactions -->
    <v-card elevation="2">
      <v-card-title class="text-h6">Latest Transactions</v-card-title>

      <v-table class="text-body-2">
        <thead>
          <tr>
            <th>Date</th>
            <th>Item</th>
            <th>Qty</th>
            <th>Total Price</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="t in latestTransactions" :key="t.id">
            <td>{{ t.date }}</td>
            <td>{{ t.item }}</td>
            <td>{{ t.qty }}</td>
            <td>₱ {{ t.total.toLocaleString() }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      latestTransactions: [
        { id: 1, date: "2025-01-12", item: "Product A", qty: 2, total: 450 },
        { id: 2, date: "2025-01-12", item: "Product B", qty: 1, total: 120 },
        { id: 3, date: "2025-01-11", item: "Product C", qty: 5, total: 999 },
        { id: 4, date: "2025-01-11", item: "Product D", qty: 3, total: 300 },
      ],
    };
  },

  computed: {
    monthlyTotalSales() {
      return this.latestTransactions.reduce((s, t) => s + t.total, 0);
    },
    monthlyTotalQuantity() {
      return this.latestTransactions.reduce((s, t) => s + t.qty, 0);
    },
    monthlyTransactionCount() {
      return this.latestTransactions.length;
    },
  },
};
</script>

<style scoped>
.stat-card {
  text-align: center;
  padding: 20px;
  border-radius: 12px;
  color: #333;
}

.stat-title {
  margin-bottom: 6px;
  font-size: 16px;
  font-weight: 500;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
}

/* Colored backgrounds similar to your sample */
.sales {
  background-color: #e3f2fd;
  color: #1976d2;
}

.quantity {
  background-color: #e8f5e9;
  color: #43a047;
}

.count {
  background-color: #ffebee;
  color: #e53935;
}
</style>

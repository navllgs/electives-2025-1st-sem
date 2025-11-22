<template>
  <v-container class="pa-6">
    <!-- Create New Item -->
    <v-row class="align-start" dense>
      <v-col cols="4">
        <v-text-field
          v-model="newItem.value"
          label="Value"
          variant="outlined"
          density="compact"
        />
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="newItem.label"
          label="Label"
          variant="outlined"
          density="compact"
        />
      </v-col>
      <v-col cols="4">
        <v-btn color="primary" block @click="createItem"> Add Item </v-btn>
      </v-col>
    </v-row>

    <v-divider class="my-2"></v-divider>

    <!-- List Items -->
    <div
      v-for="item in items"
      :key="item.id"
      class="d-flex align-start mb-4"
      style="gap: 1rem"
    >
      <!-- Value -->
      <v-text-field
        v-model="item.value"
        label="Value"
        variant="outlined"
        density="compact"
        class="flex-1"
      />

      <!-- Label -->
      <v-text-field
        v-model="item.label"
        label="Label"
        variant="outlined"
        density="compact"
        class="flex-1"
      />

      <!-- Updated At -->
      <div style="width: 200px; opacity: 0.7; font-size: 0.8rem">
        {{ formatDate(item.updated_at) }}
        <!-- {{ item.updated_at }} -->
      </div>

      <!-- Update Button -->
      <v-btn color="blue" @click="updateItem(item)"> Update </v-btn>

      <!-- Delete Button -->
      <v-btn color="red" @click="deleteItem(item.id)"> Delete </v-btn>
    </div>
  </v-container>
</template>

<script>
import { supabase } from "@/library/supabase";
import { toast } from "vue3-toastify";

export default {
  name: "Supabase",

  data() {
    return {
      items: [],
      newItem: {
        label: "",
        value: "",
      },
    };
  },

  async mounted() {
    this.loadItems();
  },

  methods: {
    // --------------------
    // READ
    // --------------------
    async loadItems() {
      const { data, error } = await supabase
        .from("todo")
        .select("*")
        .order("id", { ascending: true });

      if (!error) this.items = data;
    },

    // --------------------
    // CREATE
    // --------------------
    async createItem() {
      if (!this.newItem.label || !this.newItem.value) return;

      const { data, error } = await supabase
        .from("todo")
        .insert([
          {
            label: this.newItem.label,
            value: this.newItem.value,
          },
        ])
        .select();

      if (!error) {
        this.loadItems(); // refresh rows including new timestamp
        this.newItem.label = "";
        this.newItem.value = "";
        toast.success("Successfully Saved");
      }
    },

    // --------------------
    // UPDATE
    // --------------------
    async updateItem(item) {
      const { error } = await supabase
        .from("todo")
        .update({
          label: item.label,
          value: item.value,
        })
        .eq("id", item.id)
        .select(); // so we get updated_at

      if (!error) {
        this.loadItems(); // refresh rows including new timestamp
        toast.success("Successfully Saved");
      }
    },

    // --------------------
    // DELETE
    // --------------------
    async deleteItem(id) {
      const { error } = await supabase.from("todo").delete().eq("id", id);

      if (!error) {
        this.loadItems(); // refresh rows including new timestamp
        toast.success("Successfully Deleted");
      }
    },

    // --------------------
    // Helpers
    // --------------------
    formatDate(ts) {
      return ts ? new Date(ts).toLocaleString() : "";
    },
  },
};
</script>

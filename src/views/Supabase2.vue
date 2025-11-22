<template>
  <v-container class="pa-6">
    <!-- CREATE BUTTON -->
    <v-btn
      variant="elevated"
      color="primary"
      class="mb-4"
      @click="openCreateDialog"
    >
      Add Item
    </v-btn>

    <!-- DATA TABLE -->
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="id"
      class="elevation-1"
    >
      <!-- Custom Cell: Actions -->
      <template #item.actions="{ item }">
        <v-btn
          icon="mdi-pencil"
          color="primary"
          @click="openEditDialog(item)"
          density="comfortable"
          size="small"
          class="mr-1"
          variant="outlined"
        ></v-btn>

        <v-btn
          icon="mdi-delete"
          color="red"
          @click="deleteItem(item.id)"
          density="comfortable"
          size="small"
          variant="outlined"
        ></v-btn>
      </template>

      <!-- Custom Cell: Updated Date -->
      <template #item.updated_at="{ item }">
        {{ formatDate(item.updated_at) }}
      </template>
    </v-data-table>

    <!-- DIALOG (Create + Edit) -->
    <v-dialog v-model="dialog" max-width="450px">
      <v-card>
        <v-card-title>
          <span class="text-h6">
            {{ editingItem ? "Edit Item" : "Create Item" }}
          </span>
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="form.value"
            label="Value"
            density="compact"
            variant="outlined"
          />

          <v-text-field
            v-model="form.label"
            label="Label"
            density="compact"
            variant="outlined"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn size="sm" text @click="closeDialog"> Cancel </v-btn>
          <v-btn color="primary" variant="elevated" @click="saveItem">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { supabase } from "@/library/supabase";
import { toast } from "vue3-toastify";

export default {
  name: "SupabaseTable",

  data() {
    return {
      dialog: false,
      editingItem: null,

      form: {
        label: "",
        value: "",
      },

      items: [],

      headers: [
        { title: "ID", value: "id", width: 70 },
        { title: "Label", value: "label" },
        // { title: "Value", value: "value" },
        { title: "Updated At", value: "updated_at" },
        { title: "Actions", value: "actions", sortable: false, width: 120 },
      ],
    };
  },

  async mounted() {
    this.loadItems();
  },

  methods: {
    // ----------------------------------
    // READ
    // ----------------------------------
    async loadItems() {
      const { data, error } = await supabase
        .from("todo")
        .select("*")
        .order("id", { ascending: true });

      if (!error) this.items = data;
    },

    // ----------------------------------
    // DIALOG CONTROL
    // ----------------------------------
    openCreateDialog() {
      this.editingItem = null;
      this.form = { label: "", value: "" };
      this.dialog = true;
    },

    openEditDialog(item) {
      this.editingItem = item;
      this.form = { label: item.label, value: item.value };
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
    },

    // ----------------------------------
    // SAVE (Create or Update)
    // ----------------------------------
    async saveItem() {
      if (!this.form.label || !this.form.value) return;

      if (this.editingItem) {
        await this.updateItem();
      } else {
        await this.createItem();
      }

      this.dialog = false;
      this.loadItems();
    },

    // CREATE
    async createItem() {
      const { error } = await supabase
        .from("todo")
        .insert([this.form])
        .select();

      if (!error) toast.success("Successfully Created");
    },

    // UPDATE
    async updateItem() {
      const { error } = await supabase
        .from("todo")
        .update({ ...this.form })
        .eq("id", this.editingItem.id)
        .select();

      if (!error) toast.success("Successfully Updated");
    },

    // DELETE
    async deleteItem(id) {
      const { error } = await supabase.from("todo").delete().eq("id", id);

      if (!error) {
        this.loadItems();
        toast.success("Successfully Deleted");
      }
    },

    formatDate(ts) {
      return ts ? new Date(ts).toLocaleString() : "";
    },
  },
};
</script>

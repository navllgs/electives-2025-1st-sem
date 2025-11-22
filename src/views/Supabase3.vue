<template>
    <div>
        <div>
            <v-text-field label="value" v-model="value"></v-text-field>
            <v-text-field label="label" v-model="label"></v-text-field>
            <v-btn @click="createItem">Add</v-btn>
        </div>

        <div style="display: flex; gap: 2px; align-items: center;" v-for="item in items">
            <template v-if="editItems[item.id] != true">
                <div style="flex-grow: 1">{{ item.value }}</div>
                <div style="flex-grow: 1">{{ item.label }}</div>
                <v-btn @click="editItems[item.id] = true">edit</v-btn>
            </template>
            <template v-if="editItems[item.id] == true">
                <v-text-field label="value" v-model="item.value"></v-text-field>
                <v-text-field label="label" v-model="item.label"></v-text-field>
                <v-btn @click="updateItem(item)">update</v-btn>
                <v-btn color="red" @click="deleteItem(item.id)">delete</v-btn>
            </template>
        </div>

        <pre>{{ items }}</pre>
    </div>
</template>

<script>
import { supabase } from '@/library/supabase';

export default {
    data() {
        return {
            items: [],
            value: "",
            label: "",
            editItems: {}
        }
    },

    mounted() {
        this.loadItems()
    },

    methods: {
        async loadItems() {
            const { data, error } = await supabase
                .from("todo")
                .select("*")
                .order("id", { ascending: true });

            if (!error) this.items = data;
        },

        async createItem() {
            const { data, error } = await supabase
                .from("todo")
                .insert([
                    {
                        label: this.label,
                        value: this.value,
                    },
                ])
                .select();

            if (!error) {
                this.loadItems()
            }
        },

        async updateItem(item) {
            const { error } = await supabase
                .from("todo")
                .update({
                    label: item.label,
                    value: item.value,
                })
                .eq("id", item.id)
                .select();

            if (!error) {
                this.loadItems()
                this.editItems[item.id] = false
            }
        },

        async deleteItem(id) {
            const { error } = await supabase.from("todo")
                .delete()
                .eq("id", id);

            if (!error) {
                this.loadItems()
                this.editItems[item.id] = false
                // reload items
                // success notification
            }
        },

    }
}
</script>

<style lang="scss" scoped></style>
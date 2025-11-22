<template>
    <v-container class="pa-6">
        <!-- CREATE BUTTON -->
        <v-btn variant="elevated" color="primary" class="mb-4" @click="openCreateDialog">
            Add Book
        </v-btn>

        <!-- DATA TABLE -->
        <v-data-table :headers="headers" :items="books" item-key="id" class="elevation-1">
            <!-- COVER CELL -->
            <template #item.cover="{ item }">
                <v-img v-if="item.cover" :src="item.cover" width="50" height="70" cover class="rounded" />
                <div v-else class="d-flex align-center justify-center"
                    style="width:50px;height:70px;background:#eee;color:#999;font-size:12px;">
                    No Image
                </div>
            </template>

            <!-- ACTION CELL -->
            <template #item.actions="{ item }">
                <v-btn icon="mdi-pencil" color="primary" @click="openEditDialog(item)" density="comfortable"
                    size="small" class="mr-1" variant="outlined"></v-btn>

                <v-btn icon="mdi-delete" color="red" @click="deleteBook(item.id)" density="comfortable" size="small"
                    variant="outlined"></v-btn>
            </template>
        </v-data-table>

        <!-- DIALOG (Create + Edit) -->
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h6">
                        {{ editingBook ? "Edit Book" : "Add Book" }}
                    </span>
                </v-card-title>

                <v-card-text>
                    <v-text-field v-model="form.title" label="Title" variant="outlined" />
                    <v-text-field v-model="form.author" label="Author" variant="outlined" />

                    <v-select v-model="form.genre" :items="genres" label="Genre" variant="outlined" />

                    <v-text-field v-model.number="form.price" type="number" label="Price" variant="outlined" />

                    <v-text-field v-model.number="form.quantity" type="number" label="Stock" variant="outlined" />

                    <!-- IMAGE UPLOAD -->
                    <v-file-input label="Upload Cover" variant="outlined" accept="image/*"
                        @update:model-value="handleImageUpload" />

                    <v-img v-if="form.cover" :src="form.cover" width="100" height="140" class="mt-3 rounded" cover />
                </v-card-text>

                <v-card-actions>
                    <v-spacer />
                    <v-btn size="sm" text @click="closeDialog">Cancel</v-btn>
                    <v-btn color="primary" variant="elevated" @click="saveBook">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { supabase } from "@/library/supabase";
import { toast } from "vue3-toastify";

export default {
    name: "BookInventory",

    data() {
        return {
            dialog: false,
            editingBook: null,

            form: {
                id: null,
                title: "",
                author: "",
                genre: "",
                price: null,
                quantity: null,
                cover: "",
            },

            genres: ["Horror", "Comedy", "Science", "Romance", "Fantasy"],

            books: [],

            headers: [
                { title: "Cover", value: "cover", width: 90 },
                { title: "Title", value: "title" },
                { title: "Author", value: "author" },
                { title: "Genre", value: "genre" },
                { title: "Price", value: "price" },
                { title: "Stock", value: "quantity" },
                { title: "Actions", value: "actions", sortable: false, width: 130 },
            ],
        };
    },

    mounted() {
        this.fetchBooks();
    },

    methods: {
        // LOAD
        async fetchBooks() {
            const { data, error } = await supabase
                .from("book")
                .select("*")
                .order("created_at", { ascending: true });

            if (!error) this.books = data;
        },

        // OPEN DIALOGS
        openCreateDialog() {
            this.editingBook = null;
            this.form = {
                id: null,
                title: "",
                author: "",
                genre: "",
                price: null,
                quantity: null,
                cover: "",
            };
            this.dialog = true;
        },

        openEditDialog(book) {
            this.editingBook = book;
            this.form = { ...book };
            this.dialog = true;
        },

        closeDialog() {
            this.dialog = false;
        },

        // SAVE (Create / Edit)
        async saveBook() {
            if (!this.form.title || !this.form.author) return;

            if (this.editingBook) {
                await this.updateBook();
            } else {
                await this.createBook();
            }

            this.dialog = false;
            this.fetchBooks();
        },

        // CREATE
        async createBook() {
            const payload = { ...this.form };
            delete payload.id;

            const { error } = await supabase.from("book").insert([payload]);

            if (!error) toast.success("Book Created");
        },

        // UPDATE
        async updateBook() {
            const { error } = await supabase
                .from("book")
                .update(this.form)
                .eq("id", this.editingBook.id);

            if (!error) toast.success("Book Updated");
        },

        // DELETE
        async deleteBook(id) {
            const { error } = await supabase.from("book").delete().eq("id", id);

            if (!error) {
                toast.success("Book Deleted");
                this.fetchBooks();
            }
        },

        // IMAGE UPLOAD
        async handleImageUpload(fileList) {
            const file = fileList;
            if (!file) return;

            const ext = file.name.split(".").pop();
            const fileName = `${Date.now()}.${ext}`;
            const filePath = `book-covers/${fileName}`;

            // upload file to storage
            const { error } = await supabase.storage
                .from("bookstore")
                .upload(filePath, file);

            if (error) return toast.error("Upload failed");

            // get file public url
            const { data } = supabase.storage
                .from("bookstore")
                .getPublicUrl(filePath);

            this.form.cover = data.publicUrl;

            //   toast.success("Cover Uploaded");
        },
    },
};
</script>

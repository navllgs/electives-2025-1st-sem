<template>
    <v-container class="py-0" style="max-width: 900px;">
        <!-- ==================== BOOK SALE FORM ==================== -->
        <v-card class="px-4 py-2 mb-6" elevation="2">
            <v-card-title class="text-h6">Book Sale Transaction</v-card-title>
              <v-form ref="formRef">
                <!-- SEARCH + SELECT TABLE -->
                <v-text-field v-model="search" label="Search book..." variant="outlined" density="compact"
                    @input="filterBooks" />

                <v-data-table items-per-page="5" :headers="bookHeaders" :items="filteredBooks" height="200" density="compact"
                    class="elevation-1 mb-4" @click:row="selectBook">
                    <template #item.cover="{ item }">
                        <v-img v-if="item.cover" :src="item.cover" width="50" height="70" cover class="rounded" />
                        <div v-else class="d-flex align-center justify-center"
                            style="width:50px;height:70px;background:#eee;color:#999;font-size:12px;">
                            No Image
                        </div>
                    </template>
                </v-data-table>

                <!-- SELECTED BOOK INFO -->
                <div v-if="form.book_id" class="mb-4">
                    <p class="text-body-1"><b>{{ selectedBook.title }}</b></p>
                    <p class="text-caption">Available Quantity: {{ selectedBook.quantity }}</p>
                </div>

                <!-- FORM INPUTS -->
                <v-text-field v-model="form.customer_name" label="Customer Name" variant="outlined" density="compact"
                    :rules="[v => !!v || 'Required']" />

                <v-textarea v-model="form.note" label="Note" variant="outlined" density="compact" rows="2" />

                <v-text-field v-model.number="form.quantity" label="Quantity" type="number" variant="outlined"
                    density="compact" :disabled="!form.book_id" :rules="[
                        v => !!v || 'Required',
                        v => v >= 1 || 'Min 1',
                        v => v <= selectedBook.quantity || 'Exceeds available quantity'
                    ]" />

                <v-text-field v-model="form.price" label="Price" disabled variant="outlined" density="compact" />

                <div class="my-3 text-subtitle-1">
                    <b>Total: ₱ {{ form.price * form.quantity }}</b>
                </div>

                <v-btn :disabled="!selectedBook.id" color="primary" variant="elevated" @click="submit">
                    Submit
                </v-btn>
            </v-form>
        </v-card>

        <!-- ==================== TRANSACTION LIST ==================== -->
        <v-card class="pa-4">
            <v-card-title class="text-h6">Transaction History</v-card-title>

            <v-data-table :headers="transactionHeaders" :items="transactions" class="elevation-1" density="compact">
                <template #item.total="{ item }">
                    ₱ {{ item.price * item.quantity }}
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
import { supabase } from "@/library/supabase";
import { toast } from "vue3-toastify";

export default {
    name: "BookTransaction",

    data() {
        return {
            isValid: false,

            form: {
                book_id: null,
                customer_name: "",
                note: "",
                quantity: 1,
                price: 0,
            },

            books: [],
            filteredBooks: [],
            selectedBook: {},

            search: "",
            transactions: [],

            bookHeaders: [
                { title: "Cover", value: "cover", width: 90 },
                { title: "Title", value: "title" },
                { title: "Author", value: "author" },
                { title: "Price", value: "price" },
                { title: "Available", value: "quantity" },
            ],

            transactionHeaders: [
                { title: "Customer", value: "customer_name" },
                { title: "Book", value: "title" },
                { title: "Note", value: "note" },
                { title: "Qty", value: "quantity" },
                { title: "Price", value: "price" },
                { title: "Total", value: "total" },
            ],
        };
    },

    mounted() {
        this.fetchBooks();
        this.fetchTransactions();
    },

    methods: {
        /* ----------------------------------
         *  FETCH BOOKS
         * ---------------------------------- */
        async fetchBooks() {
            const { data, error } = await supabase
                .from("book")
                .select("*")
                .gte("quantity", 1)
                .order("created_at", { ascending: true });

            if (!error) {
                this.books = data;
                this.filteredBooks = data;
            } else {
                toast.error("Failed to load books");
            }
        },

        /* FILTER */
        filterBooks() {
            const key = this.search.toLowerCase();
            this.filteredBooks = this.books.filter((b) =>
                b.title.toLowerCase().includes(key)
            );
        },

        /* SELECT BOOK IN TABLE */
        selectBook(_, item) {
            const row = item.item;

            if (!row || row.quantity <= 0) {
                toast.warning("Book not available");
                return;
            }

            this.form.book_id = row.id;
            this.form.price = row.price;
            this.form.quantity = 1;

            this.selectedBook = row;
        },

        /* ----------------------------------
         *  FETCH TRANSACTIONS
         * ---------------------------------- */
        async fetchTransactions() {
            const { data, error } = await supabase
                .from("bookTransaction")
                .select(`*, book(title)`)
                .order("id", { ascending: false })
                .limit(20);

            if (!error) {
                this.transactions = data.map((t) => ({
                    ...t,
                    title: t.book?.title || "",
                }));
            }
        },

        /* ----------------------------------
         *  SUBMIT TRANSACTION
         * ---------------------------------- */
        async submit() {
            const response = await this.$refs.formRef.validate()
            if (!response?.valid) {
                if (this.form.quantity > this.selectedBook.quantity) {
                    toast.error("Quantity exceeds available stock");
                    return;
                }

                toast.error("Please fix validation errors");
                return;
            }

            const { error: insertError } = await supabase
                .from("bookTransaction")
                .insert([
                    {
                        book_id: this.form.book_id,
                        customer_name: this.form.customer_name,
                        note: this.form.note,
                        quantity: this.form.quantity,
                        price: this.form.price,
                    },
                ]);

            if (insertError) {
                toast.error("Failed to save transaction");
                return;
            }

            /* UPDATE BOOK STOCK */
            const newQty = this.selectedBook.quantity - this.form.quantity;
            const { error: updateError } = await supabase
                .from("book")
                .update({ quantity: newQty })
                .eq("id", this.form.book_id);

            if (updateError) {
                toast.warning("Transaction saved, but failed to update stock");
            }

            toast.success("Transaction completed!");

            this.resetForm();
            this.fetchBooks();
            this.fetchTransactions();
        },

        /* RESET FORM */
        resetForm() {
            this.form = {
                book_id: null,
                customer_name: "",
                note: "",
                quantity: 1,
                price: 0,
            };
            this.selectedBook = {};
            this.search = "";
        },
    },
};
</script>

<style scoped>
/* Optional highlight for unavailable rows */
.row-disabled {
    background-color: #f5f5f5 !important;
    color: #aaa !important;
    pointer-events: none !important;
}
</style>

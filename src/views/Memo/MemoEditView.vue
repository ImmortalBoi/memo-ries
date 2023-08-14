<script setup>
import { ref } from "vue";
import router from "../../router";
import { useDatabaseObject } from "vuefire";
import { getDatabase, ref as DBref, update } from "firebase/database";
import { store } from "../../store";

const user = store.user.uid;
const MemoID = router.currentRoute.value.params.id;

const db = getDatabase();
const Data = useDatabaseObject(DBref(db, "users/" + user + "/memo/" + MemoID));
const titleValue = ref(Data.value.title);
const messageValue = ref(Data.value.message);
const err = ref("");

function editMemo() {
    update(DBref(db, "users/" + user + "/memo/" + MemoID), {
        message: messageValue.value,
        title: titleValue.value,
    })
        .then(() => {
            router.push("/memos/" + MemoID);
        })
        .catch((error) => {
            console.log(error);
            err.value = "Error in writing data to database, check your data";
        });
}
</script>

<template>
    <div class="p-5 bg-background font-jomhuria">
        <div class="flex flex-row justify-between items-center">
            <p class="pl-2 font-semibold text-4xl -mb-5">
                Change Memo<span class="text-error text-lg">{{ err }}</span>
            </p>
            <button type="button" @click="editMemo"
                class="sm:block bg-primary hover:bg-secondary focus:ring-2 focus:outline-none focus:ring-accent font-medium rounded-lg text-3xl -mb-4 px-5 py-2.5 text-center mr-3 md:mr-0 ml-8">
                Edit Memo
            </button>
        </div>
        <hr class="h-px my-2 w-3/5 mx-auto bg-accent border-0" />
        <div class="py-2">
            <label for="title" class="block text-3xl font-medium text-text">Title of Memo</label>
            <input v-model="titleValue" type="text"
                class="block p-2.5 w-full text-text bg text-3xl rounded-lg border border-text focus:ring-accent focus:border-primary"
                :placeholder="Data.title" required />
        </div>

        <div class="py-2">
            <label for="message" class="block text-3xl font-medium text-text">Description of Memo</label>
            <textarea v-model="messageValue" id="message" rows="30"
                class="block p-2.5 w-full text-text bg text-3xl rounded-lg border border-text focus:ring-accent focus:border-primary"
                :placeholder="Data.message" required>
            </textarea>
        </div>
    </div>
</template>

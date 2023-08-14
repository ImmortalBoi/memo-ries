<script setup>
import { ref } from "vue";
import router from "../../router";
import { getDatabase, ref as DBref, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const user = getAuth().currentUser.uid;
const messageValue = ref("");
const titleValue = ref("");
let err = ref("");

function writeUserData() {
    const db = getDatabase();
    push(DBref(db, 'users/' + user + "/memo/"), {
        title: titleValue.value,
        message: messageValue.value,
        time: Date.now(),
    })
        .then(() => {
            console.log("completed");
            router.push("/memos");
        })
        .catch((error) => {
            console.log(error);
            err.value = "Error in writing data to database, check your data";
        });
}
</script>

<template>
    <div class="bg-background p-5 font-jomhuria">
        <div class="flex flex-row justify-between items-center">
            <p class=" pl-2 font-semibold text-4xl -mb-5">
                New Memo<span class="text-error text-lg">{{ err }}</span>
            </p>
            <button type="button" @click="writeUserData"
                class="sm:block text-secondary bg-primary hover:bg-secondary hover:text-primary focus:ring-2 focus:outline-none focus:ring-accent font-medium rounded-lg text-2xl px-4 py-2.5 text-center mr-3 md:mr-0 ml-8">
                Save Memo
            </button>
        </div>
        <hr class="h-px my-2 w-3/5 mx-auto bg-accent border-0" />
        <div class="py-2">
            <label for="first_name" class="block mb-2 text-3xl font-medium text-text">Title of Memo</label>
            <input v-model="titleValue" type="text" id="first_name"
                class="block p-2.5 w-full text-3xl texttext bg-secondary rounded-lg border border-accent focus:ring-accent focus:border-accent"
                placeholder="Enter your title of the memo..." required />
        </div>

        <div class="py-2">
            <label for="message" class="block mb-2 text-3xl font-medium text-text">Description of Memo</label>
            <textarea v-model="messageValue" id="message" rows="30"
                class="block p-2.5 w-full text-3xl texttext bg-secondary rounded-lg border border-accent focus:ring-accent focus:border-accent"
                placeholder="Enter your description of the memo..." required>
            </textarea>
        </div>
    </div>
</template>

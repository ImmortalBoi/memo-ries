<script setup>
import router from "../../router";
import { useDatabaseObject } from "vuefire";
import { getDatabase, ref as DBref, remove } from "firebase/database";
import { store } from "../../store";

const user = store.user.uid;
const MemoID = router.currentRoute.value.params.id;

const db = getDatabase();
const Data = useDatabaseObject(DBref(db, "users/" + user + "/memo/" + MemoID));

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};

function deleteMemory() {
    const db = getDatabase();
    remove(DBref(db, "users/" + user +  "/memo/" + MemoID)).then(() => {
        router.push("/memos");
    });
}
</script>

<template>
    <div class="p-5 font-jomhuria bg-background" v-if="Data">
        <div class="flex flex-row justify-between items-center mb-7">
            <p class="pl-2 font-semibold text-4xl -mb-5">
                {{ Data.title }}<span class="text-error text-3xl">{{ err }}</span>
            </p>
            <button type="button" @click="router.push(Data.id + '/edit')"
                class="sm:block bg-primary hover:bg-secondary focus:ring-2 focus:outline-none focus:ring-accent font-medium rounded-lg text-3xl -mb-4 px-5 py-2.5 text-center mr-3 md:mr-0 ml-8">
                Edit Memo
            </button>
        </div>
        <hr class="h-px my-2 w-3/5 mx-auto bg-accent border-0" />
        <div class="p-2 relative bg-secondary max-w-screen rounded-xl border border-text">
            <div class="absolute top-2 right-2">
                <button @click="deleteMemory"><font-awesome-icon class="  hover:text-stone-700 text-text" icon="fa-solid fa-trash-can" /></button>
            </div>
            <pre class="text-text overflow-wrap whitespace-pre-wrap">{{
                Data.message
            }}</pre>
            <p class="text-3xl text-stone-700 -mb-4 text-right">
                {{ new Date(Data.time).toLocaleString("en-US", options) }}
            </p>
        </div>
    </div>
</template>

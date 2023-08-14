<script setup>
import { ref } from "vue";
import axios from "axios";
import router from "../../router";
import { getDatabase, ref as DBref, push } from "firebase/database";
import { store } from "../../store";

const user = store.user.uid;
const dateValue = ref("");
const messageValue = ref("");
const titleValue = ref("");
let err = ref("");
let selectedFile = null;

function onFileSelected(event) {
    selectedFile = event.target.files[0];
    console.log(selectedFile);
}

function writeUserData(imageUrl) {
    const db = getDatabase();
    push(DBref(db, user + "/memories/"), {
        time: Date.parse(dateValue.value),
        title: titleValue.value,
        message: messageValue.value,
        imageUrl: imageUrl + "?0307",
        bookmarked: false,
    })
        .then(() => {
            console.log("completed");
            router.push("/");
        })
        .catch((error) => {
            console.log(error);
            err.value = "Error in writing data to database, check your data";
        });
}

function fileUpload() {
    const fd = new FormData();
    fd.append("media", selectedFile);
    fd.append("key", "00002e92ae0e849408e072cfd6c18c67");
    console.log(fd);

    axios({
        method: "post",
        url: "https://thumbsnap.com/api/upload",
        data: fd,
        headers: { "Content-Type": "multipart/form-data" },
    })
        .then((res) => {
            console.log(res.data.data);
            writeUserData(res.data.data.media);
        })
        .catch(function (error) {
            err.value = "Error in writing image to database, check your data";
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}
</script>

<template>
    <div class="bg-background p-5 font-jomhuria">
        <div class="flex flex-row justify-between items-center">
            <p class=" pl-2 font-semibold text-4xl leading-none -mb-2">
                New Memory <span class="text-error text-lg">{{ err }}</span>
            </p>
            <button type="button" @click="fileUpload"
            class="sm:block text-secondary bg-primary hover:bg-secondary hover:text-primary focus:ring-2 focus:outline-none focus:ring-accent font-medium rounded-lg text-2xl px-4 py-2.5 text-center mr-3 md:mr-0 ml-8">
                Save Memory
            </button>
        </div>
        <hr class="h-px my-2 w-3/5 mx-auto bg-accent border-0" />
        <div class="py-2">
            <label for="first_name" class="block text-3xl font-medium text-text">Title of Memory</label>
            <input v-model="titleValue" type="text" id="first_name"
                class="block p-2.5 w-full text-3xl leading-3  text-text bg-secondary rounded-lg border border-accent focus:ring-accent focus:border-accent"
                placeholder="Enter your title of the memory..." required />
        </div>

        <div class="">
            <label for="message" class="block text-3xl font-medium text-text">Date of Memory</label>
            <vue-tailwind-datepicker placeholder="Enter your date of the memory..." input-classes="leading-3 block p-2.5 w-full text-3xl text-text bg-secondary rounded-lg 
                border border-accent focus:ring-accent focus:border-accent" as-single v-model="dateValue" />
        </div>

        <div class="py-3">
            <label class="block text-3xl font-medium text-text" for="file_input">Upload Image of Memory</label>
            <input @change="onFileSelected"
                class="overflow-hidden pb-1 block w-full text-xl leading-3 text-text border border-accent rounded-lg cursor-pointer bg-secondary focus:outline-none"
                aria-describedby="file_input_help" id="file_input" type="file" />
            <p class="ml-1 mt-1 text-xl text-stone-500 " id="file_input_help">
                PNG, JPG.
            </p>
        </div>

        <div class="py-2">
            <label for="message" class="block text-3xl font-medium text-text">Description of Memory</label>
            <textarea v-model="messageValue" id="message" rows="30"
                class="block p-2.5 w-full text-3xl texttext bg-secondary rounded-lg border border-accent focus:ring-accent focus:border-accent"
                placeholder="Enter your description of the memory..." required>
            </textarea>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import NavBar from "./components/NavBar/NavBar.vue";
let toggleHidden = ref("justify-between items-center w-full md:flex md:w-auto md:order-1 md:mx-3")

function changeToggleHidden() {
    toggleHidden.value = (toggleHidden.value === "hidden" ? "justify-between items-center w-full md:flex md:w-auto md:order-1 md:mx-3" : "hidden")
}
</script>

<template>
    <div class="bg-background min-h-screen">
        <NavBar :toggleHidden="toggleHidden" @updateToggleHidden="changeToggleHidden"/>
        <router-view />
    </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Jomhuria&display=swap");
</style>

<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";
defineProps(["toggleHidden"]);
defineEmits(["updateToggleHidden"]);

import router from "../../router"
import { store } from "../../store"

let err = ref()
async function signOut(){
    const result = await store.signOut();
    if (result.success) {
        router.push('/login');
    } else {
        // handle error
        err.value = result.error.code + result.error.message
        console.error(result.error);
    }
}

async function deleteAccount(){
    const result = await store.deleteUser();
    if (result.success) {
        router.push('/signup');
    } else {
        // handle error
        err.value = result.error.code + result.error.message
        console.error(result.error);
    }
}

function checkValid(routeName, buttonName) {
    if (routeName === buttonName) {
        return "block text-3xl -mb-3  pr-4 pl-3 text-text md:text-background md:bg-primary md:text-background md:p-0 ";
    }
    return "block text-3xl -mb-3 pr-4 pl-3 text-text md:hover:text-background md:p-0";
}

function checkIfLogin(routeName) {
    if (routeName === "login" || routeName === "signup") {
        return "hidden";
    }
    return "";
}
</script>

<template>
    <div :class="checkIfLogin($route.name)">
        <nav
            class="font-jomhuria bg-primary px-5 py-2.5  w-full z-20 top-0 left-0 border-b border-primary  transition ease-in-out delay-20">
            <div class="w-full flex flex-wrap justify-between items-center">
                <div class="flex items-center">
                    <svg width="65" height="45" viewBox="0 0 65 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M28.1667 44.9015C29.3854 45.2897 30.6944 44.4826 30.6944 43.3179V4.76089C30.6944 4.33179 30.5139 3.9027 30.1302 3.63707C27.9184 2.0433 22.8403 0 16.25 0C10.5512 0 5.22483 1.35879 2.04253 2.46218C0.767361 2.9117 0 4.05595 0 5.29214V43.1238C0 44.3396 1.44444 45.1876 2.71962 44.8096C6.27431 43.7368 11.9054 42.5006 16.25 42.5006C20.0755 42.5006 25.1649 43.9309 28.1667 44.9015ZM36.8333 44.9015C39.8351 43.9309 44.9245 42.5006 48.75 42.5006C53.0946 42.5006 58.7257 43.7368 62.2804 44.8096C63.5556 45.1978 65 44.3396 65 43.1238V5.29214C65 4.05595 64.2326 2.9117 62.9575 2.47239C59.7752 1.35879 54.4488 0 48.75 0C42.1597 0 37.0816 2.0433 34.8698 3.63707C34.4974 3.9027 34.3056 4.33179 34.3056 4.76089V43.3179C34.3056 44.4826 35.6259 45.2897 36.8333 44.9015Z"
                            fill="#E1EFE1" />
                    </svg>
                    <span
                        class="self-center text-text text-4xl pl-3 -mb-2 font-semibold whitespace-nowrap ">Memo-ries</span>
                </div>
                <div class="flex md:order-2">
                    <div class="dropdown">
                        <button
                            class="hidden sm:block text-white bg-primary focus:ring-2 focus:outline-none focus:ring-background font-medium rounded-lg text-sm text-center md:mr-5 ml-8  ">
                            <svg width="55" height="45" viewBox="0 0 103 89" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M60 44C63.7888 44 67.4224 42.5777 70.1015 40.0459C72.7806 37.5142 74.2857 34.0804 74.2857 30.5C74.2857 26.9196 72.7806 23.4858 70.1015 20.9541C67.4224 18.4223 63.7888 17 60 17C56.2112 17 52.5776 18.4223 49.8985 20.9541C47.2194 23.4858 45.7143 26.9196 45.7143 30.5C45.7143 34.0804 47.2194 37.5142 49.8985 40.0459C52.5776 42.5777 56.2112 44 60 44ZM54.8996 49.0625C43.9062 49.0625 35 57.4789 35 67.8676C35 69.5973 36.4844 71 38.3147 71H81.6853C83.5156 71 85 69.5973 85 67.8676C85 57.4789 76.0938 49.0625 65.1004 49.0625H54.8996Z" fill="#E1EFE1"/>
                                <path d="M18.9911 48.3828C19.5491 48.8711 20.4554 48.8711 21.0134 48.3828L28.1563 42.1328C28.7143 41.6445 28.7143 40.8516 28.1563 40.3633C27.5982 39.875 26.692 39.875 26.1339 40.3633L20 45.7305L13.8661 40.3672C13.308 39.8789 12.4018 39.8789 11.8438 40.3672C11.2857 40.8555 11.2857 41.6484 11.8438 42.1367L18.9866 48.3867L18.9911 48.3828Z" fill="#E1EFE1"/>
                            </svg>
                        </button>
                        <div class="dropdown-content rounded-lg">
                            <button @click="signOut()"> Sign Out </button>
                            <button class="bg-error" @click="deleteAccount()"> Delete Account </button>
                        </div>
                    </div>

                    <button @click="$emit('updateToggleHidden')"
                        class="inline-flex items-center p-2 text-sm text-text rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200   ">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div :class="toggleHidden">
                    <ul
                        class="text-text md:bg-primary bg-background mb-1 pb-5 pt-3 rounded-xl flex flex-col md:p-4 md:ml-2 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
                        <li>
                            <router-link to="/about" :class="checkValid($route.name, 'about')">
                                About</router-link>
                        </li>
                        <li>
                            <router-link to="/memos" :class="checkValid($route.name, 'memos')">
                                Memos</router-link>
                        </li>
                        <li>
                            <router-link to="/" :class="checkValid($route.name, 'memories')" aria-current="page">
                                Memories</router-link>
                        </li>
                        <li>
                            <router-link to="/" :class="checkValid($route.name, 'bookmark')">
                                Bookmarks</router-link>
                        </li>
                        <!-- <li>
                            
                        </li> -->
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<style>
.dropbtn {
    background-color: #04AA6D;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

.dropdown-content button {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-size:x-large;
}

.dropdown-content a:hover {background-color: #ddd;}

.dropdown:hover .dropdown-content {display: block;}

.dropdown:hover .dropbtn {background-color: #3e8e41;}
</style>

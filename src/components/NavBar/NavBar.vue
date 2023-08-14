<script setup>
import { defineProps, defineEmits } from "vue";
defineProps(["toggleHidden"]);
defineEmits(["updateToggleHidden"]);

function checkValid(routeName, buttonName) {
    if (routeName === buttonName) {
        return "block text-3xl -mb-3  pr-4 pl-3 text-background bg-primary md:text-background md:p-0 ";
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
                    <router-link to="/"
                        class="hidden sm:block text-white bg-primary focus:ring-2 focus:outline-none focus:ring-background font-medium rounded-lg text-sm px-5 text-center md:mr-0 ml-8  ">
                        <svg width="55" height="45" viewBox="0 0 103 89" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M60 44C63.7888 44 67.4224 42.5777 70.1015 40.0459C72.7806 37.5142 74.2857 34.0804 74.2857 30.5C74.2857 26.9196 72.7806 23.4858 70.1015 20.9541C67.4224 18.4223 63.7888 17 60 17C56.2112 17 52.5776 18.4223 49.8985 20.9541C47.2194 23.4858 45.7143 26.9196 45.7143 30.5C45.7143 34.0804 47.2194 37.5142 49.8985 40.0459C52.5776 42.5777 56.2112 44 60 44ZM54.8996 49.0625C43.9062 49.0625 35 57.4789 35 67.8676C35 69.5973 36.4844 71 38.3147 71H81.6853C83.5156 71 85 69.5973 85 67.8676C85 57.4789 76.0938 49.0625 65.1004 49.0625H54.8996Z"
                                fill="#E1EFE1" />
                        </svg>
                    </router-link>
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
                        class="text-text flex flex-col p-4 md:ml-2 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
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
                        <li>
                            <router-link to="/"
                                class="text-text text-3xl flex-row md:hidden block py-2 pr-4 pl-2.5 rounded md:hover:bg-transparent md:hover:text-primary md:p-0 ">
                                <svg width="20" height="22" viewBox="0 0 50 55" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M25 27C28.7888 27 32.4224 25.5777 35.1015 23.0459C37.7806 20.5142 39.2857 17.0804 39.2857 13.5C39.2857 9.91958 37.7806 6.4858 35.1015 3.95406C32.4224 1.42232 28.7888 0 25 0C21.2112 0 17.5776 1.42232 14.8985 3.95406C12.2194 6.4858 10.7143 9.91958 10.7143 13.5C10.7143 17.0804 12.2194 20.5142 14.8985 23.0459C17.5776 25.5777 21.2112 27 25 27ZM19.8996 32.0625C8.90625 32.0625 0 40.4789 0 50.8676C0 52.5973 1.48438 54 3.31473 54H46.6853C48.5156 54 50 52.5973 50 50.8676C50 40.4789 41.0938 32.0625 30.1004 32.0625H19.8996Z"
                                        fill="#0E0911" />
                                </svg>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { store } from "../store"
import router from '../router/index'

const email = ref("");
const password = ref("");

// Will be reactive and always represent the current user
let err = ref('')

async function signUp() {
    const result = await store.signUp(email.value, password.value);
    if (result.success) {
        router.push('/');
    } else {
        err.value = result.error
        console.error(result.error);
    }
}
</script>

<template>
    <section class="bg-background font-jomhuria">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="flex items-center mb-6">
                <svg width="65" height="45" viewBox="0 0 65 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M28.1667 44.9015C29.3854 45.2897 30.6944 44.4826 30.6944 43.3179V4.76089C30.6944 4.33179 30.5139 3.9027 30.1302 3.63707C27.9184 2.0433 22.8403 0 16.25 0C10.5512 0 5.22483 1.35879 2.04253 2.46218C0.767361 2.9117 0 4.05595 0 5.29214V43.1238C0 44.3396 1.44444 45.1876 2.71962 44.8096C6.27431 43.7368 11.9054 42.5006 16.25 42.5006C20.0755 42.5006 25.1649 43.9309 28.1667 44.9015ZM36.8333 44.9015C39.8351 43.9309 44.9245 42.5006 48.75 42.5006C53.0946 42.5006 58.7257 43.7368 62.2804 44.8096C63.5556 45.1978 65 44.3396 65 43.1238V5.29214C65 4.05595 64.2326 2.9117 62.9575 2.47239C59.7752 1.35879 54.4488 0 48.75 0C42.1597 0 37.0816 2.0433 34.8698 3.63707C34.4974 3.9027 34.3056 4.33179 34.3056 4.76089V43.3179C34.3056 44.4826 35.6259 45.2897 36.8333 44.9015Z"
                        fill="#a9d1bd" />
                </svg>
                <span class="self-center text-text text-4xl pl-3 font-semibold whitespace-nowrap">Memo-ries</span>
            </div>
            <div class="w-full bg-secondary rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
                        Create an account
                    </h1>
                    <div class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="email" class="block text-2xl font-medium text-gray-900">Your email</label>
                            <input type="email" name="email" id="email" v-model="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="name@company.com" required="" />
                        </div>
                        <div>
                            <label for="password" class="block text-2xl font-medium text-gray-900">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" v-model="password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required="" />
                        </div>
                        <div>
                            <label for="confirm-password" class="block text-2xl font-medium text-gray-900">Confirm
                                password</label>
                            <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required="" />
                        </div>
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input id="terms" aria-describedby="terms" type="checkbox"
                                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                    required="" />
                            </div>
                            <div class="ml-3 text-2xl -mt-1">
                                <label for="terms" class="font-light text-gray-500">I accept the
                                    <a class="font-medium text-primary-600 hover:underline" href="#">Terms and
                                        Conditions</a></label>
                            </div>
                        </div>
                        <button @click="signUp()"
                            class="w-full  text-secondary bg-primary hover:bg-secondary hover:text-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-2xl px-5 py-2.5 text-center">
                            Create an account
                        </button>
                        <div v-if="err"
                            class="bg-error text-secondary w-full font-medium rounded-lg text-2xl px-5 py-2.5 text-center">
                            {{ err }}
                        </div>
                        <p class="text-2xl font-light text-gray-500">
                            Already have an account?
                            <router-link to="/login" class="font-medium text-primary-600 hover:underline">Login
                                here</router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

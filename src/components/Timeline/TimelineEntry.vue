<script setup>
    import { defineProps } from 'vue';
    import { getDatabase, ref as DBref, update, remove} from "firebase/database";
    import router from '../../router'
    import { store } from "../../store";

    const user = store.user.uid;
    const props = defineProps(['Direction','Title','Text','img','memoryDate','ID','Bookmark'])
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    function updateMemory() {
        const db = getDatabase();
        update(DBref(db, user + '/memories/'+props.ID),{
            bookmarked: !props.Bookmark
        })
        console.log("Updating memory at link" + user + '/memories/'+props.ID+'/bookmarked' +"with bookmark value: "+!(props.Bookmark))
    }

    function deleteMemory() {
        const db = getDatabase();
        remove(DBref(db,user + '/memories/'+props.ID)).then(
            ()=>{
                router.push('/')
            }
        )
    }
</script>

<template>
        <div v-if="Direction==='left'" class="flex flex-row w-full">
        <!-- full component left-->
            <!-- left col -->
            <div class="group order-1 w-4/5 md:order-1 md:w-[44.4444444444%] px-2 py-10  md:h-auto min-h-25">    
                <div class="relative transition ease-in-out delay-20 flex flex-col items-center bg-secondary overflow-hidden
                    border border-lg hover:ring-accent border-accent rounded-lg hover:ring-2 
                    shadow md:flex-row md:max-w-xl group-hover:bg-stone-100   ">
                    <img loading="lazy" 
                        class="transition ease-in-out delay-20 filter stonescale group-hover:stonescale-0 lg:blur-sm group-hover:blur-none object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" 
                        :src="img" alt="">
                    <div class=" md:h-auto flex flex-col justify-between p-4 ">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-text ">{{Title}}</h5>
                        <p class="mb-3 font-normal text-stone-700 ">{{Text}}</p>

                        <!-- Buttons Start -->
                        <div class="absolute top-1 right-1 text-xl ">
                            <button @click="updateMemory">
                                <font-awesome-icon v-if="!Bookmark" class="pr-1 hover:text-stone-700 text-text" icon="fa-solid fa-bookmark" />
                                <font-awesome-icon v-if="Bookmark" class="pr-1 hover:text-teal-900 text-accent" icon="fa-solid fa-bookmark" />
                            </button>
                            <button @click="deleteMemory"><font-awesome-icon class="hover:text-stone-700 text-text" icon="fa-solid fa-trash-can" /></button>
                        </div>
                        <router-link :to="'/memories/'+ID" class="absolute bottom-0 right-0">
                            <button class="px-2 bg-accent hover:bg-primary rounded-tl-lg">
                                See Details
                            </button>
                        </router-link>

                        <!-- Buttons End -->
                    </div>
                </div>
            </div>
            <!-- left col end -->

            <!--line col-->
            <div class="drop-shadow-lg order-2 w-1/5 ml-4 md:w-[11.111111%] flex justify-center">
                <div class="relative flex h-full w-1 bg-accent  items-center justify-center">
                    <div class="absolute flex flex-col justify-center pt-3
                    h-24 w-24 md:h-29 md:w-29 rounded-full 
                    border-2 border-accent hover:ring-accent hover:ring-2  
                    leading-none text-center z-10 overflow-hidden secondaryspace-pre-line
                    bg-stone-100   font-black">
                        {{new Date(memoryDate).toLocaleString("en-US", options)}}
                    </div>
                </div>
            </div>
            <!-- line col end -->



            <!--right col-->
            <div class="hidden md:block md:order-3 md:w-[44.4444444444%] px-2 py-10 ">
            </div>
            <!-- right col end -->

        <!-- full component left end -->
        </div>

        <div v-if="Direction==='right'" class="flex flex-row w-full">
        <!-- full component right start-->

            <!-- left col -->
            <div class="hidden order-3  md:block md:order-1 md:w-[44.4444444444%] px-2 py-10">
            </div>
            <!-- left col end -->

            <!--line col-->
            <div class="drop-shadow-lg order-2 w-1/5 ml-4 md:w-[11.111111%] flex justify-center">
                <div class="relative flex h-full w-1 bg-accent  items-center justify-center">
                    <div class="absolute flex flex-col justify-center pt-3
                    h-24 w-24 md:h-29 md:w-29 rounded-full 
                    border-2 border-accent hover:ring-accent hover:ring-2  
                    leading-none text-center z-10 overflow-hidden secondaryspace-pre-line
                    bg-stone-100   font-black">
                        {{new Date(memoryDate).toLocaleString("en-US", options)}}
                    </div>
                </div>
            </div>
            <!-- line col end -->

            <!--right col-->
            <div class="group order-1 w-4/5 md:order-3 md:w-[44.4444444444%] px-2 py-10 ">
                <div class="relative transition ease-in-out delay-20 flex flex-col items-center justify-between h-30 bg-secondary overflow-hidden
                    border border-lg hover:ring-accent border-accent rounded-lg hover:ring-2 
                    shadow md:flex-row md:max-w-xl group-hover:bg-stone-100 ">
                    <div class="transition ease-in-out delay-20 order-2 md:order-1 h-full flex flex-col justify-between p-4">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-text ">{{Title}}</h5>
                        <p class="mb-3 font-normal text-stone-700 ">{{Text}}</p>
                        <!-- Buttons Start -->
                        <div class="absolute top-1 left-1 text-xl">
                            <button @click="updateMemory">
                                <font-awesome-icon v-if="!Bookmark" class="pr-1   hover:text-stone-700 text-text" icon="fa-solid fa-bookmark" />
                                <font-awesome-icon v-if="Bookmark" class="pr-1   hover:text-teal-900 text-accent" icon="fa-solid fa-bookmark" />
                            </button>
                            <button @click="deleteMemory"><font-awesome-icon class="  hover:text-stone-700 text-text" icon="fa-solid fa-trash-can" /></button>
                        </div>
                        <router-link :to="'/memories/'+ID" class="absolute bottom-0 left-0">
                            <button class="   px-2 bg-accent hover:bg-primary rounded-tr-lg">
                                See Details
                            </button>
                        </router-link>
                        <!-- Buttons End -->
                    </div>
                    <img loading="lazy" 
                        class="lg:filter lg:stonescale group-hover:stonescale-0 lg:blur-sm group-hover:blur-none order-1 md:order-2 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" 
                        :src="img" alt="">

                </div>
            </div>
            <!-- right col end -->
        <!-- full component right end -->
        </div>
</template>
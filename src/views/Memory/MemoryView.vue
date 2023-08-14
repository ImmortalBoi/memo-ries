<script setup> 
    import router from '../../router'
    import { useDatabaseObject } from 'vuefire'
    import { getDatabase, ref as DBref} from "firebase/database";
    import { store } from "../../store";

    const user = store.user.uid;

    const MemoryID = router.currentRoute.value.params.id
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const db = getDatabase();
    const Data = useDatabaseObject(DBref(db, user + '/memories/'+MemoryID))

</script>

<template>
    <div class="p-5 font-jomhuria" v-if="Data">
        <div class="flex flex-row justify-between items-center">
            <p class="pl-5 text-text font-semibold text-4xl leading-none -mb-2 ">{{Data.title}}</p>
            <button type="button" @click="router.push(Data.id+'/edit')"
            class="sm:block bg-primary hover:bg-secondary focus:ring-2 focus:outline-none focus:ring-accent font-medium rounded-lg text-3xl leading-none pb-1.5 px-5 py-2.5 text-center mr-3 md:mr-0 ml-8">
                Edit Memory</button>
        </div>

        <hr class="h-px my-2 w-3/5 mx-auto bg-accent     border-0 ">
        
        <div class="p-2 min-h-screen flex flex-col lg:flex-row lg:justify-between">
            <pre class="whitespace-pre-wrap text-sm text-text overflow-wrap p-2 relative max-w-screen min-h-screen bg-secondary rounded-xl border border-accent mx-2 order-2 lg:order-1 lg:w-2/3">{{Data.message}}</pre>
            <div class="overflow-hidden flex flex-col pb-2 order-1 lg:order-2 lg:w-1/3">
                <img :src="Data.imageUrl" class="rounded-t-lg p-2 bg-secondary border-b-0 border-2 border-accent">
                <p class="border-t-0 border-2 bg-secondary text-3xl text-center rounded-b-lg pb-2 text-text border-accent">
                        {{new Date(Data.time).toLocaleString("en-US", options)}}
                    
                </p>
            </div>
        </div>
    </div>
</template>

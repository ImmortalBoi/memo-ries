<script setup> 
    import { ref } from 'vue'
    import router from '../../router'
    import { useDatabaseObject } from 'vuefire'
    import { getDatabase, ref as DBref, update} from "firebase/database";
    import { store } from "../../store";

const user = store.user.uid;

    const MemoryID = router.currentRoute.value.params.id    

    const db = getDatabase();
    const Data = useDatabaseObject(DBref(db, user+'/memories/'+MemoryID))
    const titleValue = ref(Data.value.title)
    const messageValue = ref(Data.value.message)
    const dateValue = ref(new Date(Data.value.time).toLocaleString("en-US"))
    const err = ref('')

    function editMemo() {
        update(DBref(db, user+'/memories/'+MemoryID),{
            time: Date.parse(dateValue.value),
            message:messageValue.value,
            title:titleValue.value
        })
        .then(()=>{
            router.push('/memories/'+MemoryID)
        })
        .catch((error)=>{
            console.log(error)
            err.value="Error in writing data to database, check your data"
        })
    }

</script>

<template>
    <div class="px-7 py-5 font-jomhuria text-text">
        <div class="flex flex-row justify-between items-center">
            <p class=" font-semibold text-4xl -mb-5">
                Change Memory<span class="text-error text-lg">{{err}}</span></p>
            <button type="button" @click="editMemo"
                class="sm:block bg-primary hover:bg-secondary focus:ring-2 focus:outline-none focus:ring-accent font-medium rounded-lg text-3xl -mb-4 px-5 py-2.5 text-center mr-3 md:mr-0 ml-8">
                Edit Memory</button>
        </div>
        <hr class="h-px my-2 w-3/5 mx-auto bg-accent border-0 ">
        <div class="py-2">
            <label for="title" class="block mb-2 text-3xl font-medium text-stone-900 ">Title of Memo</label>
            <input v-model="titleValue" type="text" 
            class="block p-2.5 w-full text-3xl text-stone-900 bg-stone-50 rounded-lg 
                border border-stone-300 focus:ring-rose-200 focus:border-rose-200 
                " 
                :placeholder="Data.title" required>
        </div>

        <div class="">
            <label for="message" class="block mb-2 text-3xl font-medium text-stone-900 ">Date of Memory</label>
            <vue-tailwind-datepicker :placeholder="dateValue" input-classes="block p-2.5 w-full text-3xl text-stone-900 bg-stone-50 rounded-lg 
                border border-stone-300 focus:ring-rose-200 focus:border-rose-200 
                " 
            as-single v-model="dateValue" />
        </div>
        
        <div class="py-2">
            <label for="message" class="block mb-2 text-3xl font-medium text-stone-900 ">Description of Memo</label>
            <textarea v-model="messageValue" id="message" rows="30" class="block p-2.5 w-full text-3xl text-stone-900 bg-stone-50 rounded-lg 
                border border-stone-300 focus:ring-rose-200 focus:border-rose-200 
                " 
                :placeholder="Data.message" required>
            </textarea>
        </div>
    </div>
</template>
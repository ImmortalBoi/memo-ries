<template>
    <div class="text-3xl font-jomhuria leading-[1.6rem] min-h-screen pl-1 pr-5 md:pr-1 py-10 border-b flex flex-col md:items-center bg-background ">
        <div class="border-2 border-accent  border-xl rounded-full 
        bg-primary text-2xl font-black
        w-16 h-16 md:ml-[1.05rem] self-end mr-[2vw] sm:mr-[4vw] md:self-auto md:mr-0 pr-0.5
            flex justify-center items-center">
        </div>
        <slot name="Entries">
        </slot>
        <div class="border-2 border-accent border-xl rounded-full 
        bg-primaryy text-2xl font-black
        w-16 h-16 md:ml-[1.05rem] self-end mr-[2vw] sm:mr-[4vw] md:self-auto md:mr-0 pr-0.5
            flex justify-center items-center">
        </div>
    </div>
</template>
<script setup>
import TimelineWrapper from "../components/Timeline/TimelineWrapper.vue";
import TimelineEntry from "../components/Timeline/TimelineEntry.vue";
import { useDatabaseList } from "vuefire";
import { getDatabase, ref as DBref } from "firebase/database";
import { store } from "../store";

const user = store.user.uid;
function getMemoryData() {
    const db = getDatabase();
    return useDatabaseList(DBref(db, user + "/memories/")).value.filter((DataEntry) => DataEntry.bookmarked == true);
}

const data = getMemoryData();

function changeDirection(index) {
    if (index % 2 == 0) {
        return "left";
    }
    return "right";
}

function trimString(string, length) {
    return string.length > length
        ? string.substring(0, length - 3) + "..."
        : string;
}
</script>

<template>
    <TimelineWrapper>
        <template #Entries>
            <TimelineEntry
                v-for="(DataEntry, index) in data.sort((a, b) => {
                    return a.time - b.time;
                })"
                :key="index"
                :Direction="changeDirection(index)"
                :Title="DataEntry.title"
                :Text="trimString(DataEntry.message, 100)"
                :img="DataEntry.imageUrl"
                :memoryDate="DataEntry.time"
                :ID="DataEntry.id"
                :Bookmark="DataEntry.bookmarked" />
        </template>
    </TimelineWrapper>
</template>
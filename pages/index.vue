<template>
<div>
    <div v-for="home in homes" :key="home.objectID" style="padding:10px; float:left">
        <nuxt-link :to="`/home/${home.objectID}`" prefetch><home-card :home="home" /></nuxt-link>
    </div>
</div>
</template>

<script>
/* import homes from "~/data/homes" */  /* Zu lange lokal verwendet. Für Verwendung von nuxt-img und cloudinary ausgeklammert */

export default {
    /* Für Verwendung von nuxt-img und cloudinary ausgeklammert */
    /* data() {
        return {
            homes: homes.slice(0,3)
        }
    }, */

    async asyncData({$dataApi}) {  /* Unterkünfte von Algolia erhalten, statt wie bisher lokal */
        return {
            homes:(await $dataApi.getHomes()).json.hits  /* .hits = jeder Eintrag aus Algolia, .json = im json Format, $dataApi = Algolia plugin laden und dortige Funktion getHomes() verwenden um homes Konstante mit den Unterkünften zu füllen */
        }
    },

    head(){
        return {
            title: "Homepage",
            meta: [{
                name: "description",
                content: "This is my Homepage!",
                hid: "description",
            }],
        }
    },
}
</script>

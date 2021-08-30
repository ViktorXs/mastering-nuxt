<template>
<div>
    <div><p>Results for: {{ label }}</p></div>  <!-- Ergebnisse für gesuchten Ort -->
    <div ref="map" style="width: 800px; height:800px; float: right"></div>  <!-- Map einfügen -->
    <div v-if="homes.length > 0">
        <HomeRow v-for="home in homes" :key="home.ObjectID" :home="home" />
    </div>
    <div v-else>No results found.</div>
</div>
</template>

<script>
export default {
    async beforeRouteUpdate(to, from, next) {
        const data = await this.$dataApi.getHomesByLocation(to.query.lat, to.query.lng)
        this.homes = data.json.hits
        this.label = to.query.label
        this.lat = to.query.lat
        this.lng = to.query.lng
        this.updateMap()  /* Map soll ebenso geladen werden, wenn neue URL auf die gleiche page führt */
        next()
    },

    async asyncData({ query, $dataApi }) {
        const data = await $dataApi.getHomesByLocation(query.lat, query.lng)
        
        return {
            homes: data.json.hits,
            label: query.label,
            lat: query.lat,
            lng: query.lng,
        }
    },

    head() {
        return {
            title: `Homes around ${this.label}`
        }
    },

    mounted() {
        this.updateMap()  /* Map aktualisieren, wenn die Page geladen ist */
    },

    methods: {
        updateMap(){
            this.$maps.showMap(this.$refs.map, this.lat, this.lng) /* Map laden */
        }
    }
}
</script>

<template>
<div>
    <div><p>Results for: {{ label }}</p></div>
    <div ref="map" style="height: 800px; width:800px; float: right"></div>  <!-- Map einfügen -->
    <div v-if="homes.length > 0">  <!-- Wenn Objekte gefunden werden... -->
        <HomeRow v-for="home in homes" :key="home.ObjectID" :home="home" />  <!-- ... dann das ausführen, ... -->
    </div>
    <div v-else>No results found.</div>  <!-- ... ansonsten "No results found" bei keinen Objekten -->
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
        this.updateMap()
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
        this.updateMap()
    },

    methods: {
        updateMap(){
            this.$maps.showMap(this.$refs.map, this.lat, this.lng, this.getHomeMarkers())  /* Markerpositionen übergeben */
        },
        getHomeMarkers() {
            return this.homes.map((home) => {  /* mit JS Funktion Array.map() eine Funktion auf jedes Element des Arrays anwenden */
                return {
                    ...home._geoloc  /* lng & lat durch ...-spread erhalten */
                }
            })
        }
    }
}
</script>

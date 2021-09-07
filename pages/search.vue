<template>
<div>
    <div class="app-search-results-page">
        <div class="app-search-results">
            <div class="app-search-results-listing">
                <div>
                    <h2 class="app-title">Results for: {{ label }}</h2>
                </div>
                <div v-if="homes.length > 0">
                    <nuxt-link v-for="home in homes" :key="home.ObjectID" :to="`/home/${home.objectID}`">
                        <HomeRow class="app-house" :home="home" @mouseover.native="highlightMarker(home.objectID, true)" @mouseleave.native="highlightMarker(home.objectID, false)"/>  <!-- ... dann HomeRow laden und mouseover event triggern, ... -->
                    </nuxt-link>
                </div>
                <div v-else>No results found.</div>  
            </div>
            <div class="app-search-results-map">
                <div ref="map" class="app-map"></div>
            </div>
        </div>
    </div>
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
        /* highlightMarker(homeId für Selektor & isHighlighted ist ein bool, um die marker-highlight CSS Klasse einzufügen oder zu entfernen */
        highlightMarker(homeId, isHighlighted) {  /* Code zum Umschalten der CSS Klasse, wenn über ein Objekt gehovert wird */
            document.getElementsByClassName(`home-${homeId}`)[0]?.classList?.toggle("marker-highlight", isHighlighted)  /* ?. = Anwenden, wenn etwas gefunden wird, ansonsten "undefined". Ersetzt ein if-statement */
        },
        updateMap(){
            this.$maps.showMap(this.$refs.map, this.lat, this.lng, this.getHomeMarkers())
        },
        getHomeMarkers() {
            if(this.homes.length === 0 )
                return null
            return this.homes.map((home) => {
                return {
                    ...home._geoloc,
                    pricePerNight: home.pricePerNight,
                    id: home.objectID  /* Die objectID der Unterkunft Objekte speichern für die Verwendung des mouseover highlighter im plugin */
                }
            })
        }
    }
}
</script>
<style>
.marker {
    background: white;
    border: 1px solid lightgray;
    border-radius: 20px;
    font-weight: bold;
    padding: 5px 8px;
}
.marker-highlight {
    color: white !important;  /* Weil Google Map inline style für die Textfarbe nutzt */
    background-color: black;
    border-color: black;
}
</style>

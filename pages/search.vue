<template>
<div>
    <div><p>Place: {{ lat }} / {{ lng }} / {{ label }}</p></div>
    <div v-for="home in homes" :key="home.ObjectID">
        <nuxt-link :to="`/home/${home.objectID}`" prefetch><home-card :home="home" /></nuxt-link>
    </div>
</div>
</template>

<script>
export default {
    async beforeRouteUpdate(to, from, next) {  /* statt awaitQuery (Weil verbuggt im dev modus) stellt der "navigation guard" beforeRouteUpdate sicher, wenn eine neue url dieselbe page componente lädt, der enthaltene code auch ausgeführt wird. */
        const data = await this.$dataApi.getHomesByLocation(to.query.lat, to.query.lng)  /* mit this. auf den kontext in data zugreifen. */
        this.homes = data.json.hits
        this.label = to.query.label
        this.lat = to.query.lat
        this.lng = to.query.lng
        next()  /* Callback Funktion um weitere Navigation-Guards auszuführen. Wichtig, weil ohne next mögliche weitere Navigation guards nicht ausgeführt werden und die Navigation stoppt. */
    },

    async asyncData({ query, $dataApi }) {
        const data = await $dataApi.getHomesByLocation(query.lat, query.lng)
        
        return {
            homes: data.json.hits,
            label: query.label,
            lat: query.lat,
            lng: query.lng,
        }
        /* awaitQuery: ["label"] nicht mehr notwendig */
    }
}
</script>

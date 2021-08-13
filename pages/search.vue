<template>
<div>
    <div><p>Place: {{ lat }} / {{ lng }} / {{ label }}</p></div>
    <div>
        <HomeRow v-for="home in homes" :key="home.ObjectID" :home="home" />
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
    }
}
</script>

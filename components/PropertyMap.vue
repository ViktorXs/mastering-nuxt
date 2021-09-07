<template>
<div>
    <div class="app-wrapper app-padded-vertical">
        <h2 class="app-subtitle">Location</h2>
        <p class="app-description">
            {{ home.location.address }} &middot; {{ home.location.city }} &middot; {{ home.location.state }} &middot; {{ home.location.country }}
        </p>
        <div ref="map" class="app-map"></div>
    </div>
</div>
</template>
<script>
export default {
    props: {
        home: {
            type: Object,
            required: true
        },
    },
    mounted() {
        this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng)
    },
}
</script>

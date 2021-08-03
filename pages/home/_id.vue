<template>
<div>
    <h2>{{ home.title }}</h2>
    <div style="display:flex">
        <img v-for="image in home.images" :key="image" :src="image" style="padding:5px; width:200px" alt="Imagine a beautiful home.">
    </div>
    <p>$<b>{{ home.pricePerNight }}</b> / night</p>
    <p><img src="/images/marker.svg" width="20px" height="20px" /> {{ home.location.address }}, {{ home.location.city }}<br>
    {{ home.location.state }}, {{ home.location.country }}</p>
    <p><img src="/images/star.svg" width="20px" height="20px" /> Review Score: {{ home.reviewValue }}</p>
    <p>Guests: {{ home.guests }}</p>
    <p>{{ home.bedrooms }} bedrooms, {{ home.beds }} beds and {{ home.bathrooms }} bathrooms.</p>
    <div ref="map" style="width:800px; height:800px">
    </div>
</div>
</template>

<script>

export default {
    layout: "blue",
    head(){
        return {
            title: this.home.title,
        }
    },

    mounted(){
        /* Plugin abrufen und Parameter des Objekts dank der inject Funktion vom plugin übergeben. */
        this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng)
    },

    methods:{
    }
}
</script>

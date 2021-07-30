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

    async asyncData({ params, $dataApi }){
        const home = await $dataApi.getHome(params.id)
        return {
            home,
        }
    },
    head(){
        return {
            title: this.home.title,
            script: [{
                src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC7urtMkiAOKkmoubhVeI7XjUIUgNDufhw",
                hid: "map",
                defer: true,
                skip: process.client && window.mapLoaded
            }],
            innerHTML: "window.initMap = function(){ window.mapLoaded = true }",
            hid: "map-init"
        }
    },
    mounted(){
        const mapOptions = {
            zoom: 18,
            center: new window.google.maps.LatLng(this.home._geoloc.lat, this.home._geoloc.lng),
            disableDefaultUI: true,
            mapTypeControl: true

        }
        const map = new window.google.maps.Map(this.$refs.map, mapOptions)
        const position = new window.google.maps.LatLng(this.home._geoloc.lat, this.home._geoloc.lng)
        const marker = new window.google.maps.Marker({ position })
        marker.setMap(map)
    },
}
</script>
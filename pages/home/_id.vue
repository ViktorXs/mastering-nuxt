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
    <div ref="map" style="width:800px; height:800px"></div>
    <div v-for="review in reviews" :key="review.objectID">
        <img :src="review.reviewer.image" />
        <h3>{{ review.reviewer.name }}</h3>
        <p>{{ review.rating }}</p>
        <p>{{ dateTransform(review.date) }}</p>
        <p>{{ review.comment }}</p>
    </div>
</div>
</template>

<script>

export default {
    layout: "blue",
    async asyncData({ params, $dataApi, error }){
        const homeResponse = await $dataApi.getHome(params.id)
        if(!homeResponse.ok)
            return error({ statusCode: homeResponse.status, message: homeResponse.statusText })

        const reviewResponse = await $dataApi.getReviewsByHomeId(params.id)
        if(!reviewResponse.ok)
            return error({ statusCode: reviewResponse.status, message: reviewResponse.statusText })
        
        return {
            home: homeResponse.json,
            reviews: reviewResponse.json.hits
        }
    },

    head(){
        return {
            title: this.home.title,
        }
    },

    mounted(){
        this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng)
    },

    methods:{
        /* Datum mit der JS Date Funktion */
        dateTransform(dateStr){
            const date = new Date(dateStr)
            const options = { weekday: "long", year: "numeric", month: "numeric", day: "2-digit" }
            return date.toLocaleDateString("de-De", options)
        }
    }
}
</script>

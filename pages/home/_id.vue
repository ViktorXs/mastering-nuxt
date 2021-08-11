<template>
<div>
    <!-- Home Section -->
    <h2>{{ home.title }}</h2>
    <div style="display:flex">
        <img v-for="image in home.images" :key="image" :src="image" style="padding:5px; width:200px" alt="Imagine a beautiful home.">
    </div>
    <p>$<b>{{ home.pricePerNight }}</b> / night</p>
    <p><img src="/images/marker.svg" height="20px" width="20px"/> {{ home.location.address }}, {{ home.location.city }}<br>
    {{ home.location.state }}, {{ home.location.country }}</p>
    <p><img src="/images/star.svg" height="20px" width="20px" /> Review Score: {{ home.reviewValue }}</p>
    <p>Guests: {{ home.guests }}</p>
    <p>{{ home.bedrooms }} bedrooms, {{ home.beds }} beds and {{ home.bathrooms }} bathrooms.</p>

    <!-- Host Section -->
    <img :src="user.image" />
    <h3>{{ user.name }}</h3>
    <p>Joined: {{ dateTransform(user.joined) }}</p>
    <p>Reviews: {{ user.reviewCount }}</p>
    <short-text :text="user.description" :target="150" />

    <!-- Google Maps -->
    <div ref="map" style="height: 800px; width:800px"></div>

    <!-- Review Section -->
    <div v-for="review in reviews" :key="review.objectID">
        <img :src="review.reviewer.image" />
        <h3>{{ review.reviewer.name }}</h3>
        <p>{{ review.rating }}</p>
        <p>{{ dateTransform(review.date) }}</p>
        <short-text :text="review.comment" :target="150" />
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

        const userResponse = await $dataApi.getUsersByHomeId(params.id)
        if(!userResponse.ok)
            return error({ statusCode: userResponse.status, message: userResponse.statusText })
        
        return {
            home: homeResponse.json,
            reviews: reviewResponse.json.hits,
            user: userResponse.json.hits[0]
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

    methods: {
        dateTransform(dateStr){
            const date = new Date(dateStr)
            const options = { weekday: "long", year: "numeric", month: "numeric", day: "2-digit" }

            return date.toLocaleDateString("de-De", options)
        }
    }
}
</script>

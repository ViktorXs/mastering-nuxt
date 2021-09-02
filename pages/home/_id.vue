<template>
<div>
    <!-- Home Section -->
    <h2>{{ home.title }}</h2>
    <div style="display:flex">
        <img v-for="image in home.images" :key="image" :src="image" style="padding:5px; width:200px" alt="Imagine a beautiful home.">
    </div>
    <p>$<b>{{ home.pricePerNight }}</b> / night</p>
    <p><img src="/images/marker.svg" width="20px" height="20px"/> {{ home.location.address }}, {{ home.location.city }}<br>
    {{ home.location.state }}, {{ home.location.country }}</p>
    <img src="/images/star.svg" width="20px" height="20px" />
    <p>Review Score: {{ home.reviewValue }}</p>
    <p>{{ toPlural(home.guests, "guest") }}</p>
    <p>{{ toPlural(home.bedrooms, "room") }}, {{ toPlural(home.beds, "bed") }} and {{ toPlural(home.bathrooms, "bath") }}.</p>

    <!-- Host Section -->
    <img :src="user.image" />
    <h3>{{ user.name }}</h3>
    <p>Joined: {{ dateTransform(user.joined) }}</p>
    <p>Reviews: {{ user.reviewCount }}</p>
    <short-text :text="user.description" :target="150" />

    <!-- Google Maps -->
    <div ref="map" style="width: 800px; height:800px"></div>

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
        const responses = await Promise.all([
            $dataApi.getHome(params.id),
            $dataApi.getReviewsByHomeId(params.id),
            $dataApi.getUserByHomeId(params.id)
        ])

        const badResponse = responses.find((response) => !response.ok)
        if(badResponse)
            return error({ statusCode: badResponse.status, message: badResponse.statusText })
        
        return {
            home: responses[0].json,
            reviews: responses[1].json.hits,
            user: responses[2].json.hits[0]
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
        dateTransform(dateStr) {
            const date = new Date(dateStr)
            const options = { weekday: "long", year: "numeric", month: "numeric", day: "2-digit" }

            return date.toLocaleDateString("de-De", options)
        },

        toPlural(number, singular) {
            const text = `${number} ${singular}`
            if(number === 1)
                return text
            return text + "s"
        }
    }
}
</script>

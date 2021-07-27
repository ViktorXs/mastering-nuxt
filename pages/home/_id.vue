<template>
    <div>
        <h2>{{ home.title }}</h2>
        <div style="display:flex">
            <img v-for="image in home.images" :key="image" :src="image" style="padding:5px" widht="200px" height="150" alt="Imagine a beautiful home.">
        </div>
        <p>$<b>{{ home.pricePerNight }}</b> / night</p>
        <p>{{ home.location.address }}, {{ home.location.city }}<br>
        {{ home.location.state }}, {{ home.location.country }}</p>
        <p>Review Score: {{ home.reviewValue }}</p>
        <p>Guests: {{ home.guests }}</p>
        <p>{{ home.bedrooms }} bedrooms, {{ home.beds }} beds and {{ home.bathrooms }} bathrooms.</p>
    </div>
</template>

<script>
import homes from "~/data/homes"

export default {
    data(){
        return {
            homes: {}
        }
    },
    head(){
        return {
        title: this.home.title
        }
    },
    created(){
        const home = homes.find((home) => home.objectID === this.$route.params.id)
        this.home = home

    }
}
</script>
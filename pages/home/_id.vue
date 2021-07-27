<template>
    <div>
        <img :src="home.images[0]" style="width:200px"><br>
        <h3>{{ home.title }}</h3>
        <p>{{ home.location.address }}<br>
        {{ home.location.city }}<br>
        {{ home.location.state }}, {{ home.location.country }}</p><br>
        <p>Guests: {{ home.guests }}</p><br>
        <p>{{ home.pricePerNight }} $ per night</p>
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
    created(){
        const home = homes.find((home) => home.objectID === this.$route.params.id)
        this.home = home
    }
}
</script>
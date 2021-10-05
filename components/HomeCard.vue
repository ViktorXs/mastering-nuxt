<template>
<div>
    <nuxt-img provider="cloudinary" :src="home.images[0]" width="200px" height="150" /><br>  <!-- Bilder per nuxt-img methode verwenden -->
    <h3>{{ home.title }}</h3>
    <p>{{ home.location.address }}<br>
    {{ home.location.city }}<br>
    {{ home.location.state }}, {{ home.location.country }}</p>
    <p>{{ toPlural(home.guests, "guest") }}</p>
    <p>{{ home.pricePerNight }} $ per night</p>
</div>
</template>

<script>
import toPlural from "~/utils/to-plural.js"

export default {
    props: {
        home: {
            type: Object,
            required: true,
        },
    },

    methods: {
        toPlural,
    },
}
</script>

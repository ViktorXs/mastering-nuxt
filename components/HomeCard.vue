<template>
<div>
    <img :src="home.images[0]" style="width:200px"><br>
    <h3>{{ home.title }}</h3>
    {{ home.location.address }}<br>
    {{ home.location.city }}<br>
    {{ home.location.state }}, {{ home.location.country }}<br>
    {{ toPlural(home.guests, "guest") }}<br>
    {{ home.pricePerNight }} $ per night
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
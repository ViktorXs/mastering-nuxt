<template>
<div style="clear:left">
    <img :src="home.images[0]" style="width:200px; float:Left; padding: 10px"><br>
    <h3>{{ home.title }}</h3>
    <p>{{ home.location.address }},
    {{ home.location.city }},
    {{ home.location.state }}, {{ home.location.country }}</p>
    <p>{{ toPlural(home.guests, "guest") }}, {{ toPlural(home.bedrooms, "room") }}, {{ toPlural(home.beds, "bed") }}, {{ toPlural(home.bathrooms, "bath") }}</p>
    <p>{{ home.pricePerNight }} $ per night</p>
    <p><img src="/images/star.svg" height="20px" width="20px" /> Review Score: {{ home.reviewValue }} ({{ home.reviewCount }})</p>
</div>
</template>

<script>
export default {
    props: {
        home: {
            type: Object,
            required: true
        }
    },

    methods: {
        toPlural(number, singular) {
            const text = `${number} ${singular}`
            if(number === 1)
                return text

            return text + "s"
        }
    }
}
</script>

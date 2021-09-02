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
export default {
    props: {
        home: {
            type: Object,
            required: true
        }
    },

    methods: {
        toPlural(number, singularWord) {
            const text = `${number} ${singularWord}`
            if(number === 1)
                return text
            
            return text + "s"
        }
    }
}
</script>
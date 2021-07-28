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
export default {
    props: {
        home: {
            type: Object,
            required: true
        }
    }
}
</script>
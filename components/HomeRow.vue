<template>
<div style="clear:left">
    <img :src="home.images[0]" style="width:200px; float.Left; padding: 10px"><br>
    <h3>{{ home.title }}</h3>
    <p>{{ home.location.address }}<br>
    {{ home.location.city }}<br>
    {{ home.location.state }}, {{ home.location.country }}</p>
    <p>Guests: {{ home.guests }}, {{ home.bedrooms }} rooms, {{ home.beds }} beds, {{ home.bathrooms }} baths</p>
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
    }
}
</script>

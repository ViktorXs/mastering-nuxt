<template>
    <div style="margin: 10px">
        <h3>{{ home.title }}</h3>
        <img :src="home.images[0]" style="width:200px" />
        <p>{{ home.type }}</p>
        <p>{{ home.location.address }}<br>{{ home.location.city }}<br>{{ home.location.state }}, {{ home.location.country }}</p>
        <!-- <p>{{ home.description }}</p> -->
        <p>{{ home.pricePerNight }} / night</p>
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
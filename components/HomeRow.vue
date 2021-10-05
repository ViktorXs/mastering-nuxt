<template>
<div>
    <nuxt-img 
        class="app-house-header" 
        provider="cloudinary" 
        width="360" 
        height="200" 
        :src="home.images[0]" 
        :modifiers="{ effect: 'grayscale', opacity: '50' }"
    />
    <div class="app-house-body">
        <img src="/images/icons/heart.svg" class="app-fav"/>
        <h2 class="app-title">{{ home.title }}</h2>
        <div class="app-address">
            {{ home.location.address }},
            {{ home.location.city }},
            {{ home.location.state }}, {{ home.location.country }}
        </div>
        <div class="app-amenities">
            <p>{{ toPlural(home.guests, "guest") }}, {{ toPlural(home.bedrooms, "room") }}, {{ toPlural(home.beds, "bed" ) }}, {{ toPlural(home.bathrooms, "bath") }}</p>
            <p><strong>Features:</strong> {{ features }}</p>
        </div>
        <div class="app-flex">
            <div class="app-rating">
                {{ home.reviewValue }}
                <span>({{ home.reviewCount }})</span>
            </div>
            <div class="app-price">
                ${{ home.pricePerNight }}<span> / night</span>
            </div>
        </div>
    </div>
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

    computed: {
        features() {
            return this.home.features.slice(0, 3).join(", ")
        },
    },

    methods: {
        toPlural,
    },
}
</script>

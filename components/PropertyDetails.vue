<template>
    <div>
        <div class="app-wrapper">
            <div class="app-double-column app-property-details">
                <div>
                    <h1>{{ home.title }}</h1>
                    <div class="app-flex">
                        <div class="app-address">
                            {{ home.location.address }} {{ home.location.city }} {{ home.location.state }} {{ home.location.country }}
                        </div>
                        <div class="app-rating">
                            {{ home.reviewValue }} <span>({{ home.reviewCount }})</span>
                        </div>
                    </div>
                    <div class="app-property-details-footer">
                        {{ toPlural(home.guests, "guest") }} &middot; {{ toPlural(home.bedrooms, "room") }} &middot; {{ toPlural(home.beds, "bed") }} &middot; {{ toPlural(home.bathrooms, "bath") }}
                    </div>
                </div>
                <div>
                    <div class="app-price">
                        ${{ home.pricePerNight }}<span> / night</span>
                    </div>
                    <div class="app-search">
                        <input type="text" class="datepicker shadow-lg" placeholder="Check in" />
                        <input type="text" class="datepicker shadow-lg" placeholder="Check out" />
                    </div>
                    <button class="app-big-button">Request booking!</button>
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
            required: true
        }
    },

    methods: {
        toPlural
    }
}
</script>

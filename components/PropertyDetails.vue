<template>
    <div>
        <div class="app-wrapper">
            <div class="app-double-column app-property-details">
                <div>
                    <h1 class="">{{ home.title }}</h1>
                    <div class="app-flex">
                        <div class="app-address">
                            {{ home.location.address }} {{ home.location.city }} {{ home.location.state }} {{ home.location.country }}
                        </div>
                        <div class="app-rating">
                            {{ home.reviewValue }} <span>({{ home.reviewCount }})</span>
                        </div>
                    </div>
                    <div class="app-property-details-footer">
                    </div>
                </div>
                <div></div>
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

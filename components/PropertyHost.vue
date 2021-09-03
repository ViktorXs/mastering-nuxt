<template>
<div class="app-background-grey">
    <div class="app-wrapper app-padded-vertical">
        <div class="app-host-header">
            <div>
                <img :src="user.image" />
            </div>
            <div>
                <div class="app-host-name">Hosted by {{ user.name }}</div>
                <div class="app-host-date">Joined in {{ dateTransform(user.joined) }}</div>
                <div class="app-flex">
                    <div class="app-host-reviews">
                        {{ user.reviewCount }} reviews
                    </div>
                    <div class="app-host-medal">
                        Superhost
                    </div>
                </div>
            </div>
        </div>
        <div class="app-host-description">
            <p>{{ user.description }}</p>
        </div>
    </div>
</div>
</template>
<script>
import dateTransform from "~/utils/short-date.js"

export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    },

    methods: {
        dateTransform
    }
}
</script>

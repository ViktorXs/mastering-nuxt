<template>
<div class="app-padded-vertical">
    <div class="app-wrapper">
        <div class="app-testimonials">
            <div v-for="(review, index) in reviews" :key="index">
                <div class="app-testimonial-header">
                    <div><img :src="review.reviewer.image" /></div>
                    <div>
                        <p class="app-testimonial-name">
                            {{ review.reviewer.name }}
                        </p>
                        <p class="app-testimonial-date">
                            {{ dateTransform(review.date) }}
                        </p>
                    </div>
                </div>
                <div class="app-testimonial-body">
                    <short-text :text="review.comment" :target="150" />
                </div>
            </div>
        </div>
        <button class="app-big-button">Show all {{ home.reviewCount }} reviews</button>
    </div>
</div>
</template>
<script>
import dateTransform from "~/utils/short-date.js"

export default {
    props: {
        reviews: {
            type: Array,
            required: true,
        },
        home: {
            type: Object,
            required: true,
        },
    },

    methods: {
        dateTransform,
    },
}
</script>

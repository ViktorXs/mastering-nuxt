<template>
<div class="app-container">
    <button @click="count">count</button>
    <header class="app-header">
        <div class="app-logo">
            <nuxt-link to="/">
                <img src="/images/logo.svg" />
            </nuxt-link>
        </div>
        <div class="app-search">
            <input ref="citySearch" type="text" class="shadow-lg" placeholder="Location" @changed="changed" />
            <input type="text" class="datepicker shadow-lg" placeholder="Check in" />
            <input type="text" class="datepicker shadow-lg" placeholder="Check out" />
            <button>
                <img src="/images/icons/search.svg" />
            </button>
        </div>
        <div class="app-user-menu">
            <img src="/images/icons/house.svg" />
            <div class="name">Host</div>
            <img src="/images/user.jpg" class="avatar" />
        </div>
    </header>
    <nuxt />
</div>
</template>
<script>
export default {
    mounted() {
        this.$maps.doAutoComplete(this.$refs.citySearch)
    },
    
    methods: {
        count() {
            this.$store.dispatch("counterUp")
        },

        changed(event) {
            const place = event.detail
            if(!place.geometry)
                return

            this.$router.push({
                name: "search",
                query: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    label: this.$refs.citySearch.value,
                },
            })
        },
    },
}
</script>

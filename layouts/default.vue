<template>
<div>
    <nuxt-link to="/">Home</nuxt-link>
    <!-- <img src="~/assets/test-small.svg" /> --> <!-- Wird in Base64 umgewandelt, weil unter 1KB groß. Nicht empfehlenswert. In nuxt.config abschalten. -->
    <header>
        <div>
            <img src="/images/logo.svg" />
        </div>
        <div>
            <input ref="citySearch" type="text" placeholder="Enter your address" @changed="changed" />
            <input type="text" class="" placeholder="Check in" />
            <input type="text" class="" placeholder="Check out" />
            <button>
                <img src="/images/icons/search.svg" />
            </button>
        </div>
        <div>
            <img src="/images/icons/house.svg" />
            <div>Host</div>
            <img src="/images/user.jpg" />
        </div>
    </header>
    <nuxt />
</div>
</template>

<script>
export default {
    mounted() {
        this.$maps.doAutoComplete(this.$refs.citySearch);
    },
    
    methods: {
        changed(event) {
            const place = event.detail
            if(!place.geometry)
                return

            this.$router.push({
                name: "search",
                query: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    label: this.$refs.citySearch.value
                }
            })
        }
    }
}
</script>

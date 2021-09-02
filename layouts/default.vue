<template>
<div class="app-container">
    <!-- <img src="~/assets/test-small.svg" /> --> <!-- Wird in Base64 umgewandelt, weil unter 1KB groß. Nicht empfehlenswert. In nuxt.config abschalten. -->
    <header class="app-header">
        <div class="app-logo">
            <nuxt-link to="/">
                <img src="/images/logo.svg" />
            </nuxt-link>
        </div>
        <div class="app-search">
            <input ref="citySearch" type="text" class="" placeholder="Location" @changed="changed" />  <!-- "@changed" = Custom Event aus maps.client.js. "=changed"-Funktion -->
            <input type="text" class="datepicker" placeholder="Check in" />
            <input type="text" class="datepicker" placeholder="Check out" />
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
        this.$maps.doAutoComplete(this.$refs.citySearch);  /* der input für doAutoComplete(input) */
    },
    
    methods: {
        changed(event) {
            const place = event.detail
            if(!place.geometry)
                return (console.log("Ye focked, 404! No city found!"))

            /* User auf eine neue Seite leiten, dabei label und die Längen- und Breitengrade durchgeben */
            this.$router.push({  /* push nimmt String oder Objekt. Damit die URL generiert wird */
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

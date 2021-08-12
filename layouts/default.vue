<template>
<div>
    <header style="background-color:#ddd">
        <nuxt-link to="/">Home</nuxt-link>
        <input ref="citySearch" type="text" @changed="changed" />  <!-- "@changed" = Custom Event aus maps.client.js. "=changed"-Funktion -->
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
                return  /* "If it doesnt exist, just return" */

            /* User auf eine neue Seite leiten, dabei label und die Längen- und Breitengrade durchgeben. */
            this.$router.push({  /* push nimmt String oder Objekt. Damit die URL generieren */
                name: "search",
                query: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    label: this.$refs.citySearch.value  /* der URL ein label geben */
                }
            })
        }
    }
}
</script>

<template>
<div>
    <div><p>Place: {{ lat }} / {{ lng }} / {{ label }}</p></div>
    <div v-for="home in homes" :key="home.ObjectID">
        <nuxt-link :to="`~/home/${home.objectID}`" prefetch><home-card :home="home" /></nuxt-link>  <!-- Suchergebnisse per nuxt-link verknüpfen, wie auf der index page -->
    </div>
</div>
</template>

<script>
export default {
    /* SEO freundlich. Kein ".this" in asyncData */
    /* Daten aus Datenbank holen um Unterkünfte an dem gesuchten Ort hervorzuheben */
    async asyncData({ query, $dataApi }) {  /* asyncData({ query }) {} Kontextparameter von asyncData(context) {} */ /* query "destructurieren" aus dem template */
        const data = await $dataApi.getHomesByLocation(query.lat, query.lng)  /* Position der Unterkünfte (im Umkreis von 1500 m) */
        
        return {  /* Daten für Suchergebnis */
            homes: data.json.hits,  /* Wie in homes-page, fügt Algolia die Ergebnisse in ein "hits" Array  */
            /* ...query, */ /* Nicht zu empfehlen, weil user in der URL alle Daten aus query manipulieren können */
            label: query.label,
            lat: query.lat,
            lng: query.lng,
        }
    },

    watchQuery: ["label"],  /* Watcher für query strings, wenn diese verändert werden, dann werden alle Komponenten und Funktionen abgerufen, damit Ergebnisse neu laden. */
}
</script>

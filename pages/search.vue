<template>
<div>
    {{ lat }} / {{ lng }} / {{ label }}
</div>
</template>

<script>
export default {  /* SEO freundlich. Kein ".this" in asyncData */
    asyncData({ query }) {  /* query "destructurieren" aus dem template */
        return {
            /* ...query, */ /* Nicht zu empfehlen, weil "anything returned from asyncData is merged with the components local state", was ein Sicherheitsrisiko ist. */
            label: query.label,
            lat: query.lat,
            lng: query.lng
        }
    }
}
</script>
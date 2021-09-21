<template>
<div>
    PLACEHOLDER - List of homes here!
    <h2 class="text-xl bold">Add a Home</h2>
    <form class="form">
        Images:<br />
        <input v-model="home.images[0]" type="text" class="w-3/4" /><br />
        <input v-model="home.images[1]" type="text" class="w-3/4" /><br />
        <input v-model="home.images[2]" type="text" class="w-3/4" /><br />
        <input v-model="home.images[3]" type="text" class="w-3/4" /><br />
        <input v-model="home.images[4]" type="text" class="w-3/4" /><br />
        Title:<br />
        <input v-model="home.title" type="text" class="w-60" /><br />
        Description<br />
        <textarea v-model="home.description" class="w-104"></textarea><br />
        Note<br />
        <textarea v-model="home.note" class="w-104"></textarea><br />
        Features<br />
        <input v-model="home.features[0]" type="text" class="w-26" />
        <input v-model="home.features[1]" type="text" class="w-26" />
        <input v-model="home.features[2]" type="text" class="w-26" />
        <input v-model="home.features[3]" type="text" class="w-26" />
        <input v-model="home.features[4]" type="text" class="w-26" /><br />
        Price Per Night<br />
        <input v-model="home.pricePerNight" type="number" class="w-14" /><br />
        Guests / Bedrooms / Beds / Baths<br />
        <input v-model="home.guests" type="number" class="w-14" />
        <input v-model="home.bedrooms" type="number" class="w-14" />
        <input v-model="home.beds" type="number" class="w-14" />
        <input v-model="home.bathrooms" type="number" class="w-14" /><br />
        Address: <input v-model="home.location.address" type="text" class="w-60" /><br />
        City: <input v-model="home.location.city" type="text" class="w-26" /><br />
        State: <input v-model="home.location.state" type="text" class="w-26" /><br />
        Postal Code: <input v-model="home.location.postalCode" type="number" class="w-26" /><br />
        Country: <input v-model="home.location.country" type="text" class="w-26" /><br />
        <button class="border px-4 py-2 border-gray-400">Add</button>
    </form>
</div>
</template>
<script>
export default {
    data() {
        return {
            home: {  /* im selben Format, wie die Datenbank in Algolia */
                title: "",
                description: "",
                note: "",
                pricePerNight: "",
                guests: "",
                bedrooms: "",
                beds: "",
                bathrooms: "",
                features: ["", "", "", "", ""],
                location: {
                    address: "",
                    citiy: "",
                    state: "",
                    postalCode: "",
                    country: "",
                },
                _geoloc: {
                    lat: 69.42,
                    lng: 69.42,
                },
                images: [
                    "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
                    "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=81",
                    "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=82",
                    "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=83",
                    "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=84",
                ],
            },
        }
    },
}
</script>
<style scoped>
.form input, 
.form textarea {
    @apply p-1 m-1 bg-gray-200;
}
</style>
<template>
<div>
    <span v-for="home in homesList" :key="home.objectID">{{ home.title }}:
        <button class="text-red-800" @click="deleteHome(home.objectID)">Delete Home</button><br />  <!-- deleteHome Funktion zum Löschen der Unterkunft -->
    </span>
    <h2 class="text-xl bold">Add a Home</h2>
    <form class="form" @submit.prevent="onSubmit">
        Upload Images:
        <ImageUploader @file-uploaded="imageUpdated($event, 0)" />  <!-- auf Event listen, wenn file-uploaded aus der imageUploader Komponente emitted -->
        <ImageUploader @file-uploaded="imageUpdated($event, 1)" />  <!-- mit ($event, NUM) vorgeben, welches Bild ersetzt werden soll -->
        <ImageUploader @file-uploaded="imageUpdated($event, 2)" />
        <ImageUploader @file-uploaded="imageUpdated($event, 3)" />
        <ImageUploader @file-uploaded="imageUpdated($event, 4)" />
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
        <input ref="locationSelector" type="text" placeholder="Enter location here" autocomplete="off" @changed="changed" /><br />  <!-- google places autocomplete off -->
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
import { unWrap } from "~/utils/fetchUtils"

export default {
    data() {
        return {
            homesList: [],
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
                    city: "",
                    state: "",
                    postalCode: "",
                    country: "",
                },
                _geoloc: {
                    lat: "",
                    lng: "",
                },
                images: [],
            },
        }
    },

    mounted() {
        this.$maps.doAutoComplete(this.$refs.locationSelector, ["address"])
        this.setHomesList()
    },

    methods: {
        async deleteHome(homeId) {  /* Löschfunktion, um URL zu löschen  */
            await fetch(`/api/homes/${homeId}`, {
                method: "DELETE"
            })
            const index = this.homesList.findIndex(obj => obj.objectID === homeId)  /* index des homes finden zum Löschen */
            this.homesList.splice(index, 1)  /* diesen Eintrag aus homesList löschen */
        },

        async setHomesList() {
            this.homesList = (await unWrap(await fetch("/api/homes/user/"))).json
        },

        imageUpdated(imageUrl, index) {
            this.home.images[index] = imageUrl
        },

        changed(event) {  /* Mit listener @changed Adressdetails speichern */
            const addressParts = event.detail.address_components
            
            const streetNumber = this.getAddressPart(addressParts, "street_number")?.short_name || ""  /* short_name kürzt, wenn möglich */ /* nach dem "type" mit getAddressPart suchen und speichern */
            const route = this.getAddressPart(addressParts, "route")?.short_name || ""  /* Straßenname */
            this.home.location.address = streetNumber + " " + route  /* Nummer und Straße zusammensetzen */

            this.home.location.city = this.getAddressPart(addressParts, "locality")?.short_name || ""
            this.home.location.state = this.getAddressPart(addressParts, "administrative_area_level_1")?.long_name || ""
            this.home.location.country = this.getAddressPart(addressParts, "country")?.short_name || ""
            this.home.location.postalCode = this.getAddressPart(addressParts, "postal_code")?.short_name || ""

            const geo = event.detail.geometry.location
            this.home._geoloc.lat = geo.lat()
            this.home._geoloc.lng = geo.lng()
        },

        getAddressPart(parts, type) {  /* Addresskomponente aus addressPart zurückgeben */
            return parts.find((part) => part.types.includes(type))
        },

        async onSubmit() {  /* async, weil über API */ 
            const response = await unWrap(await fetch("/api/homes", {  /* Aus Lösch-Lektion angepasst zu einer Konstante mit unWrap, um neu erzeugte homes in die homesList zu speichern */
                method: "POST",  /* Daten senden */
                body: JSON.stringify(this.home),  /* Eingetragene Werte aus data/return/home in JSON-Freundliches Format umwandeln */
                headers: {  /* Formulare mit Java Script, aber als JSON versendet. Deshalb Type auf json definieren.  */
                    "Content-Type": "application/json"
                }
            }))
            this.homesList.push({  /* Home in HomesListe einfügen  */
                title: this.home.title,
                objectID: response.json.homeId
            })
        },
    },
}
</script>
<style scoped>
.form input, 
.form textarea {
    @apply p-1 m-1 bg-gray-200;
}
</style>

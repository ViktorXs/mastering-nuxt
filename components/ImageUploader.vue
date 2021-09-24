<template>
<div>
    <input type="file" accept=".jpeg,.jpg,image/jpeg" @change="uploadFile" />  <!-- Datei auswählen, jpeg erlaubt, event auslösen -->
</div>
</template>

<script>
export default {
    methods: {
        async uploadFile(e) {  /* Weil Dateien hochgeladen werden und API's gerufen werden, muss es eine asynchrone Funktion sein. */
            const file = e.target.files[0]
        }
    }
}
</script>

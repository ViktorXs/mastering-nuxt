<template>
<span>
    {{ displayText }}
    <button v-if="isTooLong && !isExpanded" type="button" class="link" @click="isExpanded = true"> read more!</button>
    <button v-if="isTooLong && isExpanded" type="button" class="link" @click="isExpanded = false"> hide Text</button>
</span>
</template>

<script>
export default {
    props: {  /* Dafür zwei Props notwendig: */
        text: {  /* text, welcher den Text enthält... */
            type: String,
            required: true
        },
        target: { /* ... und target, wie kurz der Text werden soll */
            type: Number,
            required: true
        }
    },

    data() {  /* Standardmäßig soll der Text schon eingeklappt sein, daher vorgeben, dass mit ... */
        return {
            isExpanded: false,  /* ... isExpanded der Text schon eingeklappt ist */
            chunks: []          /* und ein Ort, wo die Chunks gespeichert werden sollen */
        }
    },

    computed: {
        isTooLong(){
            return this.chunks.length === 2  /* Wenn chunks (aus getChunks()) zwei textarrays hat, dann isTooLong() = true */
        },
        displayText(){
            if(!this.isTooLong || this.isExpanded)  /* Wenn isTooLong != true oder expanded = true... */
                return this.chunks.join(" ")        /* returne chunks oder... */
            
            return this.chunks[0] + " ..."  /* ... wenn isTooLong = true oder isExpanded = false sende ersten Chunk und füge ... an */
        }
    },

    created() {  /* created() statt mounted(), damit auf Server und Client ausgeführt wird, damit Text nicht zuerst in ganzer Länge am Client udn dann verkürzt wird */
        this.chunks = this.getChunks()
    },

    methods: {
        /* Chunks aufteilen am Leerzeichen */
        getChunks() {  /* Erster Chunk ist, entweder Text kurz genug oder target ist "-1", also indexOf findet keine Leerzeichen nach target length */
            const position = this.text.indexOf(" ", this.target)  /* mit indexOf das nächste Leerzeichen finden nach target */
            
            if(this.text.length <= this.target || position === -1)  /* Wenn Text kleiner oder gleich wie target oder keine Leerzeichen nach target length... */
                return [this.text]                                  /* ... returne den Text. ansonsten ... */
                                                    /* ... teile Text auf in zwei Arrays mit substring ... */
            return [this.text.substring(0, position), this.text.substring(position)]  /* ... von position 0 bis target und von target bis Textende (wenn kein 2. Parameter vergeben) */
        }
    }
}
</script>
<style scoped>  /* scoped = nur in dieser Datei / Komponente anwenden */
.link {
    color: blue;
    background-color: white;
    border: none;
    text-decoration: underline;
    cursor: pointer;
}
.link:focus {
    border: none;
    outline: none;
}
</style>
<template>
<span>{{ displayText }}</span>
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
            return this.chunks.length === 2
        },
        displayText(){
            if(!this.isTooLong || this.isExpanded)
                return this.chunks.join(" ")
            
            return this.chunks[0] + " ..."
        }
    },

    created() {  /* created() statt mounted(), damit auf Server und Client ausgeführt wird, damit Text nicht zuerst in ganzer Länge am Client udn dann verkürzt wird */
        this.chunks = this.getChunks()
    },

    methods: {
        /* Chunks aufteilen am Leerzeichen */
        getChunks() {  /* Erster Chunk ist, entweder Text kurz genug oder target ist "-1", also indexOf findet keine Leerzeichen */
            const position = this.text.indexOf(" ", this.target)  /* mit indexOf das nächste Leerzeichen finden nach target */
            
            if(this.text.length <= this.target || position === -1)   /*  */
                return [this.text]
            
            return [this.text.substring(0, position), this.text.substring(position)]
        }
    }
}
</script>

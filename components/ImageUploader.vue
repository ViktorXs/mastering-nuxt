<template>
<div>
    <input type="file" accept=".jpeg,.jpg,image/jpeg" @change="uploadFile" />  <!-- Datei auswählen, jpeg erlaubt, event auslösen -->
</div>
</template>

<script>
import { unWrap } from "~/utils/fetchUtils"

export default {
    methods: {
        async uploadFile(e) {  /* Weil Dateien hochgeladen werden und API's gerufen werden, muss es eine asynchrone Funktion sein. */
            const file = e.target.files[0]  /* im Event Objekt beim Auslösen wird die Datei unter "target/files/0" erstellt. Mit der Variable wird sie von dort gespeichert */
            if(!file)
                return

            const filename = file.name.split(".").slice(0, -1).join(".") + Date.now()  /* am Punkt aufteilen, letzten Teil löschen und Punkt anhängen, wenn mehr als 1 Punkt im Namen wäre + Datum für einmaligen Namen. */
            const options = {
                timestamp: Date.now(),  /* Notwendig für die Cloudinary Signatur, weil hashes nur eine Stunde gültig sind. */
                public_id: filename,  /* Die public-id - aus dem filename bestehend - "wird in allen URL's verwendet, die Cloudinary generiert." */
            }

            const response = await unWrap(await fetch("/api/cloudinary/signature", {  /* Now we can safely assign our signatures to a variable */
                method: "POST",
                body: JSON.stringify(options),
                headers: {
                    "Content-Type": "application/json",
                }
            }))
            const signature = response.json.signature
            
            const readData = (fileObj) => new Promise((resolve) => {  /* es nimmt ein Datei-Objekt als Parameter und gibt ein promise aus als anonyme Inlinefunktion */
                const reader = new FileReader()  /* FileReader Konstante aus Mozillas JS FileReader Objekt  */
                reader.onloadend = () => resolve(reader.result)  /* triggert jedes mal resolve, wenn Lesen der Datei endet */  /* reader.result = Inhalt der Datei */
                reader.readAsDataURL(fileObj)  /* Das Auslesen der Datei beginnen und Inhalt der Datei in einer URL präsentieren */
            })

            const data = await readData(file)  /* readData aufrufen, indem man die Datei "file" übergibt und es der Konstante zuweist um den Dateiinhalt zu erhalten */
            
            /* Datei hochladen über die nuxt cloudinary Instanz */  /* Upload braucht zwei Parameter. Erster ist der ausgelesene Dateiinhalt... */
            const asset = await this.$cloudinary.upload(data, {  /* ... zweiter Parameter ist ein Objekt aus Konfigurationen */
                ...options,
                apiKey: this.$config.cloudinary.apiKey,
                signature,
            })
            this.$emit('file-uploaded', asset.secure_url)  /* Wenn hochgeladen event mit secure_url emitten, damit es z.B. aus einer Component gefetcht wird. */
        },
    },
}
</script>

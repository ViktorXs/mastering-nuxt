import { createHash } from "crypto"

export default function() {
    const config = this.options.privateRuntimeConfig.cloudinary  /* cloudinary nuxt config einer Konstante zuweisen */

    this.nuxt.hook("render:setupMiddleware", (app) => {  /* mit middleware hook eine funktion auf einen pfad zuweisen */
        app.use("/api/cloudinary/signature", setSignature)
    })

    /* Middleware */
    function setSignature(req, res) {
        try {
            const sha1 = createHash("sha1")  /* SHA-1 Hash mit der node crypto library erzeugen */
            const payload = []  /* store & sort the parameters, recieved from the req body. cloudinary */

            Object.keys(req.body).forEach(key => {
                payload.push(`${key}=${req.body[key]}`)
            })

            sha1.update(payload.sort().join("&") + config.apiSecret)
            res.end(JSON.stringify({
                signature: sha1.digest("hex")  /* digest = Zusammenfassen. hex = Signatur in hexadezimal erstellen */
            }))
        } catch(error) {
            return error(error)
        }
    }
}
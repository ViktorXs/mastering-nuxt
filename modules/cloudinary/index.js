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

            Object.keys(req.body).forEach(key => {  /* Cloudinary benötigt eine url-like enkodierung, getrennt mit &-Zeichen. */
                payload.push(`${key}=${req.body[key]}`)  /* -> "key=value&key=value&key=value&..." usw. */
            })

            sha1.update(payload.sort().join("&") + config.apiSecret)
            res.end(JSON.stringify({
                signature: sha1.digest("hex")  /* digest = Zusammenfassen. hex = Signatur in hexadezimal enkodieren */
            }))
        } catch(error) {
            return error(error)
        }
    }
}

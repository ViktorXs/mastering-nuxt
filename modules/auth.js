import cookie from "cookie"

export default function() {  /* Module müssen als Funktionen exportiert werden */
    const authConfig = this.options.config.publicRuntimeConfig.auth /* this.options. erlaubt aus dem modul container die nuxt config zu erreichen und zu speichern */

    this.nuxt.hook("render:setupMiddleware", (app) => {
        app.use("/api", handler)  /* Nimmt eine Funktion (die handler Funktion unten), welche auf eine gewisse Route reagiert "/api" */
    })    

    function handler(req, res, next) {  /* Middleware */
        console.log(req.url)
        next()
    }
}

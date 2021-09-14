import cookie from "cookie"

export default function() {  /* Module müssen als Funktionen exportiert werden */
    const authConfig = this.options.publicRuntimeConfig.auth /* this.options. erlaubt aus dem modul container die nuxt config zu erreichen */

    this.nuxt.hook("render:setupMiddleware", (app) => {
        app.use("/api", handler)  /* Nimmt eine Funktion (die handler Funktion unten), welche auf eine gewisse Route reagiert "/api" */
    })    

    function handler(req, res, next) {  /* Middleware handler */
        const idToken = cookie.parse(req.headers.cookie) [authConfig.cookieName]
        
        /* Zur Kontrolle */
        console.log(req.url)
        console.log(idToken)

        /* next() notwendig, damit nächste Middleware lädt */
        next()
    }
}

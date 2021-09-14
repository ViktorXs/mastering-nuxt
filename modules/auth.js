import cookie from "cookie"
import {OAuth2Client} from "google-auth-library"

export default function() {  /* Module müssen als Funktionen exportiert werden */
    const authConfig = this.options.publicRuntimeConfig.auth /* this.options. erlaubt aus dem modul container die nuxt config zu erreichen */

    this.nuxt.hook("render:setupMiddleware", (app) => { /* Mit NuxtJS hook eine Instanz der app erstellt */
        app.use("/api", handler)  /* Nimmt eine Funktion (die handler Funktion in Zeile 10), welche auf eine gewisse Route reagiert "/api" */
    })    

    async function handler(req, res, next) {  /* Middleware handler */
        const idToken = cookie.parse(req.headers.cookie) [authConfig.cookieName]  /* "cookie" library parse, um den Token vom Cookie aus dem string des cookie header zu erhalten. cookieName "idToken" des Cookies aus authConfig nehmen */
        
        /* Zur Kontrolle */
        console.log(req.originalUrl)
        console.log(idToken)

        const ticket = await getUser(idToken)  /* Benutzerinformationen abrufen */
        console.log(ticket)

        /* next() notwendig, damit nächste Middleware lädt */
        next()
    }

    async function getUser(idToken) {  /* Token aus dem Cookie verifizieren */
        const client = new OAuth2Client(authConfig.clientId)  /* Um Googles verifyIdToken zu rufen, ist die OAuth2 Instanz notwendig new OAuth2Client(CLIENT_ID) */
        try {
            const ticket = await client.verifyIdToken({ 
                idToken,
                audience: authConfig.clientId,
            })
            return ticket.getPayload() /* Dekodierten Token zurückgeben mit .getPayload()-Funktion aus dem Ticket */
        }
        catch(error) {
            console.error(error)
        }
    }
}
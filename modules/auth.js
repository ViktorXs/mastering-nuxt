import cookie from "cookie"
import {OAuth2Client} from "google-auth-library"

export default function() {  /* Module müssen als Funktionen exportiert werden */
    const authConfig = this.options.publicRuntimeConfig.auth /* this.options. erlaubt aus dem modul container die nuxt config zu erreichen */

    this.nuxt.hook("render:setupMiddleware", (app) => { /* Mit NuxtJS hook eine Instanz der app erstellt */
        app.use("/api", handler)  /* Nimmt eine Funktion (die handler Funktion in Zeile 11), welche auf eine erwünschte Route reagiert. Z.B. "/api" */
    })    

    async function handler(req, res, next) {  /* Middleware handler */
        const idToken = cookie.parse(req.headers.cookie) [authConfig.cookieName]  /* "cookie" library parse, um den Token vom Cookie aus dem string des cookie header zu erhalten. cookieName "idToken" des Cookies aus authConfig nehmen */
        if(!idToken) 
            return rejectHit(res)
        
        const ticket = await getUser(idToken)  /* Benutzerinformationen abrufen */
        if(!ticket) 
            return rejectHit(res)

        /* Zur Kontrolle */
        console.log(req.originalUrl)
        console.log(idToken)
        console.log(ticket)

        req.identity = {  /* Ein Objekt aus ausgewählten Benutzerinformationen, sodass jede middleware darauf zugreifen kann/darf */
            id: ticket.sub,
            email: ticket.email,
            name: ticket.name,
            image: ticket.pixture,
        }
        /* next() notwendig, damit nächste Middleware lädt */
        next()
    }

    /* Benutzerinformationen erhalten indem Token zur verifizierung geschickt wird */
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
    function rejectHit(res) {  /* Wenn falscher Token oder keine Anmeldung... */
        res.statusCode = 401  /* ...unauthorisiert */
        res.end()
    }
}

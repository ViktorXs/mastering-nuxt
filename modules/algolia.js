import fetch from "node-fetch"  /*  Um mit Algolia zu kommunizieren */
import { unWrap, getErrorResponse } from "../utils/fetchUtils"  /* Statt "~/" ist "../" notwendig, weil module über node laufen */

export default function() {
    const algoliaConfig = this.options.privateRuntimeConfig.algolia   /* Vom Modul zu nuxt.config mit this.options, statt $config */
    
    const headers = {
        "X-Algolia-API-Key": algoliaConfig.apiKey,
        "X-Algolia-Application-Id": algoliaConfig.appId,
    }

    this.nuxt.hook("render:setupMiddleware", (app) => {
        app.use("/api/user", getUserRoute)
    })

    async function getUserRoute(req, res, next) {  /* Prüfen, ob der User schon in Algolia existiert, ansonsten neuen erstellen und ausgeben */
        const identity = req.identity
        const userData = await getUserById(identity)
        
        if(userData.status === 200) {
            sendJSON(userData.json, res)
            return
        }
        createUser(req.identity)  /* Durch Google angemeldeten User in Algolia erstellen/eintragen */
        sendJSON(makeUserPayload(identity), res)
    }

    async function createUser(identity) {  /* Einen Benutzer in der Algolia Datenbank erstellen  */
        try{
            return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, { 
                headers,
                method: "PUT",  /* Statt POST, PUT um Benutzer zu erstellen */
                body: JSON.stringify(makeUserPayload(identity))
            }))
        } catch(error) {
            return getErrorResponse(error)
        }
    }

    async function getUserById(userId) {
        try{
            return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, {
                headers,
            }))
        } catch(error) {
            return getErrorResponse(error)
        }
    }

    function sendJSON(data, res) {  /* "Helper"-Funktion. Die korrekten headers an API Response einfügen und die Daten senden */
        res.setHeader("Content-Type", "application/json")  /* setHeader vom res Objekt. Es nimmt einen Key und einen Wert */
        res.end(JSON.stringify(data))  /* Schließt das res object ab und sendet es */ /* Erinnerung: JSON datenbank muss mit stringify umgewandelt werden */
    }

    function makeUserPayload(identity) {  /*  Konstruiert das Objekt, was an Algolia gesendet wird */
        return {
            name: identity.name,
            email: identity.email,
            image: identity.image,
            joined: new Date().toISOString(),
            homeId: [],
            reviewCount: 0,
            description: "",
        }
    }
}

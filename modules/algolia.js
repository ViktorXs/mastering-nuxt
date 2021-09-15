import fetch from "node-fetch" /* Um mit Algolia zu kommunizieren */
import { unWrap, getErrorResponse } from "../utils/fetchUtils"

export default function() {
    const algoliaConfig = this.options.privateRuntimeConfig.algolia
    const headers = {
        "X-Algolia-API-Key": algoliaConfig.apiKey,
        "X-Algolia-Application-Id": algoliaConfig.appId,
    }

    this.nuxt.hook("render:setupMiddleware", (app) => {
        app.use("/api/user", getUserRoute)
    })

    function getUserRoute(req, res, next) {
        console.log(req.identity)
        createUser(req.identity)  /* Durch Google angemeldeten User in Algolia erstellen/eintragen */
        next()
    }

    async function createUser(identity) {  /* Einen Benutzer in der Algolia Datenbank erstellen  */
        try{
            return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, { 
                headers,
                method: "PUT",  /* Statt POST, PUT um Benutzer zu erstellen */
                body: JSON.stringify(makeUserPayload(identity))
            }))
        } catch(error){
            return getErrorResponse(error)
        }
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

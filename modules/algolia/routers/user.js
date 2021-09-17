import fetch from "node-fetch"
import { unWrap, getErrorResponse } from "../../../utils/fetchUtils"
import { sendJSON } from "../helpers"

export default (headers) => {  /* headers als Parameter für import in index in userRouter Funktion */
    return async function getUserRoute(req, res, next) {  /* Damit die Funktion eine Route exportiert, return anweisen */
        const identity = req.identity
        const userData = await getUserById(identity)
        
        if(userData.status === 200) {
            sendJSON(userData.json, res)
            return
        }
        
        createUser(req.identity)
        sendJSON(makeUserPayload(identity), res)
    }
    
    async function createUser(identity) {
        try{
            return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, { 
                headers,
                method: "PUT",
                body: JSON.stringify(makeUserPayload(identity))
            }))
        } catch(error) {
            return getErrorResponse(error)
        }
    }
    
    async function getUserById(identity) {
        try{
            return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, {
                headers,
            }))
        } catch(error) {
            return getErrorResponse(error)
        }
    }
    
    function makeUserPayload(identity) {
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

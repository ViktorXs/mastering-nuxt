import { sendJSON } from "../helpers"

export default (apis) => {  /* apis als Parameter für import in index in userRouter Funktion */
    return async function getUserRoute(req, res, next) {  /* Damit die Funktion eine Route exportiert, return anweisen */
        const identity = req.identity
        /* const userData = await getUserById(identity) */
        const userData = await apis.user.getById(identity)
        
        if(userData.status === 200) {
            sendJSON(userData.json, res)
            return
        }
        
        /* createUser(req.identity) */
        /* sendJSON(makeUserPayload(identity), res) */

        const payload = makeUserPayload(identity)
        apis.user.create(req.identity, payload)
        sendJSON(payload, res)
    }

    /* Ausgelagert in /apis/user.js */
    /* async function createUser(identity) {} */
    /* async function getUserById(identity) {} */
    
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

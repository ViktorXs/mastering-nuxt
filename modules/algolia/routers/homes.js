import { v4 as uuidv4 } from "uuid"
import { rejectHitBadRequest, hasBadBody, sendJSON } from "../helpers"  /* sendJSON kann später benötigt werden */

export default (apis) => {
    return async (req, res) => {
        if(req.method === "POST") {  /* Prüfen, ob POST... */
           if(hasBadBody(req)) {  /* ... oder keinen body... */
               return rejectHitBadRequest(res)  /* ... dann status 400 bad request */
           }
           await createHome(req.identity, req.body, res)
           return
        }
        rejectHitBadRequest(res)
    }

    async function createHome(identity, body, res) {  /* home mit dem payload erstellen */
        const homeId = uuidv4()  /* zufällige nummer für die home ID generieren */
        const payload = {
            ...body,
            reviewCount: 0,
            reviewValue: 0,
            userId: identity.id,  /* Ein "Nice to have" */
        }
        const resp = await apis.homes.create(homeId, payload)
        
        if(!resp.ok) {  /* Wenn Response nicht ok */
            resp.statusCode = 500
            resp.send()
            return
        }
        sendJSON({}, res)  /* für spätere Notwendigkeit vorbereitet */
    }
}

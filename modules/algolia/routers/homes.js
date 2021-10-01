import { v4 as uuidv4 } from "uuid"
import { rejectHitBadRequest, hasBadBody, sendJSON } from "../helpers"  /* sendJSON kann später benötigt werden */

export default (apis) => {
    return async (req, res) => {
        if(req.method === "DELETE") {  /* returnen, wenn request DELETE ist */
            const homeId = req.url.replace(/\//g, "")  /* URL und Slashes daraus mit leerem String ersetzen */
            return await deleteHome(req.identity, homeId, res)
        }

        if(req.method === "GET" && req.url === "/user/") {  /* "just check, if that's the URL, that is being requested" */
            return await getHomesByUser(req.identity.id, res)  /* Wenn ja, dann Funktion getHomesByUser ausgeben */
        }

        if(req.method === "POST") {  /* Prüfen, ob POST... */
           if(hasBadBody(req)) {  /* ... oder keinen body... */
               return rejectHitBadRequest(res)  /* ... dann status 400 bad request */
           }
           await createHome(req.identity, req.body, res)
           return
        }
        rejectHitBadRequest(res)
    }

    async function deleteHome(identity, homeId, res) {
        await Promise.all([  /* Home vom Home index und user index entfernen */
            apis.homes.delete(homeId),
            apis.user.removeHome(identity, homeId)
        ])
        sendJSON({}, res)
    }

    async function getHomesByUser(userId, res) {
        const payload = (await apis.homes.getByUserId(userId)).json.hits  /* mit hits (In einem Array aufgeteilt) jede Unterkunft dem User in payload speichern. */
        sendJSON(payload, res)  /* Mit sendJSON die payload senden  */
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
            resp.end()
            return
        }
        await apis.user.assignHome(identity, homeId)  /* für createHome Funktion assignHome aus user.js api aus algolia modul durchgeben */
        sendJSON({ homeId }, res)  /* returnen, wenn etwas gelöscht oder verändert wurde */
    }
}

import fetch from "node-fetch"
import { getHeaders } from "../helpers"
import { unWrap, getErrorResponse } from "../../../utils/fetchUtils"

export default (algoliaConfig) => {
    const headers = getHeaders(algoliaConfig)

    return {
        async assignHome(identity, homeId) {  /* UserId mit HomeId verbinden */
            const payload = (await this.getById(identity)).json  /* identity aus Algolia als json an payload übergeben */
            payload.homeId.push(homeId)  /* Home Id in das Home array in die payload durchgeben */
            
            /* PUT aus create nutzen. Fügt nur etwas ein, was noch nicht existiert, bzw aktualisiert etwas, wenn es existiert */
            this.create(identity, payload)  /* Mit create eigentlich nur updaten */
        },

        async removeHome(identity, homeId) {
            const payload = (await this.getById(identity)).json  /* Zur Löschung dieselbe Daten durch die homeId erhalten */
            const homes = payload.homeId.filter(id => id !== homeId)  /* homeId aus home filtern */
            payload.homeId = homes  /* von homeId gefilterten Inhalt in payload laden */
            this.create(identity, payload)  /* updaten */
        },

        create: async (identity, payload) => {
            try{
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, { 
                    headers,
                    method: "PUT",
                    body: JSON.stringify(payload)
                }))
            } catch(error) {
                return getErrorResponse(error)
            }
        },

        getById: async (identity) => {
            try{
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, {
                    headers,
                }))
            } catch(error) {
                return getErrorResponse(error)
            }
        }
    }
}

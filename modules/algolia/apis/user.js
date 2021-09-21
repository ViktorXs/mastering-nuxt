import fetch from "node-fetch"
import { getHeaders } from "../helpers"
import { unWrap, getErrorResponse } from "../../../utils/fetchUtils"

export default (algoliaConfig) => {
    const headers = getHeaders(algoliaConfig)
    /* Daten an Algolia senden, um einen User in der DB zu erzeugen */

    return {
        create: async (identity, payload) => {  /* Daten an Algolia senden um user zu erzeugen */
            try{
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/users/${identity.id}`, { 
                    headers,
                    method: "PUT",
                    body: JSON.stringify(payload)  /* makeUserPayload(identity) ersetzen mit parameter payload */
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

import fetch from "node-fetch"
import { getHeaders } from "../helpers"
import { unWrap, getErrorResponse } from "../../../utils/fetchUtils"

export default (algoliaConfig) => {
    const headers = getHeaders(algoliaConfig)

    return {
        create: async (homeId, payload) => {  /* Daten an Algolia senden um home zu erzeugen */
            try{
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
                    headers,
                    method: "PUT",
                    body: JSON.stringify(payload),
                }))
            } catch(error) {
                return getErrorResponse(error)
            }
        },

        delete: async (homeId, payload) => {  /* Löschen request an Algolia senden */
            try{
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
                    headers,
                    method: "DELETE",
                }))
            } catch(error) {
                return getErrorResponse(error)
            }
        },

        getByUserId: async (userId) => {  /* userId aus der homes Tabelle */
            try{
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/homes/query`, {  /* mit query die ganze homes Tabelle */
                    headers,
                    method: "POST",
                    body: JSON.stringify({
                        filters: `userId:${userId}`,  /* nach dem Facet userId filtern, wie in Algolia konfiguriert */
                        attributesToRetrieve: [  /* Nur notwendige Daten in einem Array erhalten, statt alle Daten. Ist schneller. */
                            "objectID",
                            "title",
                        ],
                        attributesToHighlight: [],  /* "We also don't net syntax-highlighting in our results." */
                    }),
                }))
            } catch(error) {
                return getErrorResponse(error)
            }
        },
    }
}

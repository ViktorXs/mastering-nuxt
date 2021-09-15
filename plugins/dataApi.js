import { unWrap, getErrorResponse } from "~/utils/fetchUtils"  /* unWrap und getErrorResponse in utils verlegt */

export default function({ $config }, inject) {  /* statt "context" auf nuxt.config zugreifen */
    const apiKey = $config.algolia.apiKey  /* Keys in nuxt.config ausgelagert */
    const appId = $config.algolia.appId  /* Keys in nuxt.config ausgelagert */
    const headers = {
        "X-Algolia-API-Key": apiKey,
        "X-Algolia-Application-Id": appId,
    }

    inject("dataApi", {
        getHome,
        getReviewsByHomeId,
        getUserByHomeId,
        getHomesByLocation,
    })

    async function getHome(homeId) {
        try{
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, { headers }))
        } catch(error){
            return getErrorResponse(error)
        }
    }

    async function getReviewsByHomeId(homeId) {
        try{
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/reviews/query`, { 
                headers,
                method: "POST",
                body: JSON.stringify({
                    filters: `homeId:${homeId}`,
                    hitsPerPage: "6",
                    attributesToHighlight: [],
                })
            }))
        } catch(error){
            return getErrorResponse(error)
        }
    }

    async function getUserByHomeId(homeId) {
        try{
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/users/query`, { 
                headers,
                method: "POST",
                body: JSON.stringify({
                    filters: `homeId:${homeId}`,
                    attributesToHighlight: [],
                })
            }))
        } catch(error){
            return getErrorResponse(error)
        }
    }

    async function getHomesByLocation(lat, lng, radiusInMeters = 1500) {
        try{
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/query`, { 
                headers,
                method: "POST",
                body: JSON.stringify({
                    aroundLatLng: `${lat}, ${lng}`,
                    aroundRadius: radiusInMeters,
                    hitsPerPage: 10,
                    attributesToHighlight: [],
                })
            }))
        } catch(error){
            return getErrorResponse(error)
        }
    }
}

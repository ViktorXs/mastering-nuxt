import { unWrap, getErrorResponse } from "~/utils/fetchUtils"

export default function({ $config }, inject) {
    const apiKey = $config.algolia.apiKey
    const appId = $config.algolia.appId
    const headers = {
        "X-Algolia-API-Key": apiKey,
        "X-Algolia-Application-Id": appId,
    }

    inject("dataApi", {
        getHome,
        getReviewsByHomeId,
        getUserByHomeId,
        getHomesByLocation,
        getHomes,
    })

    async function getHome(homeId) {
        try{
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, { headers }))
        } catch(error) {
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
        } catch(error) {
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
        } catch(error) {
            return getErrorResponse(error)
        }
    }

    async function getHomesByLocation(lat, lng, radiusInMeters = 1500 * 150) {  /* Hochgestellt für schnelleres Finden im Tutorial. Standardvalue bei 1500 Meter */
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
        } catch(error) {
            return getErrorResponse(error)
        }
    }

    async function getHomes() {  /* Für nuxt-image Methode, um web app mit Bildern per cloudinary auszufüllen??????????? */
        try{
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/query`, { 
                headers,
                method: "POST",
                body: JSON.stringify({
                    hitsPerPage: 3,
                    attributesToHighlight: [],
                })
            }))
        } catch(error) {
            return getErrorResponse(error)
        }
    }
}

export default function(context, inject){
    const appId = "9P5ZZJ0U0N"
    const apiKey = "b59bf0690de2a7650fe53e9d49e01eb2"
    const headers = {
        "X-Algolia-Application-Id": appId,
        "X-Algolia-API-Key": apiKey
    }

    inject("dataApi", {
        getHome
    })

    async function getHome(homeId){
        return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, { headers }))
        async function unWrap(response){  /* response darauf vorbereiten auf die vue page zu returnen */
            const json = await response.json()
            const { ok, status, statusText } = response
            return {
                json,
                ok,
                status,
                statusText
            }
        }
    }
}
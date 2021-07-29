export default function(context, inject){
    const appId = "9P5ZZJ0U0N"
    const apiKey = "b59bf0690de2a7650fe53e9d49e01eb2"

    inject("dataApi", {
        getHome
    })

    async function getHome(homeId){
        const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
            headers:{
                "X-Algolia-API-Key": apiKey,
                "X-Algolia-Application-Id": appId,
            }
        })
        const json = await response.json()
        return json

    }
}
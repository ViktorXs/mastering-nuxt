/* Keys in Variablen eintragen */
export default function(context, inject){
    const appId = "9P5ZZJ0U0N"
    const apiKey = "b59bf0690de2a7650fe53e9d49e01eb2"

/* Die getHome-Funktion für den Rest der App verfügbar machen */
inject("dataApi", { /* 1. Parameter: Name. 2. Parameter, Objekt */
    getHome
})

/* Mit der API verbinden */
    async function getHome(homeId){ /* async wandelt Code in synchr. promises um */

    /* Mit dem GET-Endpunkt verbinden. 1. Parameter: URL */
        const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {

        /* 2. Parameter: Spezielle http header mitschicken */
            headers:{
                "X-Algolia-API-Key": apiKey,
                "X-Algolia-Application-Id": appId
            }
        })

        /* Die json daten aus algolia laden */
        const json = await response.json()  /* "erwarte" Daten aus der response Variable */
        return json /* Daten aus der Funktion returnen */
    }
}

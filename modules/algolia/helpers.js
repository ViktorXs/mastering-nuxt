export function getHeaders(algoliaConfig) {
    return {
        "X-Algolia-API-Key": algoliaConfig.apiKey,
        "X-Algolia-Application-Id": algoliaConfig.appId,
    }
}

export function sendJSON(data, res) {
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(data))
}

/* Fehlermeldung, wenn Server einen request nicht verarbeiten kann  */
export function rejectHitBadRequest(res) {  /* 400 Bad Request */
    res.statusCode = 400
    res.end()
}

/* Prüfen ob req ein body hat */
export function hasBadBody(req) {
    return !req.body || Object.keys(req.body).length === 0  /* kein body oder keine Eigenschaften */
}

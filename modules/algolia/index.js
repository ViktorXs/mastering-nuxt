import { getHeaders } from "./helpers"
import userRouter from "./routers/user"

export default function() {
    const algoliaConfig = this.options.privateRuntimeConfig.algolia
    const headers = getHeaders(algoliaConfig)  /* headers aus helpers modulkomponente einfügen */

/* Ausgelagert in helpers.js */
    /* const headers = {} */

    this.nuxt.hook("render:setupMiddleware", (app) => {
        app.use("/api/user", userRouter(headers))
    })

/* Ausgelagert in user.js */
    /* async function getUserRoute(req, res, next) {...} */
    /* async function createUser(identity) {...} */
    /* async function getUserById(identity) {...} */

/* Ausgelagert in helpers.js */
    /* function sendJSON(data, res) {...} */

/* Ausgelagert in user.js */
    /* function makeUserPayload(identity) {...} */
}

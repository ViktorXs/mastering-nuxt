/* import { getHeaders } from "./helpers" */
import getApis from "./apis"
import userRouter from "./routers/user"

export default function() {
    const algoliaConfig = this.options.privateRuntimeConfig.algolia
    const apis = getApis(algoliaConfig)
    /* const headers = getHeaders(algoliaConfig) */  /* headers aus helpers modulkomponente einfügen */
/* Ausgelagert in helpers.js */
    /* const headers = {} */

    this.nuxt.hook("render:setupMiddleware", (app) => {
        app.use("/api/user", userRouter(apis))  /* Statt headers, apis */  /* Weil getUserRoute in user.js verschoben, zu userRouter(headers) mit headers parameter verknüpft */
    })

}

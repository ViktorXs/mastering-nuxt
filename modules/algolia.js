export default function() {
    const algoliaConfig = this.options.privateRuntimeConfig.algolia

    this.nuxt.hook("render:setupMiddleware", (app) => {
        app.use("/api/user", getUserRoute)
    })

    function getUserRoute(req, res, next) {
        console.log(req.identity)
        next()
    }
}

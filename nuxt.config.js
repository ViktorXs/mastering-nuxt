export default {
    components: true,
    head: {
        titleTempalte: "Mastering Nuxt: %s",
        htmlAttrs: {
            lang: "en"
        },
        bodyAttrs: {
            class: ["my-style"]
        },
        meta: [{
          charset: "utf-8"
        }]
    },

    router: {
        prefetchLinks: false
    },
    plugins: [ "~/plugins/maps.client", "~/plugins/dataApi" ],
    modules: [  /* Module importieren. Weitere optionen möglich, wie z.b. diese Nachricht aus jedem beliebigemModul abrufen. */
        ["~/modules/testmodule1", { message1: "Hallo aus der nuxt.config!" }],
        "~/modules/testmodule2",
    ],

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],
}

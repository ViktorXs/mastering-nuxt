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
    modules: [],
    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',

        '@nuxtjs/tailwindcss',
    ],
    css: [ "~/assets/sass/app.scss" ],
    build: { 
        extractCSS: true,  /* css je component in separate files sichern */
        loaders: {
            imgUrl: { limit: 0 }  /* Base64 codierung abschalten */
        }
    }
}

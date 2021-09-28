export default {
    components: true,
    head: {
        titleTempalte: "Mastering Nuxt: %s",
        htmlAttrs: {
            lang: "en",
        },
        bodyAttrs: {
            class: [ "my-style" ],
        },
        meta: [{
          charset: "utf-8",
        }]
    },

    router: {
        prefetchLinks: false,
    },

    plugins: [ "~/plugins/maps.client", "~/plugins/dataApi", "~/plugins/auth.client", ],

    modules: [ "~/modules/auth", "~/modules/algolia", "~/modules/cloudinary", "@nuxtjs/cloudinary", ],

    buildModules: [
        '@nuxtjs/eslint-module',
        '@nuxtjs/vuetify',
        '@nuxtjs/tailwindcss',
    ],

    cloudinary: {
        cloudName: "viktorxs",
    },

    css: [ "~/assets/sass/app.scss" ],

    build: { 
        extractCSS: true,
        loaders: {
            imgUrl: { limit: 0 },
        },
    },

    publicRuntimeConfig: {
        auth: {
            cookieName: "idToken",
            clientId: "",  /* Nicht committen! */
        },
        algolia: {
            appId: "9P5ZZJ0U0N",
            apiKey: "",
        },
        cloudinary: {
            apiKey: "",  /* Nicht committen! */
        },
    },

    privateRuntimeConfig: {
        algolia: {  /* Algolia rechte für Lese- / Schreibrechte über das auth.js Modul mit identity */
            appId: "9P5ZZJ0U0N",
            apiKey: "",  /* Nicht committen! */
        },
        cloudinary: {
            apiSecret: "",  /* Nicht committen! */
        },
    },
}

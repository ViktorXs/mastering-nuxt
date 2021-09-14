export default {
    components: true,
    head: {
        titleTempalte: "Mastering Nuxt: %s",
        htmlAttrs: {
            lang: "en",
        },
        bodyAttrs: {
            class: ["my-style"],
        },
        meta: [{
          charset: "utf-8",
        }]
    },

    router: {
        prefetchLinks: false,
    },

    plugins: [ "~/plugins/maps.client", "~/plugins/dataApi", "~/plugins/auth.client", ],

    modules: [ "~/modules/auth", "~/modules/algolia", ],

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
        extractCSS: true,
        loaders: {
            imgUrl: { limit: 0 },
        },
    },

    publicRuntimeConfig: {
        auth: {
            cookieName: "idToken",
            clientId: "404691488375-9peld4jjtcnqmktsm6orlv3b620l0tqh.apps.googleusercontent.com",
        },
        algolia: {  /* Algolia rechte für nur Leserechte über das auth.js Modul mit identity */
            appId: "9P5ZZJ0U0N",
            apiKey: "b59bf0690de2a7650fe53e9d49e01eb2",
        },
    },

    privateRuntimeConfig: {
        algolia: {  /* Algolia rechte für Lese- / Schreibrechte über das auth.js Modul mit identity */
            appId: "9P5ZZJ0U0N",
            apiKey: "448997bc21a79093ffc6e1a7eba43b4b",  /* Aus Sicherheitsgründen wird der Key nach Feierabend aus Algolia gelöscht und ein Neuer mit addObject-Recht am nächsten Tag generiert. */
        },
    },    
}

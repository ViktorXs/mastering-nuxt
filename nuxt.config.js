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

    modules: [ "~/modules/auth", "~/modules/algolia", ],

    buildModules: [
        '@nuxtjs/eslint-module',
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
            clientId: "404691488375-sgj1ldirma6ppav79p3ibtvac1ll950a.apps.googleusercontent.com",  /* Täglich regeneriert */
        },
        algolia: {
            appId: "9P5ZZJ0U0N",
            apiKey: "b59bf0690de2a7650fe53e9d49e01eb2",
        },
    },

    privateRuntimeConfig: {
        algolia: {
            appId: "9P5ZZJ0U0N",
            apiKey: "56b9178c5455d27eebe63f9db9029691",  /* Täglich regeneriert */
        },
    },    
}

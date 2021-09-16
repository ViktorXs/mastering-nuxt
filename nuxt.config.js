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
            clientId: "404691488375-9peld4jjtcnqmktsm6orlv3b620l0tqh.apps.googleusercontent.com",
        },
        algolia: {
            appId: "9P5ZZJ0U0N",
            apiKey: "b59bf0690de2a7650fe53e9d49e01eb2",
        },
    },

    privateRuntimeConfig: {
        algolia: {
            appId: "9P5ZZJ0U0N",
            apiKey: "91fcb0f8b26a5178c14b48494f7da910",  /* Täglich regeneriert */
        },
    },    
}

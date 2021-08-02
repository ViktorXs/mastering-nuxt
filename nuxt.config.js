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
    plugins:[ "~/plugins/maps.client", "~/plugins/dataApi" ],  /* Weil client in dateinamen steht, weiß Nuxt schon, dass es auf der Client Seite ausgeführt werden soll */
    
    /* Ursprünglich so:
    plugins: [{
        src: "~/plugins/maps.client",   /* Quelle angeben
        mode: "client"                  /* Client oder Server?
        /* Wenn mode nicht existiert, wird plugin standardmäßig in meide Modi ausgeführt
    }] */

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

}

export const state = () => ({
    isLoggedIn: false,
    user: {},  /* Benutzerinformationen werden hier gespeichert. Z.b. imageUrl, name... */
})

export const mutations = {
    user(state, user) {
        state.isLoggedIn = !!user  /* truthy oder falsey */
        state.user = user || {}  /* Wenn falsey, user auf default setzen {} */
    }
}

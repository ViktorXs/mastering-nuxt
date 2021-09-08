export const state = () => ({  /* State MUSS als Funktion zurückgegeben werden. */
    counter: 0,
})

export const actions = {  /* Können Objekte sein, weil sie an state übergeben werden */
    counterUp({ state, commit }) {
        commit("setCounter", state.counter + 1)
    },
}

export const mutations = {
    setCounter(state, value) {
        state.counter = value
    },
}

export const getters = {
    counterGetter(state) {
        return state.counter + 1000
    },
}

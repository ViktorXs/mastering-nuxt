export default {  /* Können Objekte sein, weil sie an state übergeben werden */
    counterUp({ state, commit }) {
        commit("setCounter", state.counter + 1)
    }
}

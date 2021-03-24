export default {
    enteredInput(state, payload) {
        state.benefits[payload.id] = payload.value;
    },
}
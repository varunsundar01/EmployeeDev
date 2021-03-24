export default {
    enteredInput(context, payload) {
        Object.keys(context.state.benefits).find((key) => {
            if (key === payload.id) {
                context.commit('enteredInput', payload);
            }
        });
    }
}
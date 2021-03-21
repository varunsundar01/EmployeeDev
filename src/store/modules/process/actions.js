export default {
    enteredInput(context, payload) {
        Object.keys(context.state.process).find((key) => {
            if (key === payload.id) {
                context.state.process[key] = payload.value;
            }
        });
        context.commit('enteredInput');
    }
}
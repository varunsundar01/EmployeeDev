export default {
    enteredInput(state) {
        console.log('problem: ' + state.process.problem);
        console.log('solution: ' + state.process.solution);
        console.log('implementation: ' + state.process.implementation);
    }
}
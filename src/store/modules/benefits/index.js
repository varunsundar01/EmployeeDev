import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            benefits: {
                implementationCost: null,
                costSavings: null,
                timeToComplete: null,
                fullName: "",
                currentDate: null
            }
        }
    },
    mutations,
    actions,
    getters
}
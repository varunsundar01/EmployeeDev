import { createStore } from 'vuex';

import processModule from './modules/process/index.js';
import benefitsModule from './modules/benefits/index.js';

const store = createStore({
    modules: {
        process: processModule,
        benefits: benefitsModule
    }
});

export default store;
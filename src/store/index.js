import { createStore } from 'vuex';

import projectsModule from "./modules/projects/index.js";
import authModule from './modules/auth/index.js';

const store = createStore({
    modules: {
        projects: projectsModule,
        auth: authModule,
    },
});

export default store;
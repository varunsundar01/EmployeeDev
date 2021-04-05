import { createApp } from 'vue'
import App from './App.vue'

//Vuex Store
import store from './store/index.js';

//Import Router
import router from './router.js';

//Global CSS
import "./assets/css/main.css";


//Global components
import TheHeader from "./components/layout/TheHeader";
import TheFooter from "./components/layout/TheFooter";
import BaseCard from './components/UI/BaseCard';
import BaseButton from './components/UI/BaseButton';
import FormElement from './components/UI/FormElement';
import TheSpinner from './components/UI/TheSpinner';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('TheHeader', TheHeader);
app.component('TheFooter', TheFooter);
app.component('BaseCard', BaseCard);
app.component('BaseButton', BaseButton);
app.component('FormElement', FormElement);
app.component('TheSpinner', TheSpinner);

app.mount('#app')
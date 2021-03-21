import { createApp } from 'vue'
import App from './App.vue'

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

const app = createApp(App);

app.use(router);

app.component('TheHeader', TheHeader);
app.component('TheFooter', TheFooter);
app.component('BaseCard', BaseCard);
app.component('BaseButton', BaseButton);
app.component('FormElement', FormElement);

app.mount('#app')
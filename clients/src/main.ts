import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import {createPinia} from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {} from "@/icons";

const app = createApp(App)
const pinia = createPinia()
app.component("font-awesome-icon",FontAwesomeIcon)
app.use(pinia)
app.use(router)
app.mount('#app')

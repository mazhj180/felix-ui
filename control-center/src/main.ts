import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {} from "@/icons";
import router from "@/router";
import vPreviewImage from 'v-preview-image'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(vPreviewImage,{previewStyle:{width:'200px',height:'150px'}})
app.component("font-awesome-icon",FontAwesomeIcon)

app.mount('#app')

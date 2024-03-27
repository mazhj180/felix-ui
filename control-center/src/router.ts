import {createRouter,createWebHistory} from "vue-router";
import ClientUI from "./components/pages/ClientUI.vue";

const router = createRouter({
   history:createWebHistory(),
   routes:[
        {
            path:'/',
            component: ClientUI
        },
        {
            name:'client',
            path:'/client-ui',
            component:ClientUI
        }
   ]
})
export default router
 import {createRouter,createWebHistory} from "vue-router";
 import Form from '@/components/common/Form.vue';

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            redirect:'/home'
        },
        {
            path:'/form',
            component:Form
        }   
    ]
})
 export default router
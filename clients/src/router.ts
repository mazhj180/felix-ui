 import {createRouter,createWebHistory} from "vue-router";
 import Login from "@/components/pages/Login.vue";
 import Mine from "@/components/pages/Mine.vue";
 import Classic from "@/components/pages/Classic.vue";
 import Recommend from "@/components/pages/Recommend.vue";
 import Category from "@/components/pages/Category.vue";
 import Bookshelf from "@/components/pages/Bookshelf.vue";
 import Bookstore from "@/components/pages/Bookstore.vue";
 import Topic from "@/components/pages/Topic.vue";

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            redirect:'/home'
        },
        {
            name:'home',
            path:'/home',
            component:Bookstore,
            children:[
                {   
                    name:'recommend',
                    path:'',
                    redirect: '/home/recommend'
                },
                {
                    path:'topic',
                    component:Topic, 
                },
                {
                    path:'recommend',
                    component:Recommend,
                },
                {
                    path:'classic',
                    component:Classic
                }
            ]
        },
        {
            name:'login',
            path:'/login',
            component:Login
        },
        {
            name:'mine',
            path:'/mine',
            component:Mine
        },
        {
            name:'category',
            path:'/category',
            component:Category
        },
        {
            name:'bookshelf',
            path:'/bookshelf',
            component:Bookshelf

        },
        
    ]
})
 export default router
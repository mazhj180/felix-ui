 import {createRouter,createWebHistory} from "vue-router";
 import Login from "@/components/pages/Login.vue";
 import Mine from "@/components/pages/Mine.vue";
 import Classic from "@/components/pages/Classic.vue";
 import Recommend from "@/components/pages/Recommend.vue";
 import Category from "@/components/pages/Category.vue";
 import Bookshelf from "@/components/pages/Bookshelf.vue";
 import Bookstore from "@/components/pages/Bookstore.vue";
 import Topic from "@/components/pages/Topic.vue";
 import  Search  from "@/components/pages/Search.vue";
 import CategoryDetail from "@/components/pages/CategoryDetail.vue";
 import Knowledge from "@/components/pages/Knowledge.vue";
 import Child from "@/components/pages/Child.vue";
 import HighScore from "@/components/pages/HighScore.vue";
 import Latest from "@/components/pages/Latest.vue";

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
                },
                {
                    path:'knowledge',
                    component:Knowledge
                },
                {
                    path:'child',
                    component:Child
                },
                {
                    path:'highScore',
                    component:HighScore
                },
                {
                    path:'latest',
                    component:Latest
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
        {
            name:'search',
            path:'/search',
            component:Search
        },
        {
            name:'categoryDetail',
            path:'/categoryDetail/:id',
            component:CategoryDetail
        }
        
    ]
})
 export default router
import { defineStore } from "pinia";

export const useHomepageStore = defineStore('homepage',{
    state(){
        return {
            rankings:{
                hotRank:[],
                popRank:[],
                newRank:[]
            }

        }
    },
    actions:{
        
    }
})
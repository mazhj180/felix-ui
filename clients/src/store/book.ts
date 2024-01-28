import { getAllCategories, getRankings } from "@/api/book";
import type { rank_vo, category, rankings } from "@/api/types";
import { rank_type } from "@/api/types";
import { defineStore } from "pinia";

export const useBookStore = defineStore('book',{
    state :():{ 
        categories:category[], 
        rankings:rankings
    } => {
        return {
            categories:[],
            rankings:{
                hot:[],
                like:[],
                score:[]
            }
        }
    },
    actions:{
        async setCategories(){
            if(this.categories.length == 0){
                let res = await getAllCategories()
                if (res.code == 200){
                    this.categories = res.data as category[]
                }
            }
        },
        async setRankings(type:rank_type){
            if(this.rankings[type].length == 0){
                let res = await getRankings(type)
                if (res.code == 200){
                    switch (type) {
                        case rank_type.HOT:
                            this.rankings.hot = res.data as rank_vo[]
                            break;
                        case rank_type.LIKE:
                            this.rankings.like = res.data as rank_vo[]
                            break;
                        case rank_type.SCORE:
                            this.rankings.score = res.data as rank_vo[]
                            break;    
                        default:
                            break;
                    }
                }
            }
        }
    }
})
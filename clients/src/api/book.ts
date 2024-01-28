import request from "@/request";
import { type categories, type ranking_resp } from "./types";

enum API {
    ALL_CATEGORIES = '/api/book/category/get-all-categories',
    RANKINGS = '/api/book/rank/get-ranking/'
}

export const getAllCategories = () => request.get<any,categories>(API.ALL_CATEGORIES)

export const getRankings = (type:string) => request.get<any,ranking_resp>(API.RANKINGS+`${type}`)
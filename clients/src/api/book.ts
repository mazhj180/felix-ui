import request from "@/request";
import { type books_resp, type categories, type ranking_resp } from "./types";

enum API {
    ALL_CATEGORIES = '/api/book/category/get-all-categories',
    RANKINGS = '/api/book/rank/get-ranking/',
    CATEGORY_BOOKS = '/api/book/get-book/',
    GUESS_YOU = '/api/user/guess-you'
}

export const getAllCategories = () => request.get<any,categories>(API.ALL_CATEGORIES)

export const getRankings = (type:string) => request.get<any,ranking_resp>(API.RANKINGS+`${type}`)

export const getBooksByCategory = (categoryId:string) => request.get<any,books_resp>(API.CATEGORY_BOOKS+`${categoryId}`)

export const getGuessNotLogin = () => request.get<any,books_resp>(API.GUESS_YOU)
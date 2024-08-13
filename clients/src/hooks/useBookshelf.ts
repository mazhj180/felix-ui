import type { book_vo, respBody } from "@/api/types";
import request from "@/request";
import { useUserStore } from "@/store/user";
import type { AxiosError } from "axios";
import { reactive } from "vue";

enum API {
    GET_BOOKS = '/api/user/bookshelf/show-bookshelf',
    DEL_BOOK_FROM_BOOKSHELF = '/api/bookshelf/sync-bookshelf'
}

export interface bookshelfParam{
    bookId:string
    userId:string
    //1.新增  2.更新  3.删除
    syncType:number
}


export default function () {
    const myBooks = reactive<book_vo[]>([])
    const userStore = useUserStore()
    const getMyBooks = async () => {
        try {
            let res = await request.get<any, respBody>(API.GET_BOOKS + `?userId=${userStore.userInfo.userId}`)
            if (res.code == 200) {
                myBooks.push(...res.data)
            }
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 401) {
                // 处理 401 错误
            } 
        }
    }

    const syncBook = async (data:bookshelfParam, idx:number) => {
        try {
            let res = await request.post<any,respBody>(API.DEL_BOOK_FROM_BOOKSHELF,data)
            if (res.code == 200) {
                myBooks.splice(idx,1)
            }
        } catch {

        }
    }

    return { myBooks, getMyBooks, syncBook }

}
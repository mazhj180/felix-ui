import type { book_vo, respBody } from "@/api/types";
import request from "@/request";
import { reactive } from "vue";

enum API {
    GET_CHILDREN_BOOKS = '/api/book/get-book/fairy_tales'
}

export default function() {
    const childrenBooks = reactive<book_vo[]>([])

    const getChildrenBooks = async () => {
        try {
            let res = await request.get<any,respBody>(API.GET_CHILDREN_BOOKS)
            if(res.code == 200) {
                childrenBooks.push(...res.data)
            }
        } catch {
            
        }
    }

    return { childrenBooks, getChildrenBooks }
}
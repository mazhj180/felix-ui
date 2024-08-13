import type { book_vo, respBody } from "@/api/types";
import request from "@/request";
import { reactive } from "vue";
import Qs from 'qs';

enum API {
    GET_LOOKED_BOOK = '/api/book/get-book/ids/batch',
    GET_GOOD_BOOK = '/api/control/dynamic-components/good-book',
}

interface goodBook {
    id: number;
    compontentId: string;
    compontentName: string;
    content: string;
    createTime: string;
    updateTime: string;
    contents?: goodBookContent;
}

export interface goodBookContent {
    bookId?: string;
    name: string;
    introduce: string;
    image?: string;
}

export interface localLookHistory {
    bookId: string
    time: string
}

export default function () {
    const lookHistories = reactive<book_vo[]>([])
    const localLookHistories = reactive<localLookHistory[]>([])
    const goodBooks = reactive<goodBook[]>([])

    function setLocalLookHistories(record: localLookHistory) {
        let histories = localStorage.getItem('look-histories')
        if (histories) {
            localLookHistories.splice(0, localLookHistories.length)
            localLookHistories.push(...JSON.parse(histories))
        }
        localLookHistories.unshift(record)
        localStorage.setItem('look-histories', JSON.stringify(localLookHistories))
    }

    const getLookHistories = async () => {
        try {
            let histories = localStorage.getItem('look-histories')
            if(histories) {
                localLookHistories.splice(0, localLookHistories.length)
                localLookHistories.push(...JSON.parse(histories))
            }
            let ids = localLookHistories.map(record => record.bookId)
            if (ids.length > 0){
                let res = await request.get<any, respBody>(API.GET_LOOKED_BOOK, {
                    params: { ids }, paramsSerializer: params => {
                        return Qs.stringify(params, { arrayFormat: 'brackets' })
                    }
                })
                if (res.code == 200) {
                    lookHistories.push(...res.data)
                }
            }
        } catch {}
    }

    const clearLookedHistories = () => {
        localStorage.removeItem('look-histories')
        localLookHistories.splice(0,localLookHistories.length)
        lookHistories.splice(0,lookHistories.length)
    }

    const getGoodBooks = async () => {
        try {
            let res = await request.get<any,respBody>(API.GET_GOOD_BOOK)
            if ( res.code == 200 ){
                goodBooks.push(...res.data)
                for (const i in goodBooks) {
                    goodBooks[i].contents = JSON.parse(goodBooks[i].content)
                }
            }
        } catch (error) {
            
        }
    }

    return {lookHistories,goodBooks,localLookHistories,setLocalLookHistories,getLookHistories,getGoodBooks,clearLookedHistories}
}
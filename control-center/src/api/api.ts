import request from "@/request";
import Qs from 'qs';


interface respBody {
    code:number,
    message:string,
    data:any
}

interface userCondition {
    userId?:string | null,
    userName?:string | null,
    isWriter?:boolean | null,
}

export interface page {
    pageNum:number | null,
    pageSize:number | null
}

export interface userForUpdate {
    userId:string,
    isBan:boolean
}

enum API {
    QUERY_USERS = '/api/user/get-user',
    UPDATE_USERSTATE = '/api/user/update-state',
    DELETE_USER = '/api/user/delete',
    GREAT_WORKS_URI = '/api/control/dynamic-components/creator-center-great-work',
    GET_BOOKS = '/api/book/',
    DELETE_BOOK = '/api/book/del',
    UPDATE_SCORE = '/api/book/op-score',
    UPDATE_SUPPORTS = '/api/book/op-supports',
    LISTING_BOOK = '/api/book/listing',
    WORD_LINE_URI = '/api/control/dynamic-components/client-word-line',
    DEL_DYNAMIC_COMPONENTS = '/api/control/dynamic-components/del',
    ADD_DYNMAIC_COMPONENTS = '/api/control/dynamic-components/add',
    QUERY_SLIDESHOW = '/api/control/dynamic-components/slideshow',
    QUERY_GOOD_BOOK = '/api/control/dynamic-components/good-book',
    QUERY_BOOKS = '/api/search/get-books/name',
    QUERY_WOKRS = '/api/user/work/get-works',
    GET_WORK_DOC = '/minio/',

}

export const queryUsers = (params?:userCondition,headers?:page) => request.get<any,respBody>(API.QUERY_USERS,{params,headers:{...headers}})

export const updateState = (data:userForUpdate) => request.post<any,respBody>(API.UPDATE_USERSTATE,data)

export const deleteUser = (userId:string) => request.delete<any,respBody>(API.DELETE_USER+`/${userId}`)

export const greatWorksReq = () => request.get<any,respBody>(API.GREAT_WORKS_URI)

export const wordLineReq = () => request.get<any,respBody>(API.WORD_LINE_URI)

export const delDynamicComponent = (id:number) => request.delete<any,respBody>(API.DEL_DYNAMIC_COMPONENTS + `/${id}`)

export const delDynamicComponents = (ids:number[]) => request.delete<any,respBody>(API.DEL_DYNAMIC_COMPONENTS,{params:{ids},paramsSerializer: params => {
    return Qs.stringify(params, { arrayFormat: 'brackets' })
  }
})

export const addDynamicComponent = (data:any) => request.put<any,respBody>(API.ADD_DYNMAIC_COMPONENTS,data)

export const querySlideshows = () => request.get<any,respBody>(API.QUERY_SLIDESHOW)

export const queryGoodbooks = () => request.get<any,respBody>(API.QUERY_GOOD_BOOK)

export const queryBooks = (bookName?:string | null,headers?:page) => request.get<any,respBody>(API.QUERY_BOOKS,{params:{bookName},headers:{...headers}})

export const updateScore = (bookId:string,score:number) => request.post<any,respBody>(API.UPDATE_SCORE + `?bookId=${bookId}&score=${score}`)

export const updateSupport = (bookId:string,supports:number) => request.post<any,respBody>(API.UPDATE_SUPPORTS + `?bookId=${bookId}&supports=${supports}`)

export const deleteBook = (bookId:string) => request.delete<any,respBody>(API.DELETE_BOOK + `?bookId=${bookId}`)

export const listingBook = (data:any) => request.post<any,respBody>(API.LISTING_BOOK,data)

export const queryWorks = (status:string) => request.get<any,respBody>(API.QUERY_WOKRS + `?status=${status}`)

export const getWorkDoc = (url:string) => request.get<any,any>(API.GET_WORK_DOC + url,{responseType:'arraybuffer'} )
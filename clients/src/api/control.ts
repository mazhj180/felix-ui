import request from "@/request";


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

interface page {
    pageNum:number | null,
    pageSize:number | null
}

interface userForUpdate {
    userId:string,
    isBna:boolean
}

enum API {
    QUERY_USERS = '/api/user/get-user',
    GREAT_WORKS_URI = '/api/control/dynamic-components/creator-center-great-work',
    GET_BOOKS = '/api/book/',
    WORD_LINE_URI = '/api/control/dynamic-components/client-word-line',
    QUERY_SLIDESHOW = '/api/control/dynamic-components/slideshow'
}

export const queryUsers = (params?:userCondition,headers?:page) => request.get<any,respBody>(API.QUERY_USERS,{params,headers:{...headers}})

export const greatWorksReq = () => request.get<any,respBody>(API.GREAT_WORKS_URI)

export const wordLineReq = () => request.get<any,respBody>(API.WORD_LINE_URI)

export const querySlideshows = () => request.get<any,respBody>(API.QUERY_SLIDESHOW)
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
    UPDATE_USERSTATE = '/api/user/update-state',
    DELETE_USER = '/api/user/delete',
    GREAT_WORKS_URI = '/api/control/dynamic-components/creator-center-great-work',
    GET_BOOKS = '/api/book/'
}

export const queryUsers = (params?:userCondition,headers?:page) => request.get<any,respBody>(API.QUERY_USERS,{params,headers:{...headers}})

export const updateState = (data:userForUpdate) => request.post<any,respBody>(API.UPDATE_USERSTATE,data)

export const deleteUser = (userId:string) => request.delete<any,respBody>(API.DELETE_USER+`/${userId}`)

export const greatWorksReq = () => request.get<any,respBody>(API.GREAT_WORKS_URI)
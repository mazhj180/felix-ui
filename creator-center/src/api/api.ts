import request from "@/request";

export interface respBody {
    code:number,
    message:string,
    data:any
}

interface authorInfo {
    realName: string
    pseudonym: string
    idCard: string
    date: string
    sex: string
    introduction: string
    type: string[]
  }

enum API {
    IS_WRITER_URL = '/api/user/is-writer/',
    WORK_LIST_URI = '/api/user/author/my-works/',
    GREATE_WORKS_URI = '/api/control/dynamic-components/creator-center-great-work',
    BECAME_WRITER = '/api/user/author/become-writer',
    LISTING_BOOK = '/api/user/work/upload-work'
}

export const isWriterReq = (userId:string) => request.get<any,respBody>(API.IS_WRITER_URL+`${userId}`)

export const worksReq = (userId:string) => request.get<any,respBody>(API.WORK_LIST_URI+`${userId}`)

export const greatWorksReq = () => request.get<any,respBody>(API.GREATE_WORKS_URI)

export const becomeWriter = (data:authorInfo) => request.post<any,respBody>(API.BECAME_WRITER,data) 

export const listingBook = (data:any) => request.post<any,respBody>(API.LISTING_BOOK,data)
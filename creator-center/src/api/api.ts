import request from "@/request";

export interface respBody {
    code:number,
    message:string,
    data:any
}

enum API {
    IS_WRITER_URL = '/api/user/is-writer/'
}

export const isWriterReq = (userId:string) => request.get<any,respBody>(API.IS_WRITER_URL+`${userId}`)
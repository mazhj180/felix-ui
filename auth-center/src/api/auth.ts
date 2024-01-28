import request from "@/request";
import type {loginInfo,registerInfo,respBody} from "@/api/types";

enum API {
    LOGIN_URL = '/api-1/auth/login',
    REGISTER_URL = '/api-2/user/register',
    ACCOUNT_IS_EXITED = '/api-2/user/is-exited/'
}

export const login = (data:loginInfo) => request.post<any,respBody>(API.LOGIN_URL,data)

export const register = (data:registerInfo) => request.post<any,respBody>(API.REGISTER_URL,data)

export const isExited = (userId:string) => request.get<any,respBody>(API.ACCOUNT_IS_EXITED + `${userId}`)


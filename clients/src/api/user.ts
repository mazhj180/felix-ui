import request from "@/request";
import type {loginInfo,respBody} from "@/api/types";

enum API {
    LOGIN_URL = '/api/user/login'
}

export const login = (data:loginInfo) => request.post<any,respBody>(API.LOGIN_URL,data)
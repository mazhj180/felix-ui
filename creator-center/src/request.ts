import axios from "axios";
let request = axios.create({
    timeout: 30000
})

request.interceptors.request.use((config) => {
    config.headers.Authentication = localStorage.getItem("accessToken")
    return config
})

request.interceptors.response.use((resp) => {
    return resp.data
},(error) => {
    let msg = '';
    let status = error.response.status
    switch (status){
        case 401:
            msg = 'token 过期'
            break
        case 500:
            msg = '服务器内部错误'
    }
})

export default request
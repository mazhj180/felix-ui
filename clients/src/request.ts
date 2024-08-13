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
            msg = '请重新登录'
            localStorage.removeItem('headImgUrl')
            localStorage.removeItem('nickName')
            localStorage.removeItem('userId')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            break
        case 500:
            msg = '服务器内部错误'
    }
    ElMessage({
        showClose: true,
        message: msg,
        type: 'error'
    })
})

export default request
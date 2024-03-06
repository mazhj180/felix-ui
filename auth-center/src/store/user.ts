import {defineStore} from 'pinia'
import type {loginInfo, registerInfo} from '@/api/types'
import { login, register } from '@/api/auth'


export const useUserStore = defineStore('user',{
    state(){
        return {
            userInfo: {
                accessToken:'',
                refreshToken:'',
                userId:'',
                nickName:'',
                email:'',
                phoneNumber:'',
                headImgUrl:''
            },
            registerIsSuccess:false,
            loginIsSuccess: false
        }
    },
    actions: {
        async login(data:loginInfo) {
            let res = await login(data)
            if (res.code == 200){
                this.userInfo = res.data
                this.loginIsSuccess = true
            }
        },
        async register(data:registerInfo) {
            let res = await register(data)
            if (res.data === 'ok'){
                this.registerIsSuccess = true
            }
        }
    }
})
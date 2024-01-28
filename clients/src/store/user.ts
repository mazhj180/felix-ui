import {defineStore} from 'pinia'
import type {loginInfo} from '@/api/types'
import { login } from '@/api/user'

export const useUserStore = defineStore('user',{
    state(){
        return {
            userInfo: {
                token:localStorage.getItem('token'),
                userId:localStorage.getItem('userId'),
                nickName:localStorage.getItem('nickName'),
                email:'',
                phoneNumber:'',
                headImgUrl:localStorage.getItem('headImgUrl')
            }
        }
    },
    actions: {
        async login(data:loginInfo) {
            let res = await login(data)
            if (res.code == 200){
                this.userInfo = res.data
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("userId",res.data.userId)
                localStorage.setItem("nickName",res.data.nickName)
                localStorage.setItem("headImgUrl",res.data.headImgUrl)
            }
        }
    }
})
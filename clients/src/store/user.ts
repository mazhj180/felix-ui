import {defineStore} from 'pinia'
import type {loginInfo} from '@/api/types'
import { login } from '@/api/user'

export const useUserStore = defineStore('user',{
    state(){
        return {
            userInfo: {
                accessToken:localStorage.getItem('accessToken'),
                refreshToken:localStorage.getItem('refreshToken'),
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
        },
        setUserInfo(u:any) {
            this.userInfo = u
            localStorage.setItem("accessToken",u.accessToken)
            localStorage.setItem("refreshToken",u.refreshToken)
            localStorage.setItem("userId",u.userId)
            localStorage.setItem("nickName",u.nickName)
            localStorage.setItem("headImgUrl",u.headImgUrl)
        },
        setVoid(){
            this.userInfo.accessToken = ''
            this.userInfo.refreshToken = ''
            this.userInfo.userId = ''
            this.userInfo.nickName = ''
            this.userInfo.headImgUrl = ''
        }
    }
})
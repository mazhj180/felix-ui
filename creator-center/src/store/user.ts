import {defineStore} from 'pinia'
import { isWriterReq } from "@/api/api";

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
            },
            isWriter: localStorage.getItem('isWriter') || 'true'
        }
    },
    actions: {
        
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
            this.isWriter = ''
        },
        async setIsWriter(userId:string) {
            let res = await isWriterReq(userId)
            if(res.data === 'no'){
                this.isWriter = 'false'
            } else if (res.data === 'yes'){
                this.isWriter = 'true'
            }
            localStorage.setItem('isWriter',this.isWriter)
        }
        
    }
})
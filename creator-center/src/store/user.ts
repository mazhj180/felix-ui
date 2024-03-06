import {defineStore} from 'pinia'

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
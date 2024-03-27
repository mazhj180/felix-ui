import { defineStore } from 'pinia'
// import { isWriterReq } from "@/api/api";
import { queryUsers } from '@/api/api'

export const useUserStore = defineStore('user', {
    state:():{
        userInfo:any,
        isWriter:any,
        users:any
    } => {
        return {
            userInfo: {
                accessToken: localStorage.getItem('accessToken'),
                refreshToken: localStorage.getItem('refreshToken'),
                userId: localStorage.getItem('userId'),
                nickName: localStorage.getItem('nickName'),
                email: '',
                phoneNumber: '',
                headImgUrl: localStorage.getItem('headImgUrl')
            },
            isWriter: localStorage.getItem('isWriter') || 'true',
            users: {
                total: 0,
                list: [],
                pageNum: 0,
                pageSize: 0,
                size: 0,
                startRow: 0,
                endRow: 0,
                pages: 0,
                prePage: 0,
                nextPage: 0,
                isFirstPage: false,
                isLastPage: false,
                hasPreviousPage: false,
                hasNextPage: false,
                navigatePages: 0,
                navigatepageNums: [],
                navigateFirstPage: 0,
                navigateLastPage: 0,
            }
        }
    },
    actions: {

        setUserInfo(u: any) {
            this.userInfo = u
            localStorage.setItem("accessToken", u.accessToken)
            localStorage.setItem("refreshToken", u.refreshToken)
            localStorage.setItem("userId", u.userId)
            localStorage.setItem("nickName", u.nickName)
            localStorage.setItem("headImgUrl", u.headImgUrl)
        },
        setVoid() {
            this.userInfo.accessToken = ''
            this.userInfo.refreshToken = ''
            this.userInfo.userId = ''
            this.userInfo.nickName = ''
            this.userInfo.headImgUrl = ''
            this.isWriter = ''
        },
        async setUsers(userId:string|null,pageNum:number,pageSize:number) {
            let res = await queryUsers({userId},{pageNum,pageSize})
            if (res.code == 200) {
                this.users = res.data
            }
        }
        // async setIsWriter(userId:string) {
        //     let res = await isWriterReq(userId)
        //     if(res.data === 'no'){
        //         this.isWriter = 'false'
        //     } else if (res.data === 'yes'){
        //         this.isWriter = 'true'
        //     }
        //     localStorage.setItem('isWriter',this.isWriter)
        // }

    }
})
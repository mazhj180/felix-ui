import { defineStore } from "pinia";

export const useForumStore = defineStore('forum',{
    state (){
        return {
            msgBody_private : {
                receiver:'',
                sender: {
                    userId:'',
                    nickName:'',
                    headImg:''
                },
                scope : '',
                msgBody : ''
            },
            msgBody_topic :{
                receiver:'',
                sender: {
                    userId:'',
                    nickName:'',
                    headImg:''
                },
                scope:'',
                msgBody:{
                    topicId:'',
                    rootRemarkId:'',
                    replyRemarkId: '',
                    healthContent: ''
                }
            },
            msgBody_all :{
                receiver:'',
                sender: {
                    userId:''
                },
                scope:'',
                msgBody:''
            }
        }
    },
})
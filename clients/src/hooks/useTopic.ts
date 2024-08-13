import type { respBody } from "@/api/types";
import request from "@/request";
import { reactive } from "vue";

export interface topic {
    topicId:number
    topicName:string
    introduction:string
    remarkCount:number
    imgUrl:string
    creator:string
    createTime:string
}

export interface remark {
    remarkId:number
    rootRemarkId:number | null
    replyRemarkId:number | null
    replyUser:string | null
    topicId:number
    userId:string
    nickName:string
    headImg:string
    healthyContent:string
    supportCount:number
    createTime:string
    replies:remark[] | null
}

enum API {
    GET_TOPICS = '/api/forum/ht/forum/topic',
    GET_REMARKS = '/api/forum/ht/forum/topic/remarks'
}

export default function () {
    const topics = reactive<topic[]>([])

    const topicRemark = reactive<remark[]>([])

    const getTopics = async () => {
        try {
            let res = await request.get<any,respBody>(API.GET_TOPICS)
            if(res.code == 200) {
                topics.push(...res.data)
            }
        } catch (error) {}
    }
    
    const getTopicRemarks = async (topicId:number) => {
        try {
            let res = await request.get<any,respBody>(API.GET_REMARKS+`?topicId=${topicId}`)
            if (res.code == 200){
                topicRemark.push(...res.data)
            }
        } catch (error) {}
    }

    return { topics, getTopics, topicRemark, getTopicRemarks }
}
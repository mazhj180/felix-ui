import { worksReq } from "@/api/api";
import { reactive, onMounted, onUnmounted } from "vue";
import { useUserStore } from '@/store/user';
import emitter from "@/emitter";

interface work {
    authorId:string | null,
    authorName:string | null,
    workId:string | null,
    workName:string | null,
    tags:string[] | null,
    workImg:string | null,
    workUrl:string | null,
    introduction:string | null,
    chapterCount:number | null,
    wordCount:number | null,
    keywords:string | null
    status:string | null,
    createTime:string | null
}

export default function(){
    let works = reactive<work[]>([]);
    
    async function getWorks(userId:any){
        try {
            let res = await worksReq(userId);
        if (res.code == 200){
            works.push(...res.data)
        }
        } catch (error) {
            console.log(error)
        }
    }

    let userStore = useUserStore()

    onMounted(() => {
        emitter.on('getworks',() => getWorks(userStore.userInfo.userId))
    })

    onUnmounted(() => {
        emitter.off('getworks')
    })

    return {works,getWorks}
}
import { queryWorks } from "@/api/api";
import { ElMessage } from "element-plus";
import { onMounted, reactive } from "vue";

export interface works {
    authorId:string
    authorName:string
    workId:string
    workName:string
    tag:string
    workImg:string
    workUrl:string
    introduction:string
    status:string
    chapterCount:number
    wordCount:number
    keywords:string
    createTime:string
    tags:string[]
}

export default function() {
    
    const waitReviewWorks = reactive<works[]>([])
    const hasReviewedWorks = reactive<works[]>([])

    async function getWorks(status:string) {
        try{
            let res = await queryWorks(status)
            if (res.code == 200) {
                if(status === '已审查'){
                    hasReviewedWorks.push(...res.data)
                }else if (status === '待审查') {
                    waitReviewWorks.push(...res.data)
                }
            }
        }catch{

        }
    }

    

    onMounted(() => {
        getWorks('已审查')
        getWorks('待审查')
    })

    return { waitReviewWorks, hasReviewedWorks }

}
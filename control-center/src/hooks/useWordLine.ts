import { onMounted, reactive } from "vue";
import { wordLineReq, delDynamicComponent, addDynamicComponent} from "@/api/api";
import { ElMessage } from 'element-plus'


// interface wordLine {
//     word:string;
//     image:string;
//     name:string;
//     bookId:string;
//     info:string;
// }

interface wordLineItem {
    id:number;
    compontentId:string;
    compontentName:string;
    content:string;
    createTime:string;
    updateTime:string;
    contents?:wordLineContent
}

export interface wordLineContent {
    word:string;
    image?:string;
    name:string;
    bookId?:string;
    info:string
}


export default function () {
    let wordLineItems = reactive<wordLineItem[]>([])

    const wordLineFormData = reactive<wordLineContent>({
        word:'',
        name:'',
        info:''
    })

    onMounted(async () => {
        let res = await wordLineReq()
        if (res.code === 200) {
            wordLineItems.push(...res.data)
            for (const i in wordLineItems) {
                wordLineItems[i].contents = JSON.parse(wordLineItems[i].content)
            }
        }
    })

    async function delWordLine(id:number,idx:number) {
        let res = await delDynamicComponent(id)
        if (res.code == 200) {
            wordLineItems.splice(idx,1)
            ElMessage({
                showClose: true,
                message: '操作成功',
                type: 'success'
            })
        } else{
            ElMessage({
                showClose: true,
                message: '操作失败',
                type:'error'
            })
        }
    }

    async function addWordLine(params:wordLineItem) {
        let res = await addDynamicComponent(params)
        if (res.code == 200) {
            ElMessage({
                showClose: true,
                message: '操作成功',
                type: 'success'
            })
        } else{
            ElMessage({
                showClose: true,
                message: '操作失败',
                type:'error'
            })
        }
    }

    return {wordLineItems, wordLineFormData, delWordLine, addWordLine}
}
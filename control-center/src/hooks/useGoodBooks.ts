import { addDynamicComponent, delDynamicComponent, queryGoodbooks } from "@/api/api";
import { ElMessage } from "element-plus";
import { onMounted, reactive } from "vue";

interface goodBook {
    id:number;
    compontentId:string;
    compontentName:string;
    content:string;
    createTime:string;
    updateTime:string;
    contents?:goodBookContent;
}

export interface goodBookContent {
    bookId?:string;
    name:string;
    introduce:string;
    image?:string;
}


export default function() {
    let goodBooks = reactive<goodBook[]>([])

    const goodBooksFormData = reactive<goodBookContent>({
        name:'',
        introduce:''
    })

    onMounted(async () => {
        let res = await queryGoodbooks()
        if (res.code === 200) {
            goodBooks.push(...res.data)
            for (const i in goodBooks) {
                goodBooks[i].contents = JSON.parse(goodBooks[i].content)
            }
        }
    })

    async function delGoodBook(id:number,idx:number) {
        let res = await delDynamicComponent(id)
        if (res.code == 200) {
            goodBooks.splice(idx,1)
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

    async function addGoodBook(params:goodBook) {
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

    return {goodBooks, goodBooksFormData, delGoodBook, addGoodBook}

}
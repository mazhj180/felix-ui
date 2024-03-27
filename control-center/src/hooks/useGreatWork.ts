import { greatWorksReq } from "@/api/api"
import { ref,reactive,onMounted,onUnmounted } from "vue"

interface dynamicCompontents {
    id:number;
    compontentId:string;
    compontentName:string;
    content:string;
    createTime:string;
    updateTime:string;
}

export default function () {

    let items = reactive<dynamicCompontents[]>([])

    async function getItems() {
        let res = await greatWorksReq()
        if (res.code == 200) {
            items.push(...res.data)
        }
    }

    onMounted(() => {
        getItems()
    })

    return {items,getItems}

}
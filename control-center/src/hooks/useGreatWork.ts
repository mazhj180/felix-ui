import { addDynamicComponent, delDynamicComponent, delDynamicComponents, greatWorksReq } from "@/api/api"
import { ref,reactive,onMounted,onUnmounted } from "vue"
import { ElMessage } from "element-plus";
import type { UploadRequestOptions, UploadProps } from "element-plus";
import debounce from "@/utils/debounce";
import { preview } from "v-preview-image";

interface dynamicCompontents {
    id:number;
    compontentId:string;
    compontentName:string;
    content:string;
    createTime:string;
    updateTime:string;
}

export default function () {

    let greatWorks = reactive<dynamicCompontents[]>([])

    let willDelWorks : number[] = []

    let addedWorkIdMapping = new Map<number,number>([])

    async function getGreatWorks() {
        let res = await greatWorksReq()
        if (res.code == 200) {
            greatWorks.push(...res.data)
        }
    }

    const syncFunc = debounce(async function ()  {
        await delDynamicComponents(willDelWorks)
    },5000) 

    
    async function delGreatWorks(idx:number) {
        willDelWorks.push(greatWorks[idx].id)
        greatWorks.splice(idx,1)
        syncFunc()
    }

    
    async function delGreatWork(uid:number) {
        let id:number = addedWorkIdMapping.get(uid) as number
        await delDynamicComponent(id)
    }

    async function uploadGreatWork(uploadFile: UploadRequestOptions) {
        const formData = new FormData()
        formData.append('file', uploadFile.file as File);
        formData.append('componentId','creator-center-great-work')
        formData.append('componentName','优秀作品')

        let res = await addDynamicComponent(formData)

        if (res.code == 200) {
            addedWorkIdMapping.set(uploadFile.file.uid,res.data.id)
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

    const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
        console.log(uploadFile, uploadFiles)
        delGreatWork(uploadFile.uid)
      }
      
    const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
        preview(uploadFile.url)
      }

    onMounted(() => {
        getGreatWorks()
    })

    return {greatWorks, addedWorkIdMapping, getGreatWorks, uploadGreatWork, delGreatWorks, delGreatWork, handleRemove, handlePictureCardPreview}

}
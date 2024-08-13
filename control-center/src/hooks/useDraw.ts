import { ElDrawer, ElMessage, ElMessageBox, type UploadFile, type UploadInstance } from "element-plus";
import { ref, type Ref } from "vue";
import type { wordLineContent } from "./useWordLine";
import type { goodBookContent } from "./useGoodBooks";
import { addDynamicComponent } from "@/api/api";

export enum FormTarget {
    GOOD_BOOKS = 0,
    WORD_LINE = 1,
}


export default function () {

    let formTarget = ref<FormTarget>(FormTarget.GOOD_BOOKS)
    let dialog = ref<boolean>(false)
    let loading = ref<boolean>(false)
    let timer: ReturnType<typeof setTimeout>
    const drawerRef = ref<InstanceType<typeof ElDrawer>>()
    const uploadRef = ref<UploadInstance>()
    const fileList :Ref<UploadFile[]> = ref([]);

    const handleChange = (file:UploadFile, fileList1:UploadFile[]) => {
        console.log(file, fileList1);
        fileList.value = fileList1
        console.log('@@@',fileList.value[0])
    }

    async function submitForm (data:wordLineContent|goodBookContent) {
        try {
            let formData = new FormData()
            if (fileList.value.length > 0 && fileList.value[0].raw) {
                formData.append('file',fileList.value[0].raw)
            }
            if((data as wordLineContent).word !== undefined ) {
                formData.append('componentId','client-word-line')
                formData.append('componentName','字里行间')
            } else {
                formData.append('componentId','good-book')
                formData.append('componentName','精选好书')
            }
            formData.append('content',JSON.stringify(data))
            
            let res = await addDynamicComponent(formData)
            if (res.code == 200) {
                ElMessage({
                    showClose: true,
                    message: '操作成功',
                    type: 'success'
                })
                return true
            } else {
                ElMessage({
                    showClose: true,
                    message: '操作失败',
                    type: 'error'
                })
                return false
            }
        } catch (error) {
            return false
        }
    }

    function closeDraw(done: (...args: any[]) => any) {
        if (loading.value) {
            return
        }
        ElMessageBox.confirm('是否要提交？')
            .then(() => {
                loading.value = true
                timer = setTimeout(() => {
                    done()
                    // 动画关闭需要一定的时间
                    setTimeout(() => {
                        loading.value = false
                    }, 400)
                }, 2000)
            })
            .catch(() => {
                // catch error
            })
    }

    function cancelForm () {
        loading.value = false
        dialog.value = false
        clearTimeout(timer)
        
    }

    return { drawerRef, uploadRef, dialog, loading, closeDraw, cancelForm, submitForm, handleChange }

}
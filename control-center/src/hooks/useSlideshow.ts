import { addDynamicComponent, delDynamicComponent, querySlideshows } from "@/api/api";
import { nextTick, onMounted, reactive, ref } from "vue";
import { ElMessage } from 'element-plus'


interface slideshow {
    id: number;
    compontentId: string;
    compontentName: string;
    content: string;
    createTime: string;
    updateTime: string;
}

const minio_host = ref<string>(import.meta.env.VITE_MINIO_HOST)

export default function () {

    let slideshows = reactive<slideshow[]>([])

    const uploadSlideshowRef = ref<HTMLElement | null>(null)

    onMounted(async () => {

        let res = await querySlideshows()
        if (res.code == 200) {
            slideshows.push(...res.data)
        }
    })

    async function delSlideshow(id: number, idx: number) {
        console.log(idx)
        let res = await delDynamicComponent(id)

        if (res.code == 200) {
            slideshows.splice(idx, 1)
            ElMessage({
                showClose: true,
                message: '操作成功',
                type: 'success'
            })
        } else {
            ElMessage({
                showClose: true,
                message: '操作失败',
                type: 'error'
            })
        }
    }


    function fileChange(event: Event) {
        const files = (event.target as HTMLInputElement).files
        if (files) {
            const file = files[0]
            addSlideshow(file)
        }
    }

    async function addSlideshow(file: File) {
        console.log("@@@Slide", file)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('componentId', 'slideshow')
        formData.append('componentName', '首页轮播图')

        try {
            let res = await addDynamicComponent(formData)

            if (res.code == 200) {
                let last = res.data as slideshow
                last.content = minio_host.value + last.content
                slideshows.push(res.data)
                ElMessage({
                    showClose: true,
                    message: '操作成功',
                    type: 'success'
                })
            } else {
                ElMessage({
                    showClose: true,
                    message: '操作失败',
                    type: 'error'
                })
            }
        } catch {

        }
    }

    onMounted(() => {
        if (uploadSlideshowRef.value) {
          uploadSlideshowRef.value.addEventListener('change', fileChange);
        }
    });


    function openUploadSlideshowDraw() {
        // console.log('@@@',uploadSlideshowRef)
        uploadSlideshowRef.value?.click();
    }

    return { slideshows, delSlideshow, fileChange, addSlideshow, uploadSlideshowRef, openUploadSlideshowDraw }

} 
<script setup lang='ts'>
import { onMounted, onUnmounted, ref, computed, reactive, type Ref } from 'vue';
import { useUserStore } from '@/store/user';
import { ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/base.css';
import 'element-plus/theme-chalk/el-message-box.css';
import { tr } from 'element-plus/es/locales.mjs';
import Work from '@/components/common/Work.vue';
import useNavBg from '@/hooks/useNavBg';
import useScroll from '@/hooks/useScroll';
import { isWriterReq, listingBook } from '@/api/api';
import emitter from '@/emitter';
import type { UploadFile } from 'element-plus';

const minio_host = ref<string>(import.meta.env.VITE_MINIO_HOST)

const bg = useNavBg()

const { items } = useScroll()

const scrollContainer = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
let scrollPosition = 0;
let scrollWidth = 0;
let animationFrameId: number | null = null;


const startScrolling = () => {
    if (!scrollContainer.value) return;
    scrollWidth = scrollContainer.value.scrollWidth / 2;
    const speed = 1; // 设置滚动速度
    // console.log('width',scrollWidth)
    function scrollContent() {
        if (scrollContainer.value == null) {
            return
        }
        if (scrollPosition < scrollWidth) {
            scrollPosition += speed;
            scrollContainer.value.scrollLeft = scrollPosition;
            // console.log('pos',scrollPosition)
        } else {
            scrollPosition = 0; // 重置滚动位置
        }
        animationFrameId = requestAnimationFrame(scrollContent);
    }
    scrollContent();
}

const stopScrolling = () => {
    console.log('stop')
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

onMounted(() => {
    if (scrollContainer.value) {
        // console.log('111@',scrollContainer.value.scrollWidth ,scrollContainer.value.offsetWidth,scrollContainer.value.clientWidth)
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 元素出现在视图中，开始滚动
                    startScrolling();
                } else {
                    // 元素不在视图中，停止滚动
                    stopScrolling();
                }
            });
        });

        observer.observe(scrollContainer.value);
    }
})

onUnmounted(() => {
    if (observer && scrollContainer.value) {
        observer.unobserve(scrollContainer.value);
    }
    stopScrolling();
});

let userStore = useUserStore()
let isLogined = computed(() => userStore.userInfo.userId)
const receiveMessage = async (e: MessageEvent) => {
    if (e.data.type === 'success') {
        userStore.setUserInfo(e.data.data)
    }
}

onMounted(() => {
    window.addEventListener("message", receiveMessage, false)
})

onUnmounted(() => {
    window.removeEventListener("message", receiveMessage)
})

const close = async () => {
    if (isLogined.value) {
        await userStore.setIsWriter(userStore.userInfo.userId as string)
        if (userStore.isWriter === 'true') {
            emitter.emit('getworks')
        }
    }
}

const login = () => {
    ElMessageBox.alert(
        '<iframe class=" m-auto w-full" style="height: 80vh;" src="http://127.0.0.1:3000/auth/"></iframe>',
        {
            dangerouslyUseHTMLString: true,
            center: true,
            showConfirmButton: false,
            callback: close
        }
    ).then(() => { }).catch(() => { })
    // emitter.emit('toLogin',true) 

}

const toLogin = () => {
    login()
}

const workForm = reactive({
    workName: '',
    introduction: '',
    chapterCount: '',
    wordCount: '',
    keywords: '',
})
const fileList: Ref<UploadFile[]> = ref([]);

const handleChange = (file: UploadFile, fileList1: UploadFile[]) => {
    console.log(file, fileList1);
    fileList.value = fileList1
    console.log('@@@', fileList.value[0])
}

const listing = async (workId: string) => {
    try {
        let formData = new FormData()
        if (fileList.value.length > 0 && fileList.value[0].raw) {
            formData.append('file', fileList.value[0].raw)
        }
        formData.append('workName', workForm.workName)
        formData.append('introduction', workForm.introduction)
        formData.append('chapterCount', workForm.chapterCount)
        formData.append('wordCount', workForm.wordCount)
        formData.append('keywords', workForm.keywords)
        formData.append('authorId', userStore.userInfo.userId as string)
        formData.append('authorName', userStore.userInfo.nickName as string)
        formData.append('keywords', workForm.keywords)

        let res = await listingBook(formData)
        if (res.code == 200) {
            ElMessage({
                showClose: true,
                message: '操作成功',
                type: 'success'
            })
            emitter.emit('getworks')
            loading.value = false
            dialog.value = false
            clearTimeout(timer)
            return true
        } else {
            ElMessage({
                showClose: true,
                message: '操作失败',
                type: 'error'
            })
            return false
        }
    } catch (error: any) {
        let status = error.response.status
        if (status == 401) {
            userStore.setVoid()
            localStorage.clear()
            ElMessage({
                showClose: true,
                message: '登录状态过期请重新登录',
                type: 'error'
            })
        }
        return false
    }
}
const dialog = ref<boolean>(false)
let timer: ReturnType<typeof setTimeout>
const loading = ref<boolean>(false)
const closeDraw = (done: (...args: any[]) => any) => {
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

const cancelForm = () => {
    loading.value = false
    dialog.value = false
    clearTimeout(timer)

}


</script>

<template>
    <!-- nav-->
    <div class=" flex items-center  w-full h-16 px-32 navbar " :style="{ backgroundColor: bg }">
        <img src="../../assets/img.png" class=" h-8 w-14">
        <div class=" flex-1">
            <img class=" h-6" src="../../assets/head-1.png">
        </div>
        <div v-if="!isLogined" class=" flex justify-between">
            <div class=" flex items-center text-sm px-1"> | </div>
            <img @click="toLogin()" class=" h-6" src="../../assets/head-3.png">
        </div>
        <div @click="dialog = true" v-if="isLogined"
            class=" cursor-pointer bg-orange-600 text-white py-1 px-2 rounded-full">上传作品
        </div>
    </div>
    <!-- absolute img -->
    <div class=" w-full ">
        <img class=" top-0 w-full " style="height:600px;" src="../../assets/homepage-3.png">
        <img class=" absolute top-56 right-4 z-10" src="../../assets/font-1.png">
        <img class=" absolute top-28 right-48 z-10" src="../../assets/font-2.png">
    </div>
    <!-- plan info -->
    <div class="  flex items-center justify-center w-full h-24 px-32 bg-gray-50">
        <div class=" flex w-1/3 p-4">
            <div class="  flex-1">创作者计划</div>
            <div class="flex justify-center w-1/3 "> > </div>
        </div>
        <div class=" flex w-1/3 p-4">
            <div class=" flex-1">版权保障计划</div>
            <div class="flex justify-center w-1/3"> > </div>
        </div>
        <div class=" flex w-1/3 p-4">
            <div class=" flex-1">收益保障计划</div>
            <div class="flex  justify-center w-1/3"> > </div>
        </div>
    </div>
    <!-- user info -->
    <div v-if="!isLogined" class=" flex items-center justify-center h-28  mx-32 my-10 border-b">
        <div class=" flex items-center justify-center h-16 w-16 px-6 rounded-full bg-gray-100">
            <font-awesome-icon class=" text-4xl text-white text-center" :icon="['fas', 'user-tie']" />
        </div>
        <div class="flex flex-col flex-1 justify-center px-4 ">
            <div class=" text-xl">请登录</div>
            <div class=" text-sm text-gray-500">欢迎成为Felix创作者</div>
        </div>
        <div class=" flex items-center justify-end w-1/3">
            <button @click="login()" class=" w-1/3 px-2 whitespace-nowrap">立即登录 </button>
        </div>
    </div>
    <div v-if="isLogined && userStore.isWriter === 'true'" class=" flex mx-32 my-20">
        <div class=" flex flex-col ">
            <el-avatar class=" shadow-2xl" :size="300" :src="minio_host + userStore.userInfo.headImgUrl" />
            <div class=" text-4xl text-black pt-5">{{ userStore.userInfo.nickName }}</div>
            <div class=" text-xl text-gray-500 pb-5 italic">{{ userStore.userInfo.userId }}</div>
            <div class=" text-box">{{ }}</div>
        </div>
        <div class=" flex-1 ml-20 shadow-2xl h-96 overflow-auto pb-2">
            <Work />
        </div>
    </div>
    <!-- 最新上架 -->
    <div class=" my-20 px-32">
        <img class=" m-auto w-36" src="../../assets/font-8.png">
        <table class=" w-full latest-item-list">
            <thead class="" style=" color: rgba(0,0,0,.4);">
                <tr>
                    <td class=" latest-item">书名</td>
                    <td class=" latest-item">作者</td>
                    <td class=" latest-item">章节数</td>
                    <td class=" latest-item">字数</td>
                    <td class=" latest-item">上架时间</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class=" latest-item">我在精神病院斩学神</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item">庆余年</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item">庆余年</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item">庆余年</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item">庆余年</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item">庆余年</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item">庆余年</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item">庆余年</td>
                    <td class=" latest-item">猫腻aadadasaa</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- notice -->
    <div class=" flex w-full px-32 py-6 bg">
        <img class="h-36" src="../../assets/font-3.png">
        <div class=" flex  px-16 py-8 scroll-container no-scrollbar space-x-4">
            <div class=" flex flex-1 overflow-x-auto no-scrollbar " ref="scrollContainer">
                <!-- <div class=" flex-shrink-0 w-36 h-48 object-cover rounded-lg mr-4"></div> -->
                <img v-for="(item, id) in items" :key="id" class=" flex-shrink-0 w-36 h-48 object-cover rounded-lg mr-4"
                    :src="item.content" ref="scrollContent" />
                <img v-for="(item, id) in items" :key="id + 10"
                    class=" flex-shrink-0 w-36 h-48 object-cover rounded-lg mr-4" :src="item.content" />
            </div>
        </div>
    </div>

    <div class=" flex items-center justify-center mt-16">
        <img src="../../assets/font-4.png">
    </div>

    <!-- 字里行间 -->
    <div class=" relative  mt-6 word-line ">
        <img class=" absolute top-0 " src="../../assets/gray.png">
        <img class=" word-line-first" src="../../assets/orange.png">
        <img class=" word-line-middle " src="../../assets/gray.png">
        <img class="word-line-final" src="../../assets/sign-final.png">
        <div class=" flex w-full  items-center   word-line-font-1">
            <img class=" h-48" src="../../assets/font-5.png">
            <img class="  h-80 max-w-56  shadow-2xl ml-10"
                src="http://127.0.0.1:9000/greate-works/ce57dd2860fe35275985a16aa2378711~tplv-resize_225_0.jpeg">
        </div>
        <div class=" flex w-full items-center word-line-font-2">
            <img class=" h-80 mx-28 shadow-2xl"
                src="http://127.0.0.1:9000/greate-works/1922b7d9fe214b01790cfa7f4ce482fa.jpeg">
            <img class=" h-48 w-full " src="../../assets/font-6.png">
        </div>
        <div class=" flex w-full items-center word-line-font-3">
            <img class=" h-80 mx-28 shadow-2xl"
                src="http://127.0.0.1:9000/greate-works/3a43868bd240290f19cb72daa06f25e0~tplv-resize_225_0.jpeg">
            <img class=" h-80 flex-1" src="../../assets/font-7.png">
        </div>
    </div>
    <div>

    </div>

    <el-drawer ref="drawerRef" v-model="dialog" title="新建作品" :before-close="closeDraw" direction="ltr"
        class="demo-drawer">
        <div class="demo-drawer__content">
            <el-form :model="workForm">
                <el-form-item label="" label-width="">
                    <el-input v-model="workForm.workName" autocomplete="off" placeholder="图书名称" />
                </el-form-item>
                <el-form-item label="" label-width="">
                    <el-input v-model="workForm.chapterCount" autocomplete="off" placeholder="章节数" />
                </el-form-item>
                <el-form-item label="" label-width="">
                    <el-input v-model="workForm.wordCount" autocomplete="off" placeholder="大概字数" />
                </el-form-item>
                <el-form-item label="" label-width="">
                    <el-input v-model="workForm.introduction" type="textarea" autocomplete="off" placeholder="简介" />
                </el-form-item>
                <el-form-item label="" label-width="">
                    <el-input v-model="workForm.keywords" type="textarea" autocomplete="off" placeholder="关键词" />
                </el-form-item>
            </el-form>
            <!-- <el-input v-model="workId" autocomplete="off" placeholder="图书名称" /> -->

            <el-upload class=" mt-5 upload-demo" :auto-upload="false" drag action="#" ref="uploadRef"
                @change="handleChange">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        只允许上传小于 500kb 的 jpg/png 文件
                    </div>
                </template>
            </el-upload>

            <div class="demo-drawer__footer flex justify-end">
                <el-button @click="cancelForm">Cancel</el-button>
                <el-button type="primary" :loading="loading" @click="listing(workId)">{{
        loading ? 'Submitting ...' : 'Submit'
                    }}</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<style scoped>
.navbar {
    position: fixed;
    z-index: 1000;
    top: 0;
    transition: background-color 0.5s ease;
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    /* for Internet Explorer, Edge */
    scrollbar-width: none;
    /* for Firefox */
}

.word-line {
    height: 1850px;
}

.word-line-first {
    position: absolute;
    top: 450px;
}

.word-line-middle {
    position: absolute;
    top: 950px;
}

.word-line-final {
    position: absolute;
    top: 1480px
}

.word-line-font-1 {
    position: absolute;
    top: 150px;
}

.word-line-font-2 {
    position: absolute;
    top: 600px;
}

.word-line-font-3 {
    position: absolute;
    top: 1100px;
}

.bg {
    background: url(../../assets/gw-bg.jpg);
    background-size: cover;
    background-position: center;
}

.latest-item {
    display: table-cell;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    text-align: left;
    padding: 17px 84px 15px 42px;
    max-width: 290px;
    border-bottom: 1px solid rgba(0, 0, 0, .04);
    box-sizing: content-box;
}

.latest-item-list {
    font-size: 16px;
    line-height: 20px;
    margin-top: 40px;
    width: 100%;
    border-spacing: 0;
}

.text-box {
    width: 300px;
    /* 定义盒子宽度 */
    overflow-wrap: break-word;
    /* 允许在单词内部断行 */
    white-space: normal;
    /* 文本自动换行 */

    /* 以下是实现溢出显示...的关键CSS */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    /* 限制在3行内 */
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
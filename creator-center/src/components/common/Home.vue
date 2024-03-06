<script setup lang='ts'>
import { onMounted, onBeforeUnmount, onUnmounted, ref, computed, reactive,getCurrentInstance } from 'vue';
import { useUserStore } from '@/store/user';
import emitter from '@/emitter';
import { ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/base.css';
import 'element-plus/theme-chalk/el-message-box.css';

let scrollY = ref(0)
const handleScroll = () => {
    scrollY.value = window.scrollY;
};
onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});

let bg = computed(() => {
    if (scrollY.value > window.innerHeight * 0.75) {
        return 'white'
    }
    if (scrollY.value > window.innerHeight * 0.75 - 64) {
        let opacity = Math.min(1, scrollY.value / window.innerHeight)
        return `rgba(255,255,255,${opacity})`
    }
    return 'transparent'
})

let items = reactive([
    { id: 1, src: 'https://placehold.co/100x140' },
    { id: 2, src: '/src/assets/img.png' },
    { id: 3, src: 'https://placehold.co/600x200' },
    { id: 4, src: '/src/assets/homepage-1.png' },
    { id: 5, src: 'https://placehold.co/100x140' },
    { id: 6, src: '/src/assets/homepage-2.png' },
    { id: 7, src: 'https://placehold.co/600x200' },
    { id: 8, src: '/src/assets/homepage-3.png' },
    { id: 9, src: 'https://placehold.co/100x140' },
    { id: 10, src: 'https://placehold.co/600x200' },
    { id: 11, src: '/src/assets/homepage-3.png' },
])
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
let isLogined = ref(false)
const receiveMessage = (e:MessageEvent) => {
  if (e.data.type === 'success'){
    userStore.setUserInfo(e.data.data)
    isLogined.value = true
    emitter.emit('logined',true)
  }
}

onMounted(() => {
  window.addEventListener("message",receiveMessage,false)
})

onUnmounted(() => {
  window.removeEventListener("message",receiveMessage)
})

const login = () => {
    ElMessageBox.alert(
    '<iframe class=" m-auto w-full" style="height: 80vh;" src="http://192.168.32.124:3000/auth/"></iframe>',
    {
      dangerouslyUseHTMLString: true,
      center: true,
      showConfirmButton: false
    }
    ).then(() => {}).catch(() => {})
    // emitter.emit('toLogin',true) 
    
}



</script>

<template>
    <!-- nav-->
    <div class=" flex items-center  w-full h-16 px-32 navbar " :style="{ backgroundColor: bg }">
        <img src="../../assets/img.png" class=" h-8 w-14">
        <div class=" flex-1">
            <img class=" h-6" src="../../assets/head-1.png">
        </div>
        <div class=" flex justify-between">
            <img class=" h-6" src="../../assets/head-2.png">
            <div class=" flex items-center text-sm px-1"> | </div>
            <img class=" h-6" src="../../assets/head-3.png">
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
                    <td class=" latest-item" >我在精神病院斩学神</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item" >庆余年</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item" >庆余年</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item" >庆余年</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item" >庆余年</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item" >庆余年</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item" >庆余年</td>
                    <td class=" latest-item">猫腻</td>
                    <td class=" latest-item">12 章</td>
                    <td class=" latest-item">3千万</td>
                    <td class=" latest-item" style=" color: rgba(0,0,0,.4);">2019-12-20</td>
                </tr>
                <tr>
                    <td class=" latest-item" >庆余年</td>
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
                    :src="item.src" ref="scrollContent" />
                <img v-for="(item, id) in items" :key="id + 10" class=" flex-shrink-0 w-36 h-48 object-cover rounded-lg mr-4"
                    :src="item.src" />
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
            <img class=" flex-1 h-80" src="https://placehold.co/100x140">
        </div>
        <div class=" flex w-full items-center word-line-font-2">
            <img class=" h-80 mx-28" src="https://placehold.co/100x140">
            <img class=" h-48 w-full " src="../../assets/font-6.png">
        </div>
        <div class=" flex w-full items-center word-line-font-3">
            <img class=" h-80 mx-28" src="https://placehold.co/100x140">
            <img class=" h-80 flex-1" src="../../assets/font-7.png">
        </div>
    </div>
    <div>

    </div>
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
.latest-item{
    display: table-cell;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    text-align: left;
    padding: 17px 84px 15px 42px;
    max-width: 290px;
    border-bottom: 1px solid rgba(0,0,0,.04);
    box-sizing: content-box;
}

.latest-item-list {
    font-size: 16px;
    line-height: 20px;
    margin-top: 40px;
    width: 100%;
    border-spacing: 0;
}


</style>
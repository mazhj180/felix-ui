<script setup lang='ts'>
import emitter from '@/emitter';
import router from '@/router';
import { h, onMounted, onUnmounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import Root from '@/components/remark/Root.vue';
import Reply from '../remark/Reply.vue';
import { useUserStore } from '@/store/user';

const route = useRoute()
const topic = reactive(route.query)
const reviewRef = ref<HTMLElement | null>(null)
const reviewVal = ref<string>('')
const userStore = useUserStore()


onMounted(() => {
    emitter.emit('hide-head', true)
    emitter.emit('hide-foot', true)
})

onUnmounted(() => {
    emitter.emit('hide-topic', false)
    emitter.emit('hide-head', false)
    emitter.emit('hide-foot', false)
})

const back = () => {
    router.push('/home/topic')
}

const review = () => {
    reviewRef.value?.focus()
}

function getCurrentFormattedDate(): string {
  const date = new Date();
  
  const year = date.getFullYear(); // 获取当前年份
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 获取月份，+1 因为月份是从0开始的
  const day = date.getDate().toString().padStart(2, '0'); // 获取日
  const hours = date.getHours().toString().padStart(2, '0'); // 获取小时
  const minutes = date.getMinutes().toString().padStart(2, '0'); // 获取分钟
  const seconds = date.getSeconds().toString().padStart(2, '0'); // 获取秒数

  // 按照 "YYYY-MM-DD HH:mm:ss" 的格式构造日期时间字符串
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


const handleBlur = () => {
    let remark = {
        topicId: topic.topicId,
        rootRemarkId: null,
        replyRemarkId:  null,
        replyUser:  null,
        userId: userStore.userInfo.userId,
        nickName: userStore.userInfo.nickName,
        headImg: userStore.userInfo.headImgUrl,
        healthyContent:'',
        supportCount: 0,
        createTime: getCurrentFormattedDate(),
        replies: []
    }
    if (reviewVal.value[0] === '@') {

    } else {
        remark.healthyContent = reviewVal.value
        emitter.emit('review', remark)
    }
    reviewVal.value = ''
}

onMounted(() => {

    emitter.on('input-remark', ({ flag, who }: any) => {
        review()
        reviewVal.value = '@' + who + '/'
        // ElMessageBox({
        //     title: '',
        //     message: h(Reply, {
        //         flag,
        //         who
        //     }),
        //     showCancelButton: false,
        //     showConfirmButton: true,
        //     confirmButtonText : '发布',
        //     buttonSize:'small'
        //     // customStyle: { width: '100%', maxWidth: '600px' }

        // }).then((action: any) => {
        //     // 这里可以处理用户点击事件，例如登录或取消
        //     console.log(action);
        // }).catch((err: any) => {
        // });
    })
})

onUnmounted(() => {
    emitter.off('input-remark')
})

</script>

<template>
    <div class=" h-screen">
        <div class=" flex sticky items-center px-3 h-10 ">
            <font-awesome-icon @click="back()" :icon="['fas', 'arrow-left']" />
            <div class="flex flex-1 justify-center">话题</div>
            <div @click="review" class=" cursor-pointer text-gray-600 text-sm"> 评论 </div>
        </div>
        <div class=" flex flex-col border-b">
            <div class=" h-16 flex justify-center items-center">
                #{{ topic.topicName }}
            </div>
        </div>
        <div class="bg-white mt-4">
            <Root :topicid="topic.topicId as any" />
        </div>
        <div class="fixed-bottom border mx-2 my-1 rounded">
            <input @blur="handleBlur" v-model="reviewVal" ref="reviewRef" class=" px-5 rounded-sm h-16 w-full" placeholder="善语结善缘，恶言伤人心"
                type="text">
        </div>
    </div>

</template>

<style scoped>
.fixed-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    /* 确保它在页面上其他元素之上 */
    background-color: white;
    /* 或者任何您想要的背景色 */
}
</style>
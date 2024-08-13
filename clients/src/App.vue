<script lang="ts" setup>
import Head from "@/components/common/Head.vue";
import Foot from "@/components/common/Foot.vue";
import {computed , onMounted, reactive, ref} from "vue";
import emitter from "@/emitter";
import {WebSocketService} from '@/api/webSocketService';
import { useUserStore } from "@/store/user";
import { useForumStore } from "@/store/forum";
import {
  ArrowLeft
} from '@element-plus/icons-vue'

const reader_host = ref<string>(import.meta.env.VITE_READER_HOST)
let hideHead = ref(false)
let hideFoot = ref(false)
let bgcolor = computed(() => {
  return (hideFoot.value && hideHead.value)?'bg-white-100':'bg-gray-100'
})
let marginBottom = computed(() => {
  return hideFoot.value?'':'content-margin'
})
const isReading = ref<boolean>(false)

emitter.on('hide-head',(value:any) => {
  hideHead.value = value
})
emitter.on('hide-foot',(value:any) => {
  hideFoot.value = value
})
emitter.on('hide-home',(value:any) => {
  hideFoot.value = value
  hideHead.value = value
})



const wsService = ref<WebSocketService | null>(null);
// //页面卸载，关闭socket
// onUnmounted(() => {
//   closeWebSocket();
// });

// // WebSocket
// const ws = ref();
// const initWebSocket = () => {
//   ws.value = new WebSocket(`ws://${location.host}/socket/forum/ws?token=${localStorage.getItem('token')}`);
//   ws.value.onopen = () => {
//     console.log("连接成功");
//   };
//   //后端设置心跳，会每间隔一定时间，触发一次，根据内容变化处理逻辑
//   ws.value.onmessage = (e: any) => {
//     console.log(e, "广播返回的消息");
//     //后端约定了，如果返回字符串“UPDATE”，就更新表格
//     if (e.data === "UPDATE") {
//       //getTable();
//     }
//   };
//   ws.value.onerror = () => {
//     console.log("连接错误");
//     //断连后每5秒重连一次
//     setTimeout(() => {
//       initWebSocket();
//     }, 5000);
//   };
// };
// initWebSocket();
// //关闭链接（在页面销毁时销毁连接）
// const closeWebSocket = () => {
//   ws.value.close();
// };
let userStore = useUserStore()
let isLogined = computed(() => userStore.userInfo.userId)
onMounted(()=> {
  if(isLogined.value){
    console.log('页面刷新')
    wsService.value = new WebSocketService(`ws://${location.host}/socket/forum/ws?token=${localStorage.getItem('accessToken')}`);
  }
})

emitter.on('logined',() => {
  console.log('登录成功')
  wsService.value = new WebSocketService(`ws://${location.host}/socket/forum/ws?token=${localStorage.getItem('accessToken')}`);
});
emitter.on('logout',() => {
  if(wsService.value){
    wsService.value.disconnect();
  }
})
const src = ref('')
emitter.on('reading',(uri:any) => {
  src.value = uri
  isReading.value = true
})

// 消息弹窗控制
const show = ref(false);
let message = reactive({
  head:'',
  title:'',
  msg:''
})

const showNotify = () => {
  show.value = true;
  setTimeout(() => {
    show.value = false;
  }, 3000);
};

emitter.on('notify',(msg:any) => {
  let data = JSON.parse(msg)
  let scope = data.scope
  console.log('scope @@',scope)
  switch(scope){
    case 'ONLINE_USERS' :
      message.head = '/admin/head_img';
      message.msg = data.msgBody;
      message.title = '系统通知';
      break;
    case 'TOPIC' :
      message.head = useForumStore().msgBody_topic.sender.headImg;
      message.msg = useForumStore().msgBody_topic.msgBody.healthContent;
      message.title = useForumStore().msgBody_topic.sender.nickName + ' @回复了你的评论';
      break;
    case 'PRIVATE' :
      message.head = useForumStore().msgBody_private.sender.headImg;
      message.msg = useForumStore().msgBody_private.msgBody;
      message.title = useForumStore().msgBody_private.sender.nickName + ' 私信你';    
      break;
    default:
      break;  
  }
  showNotify();
})
const dianji = () => {
  console.log('qqqqww')
}



</script>

<template>
  <!-- <div class="hide-scrollbar bg-gray-100">
    <div class="px-4 py-2 content-margin">
      <Head v-if="!hideHead"/>
      <router-view></router-view>
      <Foot v-if="!hideFoot"/>
    </div>
  </div> -->
  <div v-if="!isReading" class=" bg-gray-50" :class="[bgcolor,marginBottom]">
    <Head v-if="!hideHead"/>
    <!-- <Bookstore v-if="!hideBookstore"/> -->
    <router-view></router-view>
    <Foot v-if="!hideFoot"/>
  </div>
  <!-- <div v-if="hideHome" class="bg-white-100">
    <Login/>
  </div> -->

  <div v-if="isReading" class=" h-screen">
    <el-button @click="isReading = false" class="fixed top-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" :icon="ArrowLeft" circle />
    <iframe class=" border" :src="reader_host+`?uri=${src}`" height="100%" width="100%"></iframe>
  </div>
  <van-notify @click="dianji()" v-model:show="show" type="success" background="white" >
    <!-- <van-icon name="bell" style="margin-right: 4px;" />
    <span>系统新消息</span> -->
    <div class=" flex justify-start bg-gray-200 rounded-lg w-full"> 
      <img src="./assets/head_img.png" class=" w-16 h-16 rounded-lg">
      <div class=" mx-2">
        <div class=" font-semibold text-lg mt-2 text-gray-900 text-left">{{message.title}} </div>
        <div class=" font-light text-sm text-gray-600 text-left">{{ message.msg }}</div>
      </div>
    </div>
  
  </van-notify>
</template>

<style scoped>
  .notify {
    background-color: blue;
  }
</style>

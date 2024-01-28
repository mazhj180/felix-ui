<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from "vue";
import emitter from "@/emitter";
import { useUserStore } from "@/store/user";

let userStore = useUserStore()
let isLogined = computed(() => userStore.userInfo.userId)
let headUrl = computed(() => 'src/assets'+userStore.userInfo.headImgUrl)

const show = ref(false);
const showPopup = () => {
  show.value = true;
};

onMounted(() => {
  emitter.emit('hide-head',true)
})

onUnmounted(() => {
  emitter.emit('hide-head',false)
})
</script>

<template>
  <div class="pt-2 pb-12 px-4 bg-gray-50">
    <!-- Main content -->
    <div class="mt-4">
      <div v-if:="!isLogined" class="flex w-23 h-8" >
        <img src="@/assets/img.png" class="block" alt="logo">
        <div class="px-1.5 ">
          <div class="h-2"></div>
          <div class="text-black-50 h-6">
            <em>欢迎来到 Felix</em>
          </div>
        </div>
      </div>
      <!-- Login button -->
      <div v-if:="!isLogined" class="mt-4 flex justify-between h-8">
        <button @click="showPopup" class="bg-orange-400 text-white px-4 rounded-2xl">立即登录</button>
      </div>
      <!-- Logined show user info -->
      <div v-if="isLogined" class="mt-4 flex h-16 ">
        <img :src="headUrl" class="block w-16 rounded-full" alt="head img"/>
        <div class="flex flex-col ml-4">
          <div class="h-2">{{userStore.userInfo.nickName}}</div>
          <div class=" mt-3">{{ userStore.userInfo.userId }} </div>
        </div>
        <div class=" flex-1 text-center">
          <button class=""> 退出</button>
        </div>
      </div>
      <!-- Benefit display -->
      <div class="h-16 flex overflow-x-auto no-scrollbar mt-4 space-x-4">
        <div class="flex-shrink-0 w-36 bg-blue-200 text-blue-800 rounded-2xl shadow"></div>
        <div class="flex-shrink-0 w-36 bg-blue-300 text-blue-900 rounded-2xl shadow"></div>
        <div class="flex-shrink-0 w-36 bg-blue-300 text-blue-900 rounded-2xl shadow"></div>
        <!-- 更多元素... -->
      </div>

      <!-- User operations -->
      <div class="bg-white mt-4 grid grid-cols-4 gap-4 shadow rounded-lg p-1">
        <div class="my-4 text-center">
          <font-awesome-icon icon="clock-rotate-left" />
          <div class=" mt-1 text-sm">浏览历史</div>
        </div>
        <div class="my-4 text-center">
          <font-awesome-icon :icon="['far', 'message']" />
          <div class=" mt-1 text-sm">我的消息</div>
        </div>
        <div class="my-4 text-center">
          <font-awesome-icon :icon="['far', 'window-restore']" />
          <div class=" mt-1 text-sm">商城</div>
        </div>
        <div class="my-4 text-center">
          <font-awesome-icon class=" text-red-600" :icon="['far', 'pen-to-square']" />
          <div class=" mt-1 text-sm">成为作者</div>
        </div>
      </div>

      <!-- Book sections -->
      <div class="mt-4">
        <div class="flex justify-between items-center">
          <div class="text-lg font-semibold">荣誉图书</div>
          <button class="text-orange-500">立即充值</button>
        </div>
        <div class="mt-2 flex space-x-2">
          <!-- Placeholder images with detailed alt text for AI generation -->
          <img src="https://placehold.co/100x100" alt="Book cover with a landscape, labeled '1'" class="rounded">
          <img src="https://placehold.co/100x100" alt="Book cover with text, labeled '2'" class="rounded">
          <img src="https://placehold.co/100x100" alt="Book cover with a cityscape, labeled '3'" class="rounded">
        </div>
      </div>

      <div class="mt-4">
        <div class="flex justify-between items-center">
          <div class="text-lg font-semibold">精选好书</div>
          <div class="text-gray-500">更多</div>
        </div>
        <div class="mt-2 flex space-x-2">
          <img src="https://placehold.co/100x100" alt="Book cover with a scenic view and title '精选好书'" class="rounded">
          <div class="flex flex-col justify-between">
            <div>起风了 周峻佳2...</div>
            <div class="text-red-500">¥9.9</div>
          </div>
        </div>
        <div class="mt-2 flex space-x-2">
          <img src="https://placehold.co/100x100" alt="Book cover with a scenic view and title '精选好书'" class="rounded">
          <div class="flex flex-col justify-between">
            <div>起风了 周峻佳2...</div>
            <div class="text-red-500">¥9.9</div>
          </div>
        </div>
        <div class="mt-2 flex space-x-2">
          <img src="https://placehold.co/100x100" alt="Book cover with a scenic view and title '精选好书'" class="rounded">
          <div class="flex flex-col justify-between">
            <div>起风了 周峻佳2...</div>
            <div class="text-red-500">¥9.9</div>
          </div>
        </div>
        <div class="mt-2 flex space-x-2">
          <img src="https://placehold.co/100x100" alt="Book cover with a scenic view and title '精选好书'" class="rounded">
          <div class="flex flex-col justify-between">
            <div>起风了 周峻佳2...</div>
            <div class="text-red-500">¥9.9</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <van-popup
    v-model:show="show"
    closeable
    position="bottom"
    :style="{ height: '95%' }">
  <iframe src="static/login.html"  width="100%" height="100%"></iframe>
  </van-popup>
</template>

<style scoped>
  /* Tailwind CSS - Hide Scrollbar */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
  }
</style>
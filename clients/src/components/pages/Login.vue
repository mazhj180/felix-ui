<script lang="ts" setup>

import {onMounted, reactive} from "vue";
import emitter from "@/emitter";
import {useUserStore} from "@/store/user";
import router from "@/router";

const loginInfo = reactive({
  userId: '',
  password: ''
})

onMounted(() => {
  emitter.emit('hide-home',true)
})

const onSubmit = async () => {
  try {
    await useUserStore().login(loginInfo)
    back()
  } catch (error) {
    console.log(error)
  }
}

const back = () => {
  emitter.emit('hide-home',false)
  router.back()
}
</script>

<template>
  <div class="h-screen flex flex-col">
    <!-- Top bar -->
    <div class="px-4 py-2 flex ite  ms-center border-b border-gray-300">
      <span @click="back" class="text-sm">返回</span>
    </div>

    <!-- Input content -->
    <div class="flex-grow flex flex-col items-center justify-start pt-8 px-4">
      <div class="mb-4">
        <img src="../../assets/img.png" alt="Google logo" class="w-23 h-8">
      </div>
      <div class="text-center text-sm text-gray-700 mb-16">
        <p>在此登录 <strong>Felix</strong> 账号后，您在应用中使用 <strong>Felix</strong> 服务时也将登录此账号。</p>
      </div>
      <div class="w-full max-w-md">
        <div class="flex items-center w-full mb-6">
          <div class="flex-grow  py-2 px-4 bg-white shadow-sm">
            <input v-model="loginInfo.userId" type="text" placeholder="在此输入用户名" class="w-full outline-none text-sm">
          </div>
        </div>
        <div class="flex items-center w-full mb-10">
          <div class="flex-grow  py-2 px-4 bg-white shadow-sm">
            <input v-model="loginInfo.password" type="password" placeholder="在此输入密码" class="w-full outline-none text-sm">
          </div>
        </div>
        <div class="flex mb-4">
          <div class="flex justify-start">
            <a href="#" class="text-blue-500 px-4 py-2 text-sm" >创建账号</a>
          </div>
          <div class="flex flex-grow justify-end ">
            <button @click="onSubmit" class="bg-blue-500 text-white rounded px-4 py-2 text-sm">登&nbsp;录</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Bottom bar -->
    <div class="px-4 py-2 border-t border-gray-300">
      <div class="flex justify-between text-sm text-gray-700">
        <a href="#" class="hover:underline">隐私权政策</a>
        <a href="#" class="hover:underline">意见反馈</a>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
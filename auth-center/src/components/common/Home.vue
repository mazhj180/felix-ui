<script lang="ts" setup>

import { ref } from "vue";
import emitter from "@/emitter";


const loginSuccess = ref(false)

emitter.on('login-success',(value:any) => {
  loginSuccess.value = value
})

</script>

<template>
  <div v-if="!loginSuccess" class=" flex flex-col " style="height: 98%">
    <!-- Top bar -->
    <div class="px-4 py-2 flex ite justify-center ms-center border-b border-gray-300">
       <span class="text-sm">felix.login.com</span>
    </div>

    <!-- content -->
    <div class="flex-grow flex flex-col items-center justify-start pt-8 px-4">
      <div class="mb-4">
        <img src="../../assets/img.png" alt="felix logo" class="w-23 h-8">
      </div>
      <RouterView></RouterView>
    </div>
    
    <!-- Bottom bar -->
    <div class="px-4 py-2 border-t border-gray-300">
      <div class="flex justify-between text-sm text-gray-700">
        <a href="#" class="hover:underline">隐私权政策</a>
        <a href="#" class="hover:underline">意见反馈</a>
      </div>
    </div>
  </div>
  <div v-if="loginSuccess" class=" flex items-center justify-center h-screen w-screen">
    <div class="text-center text-2xl text-green-600">
      login success 
    </div>
  </div>
  
</template>

<style scoped>

</style>
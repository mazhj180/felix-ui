<script setup lang='ts'>
import Home from "@/components/common/Home.vue";
import { onMounted, ref } from "vue";
import emitter from "./emitter";
import { isWriterReq } from "@/api/api";
import { useUserStore } from "@/store/user";


let isLogined = ref(false)
let isWriter = ref(false)
let userStore = useUserStore()

emitter.on('logined',async (value:any) => {
    isLogined.value = value
    let res = await isWriterReq(userStore.userInfo.userId as string)
    if(res.data === 'yes'){
      isWriter.value = true
    } else if (res.data === 'no'){
      isWriter.value = false
    }
})

onMounted(() => {
  
})


</script>

<template>
  <div class=" bg h-screen ">
    <Home v-if="!isWriter"/>
    <div v-if="isWriter" class=" flex flex-col items-center justify-center h-full rounded-lg">
      <div class=" flex items-center justify-center  w-2/3 mb-2 bg-white opacity-80 rounded-lg  " ">
        <img src="./assets/font-9.png" class=" h-16"/>
      </div>
      <Form />
    </div>
  </div>
</template>

<style >
  .bg {
    background: url(./assets/gw-bg.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
</style>
<script setup lang='ts'>
import Home from "@/components/common/Home.vue";
import { onMounted, ref } from "vue";
import emitter from "./emitter";
import { useUserStore } from "@/store/user";


let userStore = useUserStore()

emitter.on('logined', (value:any) => {
  
})

onMounted(() => {
  
})


</script>

<template>
  <div class=" h-screen ">
    <Home v-if="userStore.isWriter === 'true'"/>
    <div v-if="userStore.isWriter === 'false'" class=" flex flex-col items-center justify-center h-full bg">
      <div class=" flex items-center justify-center  w-2/3 mb-2 bg-white opacity-80 rounded-lg ">
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
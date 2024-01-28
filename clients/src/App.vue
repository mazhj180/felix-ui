<script lang="ts" setup>
import Head from "@/components/common/Head.vue";
import Foot from "@/components/common/Foot.vue";
import {computed, ref} from "vue";
import emitter from "@/emitter";


let hideHead = ref(false)
let hideFoot = ref(false)
let bgcolor = computed(() => {
  return (hideFoot.value && hideHead.value)?'bg-white-100':'bg-gray-100'
})
let marginBottom = computed(() => {
  return hideFoot.value?'':'content-margin'
})


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


</script>

<template>
  <!-- <div class="hide-scrollbar bg-gray-100">
    <div class="px-4 py-2 content-margin">
      <Head v-if="!hideHead"/>
      <router-view></router-view>
      <Foot v-if="!hideFoot"/>
    </div>
  </div> -->
  <div class=" bg-gray-50" :class="[bgcolor,marginBottom]">
    <Head v-if="!hideHead"/>
    <!-- <Bookstore v-if="!hideBookstore"/> -->
    <router-view></router-view>
    <Foot v-if="!hideFoot"/>
  </div>
  <!-- <div v-if="hideHome" class="bg-white-100">
    <Login/>
  </div> -->
</template>

<style scoped>
  .bg {
        
    }
</style>

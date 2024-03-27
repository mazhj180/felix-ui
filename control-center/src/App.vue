<script setup lang="ts">
import Home from '@/components/Home.vue';
import { reactive } from 'vue';

const font = reactive({
  color: 'rgba(0, 0, 0, 0.15)',
})

const waterMark = reactive(['马峥吉','mazhj180'])
</script>

<template>
  
  <div class=" px-2 py-1 ">
      <Home class=" h-full" />
      <el-backtop :bottom="100">
    <div
      style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      "
    >
      UP
    </div>
  </el-backtop>
    </div>
    
</template>

<style scoped></style>

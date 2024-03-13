<script setup lang='ts'>
import useWork from '@/hooks/useWork';

const {works} = useWork()


</script>

<template>
    <div v-if="works.length == 0" class=" flex justify-center items-center py-5  h-full text-gray-500"> （暂无作品） </div>
    <div v-if="works.length > 0" v-for="item,idx in works" class=" flex h-16 mb-2 bg-gray-50" >
        <div class=" flex justify-center items-center h-full px-7 text-2xl text-gray-700">
            {{ item.workName}}
        </div>
        <div class=" flex justify-center items-center flex-1">
            <span class=" text-xs whitespace-nowrap">创建时间 : &nbsp;</span>
            <span class=" text-xs italic whitespace-nowrap">{{ item.createTime }}</span>
        </div>
        <div class=" flex justify-end items-center flex-1 px-7 text-gray-500 whitespace-nowrap"> 
            {{ item.status }}
        </div>
    </div>
</template>

<style scoped>

</style>
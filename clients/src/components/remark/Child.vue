<script setup lang='ts'>
import type { remark } from '@/hooks/useTopic';
import { reactive, ref } from 'vue';
import { Star } from '@element-plus/icons-vue';
import emitter from '@/emitter';

const minio_host = ref<string>(import.meta.env.VITE_MINIO_HOST)
const props = defineProps<{
    replies:remark[];
}>()

const replies = reactive<remark[]>(props.replies)

</script>

<template>
    <div v-for="item, idx in replies" class=" flex flex-col pb-2">
        <div class=" flex">
            <div class=" flex flex-col py-1">
                <el-avatar size="small" :src="minio_host + item.headImg"></el-avatar>
                <div class=" flex-1"></div>
            </div>
            <div class=" ">
                <span class="  text-sm text-gray-500 px-2 ">{{ item.nickName }}  </span>
                <span class=" text-sm text-blue-500">{{ item.replyUser?'@'+item.replyUser:'' }} </span>
                : {{ item.healthyContent }}
            </div>
        </div>
        <div class=" pl-8 pr-2 flex text-gray-500">
            <div class=" text-xs">{{ item.createTime }}</div>
            <div class=" flex ml-3">
                <!-- <el-icon class="" ><StarFilled class=" text-xl " /></el-icon> -->
                <el-icon class="">
                    <Star class="text-xs " />
                </el-icon>
                <div class="text-xs ">{{ item.supportCount }}</div>
            </div>
            <div @click="emitter.emit('input-remark',{flag:'回复',who:item.nickName})" class=" px-3 text-xs">回复</div>
        </div>
    </div>
    <!-- <Child></Child> -->
</template>

<style scoped></style>
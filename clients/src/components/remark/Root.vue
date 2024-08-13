<script setup lang='ts'>
import { StarFilled, Star } from '@element-plus/icons-vue';
import Child from './Child.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import useTopic from '@/hooks/useTopic';
import emitter from '@/emitter';

const minio_host = ref<string>(import.meta.env.VITE_MINIO_HOST)
const { topicRemark, getTopicRemarks } = useTopic()


const props = defineProps({
    topicid:Number
})

emitter.on('review',(remark:any) => {
    topicRemark.push(remark)
})

onMounted(() => {
    if (props.topicid)
        getTopicRemarks(props.topicid)
})

onMounted(() => {
    emitter.on('submit',(value:any) => {
        if(value.flag && value.flag === '评论') {
            topicRemark.push(value.remark)
        } else if( value.flag && value.flag === '回复'){
            topicRemark[topicRemark.findIndex((value ) => value.remarkId == value.rootRemarkId)].replies?.push(value.remark)
        }
    })
})

onUnmounted(() => {
    emitter.off('submit')
})

</script>

<template>
    <div v-for="item, idx in topicRemark" class=" flex flex-col ">
        <div class=" flex p-2" >
            <div class=" flex flex-col">
                <el-avatar size="" :src="minio_host + item.headImg" ></el-avatar>
                <div class=" flex-1"></div>
            </div>
            <div class=" border-b w-full ">
                <div class=" text-sm text-gray-500 px-2 cursor-pointer">{{ item.nickName }}</div>
                <div class=" px-2 pb-2">{{ item.healthyContent }}</div>
                <div class=" px-2 flex text-gray-500 pb-2">
                    <div class=" text-xs">{{ item.createTime }}</div>
                    <div class=" flex ml-3">
                        <!-- <el-icon class="" ><StarFilled class=" text-xl " /></el-icon> -->
                        <el-icon class=""><Star class="text-xs "/></el-icon>
                        <div class="text-xs ">{{ item.supportCount }}</div>
                    </div>
                    <div @click="emitter.emit('input-remark',{flag:'回复',who:item.nickName})" class="flex flex-1 justify-end px-2 text-xs">回复</div>
                </div>
                <Child :replies="item.replies?item.replies:[]" ></Child>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
<script setup lang='ts'>
import emitter from '@/emitter';
import useMine from '@/hooks/useMine';
import router from '@/router';
import { Delete } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';

const minio_host = ref<string>(import.meta.env.VITE_MINIO_HOST)
const { localLookHistories, lookHistories, getLookHistories,clearLookedHistories } = useMine()

onMounted(() => {
    getLookHistories()
})

const back = () => {
    emitter.emit('hide-mine-all')
    router.push('/mine')
}

</script>

<template>
    <div class=" flex flex-col">
        <div class=" flex items-center px-3 h-10">
            <font-awesome-icon @click="back()" :icon="['fas', 'arrow-left']" />
            <el-icon :size="17" class=" flex flex-1  cursor-pointer mx-2" style="justify-content: end;"
                @click="clearLookedHistories">
                <Delete class=" text-end text-gray-500" />
            </el-icon>
        </div>
        <div v-if="lookHistories.length > 0" class=" flex flex-wrap  p-2 bg-white">
            <div v-for=" item, idx in lookHistories" class=" px-2 shadow">
                <img :src="minio_host + item.imgUrl" :alt="item.bookName" class=" h-24 w-16" />
                <el-text class="mx-1" size="small">{{ localLookHistories[idx].time }}</el-text>
            </div>
        </div>
        <div class=" bg-white  flex items-center justify-center" v-if="lookHistories.length == 0">
            <el-empty description="浏览记录为空" />
        </div>
    </div>
</template>

<style scoped></style>
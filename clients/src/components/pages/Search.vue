<script setup lang='ts'>
import emitter from '@/emitter';
import router from '@/router';
import { onMounted, onUnmounted } from 'vue';


onMounted(() => {
    emitter.emit('hide-head',true)
    emitter.emit('hide-foot',true)
})

onUnmounted(() => {
    emitter.emit('hide-head',false)
    emitter.emit('hide-foot',false)
})

const back = () => {
    router.back()
}
</script>

<template>
    <div class="max-w-md mx-auto">
        <div class="bg-white shadow">
            <div class="flex items-center justify-between border-b border-gray-200 p-4">
                <font-awesome-icon @click="back()" :icon="['fas', 'arrow-left']" />
                <input type="text" placeholder="搜索上浮定居玩，书页不是yyds" class=" w-4/5 px-2 py-1 text-gray-900 bg-gray-100 rounded outline-none" />
                <div class="text-gray-600 whitespace-nowrap ">搜索</div>
            </div>
            <div class="p-4 border-b border-gray-200">
                <div class="text-gray-600 text-sm">搜索历史</div>
                <div class="text-gray-900 text-xl font-semibold mt-2">你好旧时光</div>
            </div>
            <div class="divide-y divide-gray-200">
                <!-- Repeat for each news item -->
                <div class="flex items-center px-4 py-3">
                    <img src="https://placehold.co/50x50" alt="Cartoon character with a surprised expression" class="rounded-full mr-3">
                    <div>
                        <div class="text-gray-900">求学究其困人文，双男主的</div>
                        <div class="text-gray-500 text-sm">99w+次在看</div>
                    </div>
                </div>
                <!-- ... other news items ... -->
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
<script setup lang='ts'>
import emitter from '@/emitter';
import { onMounted, onUnmounted } from 'vue';


onMounted(() => {
    emitter.emit('hide-head',true)
})

onUnmounted(() => {
    emitter.emit('hide-head',false)
})

</script>

<template>
    <div class=" h-auto px-2 pt-2 pb-12">
        <!-- Search and menu -->
        <div class="flex justify-between items-center mt-4">
            <div class="text-2xl font-bold text-gray-800">书架</div>
            <div class="flex items-center">
                <div class="p-2 rounded-full bg-gray-400 mr-2">
                    <i class="fas fa-search text-white"></i>
                </div>
                <div class="p-2 rounded-full bg-gray-400">
                    <i class="fas fa-ellipsis-v text-white"></i>
                </div>
            </div>
        </div>

        <!-- Book list -->
        <div class="mt-4">
            <!-- Book item -->
            <div class="flex items-center bg p-4 rounded-lg shadow mb-4">
                <img src="https://placehold.co/100x140" alt="Placeholder image of a book cover with a fantasy theme" class="w-20 h-28 mr-4 rounded">
                <div>
                    <div class="text-lg font-medium mb-1 text-gray-800">我在修神南院学车神</div>
                    <div class="text-sm text-gray-600">已完结 · 更新一个后传</div>
                </div>
            </div>

            <!-- Book item -->
            <div class="flex items-center bg-white p-4 rounded-lg shadow mb-4">
                <img src="https://placehold.co/100x140" alt="Placeholder image of a book cover with a mysterious tree and mist" class="w-20 h-28 mr-4 rounded">
                <div>
                    <div class="text-lg font-medium mb-1 text-gray-800">东野圭吾作品：11字谜案</div>
                    <div class="text-sm text-gray-600">1章/13章</div>
                </div>
            </div>

            <!-- Book item -->
            <div class="flex items-center bg-white p-4 rounded-lg shadow mb-4">
                <img src="https://placehold.co/100x140" alt="Placeholder image of a historical figure" class="w-20 h-28 mr-4 rounded">
                <div>
                    <div class="text-lg font-medium mb-1 text-gray-800">张作霖和他的女人们</div>
                    <div class="text-sm text-gray-600">已完结 · 时年</div>
                </div>
            </div>

            <!-- Book item -->
            <div class="flex items-center bg-white p-4 rounded-lg shadow mb-4">
                <img src="https://placehold.co/100x140" alt="Placeholder image of a book cover with a calligraphy brush and the word JavaScript" class="w-20 h-28 mr-4 rounded">
                <div>
                    <div class="text-lg font-medium mb-1 text-gray-800">JavaScript百炼成仙</div>
                    <div class="text-sm text-gray-600">4章/10章</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .bg {
        background: url('../../assets/bg.png');
    }
</style>
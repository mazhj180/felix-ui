<script setup lang='ts'>
import emitter from '@/emitter';
import useBookshelf from '@/hooks/useBookshelf';
import { onMounted, onUnmounted, ref } from 'vue';

const minio_host = ref<string>(import.meta.env.VITE_MINIO_HOST)
const { myBooks,getMyBooks,syncBook} = useBookshelf()

onMounted(() => {
    getMyBooks()
})

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
            <div class="text-2xl font-bold text-gray-800">我的书架</div>
            <div class="flex items-center">
            </div>
        </div>

        <!-- Book list -->
        <div class="mt-4">
            <!-- Book item -->
            <div  @click="emitter.emit('reading',minio_host+'/book/'+'Linux_Book.epub')" v-for="item,idx in myBooks" class="flex items-center bg p-4 rounded-lg shadow mb-4">
                <img :src="minio_host + item.imgUrl" :alt="item.bookName" class="w-20 h-28 mr-4 rounded">
                <div>
                    <div class="text-lg font-medium mb-1 text-gray-800">{{ item.bookName }}</div>
                    <div class="text-sm text-gray-600">{{ item.authorName }}</div>
                </div>
            </div>
        </div>
        <el-empty v-if="myBooks.length == 0" class=""  description="快去添加喜欢的图书吧" />
    </div>
</template>

<style scoped>
    .bg {
        background: url('../../assets/bg.png');
    }
</style>
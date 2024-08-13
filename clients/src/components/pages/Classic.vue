<script setup lang='ts'>
import useClassic from '@/hooks/useClassic';
import useSlideshow from '@/hooks/useSlideshow';
import { ref } from 'vue';
import emitter from '@/emitter';


const minio_host = ref<string>(import.meta.env.VITE_MINIO_HOST)

const {slideshows} = useSlideshow()
const { wordLines, studyCornerData } = useClassic()

</script>

<template>
    <!-- Carousel -->
    <div class="mb-8">
        <!-- Carousel -->
        <div class="mb-4 ">
            <el-carousel class="rounded-lg" trigger="click" height="150px" :autoplay="true">
                <el-carousel-item v-for="item in slideshows" :key="item.id" :autoplay="true">
                    <img :src="item.content">
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
    <!-- Study con-->
    <div class="text-gray-600 text-sm mb-2">
        学习角 >
    </div>
    <div class=" flex overflow-x-auto no-scrollbar space-x-4">
        <div @click="emitter.emit('reading',minio_host+'/book/'+'Linux_Book.epub')" v-for="item,idx in studyCornerData" class="bg-white p-2 rounded-lg flex-shrink-0 shadow">
            <img alt="Placeholder image of a book cover with a fantasy theme"
                class="  h-32 w-24 object-cover rounded-lg" :src="minio_host+item.imgUrl" />
            <div class="mt-2">
                <div class="w-24  text-red-500 text-sm whitespace-nowrap">
                    {{ item.bookName }}
                </div>
                <div class="w-24  text-gray-500 text-xs ">
                    {{ item.authorName }} • {{ item.supportCount }}人喜欢
                </div>
            </div>
        </div>
    </div>
    <!-- 字里行间-->
    <div class="text-gray-600 text-sm mb-2 mt-8">
        字里行间 >
    </div>
    <div class="flex overflow-x-auto no-scrollbar space-x-4">
        <div v-for="item, idx in wordLines" class="bg-white p-2 rounded-lg flex-shrink-0 shadow w-4/5 h-48">
            <div class=" flex items-center h-3/5 p-2 border-b border-gray-50 ">{{ item.contents?.word }}</div>
            <div class=" flex mt-1 h-2/5">
                <img alt="Placeholder image of a book cover with dark and mysterious elements"
                    class=" w-1/6  object-cover rounded-lg " :src="minio_host + item.contents?.image" />
                <div class=" flex-1 p-2">
                    <div class=" text-sm">{{ item.contents?.name }}</div>
                    <div class=" text-xs text-gray-500 mt-1">{{ item.contents?.info }}</div>
                </div>
                <div class=" flex justify-center items-center w-1/12 text-xl text-gray-200">|</div>
                <div class=" flex flex-col justify-center w-1/6 ">
                    <font-awesome-icon class=" text-red-400" :icon="['far', 'heart']" />
                    <div class=" flex justify-center text-xs text-red-400 mt-2"> 666</div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    /* for Internet Explorer, Edge */
    scrollbar-width: none;
    /* for Firefox */
}
</style>
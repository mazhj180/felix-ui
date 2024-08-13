<script setup lang='ts'>
import type { book_vo, respBody } from '@/api/types';
import request from '@/request';
import { onMounted, reactive, ref } from 'vue';
import emitter from '@/emitter';


const minio_host = ref<string>(import.meta.env.VITE_MINIO_HOST)
const highScoreBooks = reactive<book_vo[]>([])
const getHighScoreBooks = async () => {
    try {
        let res = await request.get<any,respBody>('/api/book/get-book/score/10')
        if (res.code == 200) {
            highScoreBooks.push(...res.data)
        }
    } catch {

    }
}

onMounted(() => {
    getHighScoreBooks()
})

</script>

<template>
    <div  @click="emitter.emit('reading',minio_host+'/book/'+'Linux_Book.epub')" v-for="item, idx in highScoreBooks" class="flex items-center mb-6 bg-white h-40 p-2 shadow">
        <img class="w-24 h-32 mr-4 rounded-lg" :src="minio_host + item.imgUrl"
            :alt="item.bookName" >
        <div class="flex flex-col justify-between">
            <div>
                <h2 class="text-lg font-semibold">{{ item.bookName }}</h2>
                <el-text line-clamp="3">
                    {{ item.introduction }}
                </el-text>
            </div>
            <p class="text-sm text-gray-600">{{ item.authorName }} • {{item.supportCount}}人喜欢</p>
        </div>
        <span class="text-red-600 font-bold ml-2 whitespace-nowrap ">{{ item.score }}</span>
    </div>
    <!-- <div class="flex items-center mb-6 bg-white h-40 p-2 shadow">
        <img class="w-24 h-32 mr-4 rounded-lg" src="https://placehold.co/96x128"
            alt="Urban book cover with skyscrapers and a sunset background">
        <div class="flex flex-col justify-between">
            <div>
                <h2 class="text-lg font-semibold">我就地十年，下山已无敌</h2>
                <p class="text-sm text-gray-600 mt-1">[高手下山+武侠修仙+无敌文+还俗图强+多位面]</p>
            </div>
            <p class="text-sm text-gray-600">都市修真 • 玄幻 • 连载中 • 41.3万人在读</p>
        </div>
        <span class="text-red-600 font-bold ml-2 whitespace-nowrap ">9.1 分</span>
    </div> -->
</template>

<style scoped></style>
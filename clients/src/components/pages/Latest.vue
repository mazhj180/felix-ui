<script setup lang='ts'>
import type { book_vo, respBody } from '@/api/types';
import request from '@/request';
import { onMounted, reactive, ref } from 'vue';

const minio_host = ref<string>(import.meta.env.VITE_MINIO_HOST)
const latestBooks = reactive<book_vo[]>([])

const getLatestBooks = async () => {
    try {
        let res = await request.get<any,respBody>('/api/book/get-book/time/10')
        if ( res.code == 200) {
            latestBooks.push(...res.data)
        }
    } catch (error) {
        
    }
}

onMounted(() => {
    getLatestBooks()
})

</script>

<template>
    <div class="grid grid-cols-2 gap-4">
        <!-- Repeat for each guess you like item -->
        <div v-for="item, idx in latestBooks" class="bg-white p-2 rounded-lg">
            <img alt="Placeholder image of a book cover with a romantic theme"
                class="w-full h-48 object-cover rounded-lg" :src="minio_host + item.imgUrl" />
            <div class="mt-2">
                <div class="text-red-500 text-sm">
                    {{ item.bookName }}
                </div>
                <div class="text-gray-500 text-xs">
                    {{ item.authorName }} • {{ item.supportCount }} 人喜欢
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
<script setup lang='ts'>
import useChild from '@/hooks/useChild';
import { onMounted, ref } from 'vue';
import emitter from '@/emitter';


const minio_host = ref<string>(import.meta.env.VITE_MINIO_HOST)
const { childrenBooks, getChildrenBooks } = useChild()

onMounted(() => {
    getChildrenBooks()
})

</script>

<template>
    <div class="grid grid-cols-2 gap-4">
        <!-- Repeat for each guess you like item -->
        <div  @click="emitter.emit('reading',minio_host+'/book/'+'Linux_Book.epub')" v-for="item, idx in childrenBooks" class="bg-white p-2 rounded-lg">
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
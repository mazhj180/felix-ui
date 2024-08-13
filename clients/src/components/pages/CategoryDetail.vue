<script setup lang='ts'>
import emitter from '@/emitter';
import { useBookStore } from '@/store/book';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';

const minio_host = ref<string>(import.meta.env.VITE_MINIO_HOST)


let bookStore = useBookStore()
onMounted(() => {
  emitter.emit('hide-head', true)
  bookStore.setBooks(useRoute().params.id as string)
})

onUnmounted(() => {
  emitter.emit('hide-head', false)
})

const back = () => {
  router.back()
}

</script>

<template>
  <div class="max-w-2xl mx-auto pb-10 pt-5 px-2 bg-white">
    <font-awesome-icon @click="back()" class=" mb-3" :icon="['fas', 'arrow-left']" />
    <!-- Book Item 1 -->
    <div v-if="bookStore.books_category.length > 0" v-for="(item, idx) in bookStore.books_category"
      class="flex items-start mb-6 shadow p-2">
      <img class="w-24  mr-4" :src="minio_host + item.imgUrl"
        alt="Fantasy book cover with a character in white robes standing in a mystical landscape">
      <div class="flex flex-col justify-between">
        <div class=" mb-3">
          <h2 class="text-lg font-semibold">{{ item.bookName }}</h2>
          <p class="text-sm text-gray-600 mt-1">{{ item.introduction.slice(0, 28) + '...' }}</p>
        </div>
        <p class="text-sm text-gray-600">{{ item.supportCount }}万人在读</p>
      </div>
      <span class="text-red-600 whitespace-nowrap font-bold ml-auto">{{ item.score }}分</span>
    </div>
    <div v-if="bookStore.books_category.length == 0" class=" bg-white">
      <el-empty description="目前该分类为空哦" />
    </div>

  </div>
</template>

<style scoped></style>
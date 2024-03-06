<script setup lang='ts'>
import emitter from '@/emitter';
import { useBookStore } from '@/store/book';
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';

let bookStore = useBookStore()
onMounted(() => {
    emitter.emit('hide-head',true)
    bookStore.setBooks(useRoute().params.id as string)
})

onUnmounted(() => {
    emitter.emit('hide-head',false)
})

const back = () => {
    router.back()
}

</script>

<template>
  <div class="max-w-2xl mx-auto pb-10 pt-5 px-2">
    <font-awesome-icon @click="back()" class=" mb-3" :icon="['fas', 'arrow-left']" />
    <!-- Book Item 1 -->
    <div v-for="(item,idx) in bookStore.books_category" class="flex items-start mb-6">
      <img class="w-24 h-32 mr-4" src="https://placehold.co/96x128" alt="Fantasy book cover with a character in white robes standing in a mystical landscape">
      <div class="flex flex-col justify-between">
        <div class=" mb-3">
          <h2 class="text-lg font-semibold">{{ item.bookName }}</h2>
          <p class="text-sm text-gray-600 mt-1">{{ item.introduction.slice(0,28)+'...' }}</p>
        </div>
        <p class="text-sm text-gray-600">{{ item.supportCount }}万人在读</p>
      </div>
      <span class="text-red-600 whitespace-nowrap font-bold ml-auto">{{item.score}}分</span>
    </div>

    <!-- <div class="flex items-start mb-6">
      <img class="w-24 h-32 mr-4" src="https://placehold.co/96x128" alt="Urban book cover with skyscrapers and a sunset background">
      <div class="flex flex-col justify-between">
        <div>
          <h2 class="text-lg font-semibold">我就地十年，下山已无敌</h2>
          <p class="text-sm text-gray-600 mt-1">[高手下山+武侠修仙+无敌文+还俗图强+多位面]</p>
          <p class="text-sm text-gray-600 mt-1">大道有缺，灵气悠悠...</p>
        </div>
        <p class="text-sm text-gray-600">都市修真 • 玄幻 • 连载中 • 41.3万人在读</p>
      </div>
      <span class="text-red-600 font-bold ml-auto">9.1分</span>
    </div>


    <div class="flex items-start mb-6">
      <img class="w-24 h-32 mr-4" src="https://placehold.co/96x128" alt="Thriller book cover with a man in a dark coat standing in the shadows">
      <div class="flex flex-col justify-between">
        <div>
          <h2 class="text-lg font-semibold">重生：权势崛起</h2>
          <p class="text-sm text-gray-600 mt-1">有人说，官场是权力的游戏，尔虞我诈，勾心斗角，比江湖更黑暗...</p>
        </div>
        <p class="text-sm text-gray-600">都市言情 • 玄幻 • 连载中 • 50.5万人在读</p>
      </div>
      <span class="text-red-600 font-bold ml-auto">9.5分</span>
    </div>

    <div class="flex items-start mb-6">
      <img class="w-24 h-32 mr-4" src="https://placehold.co/96x128" alt="Science fiction book cover with a futuristic city and a figure standing on a bridge">
      <div class="flex flex-col justify-between">
        <div>
          <h2 class="text-lg font-semibold">我在清华和府争锋不休</h2>
          <p class="text-sm text-gray-600 mt-1">你是否想过，在重生世界的都市之下，潜藏着来自古老神话的秘密？...</p>
        </div>
        <p class="text-sm text-gray-600">都市奇幻 • 玄幻 • 完结 • 193.5万人在读</p>
      </div>
      <span class="text-red-600 font-bold ml-auto">9.8分</span>
    </div>

    <div class="flex items-start mb-6">
      <img class="w-24 h-32 mr-4" src="https://placehold.co/96x128" alt="Romantic book cover with two characters in an embrace, one wearing a mask">
      <div class="flex flex-col justify-between">
        <div>
          <h2 class="text-lg font-semibold">我的26岁女同事</h2>
          <p class="text-sm text-gray-600 mt-1">酒吧见到一夜，被美女拉上，被迫唱生活当助手。居然偶遇老板，和佳的房子接近了主人，就要掌控地出门，不过她居然...</p>
        </div>
        <p class="text-sm text-gray-600">都市言情 • 玄幻 • 完结 • 130.6万人在读</p>
      </div>
      <span class="text-red-600 font-bold ml-auto">9.7分</span>
    </div>

    <div class="flex items-start mb-6">
      <img class="w-24 h-32 mr-4" src="https://placehold.co/96x128" alt="Historical book cover depicting a scene from 1987 with people and traditional elements">
      <div class="flex flex-col justify-between">
        <div>
          <h2 class="text-lg font-semibold">1987，3天成万元户</h2>
          <p class="text-sm text-gray-600 mt-1">“妈妈，他是不是脑袋进水了？”，要不我们送他去医院吧？”一句玩笑，陆洋发现自己重生了，回到1987年一穷二白...</p>
        </div>
        <p class="text-sm text-gray-600">都市言情 • 玄幻 • 完结 • 25.5万人在读</p>
      </div>
      <span class="text-red-600 font-bold ml-auto">9.0分</span>
    </div> -->
  </div>
</template>

<style scoped>

</style>
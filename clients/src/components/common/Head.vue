<script lang="ts" setup>

</script>

<template>
  <div class="px-4 pt-2 pb-0 sticky-top bg-white">
    <!-- Search and top bar -->
    <div class="flex justify-between">
      <div class="h-4 w-14 py-0">
        <div class="h-1"></div>
        <img src="../../assets/img.png" alt="logo">
      </div>
      <div class="flex-1 mx-4">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <font-awesome-icon icon="magnifying-glass" />
          </div>
          <input class="bg-white rounded-full w-full pl-10 pr-4 py-2 text-sm border border-gray-300 focus:outline-none focus:border-gray-400 focus:ring-0" placeholder="搜索剧，我刷剧了是追剧宝" type="text">
        </div>
      </div>
<!--      <div class="w-14"></div>-->
    </div>
    <!-- Navigation -->
    <div class="flex overflow-x-auto no-scrollbar my-4 ">
      <router-link to="/home/topic" class="text-gray-600 whitespace-nowrap px-2 py-2" active-class="active">话题</router-link>
      <router-link to="/home/recommend" class="text-gray-600 whitespace-nowrap px-2 py-2" active-class="active">推荐</router-link>
      <router-link to="/home/classic" class="text-gray-600 whitespace-nowrap px-2 py-2" active-class="active">经典</router-link>
      <a class="text-gray-600 whitespace-nowrap px-2 py-2" href="#">知识</a>
      <a class="text-gray-600 whitespace-nowrap px-2 py-2" href="#">听书</a>
      <a class="text-gray-600 whitespace-nowrap px-2 py-2" href="#">看剧</a>
      <a class="text-gray-600 whitespace-nowrap px-2 py-2" href="#">电影</a>
      <a class="text-gray-600 whitespace-nowrap px-2 py-2" href="#">儿童</a>
      <a class="text-gray-600 whitespace-nowrap px-2 py-2" href="#">畅听</a>
      <a class="text-gray-600 whitespace-nowrap px-2 py-2" href="#">歌单</a>
    </div>
  </div>
</template>

<style scoped>
  .sticky-top {
    position: sticky;
    top: 0;
    z-index: 1000; /* 确保它在页面上其他元素之上 */
    --tw-bg-opacity: 1;
    /* background: url(../../assets/head_bg.png); */
  }
  /* Tailwind CSS - Hide Scrollbar */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
  }

  .active {
    --tw-text-opacity: 1;
    color: rgb(239 68 68 / var(--tw-text-opacity));
    font-weight: 600;
    transform:scale(1.20);
    -ms-transform:rotate(0.97); 	/* IE 9 */
    -moz-transform:rotate(0.97); 	/* Firefox */
    -webkit-transform:rotate(0.97); /* Safari 和 Chrome */
    -o-transform:rotate(0.97); 	/* Opera */
  }

</style>
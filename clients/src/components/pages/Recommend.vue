<script lang="ts" setup>
import { useBookStore } from '@/store/book';
import { reactive , onMounted, ref } from 'vue';
import { rank_type } from "@/api/types";
import type { rank_vo } from '@/api/types';

let bookStore = useBookStore()
let active = reactive(['active','',''])
let opType = ref(rank_type.HOT)

onMounted(() => {
  bookStore.setRankings(rank_type.HOT)
  opType.value = rank_type.HOT
})

let rank = (type:rank_type) => {
  bookStore.setRankings(type)
  switch (type) {
    case rank_type.HOT:
      active = ['active','','']
      break;
    case rank_type.LIKE:
      active = ['','active','']
      break;
    case rank_type.SCORE:
      active = ['','','active']
      break;
    default:
      break;
  }
  opType.value = type
}

let content = (item:rank_vo) => {
  switch(opType.value){
    case rank_type.HOT:
      return item.hot + 'w 热度'
    case rank_type.LIKE:
      return item.supportCount + ' 人喜欢'
    case rank_type.SCORE:
      return item.score + ' 评分'
  }
}


</script>

<template>
  <!-- Ranking List -->
  <div class="mb-4">
    <div class="flex justify-between items-center mb-2">
      <div class="text-gray-600 text-sm">
        排行榜 >
      </div>
      <div class="text-gray-600 text-xs space-x-2">
        <button @click="rank(rank_type.HOT)" :class="active[0]" >热度榜</button>
        <button @click="rank(rank_type.LIKE)" :class="active[1]" >人气榜</button>
        <button @click="rank(rank_type.SCORE)" :class="active[2]" >评分榜</button>
      </div>
    </div>
    <div class="bg-white p-4 rounded-lg shadow h-80 ">
      <div class="grid grid-rows-3 gap-x-4 gap-y-0 grid-flow-col auto-cols-max overflow-x-auto no-scrollbar">
        <div v-for="(item,idx) in bookStore.rankings[opType]" class="flex py-2 ">
            <img alt="Placeholder image of a book cover with dark and mysterious elements" class=" w-12 h-20 object-cover rounded-lg mr-3" src="https://placehold.co/100x140" />
            <div class=" text-gray-600 my-0 py-0 px-1">
              <i>{{ idx+1 }}</i>
            </div>
            <div class=" flex flex-col p-1">
                <div class="text-red-500 text-sm ">
                    {{ item.bookName }}
                </div>
                <div class="text-gray-500 text-xs whitespace-nowrap">
                  作者: {{ item.authorName }} 
                </div>
                <div class="text-gray-500 text-xs whitespace-nowrap">
                  - {{ content(item) }}
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Carousel -->
  <div class="mb-4">
    <div class="relative">
      <div class="overflow-hidden rounded-lg">
        <img class="w-full" src="https://placehold.co/600x200" alt="Placeholder image for carousel"/>
      </div>
      <div class="absolute inset-0 flex justify-between items-center px-4">
        <button class="text-white" onclick="prevSlide()">&#10094;</button>
        <button class="text-white" onclick="nextSlide()">&#10095;</button>
      </div>
    </div>
  </div>
  <!-- Guess You Like -->
  <div class="mb-4">
    <div class="text-gray-600 text-sm mb-2">
      猜你喜欢 >
    </div>
    <div class="grid grid-cols-2 gap-4">
      <!-- Repeat for each guess you like item -->
      <div class="bg-white p-2 rounded-lg">
        <img alt="Placeholder image of a book cover with a romantic theme" class="w-full h-36 object-cover rounded-lg" src="https://placehold.co/100x140" />
        <div class="mt-2">
          <div class="text-red-500 text-sm">
            爱情故事集
          </div>
          <div class="text-gray-500 text-xs">
            浪漫作家 • 5万次阅读
          </div>
        </div>
      </div>
      <div class="bg-white p-2 rounded-lg">
        <img alt="Placeholder image of a book cover with a fantasy theme" class="w-full h-36 object-cover rounded-lg" src="https://placehold.co/100x140" />
        <div class="mt-2">
          <div class="text-red-500 text-sm">
            魔法世界探险
          </div>
          <div class="text-gray-500 text-xs">
            奇幻大师 • 8万次阅读
          </div>
        </div>
      </div>
      <!-- ... other guess you like items ... -->
      <div class="bg-white p-2 rounded-lg">
        <img alt="Placeholder image of a book cover with a fantasy theme" class="w-full h-36 object-cover rounded-lg" src="https://placehold.co/100x140" />
        <div class="mt-2">
          <div class="text-red-500 text-sm">
            魔法世界探险
          </div>
          <div class="text-gray-500 text-xs">
            奇幻大师 • 8万次阅读
          </div>
        </div>
      </div>
      <div class="bg-white p-2 rounded-lg">
        <img alt="Placeholder image of a book cover with a fantasy theme" class="w-full h-36 object-cover rounded-lg" src="https://placehold.co/100x140" />
        <div class="mt-2">
          <div class="text-red-500 text-sm">
            魔法世界探险
          </div>
          <div class="text-gray-500 text-xs">
            奇幻大师 • 8万次阅读
          </div>
        </div>
      </div>
      <div class="bg-white p-2 rounded-lg">
        <img alt="Placeholder image of a book cover with a fantasy theme" class="w-full h-36 object-cover rounded-lg" src="https://placehold.co/100x140" />
        <div class="mt-2">
          <div class="text-red-500 text-sm">
            魔法世界探险
          </div>
          <div class="text-gray-500 text-xs">
            奇幻大师 • 8万次阅读
          </div>
        </div>
      </div>
      <div class="bg-white p-2 rounded-lg">
        <img alt="Placeholder image of a book cover with a fantasy theme" class="w-full h-36 object-cover rounded-lg" src="https://placehold.co/100x140" />
        <div class="mt-2">
          <div class="text-red-500 text-sm">
            魔法世界探险
          </div>
          <div class="text-gray-500 text-xs">
            奇幻大师 • 8万次阅读
          </div>
        </div>
      </div>
      <div class="bg-white p-2 rounded-lg">
        <img alt="Placeholder image of a book cover with a fantasy theme" class="w-full h-36 object-cover rounded-lg" src="https://placehold.co/100x140" />
        <div class="mt-2">
          <div class="text-red-500 text-sm">
            魔法世界探险
          </div>
          <div class="text-gray-500 text-xs">
            奇幻大师 • 8万次阅读
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .active {
    --tw-text-opacity: 1;
    color: rgb(239 68 68 / var(--tw-text-opacity));
    font-weight: 600;
    transform:scale(1.10);
    -ms-transform:rotate(0.97); 	/* IE 9 */
    -moz-transform:rotate(0.97); 	/* Firefox */
    -webkit-transform:rotate(0.97); /* Safari 和 Chrome */
    -o-transform:rotate(0.97); 	/* Opera */
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
  }
</style>
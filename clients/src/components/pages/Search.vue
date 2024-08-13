<script setup lang='ts'>
import emitter from '@/emitter';
import router from '@/router';
import { onMounted, onUnmounted, ref } from 'vue';
import { Delete } from '@element-plus/icons-vue';
import useSearch from '@/hooks/useSearch';

const minio_host = ref<string>(import.meta.env.VITE_MINIO_HOST)
const { searchWords, searchHits, search, historySeachRecords, changeWords, clearHistories, isEmpty } = useSearch()

onMounted(() => {
    emitter.emit('hide-head', true)
    emitter.emit('hide-foot', true)
})

onUnmounted(() => {
    emitter.emit('hide-head', false)
    emitter.emit('hide-foot', false)
})

const back = () => {
    router.back()
}
</script>

<template>
    <div class="max-w-md mx-auto">
        <div class="bg-white shadow">
            <div class="flex items-center justify-between border-b border-gray-200 p-4">
                <font-awesome-icon @click="back()" :icon="['fas', 'arrow-left']" />
                <input type="text" placeholder="中华人民共和国万岁" v-model="searchWords"
                    class=" w-4/5 px-2 py-1 text-gray-900 bg-gray-100 rounded outline-none" />
                <div @click="search" class="text-gray-600 whitespace-nowrap cursor-pointer">搜索</div>
            </div>
            <div class=" flex flex-col p-4 border-b border-gray-200">
                <div class=" flex">
                    <div class="text-gray-600 text-sm">搜索历史</div>
                    <el-icon :size="17" class=" flex flex-1  cursor-pointer mx-2" style="justify-content: end;"
                        @click="clearHistories">
                        <Delete class=" text-end text-gray-500" />
                    </el-icon>
                </div>
                <div class=" flex flex-wrap">
                    <div v-for="item, idx in historySeachRecords"
                        class=" bg-gray-100 shadow text-gray-500 text-sm mt-4 ml-4 px-2" @click="changeWords(item)"> {{
                    item
                }}
                    </div>
                </div>
            </div>

            <div class="divide-y divide-gray-200">
                <!-- Repeat for each news item -->
                <div @click="emitter.emit('reading',minio_host+'/book/'+'Linux_Book.epub')" v-for="item, idx in searchHits" class="flex  px-4 py-3">
                    <img :src="minio_host + item.imgUrl" :alt="item.bookName" class=" mr-3 h-28  w-20">
                    <div class=" flex flex-col">
                        <div class="text-gray-900">{{ item.bookName }}</div>
                        <div class=" flex text-sm text-gray-500">
                            <el-text line-clamp="3">
                                {{ item.introduction }}
                            </el-text>
                        </div>
                        <div class="flex flex-1 text-gray-500 text-sm my-1">{{ item.authorName }} · {{ item.supportCount
                            }}人喜欢</div>
                    </div>
                </div>
                <div v-if="isEmpty">
                    <el-empty description="没有这本书哦！！！" />
                </div>
                <!-- ... other news items ... -->
            </div>
        </div>
    </div>
</template>

<style scoped></style>
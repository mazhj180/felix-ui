<script setup lang='ts'>
import { computed, onMounted, ref, watch } from 'vue'
import useBook from '@/hooks/useBook';


const { bookName, books, loading, noMore, disabled, load, searchBook, handleDel, scoring, support } = useBook()

const openScoreBox = (bookId:string,idx:number) => {
    ElMessageBox.prompt('请输入更改图书评分', '图书评分', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern:
            /^(100|[1-9]?[0-9])$/,
        inputErrorMessage: '输入不合法请重新输入',
    })
        .then(({ value }: any) => {
            scoring(bookId,value,idx)
            ElMessage({
                type: 'success',
                message: `操作成功`,
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Input canceled',
            })
        })
}


</script>

<template>
    <div class=" flex flex-col h-full w-full">

        <!-- <div class=" px-5 ">
    <input class=" border shadow rounded-lg h-8" />
</div> -->

        <!-- <div class=" px-5 text-gray-500 italic">
    全部用户
</div> -->
        <div class=" flex  py-10 pl-10 shadow mb-5">
            <div class=" field w-96 shadow ">
                <input v-model="bookName" type="text" required autocomplete="off" id="password" class=" px-5">
                <label for="password" title="精确搜索" data-title="精确搜索"></label>

            </div>
            <!-- <div class=" flex justify-center items-center text-gray-500 px-5">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </div> -->
        </div>
        <div class=" flex-1 px-5 py-5 shadow-2xl  ">
            <div class="infinite-list-wrapper" style="overflow: auto">
                <ul v-infinite-scroll="load" class="list" :infinite-scroll-disabled="disabled">
                    <li v-for="item, idx in books" :key="idx" class="list-item rounded-md px-5">
                        <div class=" flex items-center">
                            <img class=" h-20 rounded-md" :src="'http://127.0.0.1:9000' + `${item.imgUrl}`">
                            <div class=" flex flex-col px-10 text-2xl">
                                <div class="  text-left text-box cursor-pointer text-gray-800">{{ item.bookName }}</div>
                                <div class=" flex justify-normal py-1  text-sm cursor-pointer text-gray-500 italic">book
                                    Id :{{ item.bookId }}</div>
                                <div class=" flex justify-normal text-sm cursor-pointer text-gray-500 italic">ISBN :{{
                    item.isbn
                }}</div>
                            </div>
                            <div class=" flex flex-col text-left">
                                <div class=" text-sm cursor-pointer py-1 text-gray-800 italic"> 作 者: {{ item.authorName
                                    }}</div>
                                <div class=" text-sm cursor-pointer py-1 text-gray-800 italic"> 字 数: {{ item.wordCount
                                    }}</div>
                                <div class=" text-sm cursor-pointer py-1 italic"> 喜 欢: {{ item.supportCount }}</div>
                            </div>
                            <div class=" flex ml-10  px-10 cursor-pointer ">
                                <div class=" text-sm pt-1 text-gray-800 italic"> 简 介: </div>
                                <div
                                    class="flex justify-start text-box-introduction pl-1 text-left text-gray-800 italic cursor-pointer">
                                    {{ item.introduction }}</div>
                            </div>
                            <div class=" flex flex-col">
                                <div class=" flex">
                                    <button @click="handleDel(item.bookId,idx)"
                                        class=" bg-white rounded-md cursor-pointer text-sm px-1 mx-1"> 下架 </button>
                                    <button @click="openScoreBox(item.bookId,idx)"
                                        class=" bg-white rounded-md cursor-pointer text-sm px-1 mx-1"> 评分</button>
                                    <button @click="support(item.bookId,item.supportCount - 666,idx)" class=" bg-white rounded-md cursor-pointer text-sm px-1 mx-1"> 喜欢
                                        -666</button>
                                    <button @click="support(item.bookId,item.supportCount + 666,idx)" class=" bg-white rounded-md cursor-pointer text-sm px-1 mx-1"> 喜欢
                                        +666</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <p v-if="loading" class=" my-6">Loading...</p>
                <p v-if="noMore" class=" my-6">No more</p>
            </div>
        </div>

    </div>
</template>

<style scoped>
.text-box {
    width: 300px;
    /* 定义盒子宽度 */
    white-space: nowrap;

    /* 以下是实现溢出显示...的关键CSS */
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
}

.text-box-introduction {
    width: 320px;
    overflow-wrap: break-word;
    /* 允许在单词内部断行 */
    white-space: normal;
    /* 文本自动换行 */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    /* 限制在4行内 */
    overflow: hidden;
    text-overflow: ellipsis;

}

.infinite-list-wrapper {
    height: 60vh;
    text-align: center;
}

.infinite-list-wrapper .list {
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list-wrapper .list-item {
    display: flex;
    align-items: center;
    height: 102px;
    background: var(--el-color-info-light-9);
    color: var(--el-color-danger);
}

.infinite-list-wrapper .list-item+.list-item {
    margin-top: 10px;
}
</style>
<script setup lang='ts'>
import { computed, ref } from 'vue'

const count = ref(10)
const loading = ref(false)
const noMore = computed(() => count.value >= 200)
const disabled = computed(() => loading.value || noMore.value)
const load = () => {
    loading.value = true
    setTimeout(() => {
        count.value += 2
        loading.value = false
    }, 2000)
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
            <div class=" field w-96 shadow">
                <input type="text" required autocomplete="off" id="password" class=" px-5">
                <label for="password" title="精确搜索" data-title="精确搜索"></label>

            </div>
            <div class=" flex justify-center items-center text-gray-500 px-5">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </div>
        </div>
        <div class=" flex-1 px-5 py-5 shadow-2xl  ">
            <div class="infinite-list-wrapper" style="overflow: auto">
                <ul v-infinite-scroll="load" class="list" :infinite-scroll-disabled="disabled">
                    <li v-for="i in count" :key="i" class="list-item rounded-md px-5">
                        <div class=" flex items-center">
                            <img class=" h-20 rounded-md"
                                src="http://127.0.0.1:9000/greate-works/778462743ec05f5f4cf3efab625330cd.jpeg">
                            <div class=" flex flex-col px-10 text-2xl">
                                <div class="text-box cursor-pointer text-gray-800">书名 dsadsadasd ad asdas a a a</div>
                                <div class=" flex justify-normal py-1  text-sm cursor-pointer text-gray-500 italic">book
                                    Id :{{ }}</div>
                                <div class=" flex justify-normal text-sm cursor-pointer text-gray-500 italic">ISBN :{{
                                    }}</div>
                            </div>
                            <div class=" flex flex-col">
                                <div class=" text-sm cursor-pointer py-1 text-gray-800 italic"> 作 者: {{ }}</div>
                                <div class=" text-sm cursor-pointer py-1 text-gray-800 italic"> 字 数: {{ }}</div>
                                <div class=" text-sm cursor-pointer py-1 italic"> 喜 欢: {{ }}</div>
                            </div>
                            <div class=" flex ml-10  px-10 ">
                                <div class=" text-sm pt-1 text-gray-800 italic"> 简 介: </div>
                                <div class="flex justify-start text-box-introduction pl-1 text-gray-800 italic">
                                    sdsadasdasdadasdasdadadada nidhsadhsadgasgdasdgafdagfda</div>
                            </div>
                            <div class=" flex flex-col">
                                <div class=" flex">
                                    <button class=" bg-white rounded-md cursor-pointer text-sm px-1 mx-1"> 下架 </button>
                                    <button class=" bg-white rounded-md cursor-pointer text-sm px-1 mx-1"> 推流</button>
                                    <button class=" bg-white rounded-md cursor-pointer text-sm px-1 mx-1"> HOT
                                        +1</button>
                                    <button class=" bg-white rounded-md cursor-pointer text-sm px-1 mx-1"> 喜欢
                                        +66</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <p v-if="loading">Loading...</p>
                <p v-if="noMore">No more</p>
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
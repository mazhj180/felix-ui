<script lang="ts" setup>
import emitter from '@/emitter';
import router from '@/router';
import {useBookStore} from '@/store/book'
import { onMounted, onUnmounted } from 'vue';
let bookStore = useBookStore()

onMounted(() => {
    emitter.emit('hide-head',true)
    bookStore.setCategories()
})

onUnmounted(() => {
    emitter.emit('hide-head',false)
})

const detail = (categoryId:string) => {
    router.push({name:'categoryDetail',params:{id:categoryId}})
}

</script>
<template>
    <div class="flex flex-wrap bg pb-12">
        <div v-for="(item,idx) in bookStore.categories" class="  mt-4 ml-4 ">
            <button @click="detail(item.categoryId)" class=" py-1 px-4 rounded-3xl bg-white shadow">{{ item.name }}</button>
        </div>
    </div>
    <div class="bg-gray-100"></div>
</template>
<style scoped>
    .bg {
        background: url(../../assets/category_bg.png);
    }
</style>
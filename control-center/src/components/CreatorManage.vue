<script setup lang='ts'>
import { computed, ref } from 'vue';

// true 已审查； false 待审查
const page = ref(true)
const done_active_class = computed(() => page.value ? ['active'] : [])
const didnt_active_class = computed(() => page.value ? [] : ['active'])
</script>

<template>
    <div class=" flex flex-col">
        <div class=" flex">
            <div @click="page = true" class="text-gray-600 whitespace-nowrap px-2 py-2 cursor-pointer"
                :class="done_active_class">已审查</div>
            <div @click="page = false" class="text-gray-600 whitespace-nowrap px-2 py-2 cursor-pointer"
                :class="didnt_active_class">待审查</div>
        </div>
        <div>
            <WaitReview></WaitReview>
        </div>
    </div>
</template>

<style scoped>
.active {
    --tw-text-opacity: 1;
    color: rgb(239 68 68 / var(--tw-text-opacity));
    font-weight: 600;
    transform: scale(1.20);
    -ms-transform: rotate(0.97);
    /* IE 9 */
    -moz-transform: rotate(0.97);
    /* Firefox */
    -webkit-transform: rotate(0.97);
    /* Safari 和 Chrome */
    -o-transform: rotate(0.97);
    /* Opera */
}
</style>
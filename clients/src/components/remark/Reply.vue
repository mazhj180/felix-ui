<script setup lang='ts'>
import emitter from '@/emitter';
import { onMounted, reactive, ref } from 'vue';


const props = defineProps({
    flag:String,
    who:String,
})

const inputVal = ref<string>('')

const submitBody = reactive({
    rootRemarkId:0,
    replyRemarkId:0,
    replyUser:props.who,
    nickName:localStorage.getItem('nickName'),
    content:inputVal.value
})

const review = () => {

}

// const inputRef = ref<HTMLElement | null>(null)

// onMounted(() => {
//     console.log(inputRef)
//     inputRef.value?.focus()
// })

// onMounted(() => {
//     emitter.on('')
// })

</script>

<template>
    <div class=" flex flex-col " >
        <div class=" flex w-auto">
            <div class="">
                {{ flag }}
            </div>
            <div v-if="who" class=" px-1 text-sm text-blue-500"> @{{ who }}</div>
            <div class=" flex-1"></div>
        </div>
        
        <div class=" flex w-auto">
            <input v-model="inputVal" class=" py-2 h-16 w-80" ref="inputRef" type="text" placeholder="wifi连接中...." />
        </div>
        <div @click="review" class=" flex justify-end">
            <el-button plain>发布</el-button>
        </div>
    </div>
</template>

<style scoped>

</style>
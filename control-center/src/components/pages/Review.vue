<script setup lang='ts'>
import { getWorkDoc } from '@/api/api';
import { onMounted, onUnmounted, ref } from 'vue';
import * as mammoth from 'mammoth';

const content = ref<string>('')
const props = defineProps({
    workUrl:String
})

onMounted( async () => {
    if(props.workUrl) {
        const arrayBuffer = await getWorkDoc(props.workUrl)
        const result = await mammoth.convertToHtml({ arrayBuffer })
        content.value = result.value
    }
})

onUnmounted(() => {
    content.value = ''
})

</script>

<template>
    <div v-html="content">
    </div>
</template>
<style scoped>
    
</style>
<script setup lang='ts'>
import emitter from '@/emitter';
import useTopic from '@/hooks/useTopic';
import router from '@/router';
import { onMounted, onUnmounted, ref } from 'vue';


const { topics, getTopics } = useTopic()
const hideTopic = ref<boolean>(false)

onMounted(() => {
    getTopics()
    emitter.on('hide-topic',(value:any) => {
        hideTopic.value = value
    })
    
})

onUnmounted(() => {
    emitter.off('submit')
})


const goDetail = (idx:number) => {
    hideTopic.value = true
    router.push({
        name:'topic-detail',
        query:topics[idx]
    })
}

</script>

<template>
    <div class="">
        <!-- Content list -->
        <div v-if="!hideTopic" class="">
            <!-- List item -->
            <div v-for=" item, idx in topics" @click="goDetail(idx)" class="flex items-center justify-between bg-white p-2 mb-2 rounded">
                <div class="flex items-center">
                    <!-- <img :src="item.imgUrl" :alt=" item.topicName" class="rounded mr-2"> -->
                    <div>
                        <div class="text-sm font-medium">{{ item.topicName }}</div>
                        <div class="text-xs text-gray-500">{{ item.remarkCount }}条评论 · 接敌了21.7万人的节奏</div>
                    </div>
                </div>
                <div class=" text-xs text-gray-400">x</div>
            </div>

            <!-- List item -->
            <div class="flex items-center justify-between bg-white p-2 mb-2 rounded">
                <div class="flex items-center">
                    <div>
                        <div class="text-sm font-medium">我们要为中华之崛起而读书</div>
                        <div class="text-xs text-gray-500">3016个帖子 · 接敌了132.0万人的节奏</div>
                    </div>
                </div>
                <div class="text-xs text-gray-400">x</div>
            </div>

            <!-- List item -->
            <div class="flex items-center justify-between bg-white p-2 mb-2 rounded">
                <div class="flex items-center">
                    <div>
                        <div class="text-sm font-medium">Felix 10.0的神作</div>
                        <div class="text-xs text-gray-500">9740个帖子 · 接敌了414.2万人的节奏</div>
                    </div>
                </div>
                <div class="text-xs text-gray-400">x</div>
            </div>

            <!-- List item -->
            <div class="flex items-center justify-between bg-white p-2 mb-2 rounded">
                <div class="flex items-center">
                    <div>
                        <div class="text-sm font-medium">紫菜包饭x的书，那些歌我唱的，就不要来拆台好</div>
                        <div class="text-xs text-gray-500">1631个帖子 · 接敌了42万人的节奏</div>
                    </div>
                </div>
                <div class="text-xs text-gray-400">x</div>
            </div>

            <!-- List item -->
            <div class="flex items-center justify-between bg-white p-2 mb-2 rounded">
                <div class="flex items-center">
                    <div>
                        <div class="text-sm font-medium">紫菜知识的书</div>
                        <div class="text-xs text-gray-500">607个帖子 · 接敌了16.3万人的节奏</div>
                    </div>
                </div>
                <div class="text-xs text-gray-400">x</div>
            </div>

            <!-- List item -->
            <div class="flex items-center justify-between bg-white p-2 mb-2 rounded">
                <div class="flex items-center">
                    <div>
                        <div class="text-sm font-medium">求男漫高分漫爱文！！天刀姐到底谁演那种！！</div>
                        <div class="text-xs text-gray-500">489个帖子 · 接敌了5.3万人的节奏</div>
                    </div>
                </div>
                <div class="text-xs text-gray-400">x</div>
            </div>

            <!-- List item -->
            <div class="flex items-center justify-between bg-white p-2 mb-2 rounded">
                <div class="flex items-center">
                    <div>
                        <div class="text-sm font-medium">来人爱文！！都市+神豪+无敌文！</div>
                        <div class="text-xs text-gray-500">1068个帖子 · 接敌了84.0万人的节奏</div>
                    </div>
                </div>
                <div class="text-xs text-gray-400">x</div>
            </div>

            <!-- List item -->
            <div class="flex items-center justify-between bg-white p-2 mb-2 rounded">
                <div class="flex items-center">
                    <div>
                        <div class="text-sm font-medium">一月下旬最火的书籍排行榜！</div>
                        <div class="text-xs text-gray-500">68人对这个话题感兴趣，你可以对这</div>
                    </div>
                </div>
                <div class="text-xs text-gray-400">x</div>
            </div>
        </div>
    </div>    
    <RouterView v-if="hideTopic"></RouterView>
</template>

<style scoped>

</style>
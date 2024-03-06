<script setup lang='ts'>

</script>

<template>
     <!-- Carousel -->
     <div class="mb-8">
        <div class="relative">
            <div class="overflow-hidden rounded-lg">
                <img class="w-full" src="https://placehold.co/600x200" alt="Placeholder image for carousel" />
            </div>
            <div class="absolute inset-0 flex justify-between items-center px-4">
                <button class="text-white" onclick="prevSlide()">&#10094;</button>
                <button class="text-white" onclick="nextSlide()">&#10095;</button>
            </div>
        </div>
    </div>
    <!-- Study con-->
    <div class="text-gray-600 text-sm mb-2">
        学习角 >
    </div>
    <div class=" flex overflow-x-auto no-scrollbar space-x-4">
        <div class="bg-white p-2 rounded-lg flex-shrink-0 shadow">
            <img alt="Placeholder image of a book cover with a fantasy theme" class="  h-32 w-24 object-cover rounded-lg"
                src="https://placehold.co/100x140" />
            <div class="mt-2">
                <div class="w-24  text-red-500 text-sm">
                    魔法dadsad
                </div>
                <div class="w-24  text-gray-500 text-xs">
                    奇幻大师 • 8万次阅读
                </div>
            </div>
        </div>
        <div class="bg-white p-2 rounded-lg flex-shrink-0">
            <img alt="Placeholder image of a book cover with a fantasy theme"
                class=" shadow  h-32 w-24 object-cover rounded-lg" src="https://placehold.co/100x140" />
            <div class="mt-2">
                <div class="w-24  text-red-500 text-sm">
                    魔法dadsad
                </div>
                <div class="w-24  text-gray-500 text-xs">
                    奇幻大师 • 8万次阅读
                </div>
            </div>
        </div>
        <div class="bg-white p-2 rounded-lg flex-shrink-0">
            <img alt="Placeholder image of a book cover with a fantasy theme" class="  h-32 w-24 object-cover rounded-lg"
                src="https://placehold.co/100x140" />
            <div class="mt-2">
                <div class="w-24  text-red-500 text-sm">
                    魔法dadsad
                </div>
                <div class="w-24  text-gray-500 text-xs">
                    奇幻大师 • 8万次阅读
                </div>
            </div>
        </div>
        <div class="bg-white p-2 rounded-lg flex-shrink-0">
            <img alt="Placeholder image of a book cover with a fantasy theme" class="  h-32 w-24 object-cover rounded-lg"
                src="https://placehold.co/100x140" />
            <div class="mt-2">
                <div class="w-24  text-red-500 text-sm">
                    魔法dadsad
                </div>
                <div class="w-24  text-gray-500 text-xs">
                    奇幻大师 • 8万次阅读
                </div>
            </div>
        </div>
        <div class="bg-white p-2 rounded-lg flex-shrink-0">
            <img alt="Placeholder image of a book cover with a fantasy theme" class="  h-32 w-24 object-cover rounded-lg"
                src="https://placehold.co/100x140" />
            <div class="mt-2">
                <div class="w-24  text-red-500 text-sm">
                    魔法dadsad
                </div>
                <div class="w-24  text-gray-500 text-xs">
                    奇幻大师 • 8万次阅读
                </div>
            </div>
        </div>
        <div class="bg-white p-2 rounded-lg flex-shrink-0">
            <img alt="Placeholder image of a book cover with a fantasy theme" class="  h-32 w-24 object-cover rounded-lg"
                src="https://placehold.co/100x140" />
            <div class="mt-2">
                <div class="w-24  text-red-500 text-sm">
                    魔法dadsad
                </div>
                <div class="w-24  text-gray-500 text-xs">
                    奇幻大师 • 8万次阅读
                </div>
            </div>
        </div>
        <div class="bg-white p-2 rounded-lg flex-shrink-0">
            <img alt="Placeholder image of a book cover with a fantasy theme" class="  h-32 w-24 object-cover rounded-lg"
                src="https://placehold.co/100x140" />
            <div class="mt-2">
                <div class="w-24  text-red-500 text-sm">
                    魔法dadsad
                </div>
                <div class="w-24  text-gray-500 text-xs">
                    奇幻大师 • 8万次阅读
                </div>
            </div>
        </div>
        <div class="bg-white p-2 rounded-lg flex-shrink-0">
            <img alt="Placeholder image of a book cover with a fantasy theme" class="  h-32 w-24 object-cover rounded-lg"
                src="https://placehold.co/100x140" />
            <div class="mt-2">
                <div class="w-24  text-red-500 text-sm">
                    魔法dadsad
                </div>
                <div class="w-24  text-gray-500 text-xs">
                    奇幻大师 • 8万次阅读
                </div>
            </div>
        </div>
    </div>
    <!-- 字里行间-->
    <div class="text-gray-600 text-sm mb-2 mt-8">
        字里行间 >
    </div>
    <div class="flex overflow-x-auto no-scrollbar space-x-4">
        <div class="bg-white p-2 rounded-lg flex-shrink-0 shadow w-4/5 h-48">
            <div class=" flex items-center h-3/5 p-2 border-b border-gray-50 ">安欣想了想，说：“所有的决定都是人在当下处境里所能做出的最好选择。”</div>
            <div class=" flex mt-1 h-2/5">
                <img alt="Placeholder image of a book cover with dark and mysterious elements" class=" w-1/6  object-cover rounded-lg " src="https://placehold.co/100x140" />
                <div class=" flex-1 p-2">
                    <div class=" text-sm">狂飙</div>
                    <div class=" text-xs text-gray-500 mt-1">aaaaa</div>
                </div>
                <div class=" flex justify-center items-center w-1/12 text-xl text-gray-200">|</div>
                <div class=" flex flex-col justify-center w-1/6 ">
                    <font-awesome-icon class=" text-red-400" :icon="['far', 'heart']" />
                    <div class=" flex justify-center text-xs text-red-400 mt-2"> 666</div>
                </div>
            </div>
        </div>
        <div class="bg-white p-2 rounded-lg flex-shrink-0 shadow w-4/5 h-48">
            <div class=" flex items-center h-3/5 p-2 border-b border-gray-50 ">“这就像治牙一样，不想治的时候，就尽量往后拖，拖到后来知道没法再拖了，就一口气全给治了。”</div>
            <div class=" flex mt-1 h-2/5">
                <img alt="Placeholder image of a book cover with dark and mysterious elements" class=" w-1/6 h-full object-cover rounded-lg " src="https://placehold.co/100x140" />
                <div class=" flex-1 p-2">
                    <div class=" text-sm">消失的13级台阶</div>
                    <div class=" text-xs text-gray-500 mt-1">aaaaa</div>
                </div>
                <div class=" flex justify-center items-center w-1/12 text-xl text-gray-200">|</div>
                <div class=" flex flex-col justify-center w-1/6 ">
                    <font-awesome-icon class=" text-red-400" :icon="['far', 'heart']" />
                    <div class=" flex justify-center text-xs text-red-400 mt-2"> 666</div>
                </div>
            </div>
        </div>
        <div class="bg-white p-2 rounded-lg flex-shrink-0 shadow w-4/5 h-48">
            <div class=" flex items-center h-3/5 p-2 border-b border-gray-50 ">“就算失败，我也想知道，自己倒在距离终点多远的地方。”</div>
            <div class=" flex mt-1 h-2/5">
                <img alt="Placeholder image of a book cover with dark and mysterious elements" class=" w-1/6 h-full object-cover rounded-lg " src="https://placehold.co/100x140" />
                <div class=" flex-1 p-2">
                    <div class=" text-sm">长安的荔枝</div>
                    <div class=" text-xs text-gray-500 mt-1">马伯庸 · 文学小说</div>
                </div>
                <div class=" flex justify-center items-center w-1/12 text-xl text-gray-200">|</div>
                <div class=" flex flex-col justify-center w-1/6 ">
                    <font-awesome-icon class=" text-red-400" :icon="['far', 'heart']" />
                    <div class=" flex justify-center text-xs text-red-400 mt-2"> 666</div>
                </div>
            </div>
        </div>
    </div>
   
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    /* for Internet Explorer, Edge */
    scrollbar-width: none;
    /* for Firefox */
}
</style>
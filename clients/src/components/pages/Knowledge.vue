<script setup lang="ts">

</script>

<template>
  <div class="grid grid-cols-2 gap-4">
      <!-- Repeat for each guess you like item -->
      <div class="bg-white p-2 rounded-lg">
        <img alt="Placeholder image of a book cover with a romantic theme" class="w-full h-36 object-cover rounded-lg" src="https://placehold.co/100x140" />
        <div class="mt-2">
          <div class="text-red-500 text-sm">
            爱情故事集1
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
            魔法世界探险1
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
            魔法世界探险2
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
</template>

<style scoped>
  .wrapper{
    display: grid;
    grid-template-columns: repeat(2,minmax(0, 1fr));
  }
</style>

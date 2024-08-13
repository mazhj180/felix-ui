<script lang="ts" setup>

</script>

<template>
  <!-- Bottom navigation -->
  <div class="inset-x-0 bottom-0 bg-white py-2 fixed-bottom border-t">
    <div class="flex justify-around">
      <router-link to="/home" class="text-gray-600" active-class=" active" exact>书城</router-link>
      <router-link to="/category" class="text-gray-600" active-class=" active" >分类</router-link>
      <router-link to="/bookshelf" class="text-gray-600" active-class=" active">书架</router-link>
      <router-link to="/mine" class="text-gray-600" active-class=" active">我的</router-link>
    </div>
  </div>
</template>

<style scoped>
  .fixed-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10; /* 确保它在页面上其他元素之上 */
    background-color: white; /* 或者任何您想要的背景色 */
  }
  .active {
    --tw-text-opacity: 1;
    color: rgb(239 68 68 / var(--tw-text-opacity));
    transform:scale(1.30);
    -ms-transform:rotate(0.97); 	/* IE 9 */
    -moz-transform:rotate(0.97); 	/* Firefox */
    -webkit-transform:rotate(0.97); /* Safari 和 Chrome */
    -o-transform:rotate(0.97); 	/* Opera */
  }
</style>
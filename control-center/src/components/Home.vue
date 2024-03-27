<script setup lang='ts'>

import 'element-plus/theme-chalk/base.css';
import 'element-plus/theme-chalk/el-message-box.css';

import { reactive, watch } from 'vue'
import UserManage from './UserManage.vue';
import HomePage from './HomePage.vue';
import UIManage from './UIManage.vue';
import BookManage from './BookManage.vue';
import CreatorManage from './CreatorManage.vue';

const font = reactive({
  color: 'rgba(0, 0, 0, 0.15)',
})

const waterMark = reactive(['马峥吉','mazhj180'])

</script>

<template>

    <!-- <div class=" flex border h-full">
        <div class=""></div>
    </div> -->


    <el-tabs type="border-card" class=" h-full">
        <el-tab-pane label="首页" class=" ">
            <HomePage />
        </el-tab-pane>
        <el-tab-pane label="用户管理" class=" ">
            <el-watermark :font="font" :content="waterMark" class="h-full">
                <UserManage />
            </el-watermark>
            
        </el-tab-pane>
        <el-tab-pane label="图书管理">
            <el-watermark :font="font" :content="waterMark" class="h-full">
                <BookManage />
            </el-watermark>

        </el-tab-pane>
        <el-tab-pane label="创作者管理">
            <CreatorManage/>
        </el-tab-pane>
        <el-tab-pane label="UI页面管理">
            <UIManage></UIManage>
        </el-tab-pane>
    </el-tabs>


    <!-- <el-tabs tab-position="left" class=" h-full">
    <el-tab-pane label="User">User</el-tab-pane>
    <el-tab-pane label="Config">Config</el-tab-pane>
    <el-tab-pane label="Role">Role</el-tab-pane>
    <el-tab-pane label="Task">Task</el-tab-pane>
  </el-tabs> -->
</template>

<style scoped></style>
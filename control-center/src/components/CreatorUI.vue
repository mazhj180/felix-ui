<script lang="ts" setup>
import { ref } from 'vue'
import { preview } from 'v-preview-image';
import useGreatWork from '@/hooks/useGreatWork';
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'

import debounce from '@/utils/debounce';


const { items } = useGreatWork()

const delItems: number[] = []
const syncFunc = function (): void {
  console.log("sync")
}
const syncDebounce = debounce(syncFunc, 5000)

const delImage = (idx: number) => {
  delItems.push(items[idx].id)
  items.splice(idx, 1)
  syncDebounce()
}

import type { UploadProps, UploadUserFile, UploadRequestOptions } from 'element-plus'

const dialogImageUrl = ref('')
const fileList = ref<UploadUserFile[]>([]);



const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
  console.log("@@@", fileList)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  preview(uploadFile.url)
}

const upload = (uploadFile: UploadRequestOptions) => {
  const formData = new FormData();
  formData.append('file', uploadFile.file as File);
  console.log("upload", formData)
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

//弹出轮播图


</script>

<template>
  <div class=" flex flex-col px-10 overflow-y-auto">
    <div class=" flex py-5">
      <div class="cursor-pointer  text-gray-500 italic">首页轮播图</div>
      <div class=" flex flex-1 justify-end cursor-pointer">
        <el-popover placement="bottom-end" :width="800" trigger="click" class=" bg-gray-50">
          <template #reference>
            <!-- <el-button style="margin-right: 16px">Click to activate</el-button> -->
            <el-icon :size="20" class=" cursor-pointer mx-2 " @click="">
              <ZoomIn />
            </el-icon>
          </template>
          <div class="">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in 6" :key="item">
                <img class=" h-full w-full"
                  src="http://127.0.0.1:9000/greate-works/19a98e88fde961700fb8fa0d7615271c~tplv-noop.png">
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-popover>

        <el-icon :size="20" class=" cursor-pointer mx-2" @click="">
          <Plus />
        </el-icon>
      </div>
    </div>
    <div>
      <el-table :data="tableData" height="250" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
        <el-table-column fixed="right" label="Operations">
          <template #default>
            <el-icon :size="20" class=" cursor-pointer mx-2" @click="">
              <ZoomIn />
            </el-icon>
            <el-icon :size="20" class=" cursor-pointer mx-2" @click="">
              <Delete />
            </el-icon>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <div style="display: flex; align-items: center">


      <!-- <el-popover :width="300"
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">
        <template #reference>
          <el-avatar src="https://avatars.githubusercontent.com/u/72015883?v=4" />
        </template>
        <template #default>
          <div class="demo-rich-conent" style="display: flex; gap: 16px; flex-direction: column">
            <el-avatar :size="60" src="https://avatars.githubusercontent.com/u/72015883?v=4"
              style="margin-bottom: 8px" />
            <div>
              <p class="demo-rich-content__name" style="margin: 0; font-weight: 500">
                Element Plus
              </p>
              <p class="demo-rich-content__mention" style="margin: 0; font-size: 14px; color: var(--el-color-info)">
                @element-plus
              </p>
            </div>

            <p class="demo-rich-content__desc" style="margin: 0">
              Element Plus, a Vue 3 based component library for developers,
              designers and product managers
            </p>
          </div>
        </template>
      </el-popover> -->
    </div>
    <!-- 字里行间 -->
    <div class=" flex py-5">
      <div class="cursor-pointer  text-gray-500 italic">字里行间</div>
      <div class=" flex flex-1 justify-end cursor-pointer">
        <el-popover placement="bottom-end" :width="800" trigger="click" class=" bg-gray-50">
          <template #reference>
            <!-- <el-button style="margin-right: 16px">Click to activate</el-button> -->
            <el-icon :size="20" class=" cursor-pointer mx-2 " @click="">
              <ZoomIn />
            </el-icon>
          </template>
          <div class="">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in 6" :key="item">
                <img class=" h-full w-full"
                  src="http://127.0.0.1:9000/greate-works/19a98e88fde961700fb8fa0d7615271c~tplv-noop.png">
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-popover>

        <el-icon :size="20" class=" cursor-pointer mx-2" @click="">
          <Plus />
        </el-icon>
      </div>
    </div>
    <div class="flex space-x-2  px-2 overflow-x-auto no-scrollbar ">
      <div class=" image-container" v-for="(item, idx) in items">
        <img class=" rounded-md  cursor-pointer " style="height: 96px;" :src="item.content">
        <div class="overlay rounded-md">
          <el-icon :size="20" class=" cursor-pointer mx-2 " @click="preview(item.content)">
            <ZoomIn />
          </el-icon>
          <el-icon :size="20" class=" cursor-pointer mx-2" @click="delImage(idx)">
            <Delete />
          </el-icon>
        </div>
      </div>
    </div>

    <!-- 经典好书 -->
    <div class=" flex py-5">
      <div class="cursor-pointer  text-gray-500 italic">精选好书</div>
      <div class=" flex flex-1 justify-end cursor-pointer">
        <el-popover placement="bottom-end" :width="800" trigger="click" class=" bg-gray-50">
          <template #reference>
            <!-- <el-button style="margin-right: 16px">Click to activate</el-button> -->
            <el-icon :size="20" class=" cursor-pointer mx-2 " @click="">
              <ZoomIn />
            </el-icon>
          </template>
          <div class="">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in 6" :key="item">
                <img class=" h-full w-full"
                  src="http://127.0.0.1:9000/greate-works/19a98e88fde961700fb8fa0d7615271c~tplv-noop.png">
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-popover>

        <el-icon :size="20" class=" cursor-pointer mx-2" @click="">
          <Plus />
        </el-icon>
      </div>
    </div>
    <div class="flex space-x-2  px-2 overflow-x-auto no-scrollbar ">
      <div class=" flex border p-1 rounded-lg" v-for="(item, idx) in items">
        <div class=" image-container">
          <img class=" rounded-md  cursor-pointer " style="height: 96px;" :src="item.content">
          <div class="overlay rounded-md">
            <el-icon :size="20" class=" cursor-pointer mx-2 " @click="preview(item.content)">
              <ZoomIn />
            </el-icon>
            <el-icon :size="20" class=" cursor-pointer mx-2" @click="delImage(idx)">
              <Delete />
            </el-icon>
          </div>
        </div>
        <div class=" flex flex-col cursor-pointer px-1" >
          <div class=" text-box">
            sdsad你是打算的啊
          </div>
          <div class=" text-gray-500 text-xs text-box-introduction"> sddsadsadasdsadsadadasdassdadasdasadsadaasdadasdadsadahsadhsjadhisahdsahda </div>
        </div>
      </div>
    </div>
    <div class="flex cursor-pointer py-5 text-gray-500 italic">
      精选好书
    </div>
    <div class="flex space-x-2  px-2 overflow-x-auto no-scrollbar ">
      <div class=" image-container" v-for="(item, idx) in items">
        <img class=" rounded-md  cursor-pointer " style="height: 96px;" :src="item.content">
        <div class="overlay rounded-md">
          <el-icon :size="20" class=" cursor-pointer mx-2 " @click="preview(item.content)">
            <ZoomIn />
          </el-icon>
          <el-icon :size="20" class=" cursor-pointer mx-2" @click="delImage(idx)">
            <Delete />
          </el-icon>
        </div>
      </div>
    </div>

    <div class=" flex cursor-pointer py-5 text-gray-500 italic">
      优秀作品
    </div>
    <div class=" flex space-x-2  px-2 overflow-x-auto no-scrollbar ">
      <div class=" image-container" v-for="(item, idx) in items">
        <img class=" rounded-md  cursor-pointer " style="height: 96px;" :src="item.content">
        <div class="overlay rounded-md">
          <el-icon :size="20" class=" cursor-pointer mx-2 " @click="preview(item.content)">
            <ZoomIn />
          </el-icon>
          <el-icon :size="20" class=" cursor-pointer mx-2" @click="delImage(idx)">
            <Delete />
          </el-icon>
        </div>
      </div>

      <div class=" flex  m-0 ">
        <el-upload class=" my-upload" action="#" list-type="picture-card" :auto-upload="true" :file-list="fileList"
          :on-remove="handleRemove" :on-preview="handlePictureCardPreview" :http-request="upload">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
      </div>
    </div>
  </div>

</template>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  /* for Internet Explorer, Edge */
  scrollbar-width: none;
  /* for Firefox */
}

/* 遮罩层 */

.image-container {
  position: relative;
  width: 72px;
  /* 或根据你的需求设置宽度 */
  height: 98px;
  /* 或根据你的需求设置高度 */
}

.image-container img {
  width: 100%;
  height: 100%;
  display: block;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  /* 半透明的黑色遮罩层 */
  color: white;
  /* 文本颜色 */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  /* 初始时不显示遮罩层 */
  transition: opacity 0.5s ease;
  /* 平滑的过渡效果 */
}

.image-container:hover .overlay {
  opacity: 1;
  /* 鼠标悬停时显示遮罩层 */
}


.el-upload-list {
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  width: 72px;
  height: 97px;
  line-height: 97px;

}

.el-upload-list--picture-card {
  display: inline-flex;
  flex-wrap: nowrap;
}

.el-upload--picture-card {
  height: 97px !important;
  width: 72px !important;
  background-color: var(--el-fill-color-lighter);
  border-radius: 0.375rem;
  border: 1px dashed var(--el-border-color-darker);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
}

.el-upload-list--picture-card .el-upload-list__item {
  overflow: hidden;
  background-color: var(--el-fill-color-blank);
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
  box-sizing: border-box;
  width: 72px;
  height: 97px;
  margin: 0 7px 7px 0;
  padding: 0;
  display: inline-flex;
  flex-shrink: 0;
}

.el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.el-upload-list__item-actions {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: var(--el-overlay-color-lighter);
  transition: opacity var(--el-transition-duration);
}

/** 轮播图 */
.el-carousel__item h3 {
  /* color: #475669; */
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */

/** 文本 */
.text-box {
    width: 120px; /* 定义盒子宽度 */
    white-space: nowrap; 
    
    /* 以下是实现溢出显示...的关键CSS */
    overflow: hidden;
    text-overflow: ellipsis;
    display: block; 
  }

.text-box-introduction {
  width: 120px;
  overflow-wrap: break-word; /* 允许在单词内部断行 */
  white-space: normal; /* 文本自动换行 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4; /* 限制在4行内 */
  overflow: hidden;
  text-overflow: ellipsis;
  
}
</style>
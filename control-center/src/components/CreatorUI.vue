<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { preview } from 'v-preview-image';
import useGreatWork from '@/hooks/useGreatWork';
import useWordLine, { type wordLineContent } from '@/hooks/useWordLine';
import useSlideshow from '@/hooks/useSlideshow';
import useGoodBooks, { type goodBookContent } from '@/hooks/useGoodBooks';
import useDraw from '@/hooks/useDraw';
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import { FormTarget } from '@/hooks/useDraw';
import { UploadFilled } from '@element-plus/icons-vue'



const { greatWorks, uploadGreatWork, delGreatWorks, handlePictureCardPreview, handleRemove } = useGreatWork()

const { wordLineItems, wordLineFormData, delWordLine, addWordLine } = useWordLine()

const { slideshows, delSlideshow, uploadSlideshowRef, openUploadSlideshowDraw } = useSlideshow()

const { goodBooks, goodBooksFormData, delGoodBook, addGoodBook } = useGoodBooks()

const { drawerRef, dialog, loading, cancelForm, closeDraw, submitForm, handleChange } = useDraw()

const flag = ref<FormTarget>(FormTarget.GOOD_BOOKS)

const clickGoodBooks = () => {
  flag.value = FormTarget.GOOD_BOOKS
  dialog.value = true
}

const clickWordLine = () => {
  flag.value = FormTarget.WORD_LINE
  dialog.value = true
}

const minio_host = ref<string>(import.meta.env.VITE_MINIO_HOST)

const submitDraw = async (data:wordLineContent|goodBookContent) => {
   if(await submitForm(data)){
      if(flag.value == FormTarget.GOOD_BOOKS) {
        goodBooks.unshift(data as any)
        goodBooks[0].contents = JSON.parse(goodBooks[0].content)
      } else if (flag.value == FormTarget.WORD_LINE) {
        wordLineItems.unshift(data as any)
        wordLineItems[0].contents = JSON.parse(wordLineItems[0].content)
      }
    }
}


</script>

<template>
  <div class=" flex flex-col px-10 overflow-y-auto">

    <div class=" flex flex-col py-5 ">
      <div class=" flex cursor-pointer py-5 text-gray-500 italic">
        优秀作品
      </div>
      <div class=" flex space-x-2  px-2 overflow-x-auto no-scrollbar ">
        <div class=" image-container" v-for="(item, idx) in greatWorks">
          <img class=" rounded-md  cursor-pointer " style="height: 96px;" :src="item.content">
          <div class="overlay rounded-md">
            <el-icon :size="20" class=" cursor-pointer mx-2 " @click="preview(item.content)">
              <ZoomIn />
            </el-icon>
            <el-icon :size="20" class=" cursor-pointer mx-2" @click="delGreatWorks(idx)">
              <Delete />
            </el-icon>
          </div>
        </div>
        <div class=" flex  m-0 ">
          <el-upload class=" my-upload" action="#" list-type="picture-card" :auto-upload="true"
            :on-remove="handleRemove" :on-preview="handlePictureCardPreview" :http-request="uploadGreatWork">
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
        </div>
      </div>
    </div>

    <!-- 轮播图 slideshow -->
    <div class=" flex flex-col py-5 border-b">
      <div class=" flex py-5">
        <div class="cursor-pointer  text-gray-500 italic">轮播图</div>
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
                <el-carousel-item v-for="item in slideshows" :key="item.id">
                  <img class=" h-full w-full" :src="item.content">
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-popover>

          <el-icon :size="20" class=" cursor-pointer mx-2" @click="openUploadSlideshowDraw()">
            <input type="file" class=" hidden" ref="uploadSlideshowRef" />
            <Plus />
          </el-icon>
        </div>
      </div>
      <div class="">
        <el-table :data="slideshows" height="250" style="width: 100%">
          <el-table-column>
            <template #default="scope">
              <el-avatar @click="preview(scope.row.content)" shape="square" :size="35" :src="scope.row.content" />
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="280" />
          <el-table-column prop="componentName" label="名称" width="280" />
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-icon :size="20" class=" cursor-pointer mx-2" @click="preview(scope.row.content)">
                <ZoomIn />
              </el-icon>
              <el-icon :size="20" class=" cursor-pointer mx-2" @click="delSlideshow(scope.row.id, scope.$index)">
                <Delete />
              </el-icon>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>



    <!-- 经典好书 -->
    <div class=" flex flex-col py-5 mt-5">
      <div class=" flex py-5">
        <div class="cursor-pointer  text-gray-500 italic">精选好书</div>
        <div class=" flex flex-1 justify-end cursor-pointer">
          <el-icon :size="20" class=" cursor-pointer mx-2" @click="clickGoodBooks">
            <Plus />
          </el-icon>
        </div>
      </div>
      <div class="flex space-x-2  px-2 overflow-x-auto no-scrollbar ">
        <div class=" flex border p-1 rounded-lg" v-for="(item, idx) in goodBooks">
          <div class=" image-container">
            <img class=" rounded-md  cursor-pointer " style="height: 96px;"
              :src="minio_host + item.contents?.image">
            <div class="overlay rounded-md">
              <el-icon :size="20" class=" cursor-pointer mx-2 "
                @click="preview(minio_host+ item.contents?.image)">
                <ZoomIn />
              </el-icon>
              <el-icon :size="20" class=" cursor-pointer mx-2" @click="delGoodBook(item.id, idx)">
                <Delete />
              </el-icon>
            </div>
          </div>
          <div class=" flex flex-col cursor-pointer px-1">
            <div class=" text-box">
              {{ item.contents?.name }}
            </div>
            <div class=" text-gray-500 text-xs text-box-introduction">
              {{ item.contents?.introduce }} </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 字里行间 -->
    <div class=" flex flex-col py-5 mt-5">
      <div class=" flex py-5">
        <div class="cursor-pointer  text-gray-500 italic">字里行间</div>
        <div class=" flex flex-1 justify-end cursor-pointer">
          <el-icon :size="20" class=" cursor-pointer mx-2" @click="clickWordLine">
            <!-- <input type="file" class=" hidden" ref="uploadSlideshowRef" /> -->
            <Plus />
          </el-icon>
        </div>
      </div>
      <div class="flex overflow-x-auto no-scrollbar space-x-4">
        <div v-for="item, idx in wordLineItems"
          class=" border  bg-white p-2 rounded-lg flex-shrink-0 shadow w-3/5 h-48">
          <div class=" flex items-center h-3/5 p-2 border-b border-gray-50 ">{{ item.contents?.word }}</div>
          <div class=" flex mt-1 h-2/5 px-2">
            <img alt="Placeholder image of a book cover with dark and mysterious elements"
              class=" w-1/12  object-cover rounded-lg " :src="minio_host + item.contents?.image" />
            <div class=" flex-1 p-2">
              <div class=" text-sm">{{ item.contents?.name }}</div>
              <div class=" text-xs text-gray-500 mt-1">{{ item.contents?.info }}</div>
            </div>
            <div class=" flex justify-center items-center w-1/12 text-xl text-gray-200">|</div>
            <div class=" flex flex-col justify-center w-1/6 ">
              <el-icon :size="20" class=" cursor-pointer mx-6" @click="delWordLine(item.id, idx)">
                <Delete />
              </el-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <el-drawer ref="drawerRef" v-model="dialog" :title="flag == FormTarget.GOOD_BOOKS ? '添加精选图书' : '添加字里行间'"
    :before-close="closeDraw" direction="ltr" class="demo-drawer">
    <div class="demo-drawer__content">
      <el-form :model="wordLineFormData" v-if="flag == FormTarget.WORD_LINE">
        <el-form-item label="" label-width="">
          <el-input v-model="wordLineFormData.name" autocomplete="off" placeholder="图书名称" />
        </el-form-item>
        <el-form-item label="" label-width="">
          <el-input v-model="wordLineFormData.info" autocomplete="off" placeholder="图书信息" />
        </el-form-item>
        <el-form-item label="" label-width="">
          <el-input v-model="wordLineFormData.word" type="textarea" autocomplete="off" placeholder="文章摘抄" />
        </el-form-item>
      </el-form>

      <el-form :model="goodBooksFormData" v-if="flag == FormTarget.GOOD_BOOKS">
        <el-form-item label="" label-width="">
          <el-input v-model="goodBooksFormData.name" autocomplete="off" placeholder="图书名称" />
        </el-form-item>
        <el-form-item label="" label-width="">
          <el-input v-model="goodBooksFormData.introduce" type="textarea" autocomplete="off" placeholder="图书简介" />
        </el-form-item>
      </el-form>

        <el-upload class=" mt-5 upload-demo" :auto-upload="false" drag action="#" ref="uploadRef" @change="handleChange" >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              只允许上传小于 500kb 的 jpg/png 文件
            </div>
          </template>
        </el-upload>

      <div class="demo-drawer__footer flex justify-end">
        <el-button @click="cancelForm">Cancel</el-button>
        <el-button v-if="flag == FormTarget.GOOD_BOOKS" type="primary" :loading="loading"
          @click="submitDraw(goodBooksFormData)">{{
          loading ? 'Submitting ...' : 'Submit'
        }}</el-button>
        <el-button v-if="flag == FormTarget.WORD_LINE" type="primary" :loading="loading"
          @click="submitDraw(wordLineFormData)">{{
          loading ? 'Submitting ...' : 'Submit'
          }}</el-button>
      </div>
    </div>
  </el-drawer>

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
  min-width: 71px;
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
  width: 120px;
  /* 定义盒子宽度 */
  white-space: nowrap;

  /* 以下是实现溢出显示...的关键CSS */
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.text-box-introduction {
  width: 120px;
  overflow-wrap: break-word;
  /* 允许在单词内部断行 */
  white-space: normal;
  /* 文本自动换行 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  /* 限制在4行内 */
  overflow: hidden;
  text-overflow: ellipsis;

}
</style>
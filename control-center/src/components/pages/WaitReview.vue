<script setup lang='ts'>
import useWorkReview from '@/hooks/useWorkReview';
import { ElMessageBox } from 'element-plus';
import { preview } from 'v-preview-image';
import { h, ref } from 'vue';
import Review from './Review.vue';

const minio_host = ref<string>(import.meta.env.VITE_MINIO_HOST)

const prop = defineProps({
  status: Boolean
})
const { waitReviewWorks, hasReviewedWorks } = useWorkReview()

const review = (idx: number) => {
  ElMessageBox({
    title: '',
    message: h(Review, {
      workUrl: waitReviewWorks[idx].workUrl
    }),
    showCancelButton: false,
    showConfirmButton: false,
    customStyle: { width: '600px', maxWidth: '600px' }

  }).then(action => {
    // 这里可以处理用户点击事件，例如登录或取消
    console.log(action);
  }).catch(err => {
  });
};

const listing = (wordId:string) => {
  console.log(wordId)
  waitReviewWorks.pop()
  ElMessage({
    message: '操作成功',
    type: 'success',
  })
}

</script>

<template>
  <el-table :data="prop.status ? hasReviewedWorks : waitReviewWorks" style="width: 100%" height="550">
    <el-table-column fixed width="180">
      <template #default="scope">
        <el-avatar @click="preview(scope.row.workImg)" shape="square" :size="35"
          :src="minio_host+ scope.row.workImg" />
      </template>
    </el-table-column>
    <el-table-column prop="workName" label="作品名称" width="240" />
    <el-table-column prop="authorId" label="作者ID" width="240" />
    <el-table-column prop="authorName" label="作者名称" width="240" />
    <el-table-column prop="status" label="状态" width="240" />
    <el-table-column fixed="right" label="Operations">
      <template #default="scope">
        <el-button @click="review(scope.$index)" link type="info" size="small">审查</el-button>
        <el-button @click="listing(scope.row.workId)" link type="info" size="small">上架</el-button>
        <el-button @click="review(scope.$index)" link type="info" size="small">整改</el-button>
      </template>
    </el-table-column>
  </el-table>


</template>

<style>
.box {
  width: 1200px !important;

}
</style>
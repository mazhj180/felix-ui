<template>
  <div class=" w-2/3">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px"
      class=" flex flex-col items-start bg-white opacity-80 py-4 rounded-lg" :size="formSize" status-icon>

      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="ruleForm.realName" style=" width: 100%;" />
      </el-form-item>
      <el-form-item label="笔名/昵称" prop="pseudonym">
        <el-input v-model="ruleForm.pseudonym" style=" width: 100%;" />
      </el-form-item>
      <el-form-item label="身份证号码" prop="idCard" style=" width: 60%;">
        <el-input v-model="ruleForm.idCard" />
      </el-form-item>
      <el-form-item label="出生日" style=" width: 50%;" required>
        <el-col :span="11">
          <el-form-item prop="date">
            <el-date-picker v-model="ruleForm.date" type="date" label="Pick a date" placeholder="Pick a date"
              style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简介" prop="introduction" style=" width: 80%;">
        <el-input v-model="ruleForm.introduction" type="textarea" />
      </el-form-item>
      <el-form-item label="了解渠道" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Create
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus';
import { ElMessage } from 'element-plus';
import { becomeWriter } from '@/api/api';
import { useUserStore } from '@/store/user';

let userStore = useUserStore()

type FormInstance = InstanceType<typeof ElForm>
type FormRules = InstanceType<typeof ElForm>


interface RuleForm {
  realName: string
  pseudonym: string
  idCard: string
  date: string
  sex: string
  introduction: string
  type: string[]
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  realName: '',
  pseudonym: '',
  idCard: '',
  date: '',
  sex: '',
  introduction: '',
  type: [],
})

const rules = reactive<FormRules>({
  realName: [
    { required: true, message: 'Please input real name', trigger: 'blur' },
    { min: 1, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  pseudonym: [
    { required: true, message: 'Please input pseudonym', trigger: 'blur' },
    { min: 1, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' },
  ],
  idCard: [
    { min: 18, max: 18, message: 'Length should be 18', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        const idCardPattern = /^[0-9]{17}[0-9Xx]$/;
        if (!value) {
          return callback(new Error('ID card number is required'));
        } else if (!idCardPattern.test(value)) {
          return callback(new Error('Invalid ID card number, must be numeric with optional final X'));
        } else {
          return callback();
        }
      },
      trigger: 'blur'
    }
  ],
  date: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],

  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select sex',
      trigger: 'change',
    },
  ],
  introduction: [
    { required: true, message: 'Please introduce yourself', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid: any, fields: any) => {
    if (valid) {
      console.log('submit!')
      let res = await becomeWriter(ruleForm)
      if (res.data === "success") {
        console.log('success')
        ElMessage({
          message: 'Congrats, this is a success message.',
          type: 'success',
        })
        localStorage.setItem('isWriter','true')
        setInterval(() => {
          userStore.isWriter = 'true';
        },1000)
      } else{
        ElMessage.error('Oops, this is a error message.')
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
</script>
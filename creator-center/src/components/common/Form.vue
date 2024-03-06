<template>
    <div class=" w-2/3">
      <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class=" flex flex-col items-start bg-white opacity-80 py-4 rounded-lg"
      :size="formSize"
      status-icon
    > 
      
      <el-form-item label="真实姓名" prop="name">
        <el-input v-model="ruleForm.name" style=" width: 100%;" />
      </el-form-item>
      <el-form-item label="笔名/昵称" prop="name">
        <el-input v-model="ruleForm.name" style=" width: 100%;" />
      </el-form-item>
      <el-form-item label="身份证号码" prop="name" style=" width: 60%;">
        <el-input v-model="ruleForm.name"  />
      </el-form-item>
      <el-form-item label="出生日" style=" width: 50%;" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              v-model="ruleForm.date1"
              type="date"
              label="Pick a date"
              placeholder="Pick a date"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="性别" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简介" prop="desc" style=" width: 80%;">
        <el-input v-model="ruleForm.desc" type="textarea" />
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

  type FormInstance = InstanceType<typeof ElForm>
  type FormRules = InstanceType<typeof ElForm>

  
  interface RuleForm {
    name: string
    region: string
    count: string
    date1: string
    date2: string
    delivery: boolean
    type: string[]
    resource: string
    desc: string
  }
  
  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive<RuleForm>({
    name: 'Hello',
    region: '',
    count: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  })
  
    const rules = reactive<FormRules>({
    name: [
      { required: true, message: 'Please input Activity name', trigger: 'blur' },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    region: [
      {
        required: true,
        message: 'Please select Activity zone',
        trigger: 'change',
      },
    ],
    count: [
      {
        required: true,
        message: 'Please select Activity count',
        trigger: 'change',
      },
    ],
    date1: [
      {
        type: 'date',
        required: true,
        message: 'Please pick a date',
        trigger: 'change',
      },
    ],
    date2: [
      {
        type: 'date',
        required: true,
        message: 'Please pick a time',
        trigger: 'change',
      },
    ],
    type: [
      {
        type: 'array',
        required: true,
        message: 'Please select at least one activity type',
        trigger: 'change',
      },
    ],
    resource: [
      {
        required: true,
        message: 'Please select activity resource',
        trigger: 'change',
      },
    ],
    desc: [
      { required: true, message: 'Please input activity form', trigger: 'blur' },
    ],
  })
  
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid:any, fields:any) => {
      if (valid) {
        console.log('submit!')
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
  
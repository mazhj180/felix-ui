<script setup lang='ts'>
import { reactive ,ref} from 'vue';
import {useUserStore} from "@/store/user";
import emitter from '@/emitter';


const loginInfo = reactive({
  userId: '',
  password: ''
})
let isShowD = ref(false)

const onSubmit = async () => {
  try {
    await useUserStore().login(loginInfo)
    if (useUserStore().loginIsSuccess){
      emitter.emit('login-success',true)
    } else {
      isShowD.value = true
    }
  } catch (error) {
    console.log(error)
  }
}


</script>

<template>
    <van-dialog v-model:show="isShowD" title="failed" show-cancel-button>
        <div class=" my-4 text-center"> 账户名或密码错误 </div>
    </van-dialog>
    <div class="text-center text-sm text-gray-700 mb-16">
        <p>在此登录 <strong>Felix</strong> 账号后，您在应用中使用 <strong>Felix</strong> 服务时也将登录此账号。</p>
    </div>
    <div class="w-full max-w-md">
        <div class="flex items-center w-full mb-6">
            <div class="flex-grow  py-2 px-4 bg-white shadow-sm">
                <input v-model="loginInfo.userId" type="text" placeholder="在此输入用户名" class="w-full outline-none text-sm">
            </div>
        </div>
        <div class="flex items-center w-full mb-10">
            <div class="flex-grow  py-2 px-4 bg-white shadow-sm">
                <input v-model="loginInfo.password" type="password" placeholder="在此输入密码"
                    class="w-full outline-none text-sm">
            </div>
        </div>
    </div>
    <div class="w-full max-w-md flex mb-4">
      <div class="flex justify-start">
        <RouterLink to="/register" class="text-blue-500 px-4 py-2 text-sm" >创建账号</RouterLink>
      </div>
      <div class="flex flex-grow justify-end ">
        <button @click="onSubmit" class="bg-blue-500 text-white rounded px-4 py-2 text-sm">登&nbsp;录</button>
      </div>
    </div>
</template>

<style scoped></style>
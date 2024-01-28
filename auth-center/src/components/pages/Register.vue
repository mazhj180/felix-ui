<script setup lang='ts'>
import { reactive, ref } from 'vue';
import { useUserStore } from '@/store/user';
import { Form, Field } from 'vee-validate';
import { isExited } from '@/api/auth';
import router from '@/router';

let isShowD = ref(false)
let title = ref('success')
let message = ref('')

const showD = () => {
    isShowD.value = true
}

const conf = (isSuccess:boolean) => {
    if (isSuccess) {
        router.replace('/login')
    }
}

let userInfo = reactive({
    userId: "",
    userPwd: "",
    repeatPwd: "",
    nickName: "",
    phoneNumber: "",
    email: ""
})

const onSubmit = async () => {
    console.log("@@@@")
    let res = await isExited(userInfo.userId)
    if (res.data === 'yes'){
        title.value = 'failed'
        message.value = '该账户名已存在'
        showD()
        return
    }
    await useUserStore().register(userInfo)
    if (!useUserStore().registerIsSuccess) {
        title.value = 'failed'
    } else {
        title.value = 'success'
    }
    showD()

}

const checkNickName = (value:string) => {
    if (value === "") return '昵称不能为空'
    return true
}

const checkPhoneNumber = (value:string) => {
    let regex = /^1[3-9]\d{9}$/
    if (!regex.test(value)) return '非法的手机号码'
    return true
}

const checkEmail = (value:string) => {
    let regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!regex.test(value)) return '非法的邮箱地址' 
    return true
}


const checkUserId = async (value:string) => {
    console.log('user')
    if (value === "") return '不能为空'
    return true
}



const checkRepeatPwd = (value:string) => {
    console.log("1111")
    if (value === "") return '不能为空'
    if (value === userInfo.userPwd ) return true
    return '请输入相同密码'
}

let show = ref(true)

const back = () => {
    show.value = true
}
const next = (flag:boolean) => {
    if (flag) show.value = false
}


</script>

<template>
    <van-dialog v-model:show="isShowD" :title="title" @confirm="conf(useUserStore().registerIsSuccess)" show-cancel-button>
        <div class=" my-4 text-center"> {{ message }} </div>
    </van-dialog>
    <div class="text-center text-sm text-gray-700 mb-16">
        <p>创建您的 <strong>Felix</strong> 账号</p>
    </div>
    <Form @submit="onSubmit" class="w-full max-w-md" v-slot="{ errors }">
        <!-- Input Step One -->
        <div v-if="show" class="w-full max-w-md">
            <div class="flex items-center w-full mb-6">
                <div class="flex-grow  py-2 px-4 bg-white shadow-sm">
                    <Field v-model="userInfo.nickName" :rules="checkNickName" name="nickName" type="text" placeholder="昵称" class="w-full outline-none text-sm" />
                    <div class=" text-red-600 text-xs" v-if="errors.nickName">{{ errors.nickName }}</div>
                </div>
            </div>
            <div class="flex items-center w-full mb-6">
                <div class="flex-grow  py-2 px-4 bg-white shadow-sm">
                    <Field v-model="userInfo.phoneNumber" :rules="checkPhoneNumber" name="phoneNumber" type="text" placeholder="手机号码"
                        class="w-full outline-none text-sm" />
                    <div class=" text-red-600 text-xs" v-if="errors.phoneNumber">{{ errors.phoneNumber }}</div>
                </div>
            </div>
            <div class="flex items-center w-full mb-10">
                <div class="flex-grow  py-2 px-4 bg-white shadow-sm">
                    <Field v-model="userInfo.email" :rules="checkEmail" name="email" type="text" placeholder="邮箱" class="w-full outline-none text-sm" />
                    <div class=" text-red-600 text-xs" v-if="errors.email"> {{ errors.email }}</div>
                </div>
            </div>
        </div>
        <div v-if="show" class="w-full max-w-md flex mb-4">
            <div class="flex justify-start">
                <RouterLink to="/login" class="text-blue-500 px-4 py-2 text-sm">取&nbsp;消</RouterLink>
            </div>
            <div class="flex flex-grow justify-end ">
                <button @click="next((!errors.email && !errors.phoneNumber) && !errors.nickName)" class="bg-blue-500 text-white rounded px-4 py-2 text-sm">下一步</button>
            </div>
        </div>

        <!-- Input Step Two -->
        <div v-if="!show" class="w-full max-w-md">
            <div class="flex items-center w-full mb-6">
                <div class="flex-grow  py-2 px-4 bg-white shadow-sm">
                    <Field v-model="userInfo.userId" :rules="checkUserId" name="userId" type="text" placeholder="在此输入用户名" class="w-full outline-none text-sm" />
                    <div class=" text-red-600 text-xs" v-if="errors.userId"> {{ errors.userId }}</div>
                </div>
            </div>
            <div class="flex items-center w-full mb-6">
                <div class="flex-grow  py-2 px-4 bg-white shadow-sm">
                    <Field v-model="userInfo.userPwd" name="userPwd" type="password" placeholder="在此输入密码"
                        class="w-full outline-none text-sm" />
                </div>
            </div>
            <div class="flex items-center w-full mb-10">
                <div class="flex-grow  py-2 px-4 bg-white shadow-sm">
                    <Field v-model="userInfo.repeatPwd" name="repeatPwd" :rules="checkRepeatPwd" type="password" placeholder="重复输入密码"
                        class="w-full outline-none text-sm" />
                        <div class=" text-red-600 text-xs" v-if="errors.repeatPwd"> {{ errors.repeatPwd }}</div>
                </div>
            </div>
        </div>
        <div v-if="!show" class="w-full max-w-md flex mb-4">
            <div class="flex justify-start">
                <button @click="back" class="text-blue-500 px-4 py-2 text-sm">上一步</button>
            </div>
            <div class="flex flex-grow justify-end ">
                <button type="submit" class="bg-blue-500 text-white rounded px-4 py-2 text-sm">注&nbsp;册</button>
            </div>
        </div>
    </Form>
</template>

<style scoped></style>
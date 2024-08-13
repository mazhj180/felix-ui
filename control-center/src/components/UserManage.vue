<script setup lang='ts'>
import { reactive, ref, watch } from 'vue';
import pagination from '@/hooks/pagination';
import { useUserStore } from '@/store/user';
import debounce from '@/utils/debounce';

let rootRef = ref<HTMLElement >()

let userStore = useUserStore()


const { pageInfo, search, handleCurrentChange } = pagination()

let userId = ref<string | null>(null)

const statusFormatter = (row: any, column: any, value: boolean, index: any) => {
    return value ? '已禁用' : '正常';
}


watch(userId,(newVal) => {
    if (newVal == null || newVal.trim() === '') {
        search(null)

    } else {
        debounce(search,300)(newVal)
    }
    
})


const handleBan = (userId: string, idx: number) => {
    userStore.updateState({userId,isBan:true},idx)
    userStore.users.list[idx]['isBan'] = true
}

const handleRelieve = (userId: string, idx: number) => {
    userStore.updateState({userId,isBan:false},idx)
    userStore.users.list[idx]['isBan'] = false
}

const handleDel = (userId: string, idx: number) => {
    ElMessageBox.confirm(
        '危险操作是否继续?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
            appendTo:rootRef.value
        }
    )
        .then(() => {
            userStore.delUser(userId,idx)
            ElMessage({
                type: 'success',
                message: 'Delete completed',
                appendTo: rootRef.value,
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
                appendTo: rootRef.value,
            })
        })
}




</script>

<template>
    <div class=" w-full absolute z-50 flex justify-center items-center" ref="rootRef"></div>
    <div class=" flex flex-col h-full w-full" >

        <!-- <div class=" px-5 ">
            <input class=" border shadow rounded-lg h-8" />
        </div> -->

        <!-- <div class=" px-5 text-gray-500 italic">
            全部用户
        </div> -->
        <div id="root" class=" flex-1 px-5 py-5 shadow-2xl " >
            <div class=" flex pb-10">
                <div class=" field w-96 shadow">
                    <input v-model="userId" type="text" required autocomplete="off" id="password" class=" px-5">
                    <label for="password" title="精确搜索" data-title="精确搜索"></label>

                </div>
                <!-- <div @click="search(userId)" class=" flex justify-center items-center text-gray-500 px-5">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                </div> -->
                
            </div>
            
            <div class="no-scrollbar " >
                <el-table :data="userStore.users.list" style="width: 100%; height: 380px;" class=" ">
                    <el-table-column fixed prop="userId" label="用户ID" width="150" />
                    <el-table-column prop="nickName" label="昵称" width="200" />
                    <el-table-column prop="email" label="邮箱" width="250" />
                    <el-table-column prop="phoneNumber" label="手机号" width="180" />
                    <el-table-column prop="level" label="角色" width="180" />
                    <el-table-column prop="isBan" label="账号状态" :formatter="statusFormatter" width="180" />
                    <el-table-column prop="createTime" label="注册日期" width="300" />
                    <el-table-column prop="updateTime" label="最新操作日期" width="300" />
                    <el-table-column fixed="right" label="Operations" width="180">
                        <template #default="scope">
                            <el-button @click="handleBan(scope.row.userId, scope.$index)" link type="info" size="small"
                                :disabled="scope.row.isBan">禁用</el-button>
                            <el-button @click="handleRelieve(scope.row.userId, scope.$index)" link type="info"
                                :disabled="!scope.row.isBan" size="small">解除禁用</el-button>
                            <el-button @click="handleDel(scope.row.userId, scope.$index)" link type="danger"
                                size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination @current-change="handleCurrentChange" :page-size="pageInfo.size" :pager-count="11"
                layout="prev, pager, next" :total="pageInfo.total" class=" pt-10 float-end" />
        </div>

    </div>
</template>

<style>

.message {
    display: flex;
}

.el-table__inner-wrapper::before {

    display: none;
}

.el-scrollbar__bar.is-horizontal {
    display: none;
}

.el-scrollbar__bar {
    display: none;
}

.label-before,
.field input:valid+label::before,
.field input:focus+label::before {
    line-height: 20px;
    font-size: 12px;
    top: -10px;
    background: #fff;
    padding: 0 6px;
    left: 9px;
}

.container {
    width: 80%;
    margin: 30px 10%;
}

.field {
    position: relative;

}

.field label::before {
    content: attr(title);
    position: absolute;
    top: 0;
    left: 30px;
    line-height: 40px;
    font-size: 14px;
    color: #777;
    transition: 300ms all;
}

.field input {
    width: 100%;
    line-height: 40px;
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 14px;
    color: #222;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.field input:focus {
    outline: 0;
    border-color: gray;
}

.field input:valid+label::before {
    content: attr(data-title);
}

.field input:focus+label::before {
    color: gray;
}
</style>
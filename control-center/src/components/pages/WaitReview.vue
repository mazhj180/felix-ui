<script setup lang='ts'>

</script>

<template>
    <el-table :data="tableData" style="width: 100%" height="250">
        <el-table-column fixed prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="320" />
        <el-table-column prop="address" label="Address" width="600" />
        <el-table-column prop="zip" label="Zip" width="120" />
    </el-table>
</template>

<style scoped>
</style>
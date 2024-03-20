<template>
    <div>
        <el-button type="danger" @click="out">退出</el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        out() {
            window.sessionStorage.removeItem('token')
            this.$router.push('/login')
            this.$message.success('退出成功')
        }
    }
}
</script>
<style lang="less" scoped></style>
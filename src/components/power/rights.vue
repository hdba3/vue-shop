<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-table :data="rightstable" :style="{ width: '100%' }" border stripe>
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="authName" label="权限名称" />
                <el-table-column prop="path" label="访问路径" />
                <el-table-column prop="level" label="权限层级">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.level==0">一级</el-tag>
                        <el-tag v-else-if="scope.row.level==1" type="success">二级</el-tag>
                        <el-tag v-else type="warning">三级</el-tag>
                    </template>
                </el-table-column>
                
            </el-table>
        </el-card>
    </div>

</template>
<script>
export default {
    data() {
        return {
            rightstable: []
        }
    },
    methods: {
        async getlist() {
            const { data: res } = await this.$http.get('rights/' + 'list')
            // console.log(res)
            if (res.meta.status !== 200) {
                this.$alert('拉取列表失败', '错误', {
                    confirmButtonText: '确定',
                });
            }
            else{
                this.rightstable = res.data
            }
            // console.log(this.rightstable)
        }
    },
    created() {
        this.getlist()
    }
}
</script>
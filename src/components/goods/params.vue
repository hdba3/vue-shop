<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>分类参数</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-alert title="注意：只允许为第三级分类设置参数！" type="warning" show-icon :style="{ 'margin-bottom': '20px' }">
            </el-alert>
            选择商品分类：<el-cascader v-model="params" :options="tableData" :props="cascaderprops" :show-all-levels="false"
                filterable @change="handleChange" :style="{ 'margin-bottom': '20px' }"></el-cascader>
            <el-tabs value="first" type="border-card">
                <el-tab-pane label="动态参数" name="first">
                    <el-button :disabled="disabledvalue" type="primary">添加参数</el-button>
                    <el-table>

                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="静态属性" name="second">
                    <el-button type="primary" :disabled="disabledvalue">添加属性</el-button>
                    <el-table>

                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            disabledvalue: true,
            manyTable: [],
            onlyTable: [],
            params: [],
            tableData: [],  // 分类数据
            cascaderprops: {
                value: 'cat_id',
                label: 'cat_name',
                expandTrigger: 'hover',
            },
            categories: {       //拉取列表参数
                type: '',
                pagenum: 1,
                pagesize: 5,
            },
        }
    },
    created() {
        this.gettable()
    },
    methods: {
        handleChange() {
            if (this.params.length !== 3) {
                this.params = []
                this.disabledvalue = true
                return
            }
            else {
                this.disabledvalue = false
                this.gettabledata('many')
            }
        },
        async gettabledata(sel) {         //获取参数列表
            const { data: res } = await this.$http.get(`categories/${this.params[2]}/attributes`, { params: { sel: sel } })
            if (res.meta.status !== 200) {
                this.$alert('拉取列表失败', '错误', {
                    confirmButtonText: '确定',
                });
            } else {
                console.log(res)
            }
        },
        async gettable() {      //获取分类列表
            const { data: res } = await this.$http.get('/categories', { params: this.categories })
            if (res.meta.status !== 200) {
                this.$alert('拉取列表失败', '错误', {
                    confirmButtonText: '确定',
                });
            }
            else {
                this.tableData = res.data.result
            }
        }
    }
}
</script>
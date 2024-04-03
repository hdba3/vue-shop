<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-button type="primary" @click="add">添加分类</el-button>
            <el-table :data="tableData" :style="{ width: '100%' }" :stripe="true" border row-key="cat_id">
                <el-table-column prop="cat_name" label="分类名称" />
                <el-table-column label="是否有效">
                    <template slot-scope="scope">
                        <i v-if="scope.row.cat_deleted === false" class="el-icon-success" style="color: lightgreen;" />
                        <i v-else class="el-icon-error" style="color: brown;" />
                    </template>
                </el-table-column>
                <el-table-column label="排序">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.cat_level == 0" type="primary">一级</el-tag>
                        <el-tag v-else-if="scope.row.cat_level == 1" type="success">二级</el-tag>
                        <el-tag v-else type="warning">三级</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                            @click="modify(scope.row)">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                            @click="deletecat(scope.row.cat_id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :current-page="categories.pagenum" :page-size="categories.pagesize"
                :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>
        </el-card>
        <el-dialog title="添加分类" :visible.sync="addDialogVisible" width="30%" @close="addrest">
            <el-form ref="addref" :model="addform" label-width="auto">
                <el-form-item prop="cat_name" label="分类名称" :rules="[
                { required: true, message: '请输入分类名称', trigger: 'blur' },
            ]">
                    <el-input v-model="addform.cat_name"></el-input>
                </el-form-item>

                <el-form-item prop="cat_add" label="分类节点"
                    :rules="[{ required: true, message: '请选择分类节点', trigger: 'change' }]">
                    <el-cascader v-model="addform.cat_add" :options="tableData" :props="cascaderprops" clearable
                        filterable :style="{ width: '100%' }"></el-cascader>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addrest">取 消</el-button>
                <el-button type="primary" @click="addclick">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="编辑分类" :visible.sync="modifydialog" width="30%" @close="modifyreset">
            <el-form :model="modifyform" label-width="30%" ref="modifyref" :rules="caterule">
                <el-form-item label="分类名称" prop="cat_name">
                    <el-input v-model="modifyform.cat_name" placeholder="请输入" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modifydialog = false">取 消</el-button>
                <el-button type="primary" @click="modifycate">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            modifyform: {   //修改角色表单
                id: 0,
                cat_name: '',
            },
            caterule: {    //修改角色规则
                cat_name: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
            },
            cascaderprops: {
                checkStrictly: true,
                value: 'cat_id',
                label: 'cat_name',
                expandTrigger: 'hover',
            },
            value: [],
            addform: {
                cat_name: '',
                cat_level: '',
                cat_pid: 0,
                cat_add: '',
            },
            modifydialog: false,
            addDialogVisible: false,
            total: 0,   // 总条数
            categories: {       //拉取列表参数
                type: '',
                pagenum: 1,
                pagesize: 5,
            },
            tableData: [],  // 分类数据
        }
    },
    methods: {
        modifyreset() {      //重置修改角色表单
            this.modifydialog = false
            this.$refs.modifyref.resetFields()
        },
        deletecat(id) {        //删除分类
            // console.log(id)
            this.$alert('此操作将永久删除该分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(`categories/` + id)
                    .then(() => {
                        this.gettable()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        addrest() {
            this.addDialogVisible = false
            this.$refs.addref.resetFields()

        },
        addclick() {    //添加验证
            const cataddform = {
                cat_name: this.addform.cat_name,
                cat_level: this.addform.cat_add.length,
            };
            cataddform.cat_pid = this.addform.cat_add[cataddform.cat_level - 1];
            this.$refs.addref.validate((async valid => {
                if (!valid) {
                    return;
                } else {
                    const { data: res } = await this.$http.post('categories', cataddform)
                    // console.log(res)
                    if (res.meta.status !== 201) {
                        this.$message({ showClose: true, message: res.meta.msg, type: 'error' });
                    }
                    else {
                        this.$message({ showClose: true, message: res.meta.msg, type: 'success' });
                        this.addrest()
                        this.gettable()
                    }
                }
            }))
        },
        modify(row) {       //呼出修改角色对话框
            this.modifydialog = true
            this.modifyform.id = row.cat_id
        },
        modifycate() {
            this.$refs.modifyref.validate((async valid => {
                if (!valid) {
                    return;
                } else {
                    const { data: res } = await this.$http.put(`categories/${this.modifyform.id}`, { cat_name: this.modifyform.cat_name })
                    // console.log(res)
                    if (res.meta.status !== 200) {
                        this.$message({ showClose: true, message: res.meta.msg, type: 'error' });
                    }
                    else {
                        this.$message({ showClose: true, message: res.meta.msg, type: 'success' });
                        this.modifyreset()
                        this.gettable()
                    }
                }
            }
            ))
        },
        add() {
            this.addDialogVisible = true
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.categories.pagesize = val
            this.gettable()
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.categories.pagenum = val
            this.gettable()
        },
        async gettable() {
            const { data: res } = await this.$http.get('/categories', { params: this.categories })
            if (res.meta.status !== 200) {
                this.$alert('拉取列表失败', '错误', {
                    confirmButtonText: '确定',
                });
            }
            else {
                this.tableData = res.data.result
                this.total = res.data.total
                // console.log(res)
            }
        }
    },
    created() {
        this.gettable()
    }
}
</script>
<style lang="less" scoped></style>
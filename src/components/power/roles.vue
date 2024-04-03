<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row>
                <el-button type="primary" @click="addroles">添加角色</el-button>
            </el-row>
            <el-table :data="roleslist" :style="{ width: '100%' }" border stripe>
                <el-table-column type="expand">
                    <!-- 权限树状图 -->
                    <template slot-scope="scope">
                        <el-row v-for="(t1, a) in scope.row.children" :key="t1.id"
                            :class="['bottom', a === 0 ? 'top' : '']">
                            <el-col :span="5">
                                <el-tag :key="t1.id">
                                    {{ t1.authName }}
                                </el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <el-col :span="19">
                                <el-row v-for="(t2, b) in t1.children" :key="t2.id"
                                    :class="['bottom', b === 0 ? 'top' : '']">
                                    <el-col :span="6">
                                        <el-tag type="success">
                                            {{ t2.authName }}
                                        </el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-tag closable type="warning" v-for="(t3, c) in t2.children" :key="t3.id"
                                            :class="['bottom', c === 0 ? 'top' : '']"
                                            @close="tagclose(t3.id, scope.row.id)">
                                            {{ t3.authName }}
                                        </el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column type="index" />
                <el-table-column prop="roleName" label="角色名称" />
                <el-table-column prop="roleDesc" label="角色描述" />
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                            @click="modify(scope.row)">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                            @click="deleteaoles(scope.row.id)">删除</el-button>
                        <el-button type="warning" icon="el-icon-s-tools" size="mini"
                            @click="allot(scope.row)">分配角色</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="添加用户" :visible.sync="adddialog" width="30%" @close="addreset" :before-close="handleClose">
            <el-form label-width="80px" :rules="rolesfromrule" :model="addfrom" ref="addref">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addfrom.roleName" placeholder="请输入角色名称" />
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="addfrom.roleDesc" placeholder="请输入角色描述" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="adddialog = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改用户" :visible.sync="modifydialog" width="30%" @close="modifyreset"
            :before-close="handleClose">
            <el-form :model="modifyform" label-width="30%" ref="modifyref" :rules="rolesfromrule">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="modifyform.roleName" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="modifyform.roleDesc" placeholder="请输入" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modifydialog = false">取 消</el-button>
                <el-button type="primary" @click="modifyrole">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="分配角色" :visible.sync="allotdialog" width="30%" @close="cleanlist">
            <el-tree :data="purviewlist" :props="purviewProps" show-checkbox :accordion="true"
                :default-expand-all="true" node-key="id" :default-checked-keys="defaultkey" ref="treeref">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cleanlist()">取 消</el-button>
                <el-button type="primary" @click="warrant()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>

export default {
    data() {
        return {
            roleslist: [],  //角色列表
            adddialog: false,
            modifydialog: false,
            allotdialog: false,
            modifyform: {   //修改角色表单
                roleName: '',
                roleDesc: '',
                id: 0,
            },
            addfrom: {    //添加角色表单
                roleName: '',
                roleDesc: '',
            },
            rolesfromrule: {    //添加角色规则
                roleName: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                roleDesc: [
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ]
            },
            purviewlist: [],    //权限列表
            purviewProps: {    //权限列表配置
                children: 'children',
                label: 'authName',
            },
            defaultkey: [],    //默认选中的权限
            roleid: 0       //授权时使用的角色id
        }
    },
    methods: {
        async warrant() {    //授权
            const key = [
                ...this.$refs.treeref.getCheckedKeys(),
                ...this.$refs.treeref.getHalfCheckedKeys()
            ]
            const rids = key.join(',')
            const { data: res } = await this.$http.post(`roles/${this.roleid}/rights`, { rids })
            console.log(res)
            if (res.meta.status !== 200) {
                this.$message({ showClose: true, message: res.meta.msg, type: 'error' });
            }
            else {
                this.$message({ showClose: true, message: res.meta.msg, type: 'success' });
                this.allotdialog = false
                this.getlist()
            }
        },
        cleanlist() {       //清空权限列表
            this.allotdialog = false
            this.defaultkey = []
        },
        async getlist() {       //获取角色列表
            const { data: res } = await this.$http.get("roles")
            if (res.meta.status !== 200) {
                this.$alert('拉取列表失败', '错误', {
                    confirmButtonText: '确定',
                });
            }
            else {
                this.roleslist = res.data
            }
        },
        addroles() {    //呼出添加角色对话框
            this.adddialog = true
        },
        handleClose(done) {     //询问是否关闭对话框
            this.$alert('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        add() {      //添加角色规则验证
            this.$refs.addref.validate(async valid => {
                if (valid) {
                    const { data: res } = await this.$http.post("roles", this.addfrom)
                    if (res.meta.status !== 201) {
                        this.$message({ showClose: true, message: res.meta.msg, type: 'error' });
                    }
                    else {
                        this.$message({ showClose: true, message: res.meta.msg, type: 'success' });
                        this.adddialog = false
                        this.getlist()
                    }
                } else {
                    return false;
                }
            });
        },
        addreset() {     //重置添加角色表单
            this.$refs.addref.resetFields()
        },
        modifyreset() {      //重置修改角色表单
            this.$refs.modifyref.resetFields()
        },
        modify(row) {       //呼出修改角色对话框
            this.modifydialog = true
            this.modifyform.roleName = row.roleName
            this.modifyform.roleDesc = row.roleDesc
            this.modifyform.id = row.id
        },
        modifyrole() {       //修改角色规则验证
            this.$refs.modifyref.validate(async valid => {
                if (valid) {
                    const { data: res } = await this.$http.put(`roles/${this.modifyform.id}`, this.modifyform)
                    if (res.meta.status !== 200) {
                        this.$message({ showClose: true, message: res.meta.msg, type: 'error' });
                    }
                    else {
                        this.$message({ showClose: true, message: '修改成功', type: 'success' });
                        this.modifydialog = false
                        this.getlist()
                    }
                } else {
                    return false;
                }
            });

        },
        deleteaoles(id) {        //删除角色
            this.$alert('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(`roles/` + id)
                    .then(() => {
                        this.getlist()
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
        tagclose(tagid, rolesid) {      //删除标签
            // console.log(id)
            // console.log(tag)
            this.$http.delete(`roles/${rolesid}/rights/${tagid}`)
                .then(() => {
                    this.getlist()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
        },
        getlevelthree(node, arr) {        //递归获取三级权限的id
            if (!node.children) {
                arr.push(node.id)
            }
            else {
                node.children.forEach(item => {
                    this.getlevelthree(item, arr)
                })
            }
        },
        async allot(row) {        //分配角色
            this.roleid = row.id
            this.getlevelthree(row, this.defaultkey)
            const { data: res } = await this.$http.get("rights/tree")
            if (res.meta.status !== 200) {
                this.$alert('拉取列表失败', '错误', {
                    confirmButtonText: '确定',
                });
            }
            else {
                this.purviewlist = res.data
                // console.log(row)
            }
            this.allotdialog = true
        }
    },
    created() {
        this.getlist()
    }
}
</script>
<style lang="less" scoped>
.el-tag {
    margin: 7px;
}

.top {
    border-top: 1px solid #eee;
}

.bottom {
    border-bottom: 1px solid #eee;
}

.el-row {
    display: flex;
    align-items: center;
}
</style>
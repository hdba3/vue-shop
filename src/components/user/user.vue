<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="请输入搜索内容" v-model="Obtainlist.query" clearable @clear="getuserlist"><el-button
                            slot="append" icon="el-icon-search" @click="Inquire"></el-button></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="adddialog = true">添加用户</el-button>
                </el-col>
            </el-row>
            <el-table :data="userlist" style="width: 100%" :border=true>
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="id" label="ID" width="60"></el-table-column>
                <el-table-column prop="username" label="用户名" width="120"></el-table-column>
                <el-table-column prop="mobile" label="手机号" width="120"></el-table-column>
                <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
                <el-table-column prop="create_time" label="创建时间" width="180"></el-table-column>
                <el-table-column prop="role_name" label="角色" width="120"></el-table-column>
                <el-table-column label="用户状态" width="120">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"
                            @change="changestate(scope.row.id, scope.row.mg_state)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                            @click=" modifyuser(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                            @click="deleteuser(scope.row.id)"></el-button>
                        <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
                            <el-button type="warning" icon="el-icon-s-tools" size="mini"
                                @click="allot(scope.row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :current-page="Obtainlist.pagenum" :page-size="Obtainlist.pagesize"
                :page-sizes="[1, 2, 3, 4]" layout="total, sizes, prev, pager, next, jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>
        </el-card>
        <el-dialog title="分配角色" :visible.sync="allotdialog" width="30%" @close="allotclose">
            <p>当前用户: {{ this.user }}</p>
            <p>当前角色: {{ this.aole }}</p>
            <el-select v-model="part" placeholder="请选择角色">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="allotclose">取 消</el-button>
                <el-button type="primary" @click="allotVerify">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改用户" :visible.sync="modifydialog" width="30%" @close="modifyreset"
            :before-close="handleClose">
            <el-form :model="modifyform" label-width="30%" ref="modifyref" :rules="userfromrules">
                <el-form-item label="用户名" prop="username">
                    <el-input :placeholder="modifyform.username" :disabled="true" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="modifyform.email" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model="modifyform.mobile" placeholder="请输入" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modifydialog = false">取 消</el-button>
                <el-button type="primary" @click="modify">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="添加用户" :visible.sync="adddialog" width="30%" @close="addreset" :before-close="handleClose">
            <el-form label-width="80px" :rules="userfromrules" :model="userfrom" ref="addref">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userfrom.username" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userfrom.password" type="password" placeholder="请输入密码" show-password />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userfrom.email" placeholder="请输入邮箱" />
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model="userfrom.mobile" placeholder="请输入电话" />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="adddialog = false">取 消</el-button>
                <el-button type="primary" @click="adduser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        var checkEmail = (rule, value, cb) => {
            // 验证邮箱的正则表达式
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
            if (regEmail.test(value) || value == '') {
                // 合法的邮箱
                return cb();
            }
            cb(new Error("请输入合法的邮箱"));
        };

        //验证手机号的规则;
        var checkMobile = (rule, value, cb) => {
            // 验证手机号的正则表达式
            const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            if (regMobile.test(value) || value == '') {
                return cb();
            }
            cb(new Error("请输入合法的手机号"));
        };

        return {
            user: "",
            userid: "",    //分配角色的用户id
            aole: "",    //分配角色的aole和user
            part: "",    //被分配的角色
            options: [],    //角色列表
            allotdialog: false,
            Obtainlist: {
                query: '',
                // 当前页码值
                pagenum: 1,
                // 每页显示多少条数据
                pagesize: 2,
            },
            userlist: [],
            total: 0,
            adddialog: false,
            modifydialog: false,
            modifyform: {
                username: "",
                email: "",
                mobile: "",
                id: "",
            },
            userfrom: {
                username: "",
                password: "",
                email: "",
                mobile: "",
            },
            userfromrules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ],
                email: [
                    {
                        validator: checkEmail,
                        message: "请输入正确的邮箱地址",
                        trigger: "blur"
                    }
                ],
                mobile: [
                    {
                        validator: checkMobile,
                        message: "请输入正确的手机号码",
                        trigger: "blur"
                    }
                ],
            }
        }
    },
    methods: {
        async allotVerify() {    //确定分配角色
            // console.log(this.options)
            const { data: res } = await this.$http.put(`users/${this.userid}/role`, { rid: this.part })
            // console.log(res)
            if (res.meta.status !== 200) {
                this.$message({ showClose: true, message: res.meta.msg, type: 'error' });
            }
            else {
                this.$message({ showClose: true, message: res.meta.msg, type: 'success' });
                this.getuserlist()
                this.options = []
                this.allotdialog = false
            }
        },
        allotclose() {   //关闭分配角色对话框
            this.allotdialog = false
            this.options = []
        },
        async allot(row) {    //分配角色
            // console.log(row)
            this.userid = row.id
            this.aole = row.role_name
            this.user = row.username
            const { data: res } = await this.$http.get('roles')
            // console.log(res.data.length)
            // 获取全部角色列表赋值给options
            for (let i = 0; i < res.data.length; i++) {
                this.options.push({ value: res.data[i].id, label: res.data[i].roleName })
            }
            this.allotdialog = true
        },
        async getuserlist() {    //获取用户列表
            const { data: res } = await this.$http.get('users', { params: this.Obtainlist })
            // console.log(res)
            if (res.meta.status !== 200) {
                this.$alert('拉取用户失败', '错误', {
                    confirmButtonText: '确定',
                });
            } else {
                this.userlist = res.data.users
                this.total = res.data.total
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.Obtainlist.pagesize = val
            this.getuserlist()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.Obtainlist.pagenum = val
            this.getuserlist()
        },
        async changestate(id, status) {     //修改用户状态
            //  console.log(id,status)
            id = parseInt(id)
            const { data: res } = await this.$http.put(`users/${id}/state/${status}`)
            if (res.meta.status !== 200) {
                this.$message({ showClose: true, message: res.meta.msg, type: 'error' });
            }
        },
        async Inquire() {       //搜索用户
            // console.log(query)
            this.getuserlist()
        },
        addreset() {        //重置添加用户表单
            this.$refs.addref.resetFields()
        },
        modifyreset() {     //重置修改用户表单
            this.$refs.modifyref.resetFields()
        },
        adduser() {     //添加用户规则验证
            this.$refs.addref.validate((async valid => {       //valid为true表示表单的所有规则验证通过
                if (!valid) {
                    return;
                } else {
                    const { data: res } = await this.$http.post('users', this.userfrom)
                    // console.log(res)
                    if (res.meta.status !== 201) {
                        this.$message({ showClose: true, message: res.meta.msg, type: 'error' });
                    }
                    else {
                        this.$message({ showClose: true, message: res.meta.msg, type: 'success' });
                        this.adddialog = false
                        this.getuserlist()
                    }
                }
            }))
        },
        handleClose(done) {     //询问是否关闭对话框
            this.$alert('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        modifyuser(row) {    //获取修改用户数据
            this.modifydialog = true
            this.modifyform.username = row.username
            this.modifyform.email = row.email
            this.modifyform.mobile = row.mobile
            this.modifyform.id = row.id
        },
        modify() {      //修改用户规则验证
            this.$refs.modifyref.validate((async valid => {       //valid为true表示表单的所有规则验证通过
                if (!valid) {
                    return;
                } else {
                    const { data: res } = await this.$http.put(`/users/${this.modifyform.id}`, this.modifyform)
                    // console.log(res)
                    if (res.meta.status !== 200) {
                        this.$message({ showClose: true, message: res.meta.msg, type: 'error' });
                    }
                    else {
                        this.$message({ showClose: true, message: res.meta.msg, type: 'success' });
                        this.modifydialog = false
                        this.getuserlist()
                    }
                }
            }))
        },
        deleteuser(id) {    //删除用户
            this.$alert('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(`users/` + id)
                    .then(() => {
                        this.getuserlist()
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
    },
    created() {     //在生命周期的开始获取用户列表
        this.getuserlist()
    }
}
</script>
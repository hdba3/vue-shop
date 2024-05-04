<template>
    <div class="login_background">
        <div class="login_box">
            <div class="login_img">
                <img src="../assets/logo.png">
            </div>
            <el-form label-width="80px" class="login_form" :model="loginform" :rules="loginformrule" ref="loginformref">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginform.username" prefix-icon="el-icon-user-solid"
                        placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginform.password" prefix-icon="el-icon-lock" placeholder="请输入密码"
                        show-password></el-input>
                </el-form-item>
                <el-form-item class="login_button">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="reset">重置</el-button>
                </el-form-item>
                <el-upload action="http://localhost:3000/upload" :before-upload="beforeAvatarUpload"
                    :show-file-list="false">
                    <el-button type="primary" class="avatar_button">上传头像</el-button>
                    <div class="el-upload__tip">只能上传png/jpg文件，且不超过10MB</div>
                </el-upload>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginform: {
                username: 'admin',
                password: '123456'
            },
            // 表单规则
            loginformrule: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        reset() {
            // console.log(this)
            this.$refs.loginformref.resetFields();
        },
        login() {
            this.$refs.loginformref.validate((async valid => {       //valid为true表示表单的所有规则验证通过
                if (!valid) {
                    return;
                } else {
                    const { data: reslut } = await this.$http.post('login', this.loginform)
                    if (reslut.meta.status !== 200) {
                        this.$message.error('登录失败')
                    }
                    else {
                        this.$message.success('登录成功')
                        window.sessionStorage.setItem('token', reslut.data.token) //将token保存到sessionStorage中,来达成保存登录状态
                        this.$router.push('/home')
                    }
                }
            }))
        },
        beforeAvatarUpload(file) {
            const isPNG = file.type === 'image/png';
            const isJPG = file.type === 'image/jpeg';
            const isLt10M = file.size / 1024 / 1024 < 10;
            if (!isPNG && !isJPG) {
                this.$message.error('上传头像图片只能是 PNG/JPG 格式!');
            }
            if (!isLt10M) {
                this.$message.error('上传头像图片大小不能超过 10MB!');
            }
            return isPNG && isLt10M;
        }
    }
}
</script>
<style lang="less" scoped>
.login_background {
    background-color: #2b3b4b;
    height: 100%;
    /*    使用Flexbox布局 ，flexbox是对其子元素生效的
    display: flex;
     水平居中 
    justify-content: center;
     垂直居中 
    align-items: center; */
}

.login_box {
    background-color: white;
    width: 450px;
    height: 300px;
    /* 圆角 */
    border-radius: 5px;
    /* 移动到中心 */
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .login_form {
        position: relative;
        left: 50%;
        top: 20%;
        transform: translate(-50%, -50%);
    }

    .login_img {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        /* 设置元素的边框宽度为1像素，样式为实线，颜色为#eee */
        border-radius: 50%;
        box-shadow: 0 0 10px #ddd;
        /* 设置元素的盒子阴影，水平偏移量和垂直偏移量都为0，模糊距离为10像素*/
        position: relative;
        left: 50%;
        transform: translate(-50%, -50%);

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}

.login_button {
    position: relative;
    left: 65%;
    transform: translate(-50%, -50%);
}

.avatar_button {
    position: relative;
    left: 78%;
    transform: translate(-50%, -50%);
}
</style>
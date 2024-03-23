<template>
    <el-container class="home_container">
        <!-- 头部 -->
        <el-header>
            <span>电商后台管理系统</span>
            <el-button type="danger" @click="out">退出</el-button>
        </el-header>
        <!-- 侧边菜单 -->
        <el-container>
            <el-aside :width=menuwidth>
                <div class="fold-buttun" @click="shrink">|||</div>
                <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
                    active-text-color="#ffd04b" :unique-opened="true" :collapse="iscollapse" :collapse-transition="false">
                    <el-submenu :index="item.id + ''" v-for="item in menuitem" :key="item.id">
                        <template slot="title">
                            <i :class=iconlist[item.id]></i>

                            <span>{{ item.authName }}</span>
                        </template>
                        <el-menu-item :index="childitem.id + ''" v-for="childitem in item.children" :key="childitem.id">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{ childitem.authName }}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 主要页面 -->
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    created() {
        this.getmenu()
    },
    data() {
        return {
            menuitem: [],   // 左侧菜单数据
            iconlist: {
                '125': 'el-icon-user-solid',
                '103': 'el-icon-s-check',
                '101': 'el-icon-goods',
                '102': 'el-icon-s-order',
                '145': 'el-icon-data-board',
            },
            iscollapse: false,
            menuwidth: "200px"
        }
    },
    methods: {
        out() {
            window.sessionStorage.removeItem('token')
            this.$router.push('/login')
            this.$message.success('退出成功')
        },
        async getmenu() {
            const { data: res } = await this.$http.get('menus')
            console.log(res)
            console.log(res.data)
            if (res.meta.status !== 200) {
                this.$alert('拉取菜单失败', '错误', {
                    confirmButtonText: '确定',
                });
            } else {
                this.menuitem = res.data
            }
        },
        shrink(){
            this.iscollapse = !this.iscollapse
            this.menuwidth = this.iscollapse ? "60px":"200px"
        }
    }
}
</script>
<style lang="less" scoped>
.home_container {
    height: 100%;
}

.el-aside {
    background-color: #545c64;
}

.el-header {
    background-color: #012d32;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
}

.el_main {
    background-color: #b8beb8;
}
.fold-buttun {
    background-color: #08909f;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>
<template>
    <div class="header">
        <div class="user">
            <div class="name">{{ userInfo.user_name }}</div>
            <el-dropdown popper-class="dropdown">
                <span class="el-dropdown-link">
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item class="clickCursor" @click="logOut()">退出登录</el-dropdown-item>
                        <el-dropdown-item class="clickCursor">个人中心</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <div class="main">
        <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="文章" name="first">
                <content-box></content-box>
            </el-tab-pane>
            <el-tab-pane label="投诉" name="second">
                <complaint></complaint>
            </el-tab-pane>
            <el-tab-pane label="投诉结果" name="third">
                <complaintResult></complaintResult>
            </el-tab-pane>
        </el-tabs>
    </div>
    <div class="footer"></div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import contentBox from './components/content.vue'
    import complaint from './components/complaint.vue'
    import complaintResult from './components/complaintResult.vue'

    const router = useRouter()
    const activeName = ref('first')
    const userInfo = JSON.parse(localStorage.getItem('commonUserInfo') || '')
    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('commonUserInfo')
        router.push({
            path: '/gateway/login'
        })
    }
</script>

<style lang="scss" scoped>
.header{
    width: 100%;
    height: 90px;
    .user{
        box-sizing: border-box;
        width: 100%;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        position: fixed;
        top: 0;
        background: #fff;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .dropdown{
            border: none !important;
        }
    }
}
.main{
    width: 80%;
    min-height: calc(100vh - 100px - 60px);
    margin: 0 auto;
    box-sizing: border-box;
    padding: 20px 10%;
    background: #fff;
}
.footer{
    width: 100%;
    height: 60px;
}

</style>
<template>
    <div class="header">
        <div class="user">
            <div class="name">admin</div>
            <el-dropdown popper-class="dropdown">
                <span class="el-dropdown-link">
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <div class="main">
        <div class="content-box">
            <h1 class="title">这是第一篇文章</h1>
            <p class="content">12111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</p>
            <div class="content-info">
                <span class="create_time">2023-04-15</span>
                <span class="creator">发布人：yyy</span>
            </div>
        </div>
        <div class="content-box">
            <h1 class="title">这是第一篇文章</h1>
            <p class="content">12111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</p>
            <div class="content-info">
                <span class="create_time">2023-04-15</span>
                <span class="creator">发布人：yyy</span>
            </div>
        </div>
        <div class="content-box">
            <h1 class="title">这是第一篇文章</h1>
            <p class="content">12111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</p>
            <div class="content-info">
                <span class="create_time">2023-04-15</span>
                <span class="creator">发布人：yyy</span>
            </div>
        </div>
        <div class="content-box">
            <h1 class="title">这是第一篇文章</h1>
            <p class="content">12111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</p>
            <div class="content-info">
                <span class="create_time">2023-04-15</span>
                <span class="creator">发布人：yyy</span>
            </div>
        </div>
    </div>
    <div class="footer"></div>
</template>

<script setup lang="ts">

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
    box-sizing: border-box;
    padding: 20px 20%;
    .content-box{
        box-sizing: border-box;
        cursor: pointer;
        padding: 10px;
        background: #fff;
        font-size: 12px;
        box-shadow: 0px 0px 10px #B2BDCC;
        border-radius: 10px;
        margin-bottom: 10px;
        &:hover{
            transform: translateY(-5px);
            box-shadow: 0px 0px 10px #1272FF;
        }
        .title{
            font-size: 20px;
            margin-bottom: 10px;
        }
        .content{
            width: 80%;
            margin-bottom: 10px;
            color: #B2BDCC;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            /** 对象作为伸缩盒子模型显示 **/
            -webkit-box-orient: vertical;
            /** 设置或检索伸缩盒对象的子元素的排列方式 **/
            -webkit-line-clamp: 2;
            /** 显示的行数 **/
            overflow: hidden;
            /** 隐藏超出的内容 **/
            word-wrap:break-word;
            /*英文强制换行*/
        }
        .content-info{
            padding: 0 5px;
            .creator{
                float: right;
            }
        }
    }
}
.footer{
    width: 100%;
    height: 100px;
}

</style>
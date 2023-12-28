<template>
    <div class="box">
        <h3>消费者监督投诉管理系统</h3>
        <span class="person">
            <span class="avator"></span>
            <span>Helo, name</span>
            <span>退出</span>
        </span>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.box{
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #fff;
    box-sizing: border-box;
    padding: 0 20px;
    h3{
        display: inline-block;
    }
    .person{
        float: right;
        line-height: 60px;
        span{
            margin: 0 5px;
        }
        .avator{
            display: inline-block;
            width: 30px;
            height: 30px;
            background: red;
            transform: translateY(20%);
        }
    }
}
</style>
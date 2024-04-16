<template>
    <div class="content-box" v-for="item in contentData" :key="item.id" @click="getContentDetail(item.id)">
        <h1 class="title">{{ item.title }}</h1>
        <p class="content">{{ item.content }}</p>
        <div class="content-info">
            <span class="create_time">{{ item.create_time }}</span>
            <span class="creator">发布人：{{ item.account }}</span>
        </div>
    </div>
    <el-dialog
        v-model="isShow"
        :title="contentDetail.title"
        width="700">
        <p class="detail-content">{{ contentDetail.content }}</p>
        <div class="detail-info">
            <span class="create_time">{{ contentDetail.create_time }}</span>
            <span class="creator">发布人：{{ contentDetail.account }}</span>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="isShow = false">关闭</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
    import {ref, getCurrentInstance, onMounted} from 'vue'
    import { contentType } from '@/type/content'

    const { proxy }: any = getCurrentInstance()
    const $api = proxy.$api
    const emit = defineEmits(['closeLoading'])

    const contentData = ref<Array<contentType>>([])
    const isShow = ref<Boolean>(false)
    const contentDetail = ref<any>({})
    const getData = async () => {
        const params = {
            page: 1,
            size: 10
        }
        try {
            const res = await $api.Content.getContentList(params)
            if (res.result) {
                contentData.value = res.data
                
            }
        } catch (error) {
            
        }
    }
    const getContentDetail = async (id: number) => {
        contentDetail.value = contentData.value.find(item => item.id === id)
        isShow.value = true
    }
    onMounted(() => {
        getData()
    })
</script>

<style lang="scss" scoped>
.content-box{
    box-sizing: border-box;
    cursor: pointer;
    padding: 10px;
    background: #fff;
    font-size: 12px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
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
        display: flex;
        justify-content: center;
        .creator{
            float: right;
        }
    }
}
.detail-info{
    margin-top: 20px;
    padding: 0 5px;
    display: flex;
    justify-content: center;
    .creator{
        float: right;
    }
}
.detail-content{
    color: #000;
}
</style>
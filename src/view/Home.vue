<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="/home/dashboard"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router
          >
            <el-menu-item
              v-for="item in menuList"
              :key="item.path"
              :index="item.path"
            >
              <el-icon><icon-menu /></el-icon>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                  首页
                </el-breadcrumb-item>
                <el-breadcrumb-item v-for="item in breadList" :key="item.path" :to="{ path: item.path }">
                  {{ item.meta.title }}
                </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component"/>
            </keep-alive>
          </router-view> 
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import { watch, ref } from 'vue'
    import Header from "@/view/Header.vue";
    import { Menu as IconMenu } from "@element-plus/icons-vue";
    import { menuList } from "@/json/Home";

    const route = useRoute()
    
    let breadList = ref<any>([])

    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    watch(route, () => {
      breadList.value = route.matched
    })
</script>

<style lang="scss" scoped>
.el-main {
  padding: 5px 20px;
}
.el-header {
  padding: 0;
  margin-bottom: 10px;
}
.el-menu{
  height: 100%;
  border-radius: 15px;
}
.el-aside{
  min-height: calc(100vh - 90px);
}
.breadcrumb{
  display: flex;
  align-items: center;
  height: 20px;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;
}
</style>
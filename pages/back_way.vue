<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            ref="menu"
            class="el-menu-vertical-demo"
            :default-active="activeMenu"
            router>
            <el-menu-item
              v-for="item in menuList"
              :key="item.path"
              :index="item.path">
              <el-icon><icon-menu /></el-icon>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="breadcrumb">
            <el-breadcrumb default-active="/back_way/dash_board" separator="/">
              <el-breadcrumb-item>
                  首页
                </el-breadcrumb-item>
                <el-breadcrumb-item
                  v-for="item in breadList" 
                  :key="item.path"
                  :to="{ path: item.path }">
                  {{ item.meta.title }}
                </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <NuxtPage v-slot="{ Component }">
            <component :is="Component"/>
          </NuxtPage> 
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import { watch, ref, onMounted, getCurrentInstance } from 'vue'
    import Header from "./components/Header.vue"
    import { Menu as IconMenu } from "@element-plus/icons-vue"
    const $request = useApi()
    const route = useRoute()

    const menu = ref<any>()
    const menuList = ref<any>([])
    const activeMenu = ref<string>('')
    let breadList = ref<any>([])
    watch(route, () => {
      breadList.value = route.matched.slice(1)
    }, {
      immediate: true
    })
    onMounted(() => {
      const role_level: number = JSON.parse(localStorage.getItem('userInfo') || '')?.role_level
      $request.Role.getRoleList({role_level, size: -1}).then((res: any) => {
        if (res.result) {
          menuList.value = res.data[0].menu
        }
      })
      activeMenu.value = route.path
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
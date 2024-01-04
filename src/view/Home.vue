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
            @open="() => handleOpen()"
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
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Header from "@/view/Header.vue";
import { Menu as IconMenu } from "@element-plus/icons-vue";
import { menuList } from "@/json/Home";
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
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
</style>
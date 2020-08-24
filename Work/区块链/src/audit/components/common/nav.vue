<template>
  <div id="nav">
    <div class="nav-logo">
      <img :src="logo" alt class="nav-logo-img" />
      <div class="nav-logo-title">
        <span class="f1">中国移动</span>
        <span class="f2">China Mobile</span>
      </div>
    </div>
    <el-row class="tac">
      <el-col>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="transparent"
          text-color="#fff"
          :router="true"
          @select="{selectSubmenu}"
          active-text-color="#fff"
          :collapse="isCollapse"
        >
          <el-menu-item index="/home" class="nav-menu-item">
            <i class="icon">
              <img :src="index" alt />
            </i>
            <span slot="title" class="title">首页</span>
          </el-menu-item>
          <el-submenu index="/StructureMaintenance" class="nav-menu-item">
            <template slot="title">
              <i class="icon">
                <img :src="catalog" alt />
              </i>
              <span class="title">目录链管理</span>
            </template>
            <el-menu-item index="/StructureMaintenance/metadataOverview">目录链组织结构维护</el-menu-item>
            <el-menu-item index="/StructureMaintenance/DataMaintenance">目录链开放数据维护</el-menu-item>
          </el-submenu>
          <el-menu-item index="/CatalogChain" class="nav-menu-item">
            <i class="icon">
              <img :src="index" alt />
            </i>
            <span slot="title" class="title">我的目录链</span>
          </el-menu-item>
          <el-submenu index="/application/management/ToDoList" class="nav-menu-item">
            <template slot="title">
              <i class="icon">
                <img :src="apply" alt />
              </i>
              <span class="title">申请管理</span>
            </template>
            <el-menu-item index="/application/management/ToDoList">我的待办</el-menu-item>
            <el-menu-item index="/application/management/WorkDoneList">我的已办</el-menu-item>
            <el-menu-item index="/application/management/ApplicationHistoryList">我的申请</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: require("@/assets/images/Logo.png"),
      apply: require("@/assets/images/base/iconApply.png"),
      catalog: require("@/assets/images/base/iconCatalog.png"),
      index: require("@/assets/images/base/iconIndex.png"),
      isCollapse: false
    };
  },
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    selectSubmenu(val) {
      console.log("val >", val);
    }
  }
};
</script>

<style lang="less" scoped>
.nav-logo {
  height: 108px;
  display: flex;
  justify-content: center;
  align-items: center;
  .nav-logo-img {
    width: auto;
    height: 45px;
  }
  .nav-logo-title {
    height: 45px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    color: #008bdb;
    font-weight: 400;
    justify-content: space-between;
    .f1 {
      font-size: 21px;
    }
    .f2 {
      font-size: 13px;
    }
  }
}
</style>

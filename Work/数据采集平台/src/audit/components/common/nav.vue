<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        :router="true"
        @select="{selectSubmenu}"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item index="bar">用户列表</el-menu-item>
          <el-menu-item index="process">用户角色</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
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
.el-submenu {
  text-align: left;
}
.el-submenu .el-menu-item {
  font-size: 20px;
}
.el-submenu__title {
  font-size: 20px;
}
</style>

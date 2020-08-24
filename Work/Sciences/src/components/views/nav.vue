<template>
  <div class="navs" :class="{'close':navStatus}">
    <!-- navs -->
    <el-row class="tac">
      <el-col>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="transparent"
          text-color="rgb(197, 202, 212)"
          active-text-color="rgb(51, 102, 255)"
          :router="true"
          @select="{selectSubmenu}"
          :collapse="navStatus"
        >
          <template v-for="(item) in routers">
            <!-- 无子菜单 -->
            <el-menu-item
              :index="item.children[0].path"
              class="nav-menu-item"
              v-if="!item.hidden&&item.singlePage"
              :key="item.id"
            >
              <i :class="item.meta.icon"></i>
              <span slot="title" class="title">{{item.meta.name}}</span>
            </el-menu-item>
            <!-- 有子菜单 -->
            <el-submenu
              :index="item.path"
              class="nav-menu-item"
              :key="item.id"
              v-else-if="!item.hidden&&!item.singlePage"
            >
              <template slot="title">
                <i :class="item.meta.icon"></i>
                <span class="title">{{item.meta.name}}</span>
              </template>
              <el-menu-item
                :index="subItem.path"
                v-for="(subItem) in item.children"
                :key="subItem.id"
              >{{subItem.meta.name}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "navs",
  data() {
    return {
      isCollapse: false,
      routers: this.$router.options.routes
    };
  },
  mounted() {
    console.log(this.$router)
    console.log(this.$route)
  },
  computed: {
    navStatus() {
      return this.$store.state.index.navStatus
    }
  },
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

<style scoped lang='scss'>
.navs {
  height: 100%;
  background-color: rgb(42, 61, 91);
  -webkit-transition: all 0.1s ease;
  transition: all 0.1s ease;
  width: 180px;
  &.close {
    width: 64px;
  }
  .tac {
    -webkit-transition: all 0.1s ease;
    transition: all 0.1s ease;
  }
}
.el-submenu {
  text-align: left;
}
</style>

<template>
  <div class="navs" >
    <!-- navs -->
    <el-row class="tac">
      <el-col>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="rgb(238,241,252)"
          text-color="rgb(72,72,72)"
          active-text-color="rgb(93, 119, 228)"
          :router="true"
          @select="{selectSubmenu}"
        >
          <template v-for="(item) in routers">
            <!-- 无子菜单 -->
            <el-menu-item
              :index="item.children[0].path"
              class="nav-menu-item"
              v-if="!item.hidden&&item.meta.singlePage"
              :key="item.id"
            >
              <i :class="item.meta.icon"></i>
              <!-- <img :src="icon[item.meta.icon]" alt /> -->
              <span slot="title" class="title">{{item.meta.name}}</span>
            </el-menu-item>
            <!-- 有子菜单 -->
            <el-submenu
              :key="item.id"
              v-else-if="!item.hidden&&!item.meta.singlePage"
              :index="item.path"
            >
              <template slot="title">
                <i :class="item.meta.icon"></i>
                <!-- <img :src="icon[item.meta.icon]" alt /> -->
                <span class="title">{{item.meta.name}}</span>
              </template>
              <el-menu-item-group>
                <template v-for="(it) in item.children">
                  <el-menu-item :index="it.path" :key="it.id">
                    <i :class="it.meta.icon"></i>
                    {{it.meta.name}}
                  </el-menu-item>
                </template>
              </el-menu-item-group>
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
      routers: this.$router.options.routes,
      icon: {
        ia: require("../../assets/images/nav/ia.png"),
        ib: require("../../assets/images/nav/ib.png"),
        id: require("../../assets/images/nav/id.png"),
        ir: require("../../assets/images/nav/ir.png"),
        it: require("../../assets/images/nav/it.png"),
      },
      iconc: {
        ia: require("../../assets/images/nav/iac.png"),
        ib: require("../../assets/images/nav/ibc.png"),
        id: require("../../assets/images/nav/idc.png"),
        ir: require("../../assets/images/nav/irc.png"),
        it: require("../../assets/images/nav/itc.png"),
      },
    };
  },
  mounted() {},
  computed: {
    navStatus() {
      return this.$store.state.index.navStatus;
    },
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
    },
  },
};
</script>

<style scoped lang='scss'>
.navs {
  height: 100%;
  background-color: #eef1fc;
  -webkit-transition: all 0.1s ease;
  transition: all 0.1s ease;
  width: 220px;
  padding-top: 20px;
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

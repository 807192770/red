<template>
  <div class="privilege-management">
    <!-- 权限管理 -->
    <div class="main">
      <div class="nav">
        <el-row class="tac">
          <el-col class>
            <el-menu
              :default-active="activeIndex"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              unique-opened
              @select="handleSelect" router
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="icon">
                    <img style="height:18px;" src="@/assets/images/base/user.png" alt />
                  </i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <router-link to="/privilege-management/addUser">
                    <el-menu-item index="addUser">新建用户</el-menu-item>
                  </router-link>
                  <router-link to="/privilege-management/manageUser">
                    <el-menu-item index="manageUser">管理用户</el-menu-item>
                  </router-link>
                </el-menu-item-group>
              </el-submenu>
               <el-submenu index="2">
                <template slot="title">
                  <i class="icon">
                    <img src="@/assets/images/base/account.png" alt />
                  </i>
                  <span>角色管理</span>
                </template>
                <el-menu-item-group>
                  <router-link to="/privilege-management/manageRole">
                    <el-menu-item index="manageRole">角色管理</el-menu-item>
                  </router-link>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="icon">
                    <img src="@/assets/images/base/account.png" alt />
                  </i>
                  <span>账户管理</span>
                </template>
                <el-menu-item-group>
                  <router-link to="/privilege-management/maintain">
                    <el-menu-item index="maintain">信息维护</el-menu-item>
                  </router-link>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="form">
        <!-- <keep-alive> -->
        <router-view class="router-view" />
        <!-- </keep-alive> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "addUser"
    };
  },

  watch: {
    $route: function(to, from) {
      this.activeIndex = to.path.split("/")[2] ? to.path.split("/")[2] : "";
      this.handleSelect(this.activeIndex)
    }
  },

  mounted() {
    this.activeIndex = this.$route.path.split("/")[2];
  },

  methods: {
    getMapLine() {
      var params = {
        task: "cityGroupContanctPeople",
        statisDate: this.day
      };
      getCityAnalysisGroup(params).then(response => {
        sessionStorage.setItem("mapLineData", JSON.stringify(response.data));
        this.mapAllData = response.data;
      });
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
     handleSelect (index) {
      	this.activeIndex = index
    }
  }
};
</script>
<style lang='scss' scoped>
.privilege-management {
  display: flex;
  justify-content: center;

  .main {
    width: 80%;
    display: flex;
    background: white;
    padding: 20px 0;
    min-height: 720px;
    .nav {
      height: 100%;
      flex: 0.28;
      i.icon {
        vertical-align: 1px;
        img {
          width: auto;
          height: 18px;
        }
      }
      .tac {
        height: 100%;
        .el-col {
          height: 100%;
          .el-menu-vertical-demo /deep/ {
            height: 100%;
            .el-menu-item.is-active {
              background: #e6f7ff;
              color: #1e92fe;
              border-right: 1px solid #1e92fe;
            }
          }
        }
      }
    }
    .form {
      flex: 1;
    }
  }
}
</style>

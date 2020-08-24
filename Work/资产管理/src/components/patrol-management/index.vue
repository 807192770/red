<template>
  <div class="patrol-management">
    <!-- 巡检管理 -->
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
            >
              <router-link to="/patrol-management/addPatrolManagement">
                <el-menu-item index="addPatrolManagement">
                  <span slot="title">新建巡检</span>
                </el-menu-item>
              </router-link>
              <router-link to="/patrol-management/existPatrolManagement">
                <el-menu-item index="existPatrolManagement">
                  <span slot="title">已有巡检</span>
                </el-menu-item>
              </router-link>
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
      activeIndex:'addPatrolManagement'
    };
  },

  components: {},

  
 watch: {
    $route: function(to, from) {
      this.activeIndex = to.path.split("/")[2] ? to.path.split("/")[2] : "";
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
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang='scss' scoped>
.patrol-management {
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

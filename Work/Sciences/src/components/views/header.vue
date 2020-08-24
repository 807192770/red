<template>
  <div class="headers">
    <!-- headers -->
    <div class="headers-title">
      <img src="@/assets/images/logo.png" alt="移动logo" class="headers-logo" />
      <span class="headers-txt" v-show="!navStatus">Pylon系统</span>
      <i
        class="el-icon el-icon-20 el-icon-s-unfold"
        :class="navStatus?'':'tran'"
        @click="closeNav()"
      ></i>
    </div>
    <div class="headers-operate">
      <div class="build-select-container">
        <el-select v-model="buildValue" multiple placeholder="选择楼宇" size="small">
          <el-option
            v-for="item in buildOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="department-select-container">
        <el-select v-model="departmentValue" multiple size="small" placeholder="全部部门">
          <el-option
            v-for="item in departmentOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span class="alldepart_tip" @click="departmentFocus">全部部门</span>
      </div>
      <span class="remind-container">
        <i class="el-icon-message-solid el-icon-20"></i>
      </span>
      <span class="user-container">
        <el-dropdown trigger="click">
          <span>
            <el-avatar :size="30" :src="circleUrl"></el-avatar>
            <span class="user-name">演示用户</span>
            <i class="el-icon-more"></i>
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i class="el-icon-switch-button"></i>退出登陆
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="el-icon-folder-add"></i>保存登陆地址
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "headers",
  data() {
    return {
      buildOptions: [
        {
          value: "住宅楼",
          label: "住宅楼"
        },
        {
          value: "办公楼",
          label: "办公楼"
        },
        {
          value: "写字楼",
          label: "写字楼"
        }
      ],
      departmentOptions: [
        {
          value: "全部部门",
          label: "全部部门"
        },
        {
          value: "业务",
          label: "业务"
        },
        {
          value: "销售",
          label: "销售"
        },
        {
          value: "后勤",
          label: "后勤"
        }
      ],
      departmentValue: ["全部部门", "业务", "销售", "后勤"],
      buildValue: [],
      departmentStatus: "false",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  mounted() {},
  computed: {
    navStatus() {
      return this.$store.state.index.navStatus;
    }
  },
  methods: {
    closeNav() {
      this.$store.dispatch("changeNavStatus", {});
    },
    departmentFocus() {}
  }
};
</script>

<style scoped lang='scss'>
.headers {
  height: 51px;
  line-height: 51px;
  z-index: 999;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  transition: width 0.28s;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  .headers-title {
    display: flex;
    align-items: center;
    .headers-logo {
      width: 30px;
      height: auto;
      margin-right: 10px;
    }
    .headers-txt {
      color: #333;
      margin-right: 45px;
      transition: 0.3s;
      font-size: 14px;
    }
    .el-icon {
      margin-left: 10px;
      -webkit-transition: 0.5s;
      transition: 0.5s;
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
    }
  }
  .headers-operate {
    display: flex;
    align-items: center;
    .department-select-container {
      margin-left: 20px;
      position: relative;
      .alldepart_tip {
        position: absolute;
        top: 11px;
        left: 2px;
        right: 30px;
        font-size: 12px;
        z-index: 200;
        line-height: 30px;
        background-color: #fff;
        color: #333;
        cursor: pointer;
        border-radius: 3px;
        padding-left: 10px;
        // display: none;
      }
    }
    .remind-container {
      margin: 0 20px;
      color: #666;
    }
    .user-container {
      display: flex;
      align-items: center;
      cursor: pointer;
      .user-name {
        margin: 0 10px;
      }
      .el-icon-more {
        transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        -o-transform: rotate(90deg);
      }
    }
  }
}
.tran {
  transform: rotate(180deg);
}
</style>

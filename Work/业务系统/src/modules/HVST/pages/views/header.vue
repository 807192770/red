<template>
  <div class="headers">
    <!-- headers -->
    <div class="headers-title">
      <img src="../../assets/images/logo.png" alt="朗信云平台logo" class="headers-logo" />
      <span class="headers-txt">朗信云平台</span>
      <i
        class="el-icon el-icon-20 el-icon-s-unfold"
        :class="navStatus?'':'trans'"
        @click="closeNav()"
      ></i>
    </div>
    <div class="headers-operate">
      <span class="screen-container">
        <img :src="screen" alt />
        全屏显示
      </span>
      <span class="partition">丨</span>
      <span class="phone-container">
        <img :src="help" alt />
        帮助中心
      </span>
      <span class="partition">丨</span>
      <span class="remind-container">
        <img :src="alert2" alt v-if="JSON.parse(navStatus)" />
        <img :src="alert" alt v-else />
        <el-popover
          placement="bottom"
          popper-class="alert-container"
          width="275"
          trigger="hover"
          @show="getQueryAlertCenter"
        >
          <alertDetails :alertList="alertList" :count="count" @hide="hide" />
          <span slot="reference">报警中心</span>
        </el-popover>
      </span>
      <span class="quit-container" @click="quitOut()">
        <img :src="quit" alt />
        退出
      </span>
    </div>
  </div>
</template>

<script>
import alertDetails from "../../components/alertDetails";
import { GetTaskIndex } from "../../api/taskManagement";
import { GetQueryAlertCenter } from "../../api/dataAlert";
export default {
  name: "headers",
  data() {
    return {
      quit: require("../../assets/images/icon-quit.png"),
      alert: require("../../assets/images/icon-alert.png"),
      alert2: require("../../assets/images/icon-alert2.png"),
      help: require("../../assets/images/icon-help.png"),
      screen: require("../../assets/images/icon-screen.png"),
      visible: false,
      alertList: [],
      count: 0,
    };
  },
  components: { alertDetails },
  mounted() {},
  computed: {
    navStatus() {
      if (this.$store.state.index.navStatus == false) {
        // 有undefined情况
        return this.$cookie.get("Alert-GYFZ")
          ? this.$cookie.get("Alert-GYFZ")
          : false;
      } else {
        return this.$store.state.index.navStatus;
      }
    },
  },
  methods: {
    getQueryAlertCenter() {
      this.visible = !this.visible;
      if (this.visible) {
        GetQueryAlertCenter()
          .then((r) => {
            console.log(r);
            this.alertList = r.data;
            this.count = r.count;
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    hide() {
      this.visible = false;
    },
    closeNav() {
      this.$store.dispatch("changeNavStatus", {});
    },
    quitOut() {
      this.$cookie.remove("Alert-GYFZ");
      window.location = process.env.ENV_URL_PRODUSTLIST;
    },
  },
};
</script>

<style scoped lang='scss'>
.headers {
  height: 80px;
  line-height: 80px;
  z-index: 999;
  background: #5d77e4;
  transition: width 0.28s;
  display: flex;
  color: #fff;
  justify-content: space-between;
  padding: 0 20px;
  .headers-title {
    display: flex;
    align-items: center;
    .headers-logo {
      width: 45px;
      height: auto;
      margin-right: 10px;
    }
    .headers-txt {
      color: #fff;
      margin-right: 45px;
      transition: 0.3s;
      font-size: 24px;
    }
    .el-icon {
      display: none;
      margin-left: 10px;
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
    }
  }
  .headers-operate {
    display: flex;
    align-items: center;
    .remind-container,
    .phone-container,
    .quit-container,
    .screen-container {
      // &:hover {
      //   transform: scale(1.2);
      //   -ms-transform: scale(1.2);
      //   -moz-transform: scale(1.2);
      //   -webkit-transform: scale(1.2);
      //   -o-transform: scale(1.2);
      // }
      // transition: all 0.5s;
      // -webkit-transition: all 0.5s;
      color: #fff;
      cursor: pointer;
      img {
        width: 18px;
        vertical-align: -3px;
      }
    }
    .partition {
      margin: 0 10px;
    }
    .quit-container {
      margin-left: 45px;
    }
  }
}
.trans {
  transform: rotate(180deg);
}
.el-popover__reference {
  outline: none !important;
}
</style>

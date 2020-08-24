<template>
  <div id="app">
    <div class="head" v-if="this.$route.name!='login'">
      <div class="head-center">
        <div class="platform">
          <router-link to="/real-time-monitoring" tag="div" class="logo">
            <img src="@/assets/images/logo.png" alt="移动logo" />
            <span>资产定位管理系统</span>
          </router-link>
        </div>
        <ul class="tabs">
          <li
            v-for="(item, index) in menulist"
            :key="index"
            @mouseover="enter(index)"
            @mouseout="out()"
          >
            <div v-if="item.link" class="item">
              <router-link :to="item.link" tag="div">
                <div class="title">
                  <img :src="require(`@/assets/images/base/icon${index}.png`)" alt />
                  <span>{{item.name}}</span>
                </div>
              </router-link>
            </div>
            <div v-else :class="[{'active': haveCur}]" class="item">
              <div class="title">
                <img :src="require(`@/assets/images/base/icon${index}.png`)" alt />
                <span>{{item.name}}</span>
              </div>
              <div class="children" v-show="subMenu">
                <div v-for="(key, index) in item.children"  :key="index">
                  <router-link :to="key.link" tag="div">{{key.name}}</router-link>
                </div>
              </div>
            </div>
          </li>
          <li v-if="AuFlag">
            <div class="item">
              <router-link to="/privilege-management" tag="div">
                <div class="title">
                  <img :src="require(`@/assets/images/base/icon5.png`)" alt />
                  <span>权限管理</span>
                </div>
              </router-link>
            </div>
          </li>
        </ul>

        <div class="login">
          <router-link to="/" tag="div">
            <span>用户名</span>
            <i>
              <img src="@/assets/images/base/quit.png" alt />
            </i>
          </router-link>
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view class="router-view" v-if="isRouterAlive" />
    </keep-alive>
  </div>
</template>

<script>
import { getMenus } from "./api/index";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true,
      menulist: [
        { name: "实时监控", link: "/real-time-monitoring" },
        {
          name: "告警管理",
          children: [
            { name: "告警设置", link: "/alarm-management/setting" },
            { name: "告警日志", link: "/alarm-management/details" }
          ]
        },
        { name: "历史轨迹", link: "/historical-track" },
        // { name: "权限管理", link: "/privilege-management" },
        { name: "巡检管理", link: "/patrol-management" },
        { name: "全局盘点", link: "/global-inventory" }
      ],
      subMenu: false,
      haveCur: false,
      AuFlag: true
    };
  },
  watch: {
    $route: function(to, from) {
      this.haveCur = to.path.split("/")[1] == "alarm-management" ? true : false;
    }
  },
  mounted() {
    // this.getMenus();
    this.haveCur = this.$route.path.split("/")[1] == "alarm-management" ? true : false;
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    enter(index) {
      this.subMenu = index == 1 ? true : false;
    },
    out() {
      this.subMenu = false;
    },
    getMenus() {
      getMenus().then(res => {
        const data = res.data.data;
        data.forEach(item => {
          this.AuFlag = item.name == "权限管理" ? true : false;
        });
      });
    }
  }
};
</script>
<style>
</style>

<style scoped lang="scss">
#app {
  width: 100%;
  height: 100%;

  .head {
    width: 100%;
    background-color: #01141f;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    .head-center {
      width: 80%;
      height: 85px;
      display: flex;
      justify-content: space-between;
      color: #7f898e;
      .platform {
        display: flex;
        align-items: center;
        cursor: pointer;
        .logo {
          height: 100%;
          display: flex;
          align-items: center;
          span {
            font-size: 18px;
            margin-left: 15px;
            color: #969ea2;
          }
        }
      }

      .tabs {
        display: flex;
        align-items: center;
        font-size: 18px;
        z-index: 999;
        li {
          height: 100%;
          display: flex;
          align-items: center;
          div.item {
            cursor: pointer;
            width: 180px;
            position: relative;
            text-align: center;
            color: #ffffff;

            .title {
              opacity: 0.65;
              img {
                height: 20px;
                width: auto;
                vertical-align: -2px;
              }
              span {
                color: #fff;
              }
            }

            .children {
              z-index: 998;
              position: absolute;
              top: 52.5px;
              width: 100%;
              border-radius: 0 0 5px 5px;
              overflow: hidden;
              // display: none;

              div {
                line-height: 50px;
                background: #001529;
                color: #717b82;
                &.router-link-active,
                &:hover {
                  color: #fff;
                  opacity: 1;
                  background: #1890ff;
                }
              }
            }
            &.active {
              .title {
                opacity: 1;
              }
            }
          }
          &:hover {
            div.item {
              .title {
                opacity: 1;
              }
            }
            // .children{
            //   display: block!important;
            // }
          }
          div.item > div.router-link-active {
            .title {
              opacity: 1;
            }
          }
        }
      }

      .login {
        line-height: 85px;
        color: #fff;
        font-size: 15px;
        opacity: 0.65;
        cursor: pointer;
        i {
          img {
            width: 20px;
            height: auto;
            vertical-align: -4px;
          }
        }
        &:hover {
          opacity: 1;
        }
      }
    }
  }

  .router-view {
    padding-bottom: 0px;
    margin-bottom: 30px;
  }
}
</style>

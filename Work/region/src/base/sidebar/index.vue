<template>
  <div class="sidebar">
    <ul>
      <li v-for="(item, index) in menuList">
        <div class="first-m clearfix" @click="changesecond(item, index)" v-show="!item.firstlink">
          <i class="el-icon-user-solid floatleft mr20"></i>
          <span class="floatleft">{{item.firstmenu}}</span>
          <i
            class="floatright"
            :class="{'el-icon-arrow-down':item.isshow == true,'el-icon-arrow-right':item.isshow == false,}"
          ></i>
        </div>
        <div
          class="first-m clearfix"
          @click="changesecond(item, index)"
          v-show="item.firstlink"
          style="padding:0px;"
        >
          <router-link
            :to="{name:item.firstlink}"
            tag="span"
            @click.native="getlinkname(item.firstmenu)"
            style="display: inline-block;padding: 15px 20px;width: 200px;"
          >
            <i class="el-icon-user-solid mr20"></i>
            <span>{{item.firstmenu}}</span>
          </router-link>

          <!-- <i class="floatright" :class="{'el-icon-arrow-down':item.isshow == true,'el-icon-arrow-right':item.isshow == false,}"></i> -->
        </div>
        <div class="second-m" v-show="item.isshow">
          <router-link
            v-for="(item1, index1) in item.secondmenu"
            :key="index1"
            tag="div"
            @click.native="getlinkname(item1.name)"
            :to="{name:item1.link}"
          >{{item1.name}}</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      menuList: [
        {
          firstmenu: "用户管理",
          isshow: false,
          secondmenu: [
            {
              name: "用户管理",
              link: "userManage"
            },
            {
              name: "客群管理",
              link: "customerGroup"
            }
          ]
        },
        {
          firstmenu: "菜单2",
          firstlink: "userRights",
          isshow: false,
          secondmenu: []
        },
        {
          firstmenu: "题目管理",
          isshow: false,
          secondmenu: [
            {
              name: "题库管理",
              link: "manage"
            },
            {
              name: "题目配置",
              link: "configure"
            }
          ]
        }
      ]
    };
  },
  watch: {},
  created() {
    this.getcurrentroute();
  },
  methods: {
    getcurrentroute() {
      var currentroutename = this.$router.history.current.name;
      this.menuList.forEach(el => {
        if (el.firstlink) {
          if (el.firstlink == currentroutename) {
            el.isshow = true;
          }
        }
        if (el.secondmenu) {
          el.secondmenu.forEach(secel => {
            if (secel.link == currentroutename) {
              el.isshow = true;
            }
          });
        }
      });
    },
    changesecond(item, index) {
      item.isshow = !item.isshow;
    },
    getlinkname(item) {
      // this.$emit('siderbarName', item)
    }
  }
};
</script>
<style scoped lang="scss">
.sidebar {
  width: 200px;
  background-color: #1d272a;
  position: fixed;
  // top: 60px;
  top: 0;
  left: 0;
  height: 100%;
  color: #ffffff;
  ul {
    li {
      div {
        padding: 0 10px 0 20px;
        &.first-m {
          padding: 15px 20px;
          cursor: pointer;
          span {
            &.router-link-active {
              color: deepskyblue;
            }
          }
        }
        &.second-m {
          padding: 0px;
          div {
            border-left: 2px solid #1d272a;
            padding: 15px 0px 15px 60px;
            cursor: pointer;
            &.router-link-active {
              border-left: 2px solid deepskyblue;
              background-color: #121b1d;
              color: deepskyblue;
            }
          }
        }
      }
    }
  }
}
</style>
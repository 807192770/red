<template>
  <div id="app">
    <div class="head" v-if="this.$route.name!='login'">
      <div class="platform">
        <span class="logo">
          <img src="../src/assets/images/logo.png" alt />
        </span>
        <h3 class="title">区域人口热图</h3>
      </div>
      <ul class="tabs">
        <li v-for="(item, index) in menulist">
          <router-link :to="{name:item.link}" tag="div">{{item.name}}</router-link>
        </li>
      </ul>
      <div class="login">
        <!-- <p>欢迎 代用名</p> -->
      </div>
    </div>
    <router-view class="router-view" v-if="isRouterAlive" />
  </div>
</template>

<script>
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
        { name: "区域人口分布", link: "populationDistribution" },
        { name: "区域人口流动", link: "floatingPopulation" }
        // {name:'流动人口分析', link:'floatingPopulation'},
        // {name:'常住人口分析', link:'populationDistribution'},
      ]
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
font,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
center,
u,
b,
i {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-weight: normal;
  font-style: normal;
  font-family: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
}
body {
  line-height: 1;
  background: #f7f7f7;
  color: #333333;
  font-size: 0.14rem;
}
:focus {
  outline: 0;
}
ol,
ul {
  list-style: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
}
blockquote,
q {
  quotes: "";
}
input,
textarea {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
hr {
  margin: 0;
  padding: 0;
  border: 0;
  color: #000;
  background-color: #000;
  height: 1px;
}
/*input placeholder颜色*/

:-moz-placeholder {
  color: #bababa;
}

::-moz-placeholder {
  color: #bababa;
}

input:-ms-input-placeholder {
  color: #bababa;
}

input::-webkit-input-placeholder {
  color: #bababa;
}
/*清浮动*/
.clearfix:after,
.clearfix:before {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
/*浮动*/
.floatleft {
  float: left;
}
.floatright {
  float: right;
}
/*字体*/
.fz12 {
  font-size: 12px;
}
.fz14 {
  font-size: 14px;
}
.fz16 {
  font-size: 16px;
}
.fz18 {
  font-size: 18px;
}
/* 对齐方式 */
.text-align-center {
  text-align: center;
}
.text-align-left {
  text-align: left;
}
.text-align-right {
  text-align: right;
}
</style>
<style scoped lang="scss">
#app {
  width: 100%;
  min-height: 100%;
  color: #ffffff;
  background: url("../src/assets/images/bg.jpg") no-repeat;
  background-size: 100% 100%;
  .head {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    color: #ffffff;
    .platform {
      display: flex;
      align-items: center;
      .logo {
        margin-left: 20px;
      }
      .title {
        font-size: 32px;
        line-height: 100px;
        padding-left: 20px;
        color: #ffffff;
      }
    }
    .tabs {
      display: flex;
      align-items: center;
      color: #6a8abb;
      margin-left: -15%;
      font-size: 18px;
      li {
        margin: 0 10px;
        div {
          cursor: pointer;
          padding: 8px 0;
          &.router-link-active {
            color: #ffffff;
            border-bottom: 1px solid #ffffff;
          }
        }
      }
    }
    .login {
      line-height: 100px;
      margin-right: 20px;
    }
  }
  .router-view {
    padding: 20px;
    padding-bottom: 0px;
    // margin-top: 100px;
  }
}
</style>

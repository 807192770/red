<template>
  <div id="app">
    <div class="head" v-if="this.$route.name!='login'" >
      <div class="platform">
        <span class="logo"><img src="../src/assets/images/logo.png" alt=""></span>
        <h3 class="title"><img src="../src/assets/images/headerTitle.png" alt=""></h3>
      </div>
      <ul class="tabs">
        <li v-for="(item, index) in menulist">
          <router-link :to="{name:item.link}" tag="div">{{item.name}}</router-link>
        </li>
      </ul>
      <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"> -->
      <!-- <el-menu class="el-menu-demo" mode="horizontal" >
        <el-submenu index="1">
          <template slot="title">京津冀协同发展</template>
          <el-menu-item index="1-1"><router-link :to="{name:'urbanAgglomeration'}" tag="div">城市群分析</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link :to="{name:'floatingPopulation'}" tag="div">雄安新区建设</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">智慧城市运营规划</template>
          <el-menu-item index="2-1"><router-link :to="{name:'permanentPopulation'}" tag="div">城市规划治理</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link :to="{name:'populationInsight'}" tag="div">区域人口洞察</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">重点区域监控</template>
          <el-menu-item index="3-1"><router-link :to="{name:'regionEmergency'}" tag="div">应急预警管理</router-link></el-menu-item>
          <el-menu-item index="3-2"><router-link :to="{name:'roadMonitoring'}" tag="div">重要卡口监控</router-link></el-menu-item>
        </el-submenu>
      </el-menu> -->
      <div class="login">
        <!--<p>欢迎 代用名</p>-->
      </div>
    </div>
    <keep-alive>
      <router-view class="router-view" v-if="isRouterAlive" />
    </keep-alive>
    <!-- <div class="shadow-box">
      <div class="shadow">
        {{currentContent}}
      </div>
    </div> -->
  </div>
</template>

<script>
  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        num:-1,
        isRouterAlive:true,
        menulist:[
          // {name:'活跃人口分析', link:'activePopulation'},
          // {name:'职住人口分析', link:'permanentPopulation'},
          // {name:'区域人口洞察', link:'populationInsight'},
          // {name:'流动人口分析', link:'floatingPopulation'},
          // {name:'城市群分析', link:'urbanAgglomeration'},
          // {name:'雄安人口分析', link:'xionganActive'},
          {name:'京津冀协同发展', link:'urbanAgglomeration'},
          {name:'雄安新区建设', link:'floatingPopulation'},
          {name:'城市规划治理', link:'permanentPopulation'},
          // {name:'区域应急管理', link:'regionEmergency'},
          // {name:'区域道路监控', link:'roadMonitoring'},
          
          // {name:'区域人口分布', link:'populationDistribution'},
        ],
        shadowContent:[
        '监测城市群活跃度与协同发展，支持京津冀一体化战略规划与决策',
        '监测雄安人口流入，支持新区规划和产业发展',
        '分析城市人口潮汐流动，规划城市功能布局和空间拓展',
        '洞察城市区域人口构成及职住，优化城市布局，提高宜居指数',
        '应急预警管理:重点区域人群监控，应急预警信息精准及时触达',
        '重要卡口监控:重要卡口人流监控预测，提前疏导限流',
        ],
        currentContent:'监测城市群活跃度与协同发展，支持京津冀一体化战略规划与决策',
      }
    },
    mounted() {
      // 自动播放
      // var menuLength = this.menulist.length
      // setInterval(()=>{
      //   if(this.num < this.menulist.length - 1) {
      //     this.num++;
      //   }else {
      //     this.num = 0;
      //   }
      //   this.$router.push({ name: this.menulist[this.num].link })
      //   this.currentContent = this.shadowContent[this.num]
      //   console.log(this.num)
      // },5000)
    },
    
 watch:{
      '$route.name':function(newVal,oldVal){
        //console.log(newVal+"---"+oldVal);
        console.log(newVal)
        switch (newVal)
          {
            case 'urbanAgglomeration':
                this.currentContent = this.shadowContent[0]
                break;
            case 'floatingPopulation':
                this.currentContent = this.shadowContent[1]
                break;
            case 'permanentPopulation':
                this.currentContent = this.shadowContent[2]
                break;
            case 'populationInsight':
                this.currentContent = this.shadowContent[3]
                break;
            case 'regionEmergency':
                this.currentContent = this.shadowContent[4]
                break;
            case 'roadMonitoring':
                this.currentContent = this.shadowContent[5]
                break;
          }
      }
 },
    methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true
        });
      },
    },
  }
</script>
<style>
.head .el-menu.el-menu--horizontal{
  border-bottom: none;
}
.head .el-menu{
  background-color: transparent;
}
.head .el-menu--horizontal>.el-submenu .el-submenu__title{
  height: 100px;
  line-height: 100px;
  font-size: 21px!important;
}
.head .el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
  color: #ffffff;
}
.head .el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
  color: #ffffff;
  
}
.head .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
  background-color: rgb(3, 17, 39,0.5);
  color: #ffffff;
}
.el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu .el-submenu__title{
  background-color: transparent!important;
}
.el-menu{
  background-color: rgb(3, 17, 39,0.9)!important;
}
.el-menu--horizontal .el-menu .el-menu-item.is-active{
  background-color: #2181EA!important;
  color: #ffffff!important;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover{
  color: #ffffff!important;
  border-bottom: 1px solid #2181EA!important;
}
.el-menu--horizontal>.el-submenu .el-submenu__title{
  color: #5C80B8!important;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p,
blockquote, pre, a, abbr, acronym, address, big,
cite, code, del, dfn, em, font, img,
ins, kbd, q, s, samp, small, strike,
strong, sub, sup, tt, var, dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
center, u, b, i {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-weight: normal;
    font-style: normal;
    font-size: 100%;
    font-family: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
}
html,body{
  width: 100%;
  height: 100%;
}
body {
    line-height: 1;
    background: #f7f7f7;
    color: #333333;
    font-size: 14px;
}
:focus {
    outline: 0
}
ol, ul {
    list-style: none
}
table {
    border-collapse: collapse;
    border-spacing: 0
}
blockquote:before, blockquote:after, q:before, q:after {
    content: ""
}
blockquote, q {
    quotes: ""
}
input, textarea {
    margin: 0;
    padding: 0
}
a{text-decoration:none}
hr {
    margin: 0;
    padding: 0;
    border: 0;
    color: #000;
    background-color: #000;
    height: 1px
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
    display: table
}
.clearfix:after {
    clear: both
}
/*浮动*/
.floatleft {
    float: left;
}
.floatright {
    float: right;
}
/*字体*/
.fz12{
    font-size: 12px;
}
.fz14{
    font-size: 14px;
}
.fz16{
    font-size: 16px;
}
.fz18{
    font-size: 18px;
}
/* 对齐方式 */
.text-align-center{
    text-align: center;
}
.text-align-left{
    text-align: left;
}
.text-align-right{
    text-align: right;
}
</style>

<style scoped lang="scss">
  #app {
    width: 100%;
    height: 100%;
    background-color: #020d19;
    color: #ffffff;

    .head {
      width: 100%;
      height: 100px;
      background-color: #0a1d3d;
      display: flex;
      justify-content: space-between;
      color: #FFFFFF;

      .platform {
        display: flex;
        align-items: center;

        .logo {
          margin-left: 20px;
        }

        .title {
          padding-left: 24px;
        }
      }

      .tabs {
        display: flex;
        align-items: center;
        color: #6a8abb;
        /*margin-left: -15%;*/
        margin-right: -25%;
        font-size: 18px;
        li{
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
      padding: 28px 16px 20px 16px;
      padding-bottom: 0px;
      // margin-top: 100px;
    }
    .shadow-box{
      background-color:transparent;
      width: 100%;
      height: 100px;
      display: flex;
      left: 0;
      bottom: 0;
      z-index: 99999999;
      justify-content: center;
      position: fixed;
      .shadow{
        // background-color: rgba(0,54,113,0.7);
        background: -webkit-linear-gradient(left, red , blue); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, red, blue); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, red, blue); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, red , blue); /* 标准的语法 */
        width: 100%;
        height: 100px;
        font-size: 30px;
        line-height: 100px;
        text-align: center;
        margin: 0 auto;
      }
    }
  }

</style>

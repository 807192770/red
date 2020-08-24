<template>
  <div class="headers">
    <div class="left">
      <i class="el-icon-s-fold"></i>
    </div>
    <!-- 
        首页中间导航 [我的项目、我的合约、技术文档、帮助中心]
    -->
    <ul class="middle">
      <li>我的项目</li>
      <li>我的合约</li>
      <li>技术文档</li>
      <li>帮助中心</li>
    </ul>
    <div class="right">
      <el-avatar size="large" :src="circleUrl"></el-avatar>
      <div class="right-admin">admin</div>
    </div>
  </div>
</template>

<script>
import path from "path";
export default {
  name: "Headers",
  data() {
    return {
      circleUrl: require("@/assets/images/admin.png")
    };
  },
  props: {
    msg: String
  },
  mounted() {
    // console.log(this.$store);
    // console.log("path", this.circleUrl);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.headers {
  background: #fff;
  overflow: hidden;
  padding: 0 25px;
  text-align: center;
  border-bottom:1px solid #ccc ;
  .left,
  .right,
  .middle {
    height: 60px;
    line-height: 60px;
  }
  .left {
    float: left;
    font-size: 25px;
  }
  .middle {
    display: inline-block;
    li {
      float: left;
      margin: 0 20px;
      font-weight: 400;
    }
  }
  .right {
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    .right-admin {
      flex: 1;
      height: 60px;
      margin-left: 20px;
      color: #666666;
    }
    .right-image {
      flex: 1;
      background: yellow;
      vertical-align: center;
    }
  }
}
</style>

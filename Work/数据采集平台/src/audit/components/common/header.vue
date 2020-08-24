<template>
  <div class="headers">
      <div class="left">
        <img src="">
        <span class="left-com">中移雄研</span>
        <span class="left-con">数据审批平台</span>
      </div>
      <div class="right">
        <el-avatar size="large" :src=circleUrl></el-avatar>
        <div class="right-admin">admin</div>
      </div>
  </div>
</template>

<script>
  import path from 'path';
  export default {
    name: 'Headers',
    data() {
      return {
        circleUrl: path.normalize('/src/assets/images/admin.png'),
      }
    },
    props: {
      msg: String,
    },
    mounted(){
      console.log(this.$store)
      console.log('path', this.circleUrl);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .headers {
    height: 80px;
    background: #636e76;
    overflow: hidden;
    padding: 0 10px;
    .left, .right {
      height: 80px;
      line-height: 80px;
    }
    .left {
      float: left;
      .left-com{
        color: #3CA5FF;
        font-size: 28px;
        font-weight: bold;
      }
      .left-con{
        color: #ecf2f6;
        display: inline-block;
        margin-left: 20px;
        font-size: 22px;
      }
    }
    .right{
      float: right;
      padding-right: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      .right-admin {
        flex: 1;
        height: 80px;
        margin-left: 20px;
        color: #ffffff;
      }
      .right-image {
        flex: 1;
        background: yellow;
        vertical-align: center;
      }
    }
  }
</style>

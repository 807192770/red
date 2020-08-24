<template>
  <div class="headers">
    <!-- headers -->
    <div class="headers-title">
      <img src="../../assets/images/logo-1.png" alt="朗信logo" class="headers-logo" />
      <span class="headers-txt">朗信云平台</span>
    </div>
    <div class="headers-operate">
      <span class="quit-container" @click="goProductList()">
        <img :src="quit" alt />
        退出
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Headers",
  data() {
    return {
      quit: require("../../assets/images/icon/quit.png"),
    };
  },
  computed: {},
  mounted() {},
  methods: {
    goProductList() {
      this.$router.push({ path: "/productList" });
    },
  },
};
</script>

<style scoped lang='scss'>
.headers {
  height: 80px;
  line-height: 80px;
  z-index: 10;
  display: flex;
  background-color: #5d76e6; /* 不支持线性的时候显示 */
  background-image: linear-gradient(to right, #5d76e6, #5f75e6);
  justify-content: space-between;
  padding: 0 20px;
  .headers-title {
    display: flex;
    align-items: center;
    .headers-logo {
      width: 53px;
      height: auto;
      margin-right: 10px;
    }
    .headers-txt {
      color: #fff;
      font-weight: 500;
      font-size: 26px;
    }
  }
  .headers-operate {
    display: flex;
    align-items: center;
    .quit-container {
      &:hover {
        transform: scale(1.2);
        -ms-transform: scale(1.2);
        -moz-transform: scale(1.2);
        -webkit-transform: scale(1.2);
        -o-transform: scale(1.2);
      }
      transition: all 0.5s;
      -webkit-transition: all 0.5s;
      margin-right: 20px;
      color: #fff;
      font-size: 18px;
      cursor: pointer;
      img {
        vertical-align: sub;
      }
    }
  }
}
</style>

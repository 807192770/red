<template>
  <div name="app" id="app-page" v-loading="loading">
    <div v-if="this.$route.name=='login'">
      <router-view></router-view>
    </div>
    <div class="app-con" v-else>
      <div class="app-con-nav">
        <Nav />
      </div>
      <div class="app-con-content">
        <div class="app-con-headers">
          <Headers />
        </div>
        <div class="app-con-crumbs">
          <crumbs />
        </div>
        <div class="app-con-detail">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Headers from "./components/common/header.vue";
import Nav from "./components/common/nav.vue";
import crumbs from "./components/common/crumbs";

export default {
  name: "app",

  components: {
    Headers,
    Nav,
    crumbs
  },
  computed: {
    loading() {
      return this.$store.state.ApplicationManage.loading;
    }
  },
  mounted() {
    // console.log(this.$route);
  }
};
</script>

<style lang="less">
#app-page {
  font-family: "Microsoft YaHei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 auto;
  background: #f3f5f7;

  .app-con {
    // background: yellow;
    display: flex;
    // justify-content: flex-start;
  }
  .app-con-nav {
    flex: 100px;
    height: 100vh;
    background-color: #1b1d3f;
  }
  .app-con-content {
    height: 100vh;
    flex: 9;
    background: #c6c6c6;
    position: relative;
    .app-con-detail {
      position: absolute;
      background: #fff;
      top: 112px;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: calc(100% - 112px);
      overflow-y: scroll;
      // background-color: #fff;
    }
  }
}
body {
  margin: 0 auto;
}
html {
  overflow: hidden;
}
</style>

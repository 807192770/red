<template>
  <div name="app" id="app-page">
    <Headers />
    <div class="app-con">
      <div class="app-con-nav">
        <Navs />
      </div>
      <div class="app-con-detail">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Headers from "../views/header.vue";
import Navs from "../views/nav.vue";

export default {
  name: "app",
  components: {
    Headers,
    Navs
  }
};
</script>

<style lang="scss">
#app-page {
  font-family: "Microsoft YaHei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .app-con {
    flex: 1; /* 占据自适应的宽度*/
    display: flex;
    .app-con-nav {
      height: calc(100vh - 51px);
    }
    .app-con-detail {
      height: calc(100vh - 51px);
      flex: 1;
    }
  }
}
</style>


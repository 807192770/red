<template>
  <div name="app" id="app-page">
    <Headers />
    <div class="app-con">
      <div class="app-con-nav">
        <Nav />
      </div>
      <div class="app-con-detail">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Headers from './components/common/header.vue';
import Nav from './components/common/nav.vue';

export default {
  name: 'app',
  components: {
    Headers,
    Nav
  },
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

  .app-con{
    // background: yellow;
    height: 800px;
    display: flex;
    justify-content: flex-start;
  }
  .app-con-nav{
    flex: 100px;
    height: 800px;
  }
  .app-con-detail{
    height: 800px;
    flex: 9;
    padding: 20px;
  }
}
body {
  margin: 0 auto;
}

</style>

<template>
  <div class="headers">
    <!-- headers -->
    <div class="content">
      <!-- 子路由显示区 -->
      <keep-alive>
        <!-- 需要缓存 -->
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <!-- 不需要缓存 -->
      <router-view v-if="!$route.meta.keepAlive" />
    </div>
  </div>
</template>

<script>
export default {
  name: "headers",
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang='scss'>
</style>

<template>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">
        {{
        item.meta.title
        }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "crumbs",
  data() {
    return {
      breadList: []
    };
  },
  watch: {
    // 监听路由
    $route(val) {
      // 调用获取路由数组方法
      this.getBreadList(val);
      console.log(val)
    }
  },
  created() {
    let routelist=this.$route
     this.getBreadList(routelist);
  },
  methods: {
    getBreadList(val) {
      // console.error('val >', val);
      // 过滤路由matched对象
      if (val.matched) {
        let matched = val.matched.filter(item => item.meta && item.meta.title);
        // 拿到过滤好的路由v-for遍历出来
        this.breadList = matched;
      }
    }
  }
};
</script>
<style >
.crumbs .el-breadcrumb {
  line-height: 48px;
  padding-left: 24px;
  background: #FAFAFA;
}
</style>

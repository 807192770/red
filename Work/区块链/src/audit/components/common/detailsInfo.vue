<template>
  <div class="detailsInfo">
    <div class="item" v-for="(item, index) in lists" :key="index">{{item.join('->')}}</div>
  </div>
</template>

<script>
export default {
  name: "detailsInfo",
  data() {
    return {};
  },
  computed: {
    lists() {
      return this.$store.state.ApplicationManage.historyDetails.lists;
    }
  },
  mounted() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.detailsInfo {
  .item {
    margin: 10px 0;
  }
}
</style>

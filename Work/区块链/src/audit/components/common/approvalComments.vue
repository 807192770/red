<template>
  <div class="approvalComments">
    <div class="approvalTxt">
      <el-input type="textarea" v-model="textarea" ></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "approvalComments",
  data() {
    return {
      textarea: ""
    };
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.approvalComments {

}
</style>


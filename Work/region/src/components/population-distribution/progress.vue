<template>
  <div class="progress">
    <ul>
      <li>
        <span class="floatleft">美国</span>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
        <span>2203（人）</span>
      </li>
      <li>
        <span>美国</span>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
        <span>2203（人）</span>
      </li>
      <li>
        <span>美国</span>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
        <span>2203（人）</span>
      </li>
    </ul>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style lang='scss' scoped>
.progress{
  ul{
    li{
      // display: flex;
    }
  }
}
</style>
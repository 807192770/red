<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[pageSize]"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="pageTotal">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
      }
    },
    props:['pageTotal', 'page', 'pageSize'],
    watch:{
    },
    methods: {
      handleSizeChange(val) {
        this.$emit('SizeChange', val)
      },
      handleCurrentChange(val) {
        this.$emit('CurrentChange', val)
      }
    }

  }
</script>
<style>
.el-pagination{
  display: flex;
  justify-content: center;
  padding: 10px 0;
}
</style>

<style scoped lang="scss">

</style>
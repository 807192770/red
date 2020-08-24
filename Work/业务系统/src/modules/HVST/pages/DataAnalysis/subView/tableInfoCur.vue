<template>
  <div class="table-container">
    <!-- 电流 -->
    <el-table :data="pageTable" size="medium">
      <el-table-column align="center" sortable show-overflow-tooltip prop="dtime" label="日期"></el-table-column>
      <el-table-column align="center" label="实测">
        <el-table-column align="center" sortable prop="hia" label="A相电流(A)"></el-table-column>
        <el-table-column align="center" sortable prop="hib" label="B相电流(A)"></el-table-column>
        <el-table-column align="center" sortable prop="hic" label="C相电流(A)"></el-table-column>
      </el-table-column>
      <el-table-column align="center" label="表计">
        <el-table-column align="center" sortable prop="dia" label="A相电流(A)"></el-table-column>
        <el-table-column align="center" sortable prop="dib" label="B相电流(A)"></el-table-column>
        <el-table-column align="center" sortable prop="dic" label="C相电流(A)"></el-table-column>
      </el-table-column>
      <el-table-column align="center" sortable show-overflow-tooltip prop="ct" label="CT变比"></el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :total="tableData.length"
      :page-size="pagesize"
      class="pagination"
      background
      layout="total, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: "table-Charts",
  data() {
    return {
      currentPage: 1,
      pagesize: 5,
    };
  },
  props: ["tableData"],
  watch: {
    tableData(val) {
      this.currentPage = 1;
    },
  },
  computed: {
    pageTable() {
      // 数据前端分页及查询
      if (this.tableData instanceof Array) {
        return this.tableData.slice(
          (this.currentPage - 1) * this.pagesize,
          this.currentPage * this.pagesize
        );
      } else {
        return [];
      }
    },
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      // 分页相关
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      // 分页相关
      this.currentPage = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.table-container {
  border-top: 10px solid #f6f5f8;
  background: #fff;
  padding: 20px;
}
</style>

<template>
  <!-- 损失率、电能 -->
  <div class="table-container">
    <el-table :data="pageTable" size="medium" header-cell-class-name="custom-grey" v-if="field=='loss'">
      <el-table-column align="center" sortable show-overflow-tooltip label="日期">
        <template slot-scope="scope">{{initDate(scope.row.idx)}}</template>
      </el-table-column>
      <el-table-column align="center" sortable prop="lossInc" label="含变压器损耗量(KWH)"></el-table-column>
      <el-table-column align="center" sortable prop="loss" label="不含变压器损耗量(KWH)"></el-table-column>
      <el-table-column align="center" sortable prop="lossRatioInc" label="含变压器损耗率(%)"></el-table-column>
      <el-table-column align="center" sortable prop="lossRatio" label="不含变压器损耗率(%)"></el-table-column>
    </el-table>
    <el-table :data="pageTable" size="medium" header-cell-class-name="custom-grey" v-else>
      <el-table-column align="center" sortable show-overflow-tooltip label="日期">
        <template slot-scope="scope">{{initDate(scope.row.idx)}}</template>
      </el-table-column>
      <el-table-column align="center" sortable prop="actualPower" label="高压实测电量(KWH)"></el-table-column>
      <el-table-column align="center" sortable prop="meterPowerActive" label="表计有功电量(KWH)"></el-table-column>
      <el-table-column align="center" sortable prop="meterPowerReactive" label="表计无功电量(KWH)"></el-table-column>
      <el-table-column align="center" sortable prop="emptyLoss" label="空载损耗(KWH)"></el-table-column>
      <el-table-column align="center" sortable prop="loadLoss" label="负载损耗(KWH)"></el-table-column>

    </el-table>
    <el-pagination :current-page="currentPage" :total="tableData.length" :page-size="pagesize" class="pagination"
      background layout="total, prev, pager, next, jumper" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
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
  props: ["tableData", "field", "cycle"],
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
    initDate(data) {
      if (this.cycle < 3) {
        let years = (data + "").slice(0, 4);
        let mouths = (data + "").slice(4, 6);
        let days = (data + "").slice(6, 8);
        let hours = (data + "").slice(8, 10);
        return `${years}-${mouths}-${days} ${hours}:00:00`;
      } else {
        let years = (data + "").slice(0, 4);
        let mouths = (data + "").slice(4, 6);
        let days = (data + "").slice(6, 8);
        return `${years}-${mouths}-${days}`;
      }
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

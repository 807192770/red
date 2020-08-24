<template>
  <!-- 重要卡口人流量排行TOP5 -->
  <div class="bayonet">
    <el-table
      :data="this.dataList"
      style="width: 100%;"
      :header-cell-class-name="tableHeadClassName"
      :cell-class-name="cell"
      :row-style="{height:this.flowRankingHeight}"
      :header-row-style="{height:this.flowRankingHeight}"
      :cell-style="{height:this.flowRankingHeight}"
      :height="height+'rem'"
    >
      <el-table-column width="180px" prop="tra_pass_id" label="卡口名称"></el-table-column>
      <el-table-column prop="current_num" label="卡口人数"></el-table-column>
      <el-table-column prop="in_num" label="流入量"></el-table-column>
      <el-table-column prop="out_num" label="流出量"></el-table-column>
      <el-table-column prop="current_crowding" label="饱和度"></el-table-column>
    </el-table>
  </div>
</template>

<style lang='scss'>
.bayonet {
  .el-table {
    overflow: hidden;
    background-color: #18273d;
  }
  .el-table__body .el-table__row:nth-of-type(odd) {
    background: rgb(28, 50, 79);
    color: #fff;
  }
  .el-table::before {
    display: none;
  }

  .el-table th,
  .el-table tr {
    background-color: #18273d;
  }
  .el-table__body tbody .el-table__row:nth-of-type(even) {
    background: #18273d !important;
    color: #fff;
    border: none;
  }
  .el-table__row td {
    padding: 0;
  }
  .el-table__row td .cell {
    font-family: Noto Sans SC;
    font-style: normal;
    font-weight: normal;
    font-size: 0.12rem;
    align-items: center;
    text-align: center;
    mix-blend-mode: normal;
  }
  .gutter {
    display: block !important;
  }
  .el-table__empty-block {
    background-color: #18273d;
  }
  .el-table__empty-text {
    color: #fff;
  }
  .el-table__row td:last-of-type .cell {
    width: 0.64rem;
    height: 0.22rem;
    text-align: center;
    border-radius: 0.12rem;
    box-sizing: border-box;
    font-family: Noto Sans SC;
    margin: auto 0;
    font-style: normal;
    font-weight: normal;
    font-size: 0.14rem;
    line-height: 0.2rem;
    color: #ffffff;
    mix-blend-mode: normal;
  }
  //严重
  .serious .cell {
    background: #692537;
    border: 1px solid #d01f22;
  }
  //中度
  .moderate .cell {
    background: rgb(112, 75, 38);
    border: 1px solid rgb(225, 101, 32);
  }
  //轻度
  .light .cell {
    background: #1b7091;
    border: 1px solid #25c3e9;
  }
  //畅通
  .open .cell {
    background: #307963;
    border: 1px solid #55e299;
  }

  // .el-table__row:nth-of-type(1) td:last-of-type .cell{
  //   border: 1px solid rgb(206,34,42);
  //   background: rgb(105,38,56);
  // }
  // .el-table__row:nth-of-type(3) td:last-of-type .cell{
  //   border: 1px solid rgb(206,34,42);
  //   background: rgb(112,75,38);
  // }
  // .el-table__row:nth-of-type(2) td:last-of-type .cell{
  //   border: 1px solid rgb(51,195,231);
  //   background: rgb(34,113,145);
  // }
  // .el-table__row:nth-of-type(4) td:last-of-type .cell{
  //   border: 1px solid rgb(92,226,156);
  //   background: rgb(53,121,101);
  // }
  // .el-table__row:nth-of-type(5) td:last-of-type .cell{
  //   border: 1px solid rgb(206,34,42);
  //   background: rgb(105,38,56);
  // }
  .el-table__row td:first-of-type .cell {
    font-family: Noto Sans SC;
    font-style: normal;
    font-size: 0.12rem;
    align-items: center;
    text-align: center;
    color: #ffffff;
    mix-blend-mode: normal;
  }
  .el-table__row td:last-of-type {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0.32rem;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: transparent;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 0;
  }
  .el-table__row {
    width: 4.92rem;
    height: 0.32rem;
  }
  .table-th {
    background-color: #18273d;
    color: #2181ea;
    border: none;
    font-style: normal;
    font-weight: normal;
    font-size: 0.12rem;
    align-items: center;
    text-align: center;
    mix-blend-mode: normal;
  }
  .el-data-editor {
    border: 0;
  }
}
</style>

<script>
export default {
  data() {
    return {
      tableData: this.dataList
    };
  },
  props: {
    dataList: {
      type: Array,
      default: 0
    },
    flowRankingHeight: {},
    size: {},
    height: {}
  },
  watch: {
    height(val) {
      // console.log(val)
      this.height = val;
    }
  },
  mounted() {
    // this.cell();
  },
  methods: {
    tableHeadClassName({ row, rowIndex }) {
      return "table-th";
    },
    cell({ row, column, rowIndex, columnIndex }) {
      // console.log(row, column, rowIndex, columnIndex)
      if (columnIndex == 4 && row.current_crowding == "严重") {
        return "serious";
      } else if (columnIndex == 4 && row.current_crowding == "中度") {
        return "moderate";
      } else if (columnIndex == 4 && row.current_crowding == "轻度") {
        return "light";
      } else if (columnIndex == 4 && row.current_crowding == "畅通") {
        return "open";
      }
    }
  }
};
</script>

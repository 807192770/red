<template>
  <div class="existPatrolManagement">
    <!-- 已有巡检 -->
    <div class="item">
      <h4 class="subTitle">已有巡检</h4>
      <div class="key-box">
        <div class="item-key">
          <div class="form">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="任务名称：">
                <el-input v-model="formInline.user" style="width:320px;"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium ">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="table-box">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column label="任务名称" width="200">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="开始时间" width="120"></el-table-column>
          <el-table-column prop="address" label="结束时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="name" label="周期" width="120"></el-table-column>
          <el-table-column label="巡检报告" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="dialogFormVisible = true"
                type="text"
                size="small"
              >查看报告</el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="dialogFormVisible = true"
                type="text"
                size="small"
              >修改</el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="ctrl">
          <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button> -->
          <!-- <el-button @click="toggleSelection()">取消选择</el-button> -->
          <div class="all-box">
            <el-checkbox v-model="checked" class="allChecked">全选</el-checkbox>
            <el-button>批量删除</el-button>
          </div>
          <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="会议室pad按天巡检盘点报告列表"
      :visible.sync="dialogFormVisible"
      width="1000px"
      class="pop"
    >
      <el-form :model="form" :label-position="subLabelPosition">
        <div class="subForm-item">
          <div class="title">
            <h6>巡检总览：</h6>
            <div class="total-num">
              盘点数目：
              <span class="num">
                <i class="real-mun" style="color:#1890FF">234</i>
                /
                <span>235</span>
              </span>
            </div>
          </div>
          <div class="form">
            <el-table
              ref="singleTable"
              :data="tableData2"
              highlight-current-row
              @current-change="handleCurrentChange"
              style="width: 100%"
            >
              <!-- <el-table-column type="index" width="50"></el-table-column> -->
              <el-table-column property="date" label="标签ID" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column property="name" label="资产名称" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column property="address" label="资产编号" show-overflow-tooltip></el-table-column>
              <el-table-column property="address" label="员工编号" show-overflow-tooltip></el-table-column>
              <el-table-column property="address" label="员工姓名" show-overflow-tooltip></el-table-column>
              <el-table-column property="address" label="地点名称" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
          <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subLabelPosition: "top",
      formInline: {
        user: ""
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      checked: false,
      multipleSelection: [],
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "80px",
      tableData2: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      currentRow: null
    };
  },

  components: {},

  mounted() {},

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    }
  }
};
</script>
<style lang='scss' scoped>
.existPatrolManagement {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  .item {
    .subTitle {
      width: 100%;
      font-size: 22px;
      color: #a0a0a0;
      line-height: 55px;
      border-bottom: 1px solid #e2e2e2;
      padding-left: 25px;
      padding-bottom: 15px;
    }
    .key-box {
      padding: 0 25px;
      .item-key {
        padding: 20px 0 5px 0;
        .form {
          .demo-form-inline {
            .el-form-item {
              margin-right: 30px;
            }
          }
        }
      }
    }
    .table-box {
      .ctrl {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .allChecked {
          margin: 0 18px;
        }
      }
    }
  }
  .pop {
    .subForm-item {
      padding: 0 10px;
      .title {
        h6 {
          font-size: 18px;
          font-weight: 700;
        }
        .total-num {
          font-size: 18px;
          margin: 20px 0 35px 0;
          .num {
            display: inline-block;
            font-size: 24px;
          }
        }
      }
      .form /deep/ {
        border-radius: 4px;
        padding: 1px;
        border: 1px solid rgba(233, 233, 233, 1);
        // .el-table {
        //   .current-row {
        //     border: 1px solid #ead693;
        //     td {
        //       background: #fffbe6;
        //     }
        //   }
        // }
      }
      .pagination {
        .el-pagination {
          margin: 20px 0;
          text-align: center;
        }
      }
    }
  }
}
</style>

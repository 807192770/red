<template>
  <div id="applicationHistoryList">
    <div class="filter-box">
      <el-row>
        <el-col :span="8">
          <div class="filter-item">
            <label class="filter-label">流水号：</label>
            <el-input name="流水号" v-model="query.liushuihao" size="small" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="filter-item">
            <label class="filter-label">流程类型：</label>
            <el-select v-model="query.liuchengleixing" placeholder="请选择" size="small">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="filter-item">
            <label class="filter-label">备注：</label>
            <el-input name="备注" v-model="query.beizhu" size="small" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="filter-item">
            <label class="filter-label">当前审批人：</label>
            <el-input name="申请人" v-model="query.shenpiren" size="small" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="filter-item">
            <label class="filter-label">状态：</label>
            <el-select v-model="query.status" placeholder="请选择" size="small">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="filter-item filter-item-range">
            <label class="filter-label">申请时间：</label>
            <el-date-picker
              v-model="query.applicationTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="filter-item filter-item-range">
            <label class="filter-label">有效时间：</label>
            <el-date-picker
              v-model="query.effectiveTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="search">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="applicationHistory-op" v-if="false">
      <el-button type="primary" @click="batchEdit(true)">批量同意</el-button>
      <el-button plain @click="batchEdit(false)">批量拒绝</el-button>
    </div>
    <div class="applicationHistory-content">
      <el-table
        ref="multipleTable"
        :data="tableData.list"
        stripe
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="orderNo" label="流水号" width="250"></el-table-column>
        <el-table-column prop="type" label="流程类型" width="180"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="currentNodeIdPage" label="当前审批人" width="180"></el-table-column>
        <el-table-column prop="gmtCreated" label="申请时间" width="180"></el-table-column>
        <el-table-column prop="statusPage" label="状态" width="180"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="withdraw(scope.row, tableData)"
              v-if="scope.row.status==4"
              type="text"
              size="small"
            >撤回</el-button>
            <el-button
              @click.native.prevent="urging(scope.row, tableData)"
              v-if="false"
              type="text"
              size="small"
            >催办</el-button>
            <el-button
              @click.native.prevent="details(scope.row, tableData)"
              type="text"
              size="small"
            >详情</el-button>
            <el-button
              @click.native.prevent="cancelPer(scope.row, tableData)"
              v-if="scope.row.status==6"
              type="text"
              size="small"
            >取消权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="applicationHistory-footer">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="this.tableData.total"
      ></el-pagination>
    </div>
    <!-- 详情 -->
    <el-dialog
      class="detailsDialog"
      title="申请详情"
      :visible.sync="detailsDialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="基本信息" name="1">
          <baseInfo />
        </el-collapse-item>
        <el-collapse-item title="详细信息" name="2">
          <approvalDetails />
        </el-collapse-item>
        <el-collapse-item title="审批历史" name="3">
          <approvalHistory />
        </el-collapse-item>
      </el-collapse>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="withdrawDialog" class="fl" v-if="applyRow.status==4">撤回</el-button>
        <el-button @click="detailsDialogVisible = false">关闭</el-button>
        <!-- <el-button type="primary" @click="detailsDialogVisible = false">催办</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>
<script>
import baseInfo from "../common/baseInfo";
import approvalHistory from "../common/approvalHistory";
import approvalDetails from "../common/detailsInfo";

export default {
  name: "applicationHistoryList",
  data() {
    return {
      query: {
        liushuihao: "",
        beizhu: "",
        liuchengleixing: "",
        status: "",
        applicationTime: "",
        effectiveTime: "",
        shenpiren: "",
        pageSize: 10,
        pageNum: 1
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      currentPage: 1,
      activeName: "1",
      applyRow: {},
      detailsDialogVisible: false
    };
  },
  components: {
    baseInfo,
    approvalDetails,
    approvalHistory
  },
  computed: {
    tableData() {
      return this.$store.state.ApplicationManage.historyData;
    }
  },
  mounted() {
    this.getAppHistory();
  },
  methods: {
    getAppHistory() {
      // 获取列表
      let param = {
        page: this.query.pageNum,
        pageSize: this.query.pageSize,
        liushuihao: this.query.liushuihao,
        beizhu: this.query.beizhu,
        status: this.query.status,
        applicationTime: this.query.applicationTime,
        effectiveTime: this.query.effectiveTime,
        shenpiren: this.query.shenpiren
      };
      this.$store.dispatch("ApplicationManage/getAppHistory", param);
    },
    search() {
      this.getAppHistory();
    },
    withdraw(value) {
      // 撤回
      this.$alert("确定撤回此信息？", "撤回", {
        confirmButtonText: "确定",
        callback: action => {
          if (action == "confirm") {
            let param = {
              applyOrder: value.orderNo
            };
            this.$store
              .dispatch("ApplicationManage/rollBackOrder", param)
              .then(res => {
                this.getAppHistory();
              });
          }
        }
      });
    },
    withdrawDialog() {
      // 详情撤回
      console.log(this.applyRow);
      this.detailsDialogVisible = false;
      this.withdraw({ orderNo: this.applyRow.orderNo });
    },
    urging(value) {
      // 催办
      console.error("value >", value);
    },
    cancelPer(value) {
      // 取消权限
      this.$alert("确定取消权限？", "取消权限", {
        confirmButtonText: "确定",
        callback: action => {
          let param = {
            applyOrder: value.orderNo
          };
          this.$store
            .dispatch("ApplicationManage/cancelFinishedOrder", param)
            .then(res => {
              this.getAppHistory();
            });
        }
      });
    },
    details(value) {
      // 详情
      this.detailsDialogVisible = true;
      this.applyRow = value;
      let param = {
        applyOrder: value.orderNo
      };
      this.$store.dispatch("ApplicationManage/getAppDetail", param);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleSelectionChange(rows) {
      // 选中行
      this.selecteData = rows;
    },
    handleCurrentChange(val) {
      // 分页相关
      this.query.pageNum = val;
      this.getAppHistory();
    }
  }
};
</script>
<style lang="less" scoped>
#applicationHistoryList {
  background: #ffffff;
  margin: 10px 10px;
  border-radius: 5px;
  padding: 15px 20px;
  .el-input--small {
    width: 350px;
  }
  .el-range-editor.el-input__inner {
    width: 350px;
  }
  .filter-box {
    width: 100%;
    overflow: hidden;
    .filter-item {
      display: flex;
      margin-bottom: 15px;
      align-items: center;
      .filter-label {
        width: 100px;
        text-align: right;
      }
    }
    .filter-item-range {
      width: 450px;
    }
  }
  .applicationHistory-op {
    width: 100%;
    margin: 13px 0 23px 0;
  }
  .applicationHistory-content {
    margin-top: 10px;
    width: 100%;
    border: 1px solid #e2e2e2;
    overflow: hidden;
    border-radius: 4px;
    .el-table /deep/ th {
      color: #000;
      font-weight: 900;
    }
  }
  .applicationHistory-footer {
    margin-top: 20px;
    width: 100%;
    .el-pagination {
      text-align: right;
    }
  }
}
.fl {
  float: left;
}
</style>

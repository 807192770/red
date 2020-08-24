<template>
  <div id="didList">
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
            <el-input name="备注" v-model="query.remark" size="small" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="filter-item">
            <label class="filter-label">申请人：</label>
            <el-input name="申请人" v-model="query.shenqingren" size="small" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="filter-item">
            <label class="filter-label">当前审批人：</label>
            <el-select v-model="query.shenpiren" placeholder="请选择" size="small">
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
            <label class="filter-label">审批时间：</label>
            <el-date-picker
              v-model="query.ApprovalTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="filter-item filter-item-range">
            <label class="filter-label">申请时间：</label>
            <el-date-picker
              v-model="query.ApplicationTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="filter-item filter-item-range">
            <label class="filter-label">有效期：</label>
            <el-date-picker
              v-model="query.Effective"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="search()">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="todoList-op">
      <el-button type="primary">批量同意</el-button>
      <el-button type="primary">批量拒绝</el-button>
    </div>-->
    <div class="todoList-content">
      <el-table
        ref="multipleTable"
        :data="tableData.list"
        stripe
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="orderNo" label="流水号" width="180"></el-table-column>
        <el-table-column prop="type" label="流程类型" width="180"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="creator" label="申请人" width="180"></el-table-column>
        <el-table-column prop="currentNodeIdPage" label="当前审批人" width="180"></el-table-column>
        <el-table-column prop="gmtCreated" label="审批时间" width="180"></el-table-column>
        <el-table-column prop="statusPage" label="状态" width="120"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="details(scope.row, tableData)"
              type="text"
              size="small"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="todoList-footer">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next,jumper"
        :current-page.sync="currentPage1"
        :total="tableData.total"
      ></el-pagination>
    </div>
    <!-- 详情 -->
    <el-dialog
      class="detailsDialog"
      title="已办详情"
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
        <el-button type="primary" @click="detailsDialogVisible = false">确定</el-button>
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
  name: "didList",
  data() {
    return {
      currentPage1: 1,
      query: {
        liushuihao: "",
        shenqingren: "",
        shenpiren: "",
        remark: "",
        liuchengleixing: "",
        status: "",
        ApprovalTime: "",
        ApplicationTime: "",
        Effective: "",
        page: 1,
        pageSize: 10
      },
      detailsDialogVisible: false,
      activeName: "3",
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
      ]
    };
  },
  components: {
    baseInfo,
    approvalDetails,
    approvalHistory
  },
  computed: {
    tableData() {
      return this.$store.state.ApplicationManage.workDoneData;
    }
  },
  mounted() {
    this.getDoneOrder();
  },
  methods: {
    getDoneOrder() {
      let param = {
        page: this.query.page,
        pageSize: this.query.pageSize,
        liushuihao: this.query.liushuihao,
        shenqingren: this.query.shenqingren,
        shenpiren: this.query.shenpiren,
        liuchengleixing: this.query.liuchengleixing,
        status: this.query.status,
        ApprovalTime: this.query.ApprovalTime,
        ApprovaApplicationTimelTime: this.query.ApplicationTime,
        Effective: this.query.Effective
      };
      this.$store.dispatch("ApplicationManage/getAppDoneOrder", param);
    },
    search() {
      this.getAppHistory();
    },
    details(value) {
      // 详情
      this.detailsDialogVisible = true;
      this.applyOrder = value.orderNo;
      let param = {
        applyOrder: value.orderNo
      };
      this.$store.dispatch("ApplicationManage/getAppDetail", param);
    },
    handleSelectionChange(rows) {
      console.log(rows.length);
      // 选中行
      this.selecteData = rows;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleCurrentChange(val) {
      // 分页相关
      this.query.page = val;
      this.getDoneOrder();
    }
  }
};
</script>
<style lang="less" scoped>
#didList {
  background: #ffffff;
  margin: 10px 10px;
  border-radius: 5px;
  padding: 15px 20px;
  .el-input--small {
    width: 200px;
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
        margin-right: 10px;
      }
    }
    .filter-item-range {
      width: 450px;
    }
  }
  .todoList-op {
    width: 100%;
    margin-top: 20px;
    border-top: 1px dashed #ccc;
    padding: 10px;
  }
  .todoList-content {
    width: 100%;
    border: 1px solid #f0f2f5;
  }
  .todoList-footer {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>

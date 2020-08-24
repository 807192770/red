<template>
  <div id="todoList">
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
            <label class="filter-label">申请人：</label>
            <el-input name="申请人" v-model="query.shenqingren" size="small" placeholder="请输入内容"></el-input>
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
    <div class="todoList-op">
      <el-button type="primary" @click="batchEdit(true)">批量同意</el-button>
      <el-button plain @click="batchEdit(false)">批量拒绝</el-button>
    </div>
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
        <el-table-column prop="gmtCreated" label="申请时间" width="180"></el-table-column>
        <el-table-column prop="statusPage" label="状态" width="180"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="edit(true,scope.row, tableData)"
              v-if="scope.row.status==4"
              type="text"
              size="small"
            >同意</el-button>
            <el-button
              @click.native.prevent="edit(false,scope.row, tableData)"
              v-if="scope.row.status==4"
              type="text"
              size="small"
            >拒绝</el-button>
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
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="tableData.total"
      ></el-pagination>
    </div>
    <!-- 批量编辑 -->
    <el-dialog
      class="batchEditDialog"
      :title="batchEditTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form>
        <div class="describe" v-if="batchFlag">已选{{selecteData.length}}项</div>
        <el-row class="formTextarea">
          <el-col :span="4">
            <label>
              <i v-if="batchEditBtn=='danger'">*</i> 审批意见：
            </label>
          </el-col>
          <el-col :span="20">
            <el-input type="textarea" v-model="form.view"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button :type="batchEditBtn" @click="batchBtn()">{{batchEditTitle}}</el-button>
      </span>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog
      class="detailsDialog"
      title="待办事项"
      :visible.sync="detailsDialogVisible"
      width="35%"
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
        <el-collapse-item title="审批意见" name="4" v-if="applyRow.status==4">
          <approvalComments ref="form" />
        </el-collapse-item>
      </el-collapse>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailsEdit(false)" v-if="applyRow.status==4">拒绝</el-button>
        <el-button type="primary" @click="detailsEdit(true)" v-if="applyRow.status==4">同意</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import baseInfo from "../common/baseInfo";
import approvalHistory from "../common/approvalHistory";
import approvalComments from "../common/approvalComments";
import approvalDetails from "../common/detailsInfo";
export default {
  name: "todoList",
  data() {
    return {
      query: {
        liushuihao: "",
        beizhu: "",
        liuchengleixing: "",
        status: "",
        shenqingren: "",
        applicationTime: "",
        pageNum: 1,
        pageSize: 10,
        effectiveTime: ""
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
      dialogVisible: false,
      detailsDialogVisible: false,
      batchEditTitle: "批量同意",
      batchEditBtn: "primary", //弹框按钮样式
      form: {
        view: ""
      },
      selecteData: [], //批量编辑列表
      selecteRow: {}, //编辑列表
      activeName: "1",
      currentPage: 1,
      batchFlag: true, //单个编辑||批量编辑
      applyRow: {} //详情编辑列表
    };
  },
  components: {
    baseInfo,
    approvalHistory,
    approvalDetails,
    approvalComments
  },
  computed: {
    tableData() {
      return this.$store.state.ApplicationManage.toDoData;
    }
  },
  mounted() {
    this.getQueryToDoOrder();
  },
  methods: {
    getQueryToDoOrder() {
      // 获取列表
      let param = {
        page: this.query.pageNum,
        pageSize: this.query.pageSize,
        liushuihao: this.query.liushuihao,
        beizhu: this.query.beizhu,
        liuchengleixing: this.query.liuchengleixing,
        status: this.query.status,
        shenqingren: this.query.shenqingren,
        effectiveTime: this.query.effectiveTime,
        applicationTime: this.query.applicationTime
      };
      this.$store.dispatch("ApplicationManage/getToDoOrder", param);
    },
    handleSelectionChange(rows) {
      this.selecteData = rows;
    },
    edit(flag, row, data) {
      // 单个编辑
      this.form.view = "";
      this.selecteRow = row;
      this.batchFlag = false;
      this.batchEditTitle = flag ? "同意" : "拒绝";
      this.batchEditBtn = flag ? "primary" : "danger";
      this.dialogVisible = true;
    },
    batchEdit(flag) {
      // 批量编辑
      this.form.view = "";
      this.batchFlag = true;
      this.batchEditTitle = flag ? "批量同意" : "批量拒绝";
      this.batchEditBtn = flag ? "primary" : "danger";
      if (this.selecteData.length > 0) {
        var status = this.selecteData.every(element => {
          return element.status == 4;
        });
        status
          ? (this.dialogVisible = true)
          : this.$message.warning("选中包含非流程中数据，请重新选择！");
      } else {
        this.$message.warning("请至少选择一项数据！");
        return false;
      }
    },
    batchBtn() {
      // 编辑操作
      if (this.batchEditBtn == "danger" && this.form.view == "") {
        this.$message.warning("请填写审批意见！");
        return false;
      }
      if (this.batchFlag) {
        // 批量编辑
        let param = {
          applyOrderList: this.selecteData,
          approvalComments: this.form.view,
          approvalResults: this.batchEditBtn == "primary" ? 0 : 1
        };
        this.$store
          .dispatch("ApplicationManage/batchOrderApproval", param)
          .then(res => {
            this.dialogVisible = false;
            this.getQueryToDoOrder();
          });
      } else {
        // 单个编辑
        let param = this.selecteRow;
        param.approvalComments = this.form.view;
        param.approvalResults = this.batchEditBtn == "primary" ? 0 : 1;
        this.$store
          .dispatch("ApplicationManage/orderApproval", param)
          .then(res => {
            this.dialogVisible = false;
            this.getQueryToDoOrder();
          });
      }
      // this.$store.commit("ApplicationManage/CHANGE_LOADING", true);
    },
    search() {
      this.getQueryToDoOrder();
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
    detailsEdit(flag) {
      // 详情里的同意拒绝
      if (!flag && this.$refs.form.textarea == "") {
        // 拒绝且没有审批意见
        this.$message.warning("请填写审批意见！");
        this.activeName = "4";
        return false;
      }
      let param = this.applyRow;
      param.approvalComments = this.$refs.form.textarea;
      param.approvalResults = flag ? 0 : 1;
      this.$store
        .dispatch("ApplicationManage/orderApproval", param)
        .then(res => {
          this.dialogVisible = false;
          this.getQueryToDoOrder();
        });
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
      this.query.pageNum = val;
      this.getQueryToDoOrder();
    }
  }
};
</script>
<style lang="less" scoped>
#todoList {
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
  .todoList-op {
    width: 100%;
    margin: 13px 0 23px 0;
  }
  .todoList-content {
    width: 100%;
    border: 1px solid #e2e2e2;
    overflow: hidden;
    border-radius: 4px;
    .el-table /deep/ th {
      color: #000;
      font-weight: 900;
    }
  }
  .todoList-footer {
    margin-top: 20px;
    width: 100%;
    .el-pagination {
      text-align: right;
    }
  }
  .batchEditDialog {
    .describe {
      margin-bottom: 22px;
    }
    .formTextarea {
      i {
        color: red;
      }
    }
  }
}
</style>
<style >
.detailsDialog .el-collapse-item__header {
  font-size: 16px;
  font-weight: 900;
}
</style>

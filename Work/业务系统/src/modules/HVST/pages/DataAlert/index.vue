<template>
  <div class="data-alert">
    <!-- 报警 -->
    <el-form ref="queryForm" :model="queryForm" class="query-box" label-width="80px" label-position="left" size="small">
      <el-row :gutter="20" type="flex" class="row-item">
        <el-col :span="8">
          <el-form-item label="创建日期" prop="createTime">
            <el-date-picker v-model="queryForm.createTime" :picker-options="pickerOptions" value-format="yyyy-MM-dd"
              type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" style="width:80%" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="选择任务" prop="taskName">
            <el-select v-model="queryForm.taskName" filterable clearable placeholder="请选择任务">
              <el-option v-for="(it, index) in taskNameList" :label="it.name" :value="it.id" :key="index" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="选择类别" prop="category">
            <el-select v-model="queryForm.category" filterable clearable placeholder="请选择类别">
              <el-option v-for="(it, index) in alertType" :label="it.name" :value="it.id" :key="index" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="btn-box">
          <el-form-item prop="taskName" class="tl">
            <el-button size="small" type="primary" @click="getQueryAlertList">查 询</el-button>
            <el-button size="small" @click="resetForm('queryForm')">重 置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="operate-box">
      <el-col :span="24">
        <el-button type="primary" size="small" @click="exportList()">导 出</el-button>
        <el-input v-model="search" size="small" class="fr" placeholder="输入报警内容搜索" />
      </el-col>
    </el-row>
    <!-- 内容区 -->
    <section class="content">
      <el-table :data="pageTable" class="table-box" size="medium" header-cell-class-name="custom-grey">
        <el-table-column type="index" label="ID" align="center" />
        <el-table-column prop="taskName" label="任务名称" show-overflow-tooltip sortable align="center" />
        <el-table-column label="发生时间" show-overflow-tooltip sortable align="center">
          <template
            slot-scope="scope">{{ scope.row.createTime.slice(0,10)+" "+scope.row.createTime.slice(11,19) }}</template>
        </el-table-column>
        <el-table-column prop="message" label="报警内容" width="450" sortable align="center" />
        <el-table-column label="报警类型" show-overflow-tooltip sortable align="center">
          <template slot-scope="scope">{{ alertType[scope.row.category-1].name }}</template>
        </el-table-column>
        <el-table-column prop="deviceNo" label="报警设备" show-overflow-tooltip sortable align="center" width="150" />
        <el-table-column label="是否已阅" sortable align="center" width="150">
          <template slot-scope="scope">{{ scope.row.status?'已读':'未读' }}</template>
        </el-table-column>
        <el-table-column label="相关数据" width="100" align="center" fixed="right">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看数据" placement="top">
              <el-button type="primary" icon="el-icon-data-line" circle size="small" @click="dataDetails(scope.row)" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="currentPage" :total="tableData.length" class="pagination" background
        layout="total, prev, pager, next, jumper" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </section>
    <div class="pop-container">
      <el-dialog :visible.sync="dialogVisible" title="报警信息" width="30%">
        <p v-if="info.alert" class="describe">{{ info.alert.message }}</p>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import lineInfo from "./subView/lineInfo";
import { GetTaskList } from "../../api/taskManagement";
import { GetQueryAlertDetails, GetQueryAlertList } from "../../api/dataAlert";
export default {
  name: "DataAlert",
  components: {
    lineInfo,
  },
  data() {
    return {
      queryForm: {
        createTime: "",
        taskName: "",
        category: null,
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近7天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近15天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近30天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      tableData: [],
      totalArr: [],
      dialogVisible: false,
      currentPage: 1,
      pagesize: 10,
      search: "",
      taskNameList: [],
      alertType: [
        { id: 1, name: "高压电流采集器丢数" },
        { id: 2, name: "低压抄表器丢数" },
        { id: 3, name: "高压钳头欠压" },
        { id: 4, name: "高压电流异常" },
        { id: 5, name: "线损率异常" },
      ],
      categoryType: {
        status1: "高压电流采集器丢数",
        status2: "低压抄表器丢数",
        status3: "高压钳头欠压",
        status4: "高压电流异常",
        status5: "线损率异常",
      },
      info: {},
    };
  },
  computed: {
    pageTable() {
      // 数据前端分页及查询
      if (this.search) {
        this.totalArr = this.tableData.filter(
          (data) =>
            !this.search ||
            data.message.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        this.totalArr = this.tableData;
      }
      return this.totalArr.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
  },
  mounted() {
    this.getTaskList();
    if (!this.$route.query.id) this.getQueryAlertList();
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    dataDetails(row) {
      row.status = 1;
      this.dialogVisible = true;
      GetQueryAlertDetails(row.id)
        .then((r) => {
          console.log(r);
          this.info = r.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handleSizeChange(val) {
      // 分页相关
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      // 分页相关
      this.currentPage = val;
    },
    getQueryAlertList() {
      const par = {
        startTime: this.queryForm.createTime[0],
        endTime: this.queryForm.createTime[1],
        taskId: this.queryForm.taskName,
        category: this.queryForm.category,
      };
      GetQueryAlertList(par)
        .then((r) => {
          this.tableData = r.data;
          if (this.$route.query.id) this.dataDetails(this.tableData[0]);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getTaskList() {
      // 获取任务名称下拉
      GetTaskList()
        .then((r) => {
          this.taskNameList = r;
          if (this.$route.query.id) {
            this.queryForm.taskName = parseInt(this.$route.query.id);
            this.getQueryAlertList();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    exportList() {
      // 导出
      require.ensure([], () => {
        const { export_json_to_excel } = require("vendor/Export2Excel");
        const tHeader = [
          "任务名称",
          "创建时间",
          "报警内容",
          "采集终端",
          "是否已阅",
        ];
        const filterVal = [
          "taskName",
          "createTime",
          "message",
          "deviceNo",
          "status",
        ];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "报警信息列表");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
  },
};
</script>
<style lang='scss' scoped>
.data-alert {
  height: 100%;
  padding: 20px;
  background: #fff;
  overflow-y: auto;
  .query-box {
    .btn-box {
      text-align: center;
    }
  }
  .operate-box {
    margin: 5px 0 20px 0;
    .fr {
      width: 250px;
    }
  }
}
</style>

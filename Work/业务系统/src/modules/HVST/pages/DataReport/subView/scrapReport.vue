<template>
  <div class="report-details">
    <!-- 报告内容 -->
    <el-form ref="queryForm" class="query-box" :model="queryForm" label-width="80px" label-position="left" size="small">
      <el-row :gutter="20" type="flex" class="row-item">
        <el-col :span="8">
          <el-form-item label="选择任务" prop="taskName">
            <el-select v-model="queryForm.taskName" filterable clearable placeholder="请选择任务">
              <el-option v-for="(it, index) in taskNameList" :label="it.name" :value="it.id" :key="index" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="btn-box">
          <el-button type="primary" size="small" @click="getReportQuery">查 询</el-button>
          <el-button size="small" @click="resetForm('queryForm')">重 置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="operate-box">
      <el-col :span="24">
        <el-button type="primary" size="small" @click="exportList()">导 出</el-button>
        <el-input v-model="search" size="small" class="fr" placeholder="输入分析意见搜索" />
      </el-col>
    </el-row>
    <div class="report" v-if="!noData">
      <el-table class="table-box" :data="pageTable" size="medium" header-cell-class-name="custom-grey">
        <el-table-column type="index" label="ID" align="center"></el-table-column>
        <el-table-column prop="name" label="任务名称" show-overflow-tooltip sortable align="center"></el-table-column>
        <el-table-column label="申请时间" show-overflow-tooltip sortable align="center">
          <template slot-scope="scope">{{scope.row.applyTime?scope.row.applyTime.slice(0,10):''}}</template>
        </el-table-column>
        <el-table-column label="审核日期" show-overflow-tooltip sortable align="center">
          <template slot-scope="scope">{{scope.row.checkTime?scope.row.checkTime.slice(0,10):''}}</template>
        </el-table-column>
        <el-table-column label="发布日期" show-overflow-tooltip sortable align="center">
          <template slot-scope="scope">{{scope.row.releaseTime?scope.row.releaseTime.slice(0,10):''}}</template>
        </el-table-column>
        <el-table-column label="废弃日期" show-overflow-tooltip sortable align="center">
          <template slot-scope="scope">{{scope.row.discardTime?scope.row.discardTime.slice(0,10):''}}</template>
        </el-table-column>
        <el-table-column label="地区" sortable align="center">
          <template slot-scope="scope">{{scope.row.province+scope.row.city}}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" sortable align="center">
          <!-- 1申请成功，2正在审核，3已发布，4已废弃 -->
          <template
            slot-scope="scope">{{scope.row.status==1?'申请成功':scope.row.status==2?'正在审核':scope.row.status==3?'已发布':'已废弃'}}</template>
        </el-table-column>
        <el-table-column prop="analyze" label="分析意见" show-overflow-tooltip sortable align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center" fixed="right">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="删除报告" placement="top">
              <el-button type="danger" icon="el-icon-delete" circle @click="delReport(scope.$index, scope.row)"
                size="small"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :current-page="currentPage" :total="tableData.length" class="pagination" background
        layout="total, prev, pager, next, jumper" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
    <!-- <slot v-else></slot> -->
  </div>
</template>

<script>
import { GetTaskList } from "../../../api/taskManagement";
import {
  GetReportApply,
  GetReportDelete,
  GetReportDiscard,
  GetReportQuery,
} from "../../../api/dataReport";
export default {
  name: "report-details",
  data() {
    return {
      queryForm: {
        taskName: "",
      },
      tableData: [],
      totalArr: [],
      noData: false,
      currentPage: 1,
      pagesize: 10,
      search: "",
      taskNameList: [],
    };
  },
  computed: {
    pageTable() {
      // 数据前端分页及查询
      if (this.search) {
        this.totalArr = this.tableData.filter((data) => {
          if (data.analyze == null) data.analyze = "";
          return (
            !this.search ||
            data.analyze.toLowerCase().includes(this.search.toLowerCase())
          );
        });
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
    this.getReportQuery();
  },
  methods: {
    getReportQuery() {
      GetReportQuery({ taskId: this.queryForm.taskName || 0 })
        .then((r) => {
          this.tableData = r.data.discard;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    delReport(index, item) {
      this.$confirm("此操作将删除报告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          GetReportDelete({ id: item.id })
            .then((r) => {
              console.log(r);
              if (r.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除报告成功!",
                });
                this.getReportQuery();
              }
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getTaskList() {
      // 获取任务名称下拉
      GetTaskList()
        .then((r) => {
          this.taskNameList = r;
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
          "申请时间",
          "审核日期",
          "发布日期",
          "废弃日期",
          "省份",
          "区县",
          "状态",
          "分析意见",
        ];
        const filterVal = [
          "name",
          "applyTime",
          "checkTime",
          "releaseTime",
          "discardTime",
          "province",
          "city",
          "status",
          "analyze",
        ];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "报告信息列表");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
  },
};
</script>
<style lang='scss' scoped>
.report-details {
  height: 100%;
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
  .no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    .tips {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 2px solid rgb(5, 241, 96);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 25px;
      font-weight: 800;
      letter-spacing: 2px;
    }
  }
}
</style>

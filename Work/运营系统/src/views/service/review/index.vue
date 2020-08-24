<template>
  <div class="app-container">

    <el-table v-loading="loading" :data="pageTable">
      <el-table-column label="序号" type="index" align="center" width="50">
        <template slot-scope="scope">
          <span>{{(currentPage - 1) * pagesize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务名称" align="center" prop="name" :show-overflow-tooltip="true" />
      <el-table-column label="专变" align="center" prop="area" :show-overflow-tooltip="true" />
      <el-table-column label="所在省" align="center" prop="province" :show-overflow-tooltip="true" />
      <el-table-column label="所在市" align="center" prop="city" />
      <el-table-column label="申请时间" sortable align="center" prop="applyTime">
        <template
          slot-scope="scope">{{ scope.row.applyTime.slice(0,10) + ' ' +scope.row.applyTime.slice(11,19)}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-notebook-2" @click="handleDetails(scope.row)"
            v-hasPermi="['service:review:details']">详情</el-button>
          <el-button type="text" size="small" icon="el-icon-notebook-2" @click="getHistory(scope.row)"
            v-hasPermi="['service:review:history']">历史报告</el-button>
        </template>

      </el-table-column>
    </el-table>
    <el-dialog title="历史报告" :visible.sync="historyFormVisible" width="40%">
      <el-table v-loading="loading" :data="history_report">
        <el-table-column label="申请时间" sortable align="center" prop="applyTime">
          <template
            slot-scope="scope">{{ scope.row.applyTime.slice(0,10) + ' ' +scope.row.applyTime.slice(11,19)}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="text" size="small" icon="el-icon-notebook-2" @click="handleDetails(scope.row)"
              v-hasPermi="['service:review:historyDetails']">详情</el-button>

          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-pagination :current-page="currentPage" :total="tableList.length" class="pagination" background
      layout="total, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import { assign } from "@/utils/validate";
import {
  QueryReportList,
  QueryTaskHistoryReport,
  DetailReport,
  ReleaseReport,
  SaveReport,
} from "@/api/service/list.js";
export default {
  name: "review",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 唯一标识符
      uniqueId: "",
      // 总条数
      total: 0,
      // 表数据
      tableList: [],
      historyFormVisible: false,
      history_report: [],
      currentPage: 1,
      pagesize: 10,
    };
  },
  created() {
    this.getList();
  },
  computed: {
    pageTable() {
      // 数据前端分页及查询
      return this.tableList.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
  },
  activated() {
    const time = this.$route.query.t;
    if (time != null && time != this.uniqueId) {
      this.uniqueId = time;
    }
  },
  methods: {
    /** 查询表集合 */
    getList() {
      this.loading = true;
      QueryReportList().then((response) => {
        this.tableList = response.data;
        this.total = this.tableList.length;
        this.loading = false;
      });
    },

    /** 跳转到详情页面 */
    handleDetails(row) {
      this.$router.push({
        path: "detail",
        query: {
          id: row.id,
        },
      });
    },
    /** 查询某个任务的历史报告 */
    getHistory(row) {
      this.historyFormVisible = true;
      let par = {};
      assign(par, "taskId", row.taskId);
      QueryTaskHistoryReport(par).then((response) => {
        this.history_report = response.data;
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
  },
};
</script>

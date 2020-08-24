<template>
  <!-- 设备管理 -->
  <div class="device-management">
    <el-form ref="queryForm" :model="queryForm" class="query-box" label-width="80px" label-position="left" size="small">
      <el-row :gutter="20" class="row-item">
        <el-col :span="8">
          <el-form-item label="设备类型" prop="deviceTypes">
            <el-select v-model="queryForm.deviceTypes" style="width:90%" clearable filterable placeholder="请选择设备类型">
              <el-option label="低压抄表器" value="LCT-GYFZ1" />
              <el-option label="高压电流采集器" value="LCT-GA2019T" />
              <el-option label="温度测量装置" value="TEMP" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备编号" prop="deviceNum">
            <el-input v-model="queryForm.deviceNum" placeholder="请输入设备编号" style="width:90%" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="任务名称" prop="taskName">
            <el-select v-model="queryForm.taskName" filterable clearable placeholder="请选择任务" style="width:90%">
              <el-option v-for="(it, index) in taskNameList" :label="it.name" :value="it.name" :key="index" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row-item">
        <el-col :span="8">
          <el-form-item label="在线状态" prop="onlineStatus">
            <el-select v-model="queryForm.onlineStatus" style="width:90%" clearable filterable placeholder="请选择在线状态">
              <el-option label="在线" value="1" />
              <el-option label="离线" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="占用情况" prop="occupancy">
            <el-select v-model="queryForm.occupancy" style="width:90%" clearable filterable placeholder="请选择占用情况">
              <el-option label="占用" value="1" />
              <el-option label="空闲" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="btn-box">
          <el-button size="small" type="primary" @click="getDeviceQuery">查 询</el-button>
          <el-button size="small" @click="resetForm('queryForm')">重 置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="operate-box">
      <el-col :span="24">
        <el-button type="primary" size="small" @click="exportList()">导 出</el-button>
        <el-input v-model="search" class="fr" size="small" placeholder="输入设备编号搜索" />
      </el-col>
    </el-row>
    <div class="table-box">
      <el-table :data="pageTable" size="medium" header-cell-class-name="custom-grey">
        <el-table-column label="ID" type="index" align="center" sortable />
        <el-table-column label="设备类型" prop="dname" align="center" sortable />
        <el-table-column label="设备编号" prop="deviceNo" align="center" sortable />
        <el-table-column label="在线状态" align="center" sortable>
          <template slot-scope="scope">
            <img v-if="scope.row.online" :src="onLine" title="在线" alt="在线">
            <img v-else :src="offLine" title="离线" alt="离线">
          </template>
        </el-table-column>
        <el-table-column label="设备占用" align="center" sortable>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>系统名称: {{ scope.row.systemName||'--' }}</p>
              <p>任务名称: {{ scope.row.sytemTask||'--' }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag :type="scope.row.useStatus?'danger':'success'" size="medium">{{ scope.row.useStatus?"占用":"空闲" }}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="当前任务" align="center" sortable>
          <template slot-scope="scope">
            <el-button :disabled="!scope.row.useStatus" type="text" @click="goPage(scope.row.systemTaskId)">
              {{ scope.row.sytemTask }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="设备操作" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="操作" placement="top">
              <el-button :disabled="!scope.row.online" type="primary" class="iconfont icon-banshou" circle size="small"
                @click="issue(scope.$index, scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination :current-page="currentPage" :total="totalArr.length" :page-size="pagesize" class="pagination"
      background layout="total, prev, pager, next, jumper" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
    <div class="pop-container">
      <el-dialog :visible.sync="editDialogVisible" :close-on-click-modal="false" title="设备编辑" class="edit-handle"
        width="43%">
        <div class="content">
          <majorInfo :all-device-info="allDeviceInfo" :online-status="onlineStatus" :system-task-id="systemTaskId" />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import majorInfo from "./subView/majorInfo";
import { assign } from "@/utils/validate";
import { GetTaskList } from "../../api/taskManagement";
import {
  GetDeviceList,
  GetDeviceQuery,
  GetDeviceConfig,
} from "../../api/deviceManagement";
import svgIcon from "@/components/SvgIcon/index.vue";
export default {
  name: "DeviceManagement",
  components: {
    majorInfo,
    svgIcon,
  },
  data() {
    return {
      queryForm: {
        deviceTypes: "",
        deviceNum: "",
        taskName: "",
        onlineStatus: "",
        occupancy: "",
      },
      tableData: [],
      totalArr: [],
      search: "",
      currentPage: 1,
      pagesize: 10,
      editDialogVisible: false,
      allDeviceInfo: {
        deviceNo: "",
      },
      onLine: require("@/assets/images/onLine.png"),
      offLine: require("@/assets/images/offLine.png"),
      onlineStatus: "",
      systemTaskId: "",
      taskNameList: [],
    };
  },
  computed: {
    pageTable() {
      // 数据前端分页及查询
      if (this.search) {
        this.totalArr = this.tableData.filter(
          (data) =>
            !this.search ||
            data.deviceNo.toLowerCase().includes(this.search.toLowerCase())
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
    this.$route.query.id ? this.getDeviceList() : this.getDeviceQuery();
  },
  methods: {
    getDeviceList() {
      // id查询
      GetDeviceList(this.$route.query.id)
        .then((r) => {
          if (r.code == 200) {
            this.tableData = r.data || [];
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDeviceQuery() {
      // 条件查询
      const par = {};
      assign(par, "model", this.queryForm.deviceTypes);
      assign(par, "deviceNo", this.queryForm.deviceNum);
      assign(par, "online", this.queryForm.onlineStatus);
      assign(par, "taskName", this.queryForm.taskName);
      assign(par, "useStatus", this.queryForm.occupancy);
      this.currentPage = 1;
      this.pagesize = 10;
      GetDeviceQuery(par)
        .then((r) => {
          this.tableData = r.data || [];
        })
        .catch((e) => {
          console.log(e);
        });
    },
    issue(index, row) {
      // 指令下发
      this.editDialogVisible = true;
      const par = { dno: row.deviceNo };
      // { dno: "LCT-GYFZ20200764" }
      this.onlineStatus = row.online ? "在线" : "离线";
      this.systemTaskId = row.systemTaskId;
      GetDeviceConfig(par)
        .then((r) => {
          if (r.data == null) {
            this.$message.error("设备异常,请稍后再试");
          } else {
            this.allDeviceInfo = r.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    resetForm(formName) {
      // 清空表格
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      // 分页相关
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      // 分页相关
      this.currentPage = val;
    },
    getTaskList() {
      // 获取任务名称下拉
      GetTaskList()
        .then((r) => {
          this.taskNameList = r;
          if (this.$route.query.id) {
            this.queryForm.taskName = parseInt(this.$route.query.id);
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
          "ID",
          "设备类型",
          "设备编号",
          "在线状态",
          "设备占用",
          "当前任务",
        ];
        const filterVal = [
          "productId",
          "dname",
          "deviceNo",
          "online",
          "useStatus",
          "sytemTask",
        ];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "设备列表");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    goPage(id) {
      this.$router.push({
        path: "/dataAnalysisIndex",
        query: { id: id },
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.device-management {
  height: 100%;
  padding: 20px;
  background: #fff;
  overflow-y: auto;
  .query-box {
    .btn-box {
      text-align: center;
      button {
        margin: 15px;
      }
    }
  }
  .operate-box {
    margin: 5px 0 20px 0;
    .fr {
      width: 250px;
    }
  }
  .table-box {
    .search-box {
      text-align: right;
      margin: 0 0 20px 0;
      .el-input {
        width: 300px;
      }
    }
  }
}
</style>

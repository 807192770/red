<template>
  <div class="scrap-device-list">
    <!-- 报废设备 -->
    <div class="device-container">
      <div class="search-box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="设备编号">
                <el-input v-model="formInline.deviceNum" placeholder="请输入设备编号" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="设备类别">
                <el-select v-model="formInline.deviceModel" clearable placeholder="请选择设备类别">
                  <el-option
                    :label="it.shortName"
                    :value="it.model"
                    v-for="(it,index) in qmodel"
                    :key="index"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="是否占用">
                <el-select v-model="formInline.deviceStatus" clearable placeholder="请选择设备占用状态">
                  <el-option label="占用" value="1" />
                  <el-option label="空闲" value="0" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="按钮" class="hid-label">
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="table-container">
        <el-table
          :data="pageTable"
          :height="height"
          size="small"
          header-cell-class-name="custom-grey"
        >
          <el-table-column
            prop="deviceNo"
            label="设备编号"
            show-overflow-tooltip
            sortable
            align="center"
          />
          <el-table-column prop="dname" label="设备类别" show-overflow-tooltip sortable align="center" />
          <el-table-column prop="online" label="在线状态" sortable align="center">
            <template slot-scope="scope">
              <img :src="onLine" v-if="scope.row.online" title="在线" alt="在线" />
              <img :src="offLine" v-else title="离线" alt="离线" />
            </template>
          </el-table-column>
          <el-table-column
            prop="useStatus"
            label="是否占用"
            show-overflow-tooltip
            sortable
            align="center"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>系统名称: {{ scope.row.systemName||'--' }}</p>
                <p>任务名称: {{ scope.row.sytemTask||'--' }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag
                    size="medium"
                    :type="scope.row.useStatus?'danger':'success'"
                  >{{ scope.row.useStatus?"占用":"空闲" }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="绑定时间" show-overflow-tooltip sortable align="center">
            <template slot-scope="scope">{{scope.row.createTime.slice(0,10)}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!-- <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button> -->
              <el-tooltip class="item" effect="dark" content="恢复" placement="top">
                <el-button
                  type="cyan"
                  icon="el-icon-circle-check"
                  circle
                  @click="handleClick(scope.row)"
                  size="small"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        :current-page="currentPage"
        :total="tableData.length"
        class="pagination"
        :page-size="pagesize"
        background
        layout="total, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { GetRecover, GetDeviceQuery } from "../../../api/deviceManagement";
import { assign } from "@/utils/validate";
export default {
  name: "ScrapDeviceList",
  data() {
    return {
      formInline: {
        deviceNum: "",
        deviceModel: "",
        deviceStatus: "",
      },
      onLine: require("@/assets/images/onLine.png"),
      offLine: require("@/assets/images/offLine.png"),
      tableData: [],
      currentPage: 1,
      pagesize: 8,
      height: null,
    };
  },
  props: ["scrapList", "qmodel"],
  computed: {
    pageTable() {
      // 数据前端分页及查询
      return this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
  },
  watch: {
    scrapList: {
      handler(n, o) {
        this.tableData = n;
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.resetHeight();
    window.addEventListener(
      "resize",
      () => {
        this.height =
          document.body.offsetHeight < 900
            ? document.body.offsetHeight * 0.431
            : null;
        this.resetHeight();
      },
      false
    );
  },
  methods: {
    onSubmit() {
      let data = {};
      assign(data, "deviceNo", this.formInline.deviceNum);
      assign(data, "model", this.formInline.deviceModel);
      assign(data, "useStatus", this.formInline.deviceStatus);
      this.currentPage = 1;
      this.pagesize = 10;
      GetDeviceQuery(data)
        .then((res) => {
          this.tableData = res.data.filter((item) => item.status == 0);
        })
        .catch((error) => {
          console.log(error);
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
    resetHeight() {
      this.height =
        document.body.offsetHeight < 900
          ? document.body.offsetHeight * 0.431
          : null;
    },
    handleClick(row) {
      this.$confirm("此操作将恢复该设备, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          GetRecover({ deviceNo: row.deviceNo })
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: "恢复成功!",
              });
              this.$emit("getMyDevices");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
};
</script>
<style lang='scss' scoped>
.scrap-device-list {
  .device-container {
    padding: 10px 20px;
    .search-box {
      margin-bottom: 20px;
    }
    .table-container {
      img {
        width: 25px;
      }
    }
  }
}
</style>

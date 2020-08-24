<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="单位名称" prop="customerName">
        <el-input v-model="queryParams.customerName" placeholder="请输入单位名称" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="销售名称" prop="saleName">
        <el-input v-model="queryParams.saleName" placeholder="请输入销售名称" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="创建人员" prop="creator">
        <el-input v-model="queryParams.creator" placeholder="请输入创建人员" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="订单状态" prop="status">
        <el-select size="small" v-model="queryParams.status" clearable filterable placeholder="请选择订单状态"
          @keyup.enter.native="handleQuery">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="dateRange" size="small" style="width: 240px" value-format="yyyy-MM-dd" type="daterange"
          range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="pageTable" default-expand-all lazy :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="key">
      <el-table-column sortable label="订单编号" align="center" prop="orderNo" :show-overflow-tooltip="true" />
      <el-table-column sortable label="产品型号" align="center" prop="productModel" :show-overflow-tooltip="true" />
      <el-table-column sortable label="产品类型数量" align="center" prop="typeCount" :show-overflow-tooltip="true" />
      <el-table-column sortable label="产品价格" align="center" prop="price" :show-overflow-tooltip="true" />
      <el-table-column sortable label="单位名称" align="center" prop="company" :show-overflow-tooltip="true" />
      <el-table-column sortable label="销售名称" align="center" prop="saleName" :show-overflow-tooltip="true" />
      <el-table-column sortable label="创建人员" align="center" prop="createName" />
      <el-table-column sortable label="状态" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{status['status'+scope.row.status] }}</template>
      </el-table-column>
      <el-table-column sortable label="创建时间" align="center" prop="createTime2" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.hasBtn&&scope.row.typeCount&&(scope.row.status==1||scope.row.status==2||scope.row.status==3)"
            type="text" size="small" icon="el-icon-s-promotion" @click="handleCtrlRow(scope.row,'deposit')"
            v-hasPermi="['production:storage:insert']">出库</el-button>
          <el-button v-if="scope.row.hasBtn&&scope.row.typeCount&&(scope.row.status==4)" type="text" size="small"
            icon="el-icon-notebook-2" @click="handleCtrlRow(scope.row,'depositDetails')"
            v-hasPermi="['production:storage:details']">
            详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="currentPage" :total="tableList.length" class="pagination" background
      layout="total, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import {
  CancleOrder,
  DelOrderDetail,
  InsertOrder,
  QueryOrderDetailList,
  QueryOrderList,
  UpdateOrderStatus,
  UpdateOrder,
} from "@/api/production/list.js";
import { assign } from "@/utils/validate";
export default {
  name: "storage",
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
      // 日期范围
      dateRange: "",
      // 查询参数
      currentPage: 1,
      pagesize: 10,
      queryParams: {
        customerName: undefined,
        saleName: undefined,
        creator: undefined,
        status: undefined,
      },
      options: [
        { label: "取消", value: "0" },
        { label: "下单", value: "1" },
        { label: "确认", value: "2" },
        { label: "正在出库", value: "3" },
        { label: "出库完成", value: "4" },
        { label: "已回款", value: "5" },
      ],
      status: {
        status0: "取消",
        status1: "下单",
        status2: "确认",
        status3: "正在出库",
        status4: "出库完成",
        status5: "已回款",
      },
    };
  },
  created() {
    this.getList();
  },
  computed: {
    pageTable() {
      return this.tableList.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
  },
  methods: {
    /** 查询表集合 */
    getList() {
      this.loading = true;
      let par = {};
      assign(par, "company", this.queryParams.customerName);
      assign(par, "createName", this.queryParams.creator);
      assign(par, "status", this.queryParams.status);
      assign(par, "saleName", this.queryParams.saleName);
      assign(par, "startTime", this.dateRange[0]);
      assign(par, "endTime", this.dateRange[1]);
      QueryOrderList(par).then((response) => {
        response.data.forEach((element, index) => {
          element.key = "order" + index;
          element.createTime2 =
            element.createTime.slice(0, 10) +
            " " +
            element.createTime.slice(11, 19);
          element.hasBtn = true;
          if (element.typeCount > 0) {
            element.hasChildren = true;
          }
        });
        this.tableList = response.data || [];
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.currentPage = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 出库 */
    handleCtrlRow(row, path) {
      let obj = {
        id: row.id,
        orderNo: row.orderNo,
        company: row.company,
        saleName: row.saleName,
        createTime: row.createTime2,
        status: row.status,
      };
      if (row.status == 1) {
        UpdateOrderStatus({ id: row.id });
      }
      this.$router.push({
        path: path,
        query: {
          baseInfo: JSON.stringify(obj),
        },
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    load(tree, treeNode, resolve) {
      QueryOrderDetailList({ orderId: tree.id }).then((response) => {
        let data = response.data;
        data.forEach((el, index) => {
          el.hasBtn = false;
          el.key = "details" + index + el.id + el.orderId + el.price;
          el.typeCount = el.quantity;
        });
        resolve(data || []);
      });
    },
  },
};
</script>
<style lang='scss' scoped>
</style>
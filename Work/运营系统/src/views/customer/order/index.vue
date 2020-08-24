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
          range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-download" size="mini" @click="handleCtrlTable(0)">新增</el-button>
      </el-col>
    </el-row>
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
          <el-button v-if="scope.row.hasBtn" type="text" size="small" icon="el-icon-s-promotion"
            @click="handleCtrlTable(scope.row.id)" v-hasPermi="['customer:order:edit']">修改</el-button>
          <el-button v-if="scope.row.hasBtn" type="text" size="small" icon="el-icon-notebook-2"
            @click="handleCancelRow(scope.row)" v-hasPermi="['customer:order:cancel']">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="currentPage" :total="tableList.length" class="pagination" background
      layout="total, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="40%" @close='closeDialog'>
      <el-form :model="ctrlForm" :rules="rules" ref="ctrlForm" size="mini" label-width="100px" class="demo-ctrlForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="单位名称" prop="customerName">
              <el-select v-model="ctrlForm.customerName" clearable filterable placeholder="请选择单位名称">
                <el-option :label="item.company" :value="item.id" v-for="(item,index) in customerList" :key="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="销售人员" prop="saleName">
              <el-select v-model="ctrlForm.saleName" clearable filterable placeholder="请选择销售人员">
                <el-option :label="item.nickName" :value="item.userId" v-for="(item,index) in saleList" :key="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交货日期" prop="deliveryDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="ctrlForm.deliveryDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="订单明细" prop="contact">
              <el-row :gutter="20" class="mb20">
                <el-button size="mini" type="primary" icon="el-icon-plus"
                  @click="addRow({ productModel: '',quantity: '',price: '',model: ''},list.length)">添加设备</el-button>
              </el-row>
              <el-row :gutter="20" class="headers">
                <el-col :span="4">编号</el-col>
                <el-col :span="5">设备型号</el-col>
                <el-col :span="5">设备数量</el-col>
                <el-col :span="5">设备价格</el-col>
                <el-col :span="5">操作</el-col>
              </el-row>
              <el-row :gutter="20" class="content" v-for="(it,key) in list" :key="key">
                <el-col :span="4">{{key}}</el-col>
                <el-col :span="5">
                  <el-select v-model="it.model" value-key="id" clearable filterable placeholder="请选择销售人员">
                    <el-option :label="item.model" :value="item" v-for="(item) in prodList" :key="item.id"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="5">
                  <el-input v-model="it.quantity" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="5">
                  <el-input v-model="it.price" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="5">
                  <el-button class="btn" type="danger" size="mini" @click="delRow(key)">删除</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitForm('ctrlForm')">确 定</el-button>
      </div>
    </el-dialog>
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
  QueryUserList,
  QueryOrderJoinDetail,
} from "@/api/production/list.js";
import { QueryCustomerList } from "@/api/customer/list.js";
import { QueryProdList } from "@/api/product/list.js";
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
      dialogFormVisible: false,
      selectID: "",
      ctrlForm: {
        customerName: "",
        saleName: "",
        deliveryDate: "",
      },
      rules: {
        customerName: [
          { required: true, message: "请选择单位名称", trigger: "change" },
        ],
        saleName: [
          { required: true, message: "请选择销售人员", trigger: "change" },
        ],
        deliveryDate: [
          { required: true, message: "请选择交货日期", trigger: "change" },
        ],
      },
      list: [{ productModel: "", quantity: "", price: "", model: "" }],
      customerList: [],
      prodList: [],
      saleList: [],
      title: "新 增",
    };
  },
  created() {
    this.getList();
    this.getCustomerList();
    this.getSaleList();
    this.getProdList();
  },
  computed: {
    /** 数据前端分页及查询 */
    pageTable() {
      return this.tableList.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
  },
  methods: {
    /** 查询列表集合 */
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
    /** 修改 */
    handleCtrlTable(id) {
      this.resetForm("queryForm");
      this.dialogFormVisible = true;
      this.selectID = id;
      if (id != 0) {
        this.title = "编 辑";
        QueryOrderJoinDetail({ orderId: id }).then((response) => {
          console.log(response);
          this.ctrlForm.customerName = response.data.cid;
          this.ctrlForm.saleName = response.data.saleId;
          this.ctrlForm.deliveryDate = response.data.deliveryDate;
          response.data.orderDetails.forEach((el) => {
            el.model = {
              id: el.productId, //必须保留
              fullName: el.deviceName,
              model: el.productModel,
            };
          });
          this.list = response.data.orderDetails;
        });
      } else {
        this.title = "新 增";
      }
    },
    /** 取消订单 */
    handleCancelRow(row) {
      this.$confirm("此操作将取消该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          CancleOrder({ id: row.id }).then((response) => {
            console.log(response);
            this.$message({
              type: "success",
              message: response.data,
            });
            this.getList();
          });
        })
        .catch(() => {});
    },
    /* 分页相关 */
    handleSizeChange(val) {
      this.pagesize = val;
    },
    /* 分页相关 */
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    /* 异步加载数据 */
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
    /* 新增 */
    addRow(row, index) {
      var Row = {};
      for (var k in row) {
        Row[k] = row[k];
      }
      this.list.splice(index, 0, Row);
    },
    /* 删除 */
    delRow(index) {
      this.list.splice(index, 1);
    },
    /* 提交 */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let par = {
            cid: this.ctrlForm.customerName,
            deliveryDate: this.ctrlForm.deliveryDate,
            saleId: this.ctrlForm.saleName,
          };
          if (this.list.length == 0) {
            this.$message({
              type: "error",
              message: "请至少添加一种设备",
            });
            return false;
          } else {
            this.list.forEach((el) => {
              el.deviceName = el.model.fullName;
              el.productId = el.model.id;
              el.productModel = el.model.model;
              if (!el.productModel || !el.quantity || !el.price || !el.model) {
                this.$message({
                  type: "error",
                  message: "请至少添加一种设备",
                });
                throw Error("请至少添加一种设备");
              }
            });
          }
          par.voList = this.list;
          InsertOrder(par).then((response) => {
            this.$message({
              type: "success",
              message: response.data,
            });
            this.getList();
            this.dialogFormVisible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getCustomerList() {
      QueryCustomerList({}).then((response) => {
        this.customerList = response.data;
      });
    },
    getProdList() {
      QueryProdList({}).then((response) => {
        this.prodList = response.data;
      });
    },
    getSaleList() {
      QueryUserList({}).then((response) => {
        this.saleList = response.rows;
      });
    },
    closeDialog() {
      this.resetForm("ctrlForm");
      this.list = [{ productModel: "", quantity: "", price: "", model: "" }];
    },
  },
};
</script>
<style lang='scss' scoped>
.demo-ctrlForm {
  .headers,
  .content {
    text-align: center;
    border-bottom: 1px solid #ccc;
    margin: 0 !important;
    .el-col {
      padding: 5px;
      .btn {
        margin: 0 5px 0 5px;
      }
    }
  }
}
</style>
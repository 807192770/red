<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="单位名称" prop="corporateName">
        <el-input v-model="queryParams.corporateName" placeholder="请输入单位名称" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="省份" prop="province">
        <el-input v-model="queryParams.province" placeholder="请输入省份" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="市区" prop="city">
        <el-input v-model="queryParams.city" placeholder="请输入市区" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="联系人" prop="creator">
        <el-input v-model="queryParams.contact" placeholder="请输入联系人" clearable size="small"
          @keyup.enter.native="handleQuery" />
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
    <el-table v-loading="loading" :data="pageTable">
      <el-table-column label="序号" type="index" align="center" width="50">
        <template slot-scope="scope">
          <span>{{(currentPage - 1) * pagesize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位名称" align="center" prop="company" :show-overflow-tooltip="true" />
      <el-table-column label="联系人" align="center" prop="contact" :show-overflow-tooltip="true" />
      <el-table-column label="手机号码" align="center" prop="phone" :show-overflow-tooltip="true" />
      <el-table-column label="省" align="center" prop="province" :show-overflow-tooltip="true" />
      <el-table-column label="市" align="center" prop="city" :show-overflow-tooltip="true" />
      <el-table-column label="单位地址" align="center" prop="addr" />
      <el-table-column label="创建时间" sortable align="center" prop="createTime">
        <template
          slot-scope="scope">{{ scope.row.createTime.slice(0,10) + ' ' +scope.row.createTime.slice(11,19)}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-edit" @click="handleCtrlTable(scope.row.id)"
            v-hasPermi="['customer:customer:edit']">修改</el-button>
          <el-button type="text" size="small" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['customer:customer:remove']">删除</el-button>
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
              <el-input v-model="ctrlForm.customerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" prop="contact">
              <el-input v-model="ctrlForm.contact"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phoneNum">
              <el-input v-model="ctrlForm.phoneNum" maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司地址" prop="corporateAddress">
              <el-input v-model="ctrlForm.corporateAddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="所属地区">
              <v-distpicker hide-area @selected="areaSelected" :province="ctrlForm.province" :city="ctrlForm.city">
              </v-distpicker>
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
import { assign } from "@/utils/validate";
import VDistpicker from "v-distpicker";

import {
  QueryCustomerList,
  DeleteCustomer,
  UpdateCustomer,
  GetCustomerByID,
} from "@/api/customer/list.js";
export default {
  name: "customer",
  components: { VDistpicker },
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
      currentPage: 1,
      pagesize: 10,
      // 日期范围
      dateRange: "",
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        corporateName: undefined,
        contact: undefined,
        province: undefined,
        city: undefined,
      },
      dialogFormVisible: false,
      selectID: "",
      ctrlForm: {
        customerName: "",
        contact: "",
        phoneNum: "",
        corporateAddress: "",
        province: "",
        city: "",
      },
      rules: {
        customerName: [
          { required: true, message: "请输入单位名称", trigger: "blur" },
        ],
        contact: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        phoneNum: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
        ],
        corporateAddress: [
          { required: false, message: "请输入公司地址", trigger: "blur" },
        ],
        province: [
          { required: true, message: "请选择省份", trigger: "change" },
        ],
        city: [{ required: true, message: "请选择地区", trigger: "change" }],
      },
      title: "新 增",
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
      this.resetQuery();
    }
  },
  methods: {
    /** 查询 */
    getList() {
      this.loading = true;
      let par = {};
      assign(par, "province", this.queryParams.province);
      assign(par, "city", this.queryParams.city);
      assign(par, "company", this.queryParams.corporateName);
      assign(par, "contact", this.queryParams.contact);
      assign(par, "begin", this.dateRange[0]);
      assign(par, "end", this.dateRange[1]);
      QueryCustomerList(par).then((response) => {
        this.tableList = response.data;
        this.total = this.tableList.length;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 地区选择 */
    areaSelected(data) {
      this.ctrlForm.province = data.province.value;
      this.ctrlForm.city = data.city.value;
    },

    /** 修改按钮操作 */
    handleCtrlTable(id) {
      this.dialogFormVisible = true;
      this.selectID = id;
      if (id != 0) {
        this.title = "编 辑";
        GetCustomerByID(id).then((response) => {
          //console.log(response);
          this.ctrlForm.customerName = response.data.company;
          this.ctrlForm.contact = response.data.contact;
          this.ctrlForm.phoneNum = response.data.phone;
          this.ctrlForm.corporateAddress = response.data.addr;
          this.ctrlForm.province = response.data.province;
          this.ctrlForm.city = response.data.city;
        });
      } else {
        this.title = "新 增";
        this.ctrlForm.customerName = "";
        this.ctrlForm.contact = "";
        this.ctrlForm.phoneNum = "";
        this.ctrlForm.corporateAddress = "";
        this.ctrlForm.province = "河北省";
        this.ctrlForm.city = "保定市";
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const tableIds = row.id;
      this.$confirm('是否确认删除客户【"' + row.company + '"】?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return DeleteCustomer({ id: tableIds });
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    // 提交弹框
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let par = {};
          assign(par, "company", this.ctrlForm.customerName);
          assign(par, "province", this.ctrlForm.province);
          assign(par, "city", this.ctrlForm.city);
          assign(par, "addr", this.ctrlForm.corporateAddress);
          assign(par, "contact", this.ctrlForm.contact);
          assign(par, "phone", this.ctrlForm.phoneNum);
          assign(par, "status", 1);
          assign(par, "id", this.selectID);
          if (par.province == "省" || par.city == "市") {
            this.msgError("请选择所属地区");
            return false;
          }
          UpdateCustomer(par).then((response) => {
            this.msgSuccess(response.data);
            this.getList();
            this.dialogFormVisible = false;
            this.resetForm("ctrlForm");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
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
    closeDialog() {
      this.resetForm("ctrlForm");
    },
  },
};
</script>
<style lang="scss" scope>
.distpicker-address-wrapper {
  select {
    height: 28px !important;
    padding: 0 15px !important;
    outline: none;
    font-size: 12px !important;
    color: #606266;
  }
}
</style>
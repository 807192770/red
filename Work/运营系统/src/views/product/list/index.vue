<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="产品全称" prop="name">
        <el-input v-model="queryParams.name" placeholder="请输入产品全称" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="产品类别" prop="type">
        <el-select v-model="queryParams.type" clearable filterable size="small" @keyup.enter.native="handleQuery"
          placeholder="请选择产品类别">
          <el-option label="系统" :value="1"></el-option>
          <el-option label="设备" :value="2"></el-option>
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
        <el-button type="primary" icon="el-icon-download" size="mini" @click="handleCtrlTable(null)"
          v-hasPermi="['product:list:add']">新增</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="pageTable">
      <el-table-column label="序号" type="index" align="center" width="50">
        <template slot-scope="scope">
          <span>{{(currentPage - 1) * pagesize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品型号" sortable align="center" prop="model" :show-overflow-tooltip="true" />
      <el-table-column label="产品类别" sortable align="center" prop="category" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{ scope.row.category==1?'系统':'设备'}}</template>
      </el-table-column>
      <el-table-column label="产品全称" sortable align="center" prop="fullName" :show-overflow-tooltip="true" />
      <el-table-column label="产品简称" sortable align="center" prop="shortName" :show-overflow-tooltip="true" />
      <el-table-column label="创建时间" sortable align="center" prop="createTime">
        <template
          slot-scope="scope">{{ scope.row.createTime.slice(0,10) + ' ' +scope.row.createTime.slice(11,19)}}</template>
      </el-table-column>
      <el-table-column label="备注" sortable align="center" prop="remark" :show-overflow-tooltip="true" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-edit" @click="handleCtrlTable(scope.row.id)"
            v-hasPermi="['product:list:edit']">修改</el-button>
          <el-button type="text" size="small" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['product:list:remove']">删除</el-button>
          <el-button type="text" size="small" icon="el-icon-notebook-2" @click="handleDetails(scope.row)"
            v-hasPermi="['product:list:details']">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="currentPage" :total="tableList.length" class="pagination" background
      layout="total, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="40%"
      ref="dialogForm" @close='closeDialog'>
      <el-form :model="ctrlForm" :rules="rules" ref="ctrlForm" label-width="100px" class="demo-ctrlForm" size="small">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="产品类别" prop="category">
              <el-select v-model="ctrlForm.category" placeholder="请选择产品型号">
                <el-option label="系统" :value="1"></el-option>
                <el-option label="设备" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品型号" prop="model">
              <el-input v-model="ctrlForm.model"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品简称" prop="shortName">
              <el-input v-model="ctrlForm.shortName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品全称" prop="fullName">
              <el-input v-model="ctrlForm.fullName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ctrlForm.remark" maxlength="100"
                show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitForm('ctrlForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  QueryProdList,
  DeleteProd,
  UpdateProd,
  GetProdByID,
} from "@/api/product/list.js";
import { assign } from "@/utils/validate";
export default {
  name: "productList",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 表数据
      tableList: [],
      // 日期范围
      dateRange: "",
      // 查询参数
      currentPage: 1,
      pagesize: 10,
      queryParams: {
        name: "",
        type: "",
      },
      selectID: "",
      dialogFormVisible: false,
      ctrlForm: {
        fullName: "",
        shortName: "",
        model: "",
        category: "",
        remark: "",
      },
      rules: {
        fullName: [
          { required: true, message: "请输入产品全称", trigger: "blur" },
          { max: 20, message: "不能超过20个字符", trigger: "blur" },
        ],
        shortName: [
          { required: true, message: "请输入产品简称", trigger: "blur" },
          { max: 10, message: "不能超过10个字符", trigger: "blur" },
        ],
        model: [{ required: true, message: "请输入产品型号", trigger: "blur" }],
        category: [
          { required: true, message: "请选择产品类别", trigger: "change" },
        ],
        remark: [{ max: 100, message: "不能超过100个字符", trigger: "blur" }],
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
  methods: {
    /** 查询 */
    getList() {
      this.loading = true;
      let par = {};
      assign(par, "type", this.queryParams.type);
      assign(par, "name", this.queryParams.name);
      assign(par, "start", this.dateRange[0]);
      assign(par, "end", this.dateRange[1]);
      QueryProdList(par).then((response) => {
        this.tableList = response.data;
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
    /** 修改按钮操作 */
    handleCtrlTable(id) {
      this.dialogFormVisible = true;
      this.selectID = id;
      if (id) {
        this.title = "编 辑";
        GetProdByID(id).then((response) => {
          console.log(response);
          this.ctrlForm.fullName = response.data.fullName;
          this.ctrlForm.shortName = response.data.shortName;
          this.ctrlForm.model = response.data.model;
          this.ctrlForm.category = response.data.category;
          this.ctrlForm.remark = response.data.remark;
        });
      } else {
        this.title = "新 增";
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const tableIds = row.id;
      this.$confirm(
        '是否确认删除产品全称为 "' + row.fullName + '" 的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return DeleteProd({ id: tableIds });
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function () {});
    },
    /* 提交弹框  */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let par = {};
          assign(par, "fullName", this.ctrlForm.fullName);
          assign(par, "shortName", this.ctrlForm.shortName);
          assign(par, "model", this.ctrlForm.model);
          assign(par, "category", this.ctrlForm.category);
          assign(par, "remark", this.ctrlForm.remark);
          assign(par, "id", this.selectID);
          UpdateProd(par).then((response) => {
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
    /* 跳转 */
    handleDetails(row) {
      this.$router.push({
        path: "details",
        query: {
          id: row.id,
          name: row.fullName,
          time:
            row.createTime.slice(0, 10) + " " + row.createTime.slice(11, 19),
        },
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    closeDialog() {
      this.resetForm("ctrlForm");
    },
  },
};
</script>
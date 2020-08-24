<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="属性类别" prop="category">
        <el-select v-model="queryParams.category" clearable filterable size="small" @keyup.enter.native="handleQuery"
          placeholder="请选择属性类别">
          <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="属性名称" prop="name">
        <el-input v-model="queryParams.name" placeholder="请输入属性名称" clearable size="small"
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
        <el-button type="primary" icon="el-icon-download" size="mini" @click="handleCtrlTable(null)"
          v-hasPermi="['product:attr:add']">新增</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="pageTable">
      <el-table-column label="序号" type="index" align="center" width="50">
        <template slot-scope="scope">
          <span>{{(currentPage - 1) * pagesize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="属性类别" sortable align="center" prop="category" :show-overflow-tooltip="true" />
      <el-table-column label="属性名称" sortable align="center" prop="name" :show-overflow-tooltip="true" />
      <el-table-column label="属性标签" sortable align="center" prop="title" />
      <el-table-column label="创建时间" sortable align="center" prop="createTime">
        <template
          slot-scope="scope">{{ scope.row.createTime.slice(0,10) + ' ' +scope.row.createTime.slice(11,19)}}</template>
      </el-table-column>

      <el-table-column label="备注" sortable align="center" prop="remark" :show-overflow-tooltip="true" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-edit" @click="handleCtrlTable(scope.row.id)"
            v-hasPermi="['product:attr:edit']">修改</el-button>
          <el-button type="text" size="small" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['product:attr:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="currentPage" :total="tableList.length" class="pagination" background
      layout="total, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    <el-dialog :title="title" :close-on-click-modal="false" :visible.sync="dialogFormVisible" width="40%"
      @close='closeDialog'>
      <el-form :model="ctrlForm" :rules="rules" ref="ctrlForm" label-width="100px" class="demo-ctrlForm" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="属性类别" prop="category">
              <el-select v-model="ctrlForm.category" clearable filterable placeholder="请选择属性类别">
                <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="属性名称" prop="name">
              <el-input v-model="ctrlForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="属性标签" prop="title">
              <el-input v-model="ctrlForm.title"></el-input>
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
  QueryAttrList,
  DeleteAttr,
  UpdateAttr,
  GetAttrByID,
  GetAttrCategory,
} from "@/api/product/attr.js";
import { assign } from "@/utils/validate";
export default {
  name: "productAttr",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 总条数
      total: 0,
      // 表数据
      tableList: [],
      currentPage: 1,
      pagesize: 10,
      categoryList: [],
      // 日期范围
      dateRange: "",
      // 查询参数
      queryParams: {
        start: "",
        end: "",
        category: "",
        name: "",
      },
      dialogFormVisible: false,
      selectID: "",
      ctrlForm: {
        name: "",
        category: "",
        title: "",
        remark: "",
      },
      rules: {
        name: [{ required: true, message: "请输入属性名称", trigger: "blur" }],
        title: [{ required: true, message: "请输入属性标签", trigger: "blur" }],
        category: [
          { required: true, message: "请选择属性类别", trigger: "change" },
        ],
      },
      title: "新 增",
    };
  },
  created() {
    this.getAttrCategory();
    this.getList();
  },
  computed: {
    /* 数据前端分页及查询 */
    pageTable() {
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
      assign(par, "category", this.queryParams.category);
      assign(par, "name", this.queryParams.name);
      assign(par, "start", this.dateRange[0]);
      assign(par, "end", this.dateRange[1]);
      QueryAttrList(par).then((response) => {
        this.tableList = response.data;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 获取属性名称 */
    getAttrCategory() {
      GetAttrCategory().then((response) => {
        this.categoryList = response.data;
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
        GetAttrByID(id).then((response) => {
          console.log(response);
          this.ctrlForm.name = response.data.name;
          this.ctrlForm.category = response.data.category;
          this.ctrlForm.title = response.data.title;
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
        '是否确认删除属性标签为"' + row.title + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          return DeleteAttr({ id: tableIds });
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
          assign(par, "category", this.ctrlForm.category);
          assign(par, "name", this.ctrlForm.name);
          assign(par, "title", this.ctrlForm.title);
          assign(par, "remark", this.ctrlForm.remark);
          assign(par, "id", this.selectID);
          UpdateAttr(par).then((response) => {
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
<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="产品名称" prop="productName">
        <el-input
          v-model="queryParams.productName"
          placeholder="请输入产品名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建用户" prop="createUser">
        <el-input
          v-model="queryParams.createUser"
          placeholder="请输入创建用户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属部门" prop="department">
        <el-input
          v-model="queryParams.department"
          placeholder="请输入所属部门"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-download"
          size="mini"
          @click="handleCtrlTable"
          v-hasPermi="['service:history:add']"
        >新增</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="tableList">
      <el-table-column label="序号" type="index" align="center" width="160">
        <template slot-scope="scope">
          <span>{{(queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品名称" align="center" prop="company" :show-overflow-tooltip="true" />
      <el-table-column label="创建用户" align="center" prop="contact" :show-overflow-tooltip="true" />
      <el-table-column label="所属部门" align="center" prop="phone" :show-overflow-tooltip="true" />
      <el-table-column label="创建时间" align="center" prop="createTime" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="handleCtrlTable(scope.row)"
            v-hasPermi="['service:history:edit']"
          >修改</el-button>
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['service:history:remove']"
          >删除</el-button>
          <el-button
            type="text"
            size="small"
            icon="el-icon-notebook-2"
            @click="handleDetails(scope.row)"
            v-hasPermi="['service:history:details']"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="40%">
      <el-form
        :model="ctrlForm"
        :rules="rules"
        ref="ctrlForm"
        label-width="100px"
        size="mini"
        class="demo-ctrlForm"
      >
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
              <el-input v-model="ctrlForm.phoneNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司地址" prop="corporateAddress">
              <el-input v-model="ctrlForm.corporateAddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属省份" prop="province">
              <el-select v-model="ctrlForm.province" placeholder="请选择省份">
                <el-option label="男" value="shanghai"></el-option>
                <el-option label="女" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属地区" prop="city">
              <el-select v-model="ctrlForm.city" placeholder="请选择地区">
                <el-option label="男" value="shanghai"></el-option>
                <el-option label="女" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio v-model="ctrlForm.status" label="1">正常</el-radio>
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
import { listTable, previewTable, delTable } from "@/api/tool/gen";
export default {
  name: "history",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 唯一标识符
      uniqueId: "",
      // 总条数
      total: 0,
      // 表数据
      tableList: [
        {
          customerName: "12",
          tableComment: "12",
          className: "12",
          createTime: "12",
          createTime: "12",
          customerName: "12",
          customerName: "12",
          customerName: "12",
        },
      ],
      // 日期范围
      dateRange: "",
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        productName: undefined,
        createUser: undefined,
        department: undefined,
      },
      dialogFormVisible: false,
      ctrlForm: {
        customerName: "",
        contact: "",
        phoneNum: "",
        corporateAddress: "",
        province: "",
        city: "",
        status: false,
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
    };
  },
  created() {
    // this.getList();
  },
  activated() {
    const time = this.$route.query.t;
    if (time != null && time != this.uniqueId) {
      this.uniqueId = time;
      this.resetQuery();
    }
  },
  methods: {
    /** 查询表集合 */
    getList() {
      this.loading = true;
      listTable(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.tableList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
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
    /** 修改按钮操作 */
    handleCtrlTable(row) {
      this.dialogFormVisible = true;
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const tableIds = row.tableId;
      this.$confirm('是否确认删除表编号为"' + tableIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delTable(tableIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function () {});
    },
    // 提交弹框
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleDetails(row) {
      this.$router.push({ path: "details", query: { id: row } });
    },
  },
};
</script>
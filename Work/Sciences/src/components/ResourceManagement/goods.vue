<template>
  <div class="resource-management-goods">
    <!-- 物品管理 -->
    <div class="main">
      <div class="main-header">
        <div class="left">
          <el-select v-model="bindingState" placeholder="绑定状态" class="left-select" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            v-model="keyWords"
            placeholder="请输入物品名称/设备ID/物品编号/部门/子部门进行搜索"
            class="left-input"
            size="small"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" icon="el-icon-search" class="left-btn" size="small">搜索</el-button>
        </div>
        <div class="right">
          <el-button type="text" icon="el-icon-download" class="plain" @click="downloadFile()">下载模板</el-button>
          <el-button
            type="primary"
            plain
            size="small"
            icon="el-icon-upload"
            @click="importFile()"
          >导入</el-button>
          <el-button
            type="primary"
            @click="exportFile()"
            plain
            size="small"
            icon="el-icon-download"
          >导出</el-button>
          <el-button type="primary" size="small" @click="edit(null)">新增物品</el-button>
        </div>
      </div>
      <div class="main-content">
        <div class="table-data">
          <el-table class="table" :data="tableData" stripe style="width: 100%" size="mini">
            <el-table-column type="index" label="序号" width="70"></el-table-column>
            <el-table-column prop="name" label="物品名称"></el-table-column>
            <el-table-column prop="id" label="设备ID"></el-table-column>
            <el-table-column prop="goodsId" label="物品编号"></el-table-column>
            <el-table-column prop="depart" label="部门"></el-table-column>
            <el-table-column prop="subDepart" label="子部门"></el-table-column>
            <el-table-column prop="isDel" label="是否绑定"></el-table-column>
            <el-table-column label="操作" width="300" class="operate">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  icon="el-icon-edit"
                  class="operate-btn"
                  @click="edit(scope.row)"
                >编辑</el-button>
                <el-button
                  type="text"
                  icon="el-icon-full-screen"
                  class="operate-btn"
                  @click="QRCode(scope.row)"
                >二维码</el-button>
                <el-button
                  type="text"
                  icon="el-icon-connection"
                  class="operate-btn"
                  @click="Unbind(scope.row)"
                >解绑工卡</el-button>
                <el-button
                  type="text"
                  icon="el-icon-delete"
                  class="operate-btn"
                  @click="deleteData(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="pagination"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="total, prev, pager, next, jumper"
            :total="40"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <div class="pop">
      <el-dialog title="导入" :visible.sync="dialogImport" width="400px">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogImport = false">取 消</el-button>
          <el-button type="primary" @click="dialogImport = false">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="导出" :visible.sync="dialogeExport" width="400px">
        <el-radio v-model="exportRadio" label="1">导出物品信息</el-radio>
        <el-radio v-model="exportRadio" label="2">导出全部信息</el-radio>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogeExport = false">取 消</el-button>
          <el-button type="primary" @click="dialogeExport = false">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="新增物品" :visible.sync="dialogeEdit" width="700px">
        <div class="editForm">
          <el-avatar :size="130" shape="square" src="../../assets/images/backBtn.png">
            <img src="../../assets/images/logo.png" />
          </el-avatar>
          <el-form :model="editForm" style="width:70%" :rules="rules" ref="editForm">
            <el-form-item label="物品名称：" prop="name" :label-width="formLabelWidth">
              <el-input v-model="editForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="物品编号：" prop="ID" :label-width="formLabelWidth">
              <el-input v-model="editForm.ID" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="部门：" :label-width="formLabelWidth">
              <el-input v-model="editForm.department" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="子部门：" :label-width="formLabelWidth">
              <el-input v-model="editForm.subDepartment" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="负责人电话：" :label-width="formLabelWidth">
              <el-input v-model="editForm.phone" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogeEdit = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="二维码绑定设备" :visible.sync="dialogQRCode" width="280px">
        <div class="content">
          <p>二维码绑定设备</p>
          <img src="../../assets/images/logo.png" alt />
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogQRCode = false">取 消</el-button>
          <el-button type="primary" @click="dialogQRCode = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "resource-management-goods",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      bindingState: "",
      keyWords: "",
      currentPage: 4,
      dialogImport: false,
      dialogeExport: false,
      dialogeEdit: false,
      dialogQRCode: false,
      exportRadio: "1",
      editForm: {
        name: "",
        ID: "",
        subDepartment: "",
        department: "",
        phone: ""
      },
      rules: {
        name: [{ required: true, message: "请填写物品名称", trigger: "blur" }],
        ID: [{ required: true, message: "请填写物品编号", trigger: "blur" }]
      },
      formLabelWidth: "120px"
    };
  },
  computed: {
    tableData() {
      return this.$store.getters.ResourceManagementIndexTable;
    }
  },
  mounted() {},

  methods: {
    //导入
    importFile() {
      this.dialogImport = true;
    },
    // 导出
    exportFile() {
      this.dialogeExport = true;
    },
    // 编辑&&新增
    edit(row) {
      console.log(row);
      this.dialogeEdit = true;
    },
    // 编辑&&新增--->提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 二维码
    QRCode(row) {
      this.dialogQRCode = true;
    },
    // 下载模板
    downloadFile() {},
    // 解绑工卡
    Unbind(row) {
      this.$confirm("确定要解绑吗?", "解绑", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除
    deleteData(index, row) {
      this.$confirm(
        "是否要删除此条信息？<p><span>提示：</span>若此物品已绑定设备，会连同设备信息一并删除</p>",
        "删除",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$store.dispatch("deleteRow", index);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style lang='scss' scoped>
.resource-management-goods {
  height: 100%;
  .main {
    height: 100%;
    display: flex;
    flex-direction: column;
    .main-header {
      padding: 10px 20px;
      background: #fff;
      border-bottom: 1px solid #dbdde1;
      display: flex;
      justify-content: space-between;
      .left {
        .left-select {
          width: 120px;
        }
        .left-input /deep/ {
          width: 380px;
          input::-webkit-input-placeholder {
            color: #9da8ce !important;
          }
          input::-moz-input-placeholder {
            color: #9da8ce !important;
          }
          input::-ms-input-placeholder {
            color: #9da8ce !important;
          }
        }
      }
      .right {
        .plain {
          color: #333;
          font-size: 12px;
        }
      }
    }
    .main-content {
      flex: 1;
      width: 100%;
      position: relative;
      .table-data {
        position: absolute;
        width: 100%;
        padding: 10px 20px;
        .table {
          .operate-btn {
            font-size: 12px;
            color: #333;
          }
        }
        .pagination {
          margin-top: 20px;
        }
      }
    }
  }
  .pop {
    .editForm {
      display: flex;
      justify-content: center;
    }
    .content {
      text-align: center;
      p {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
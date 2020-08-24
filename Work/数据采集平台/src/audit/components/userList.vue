<template>
  <div class="list">
    <!-- 用户列表导航 -->
    <div class="list-nav public-nav-style">
      <h3 class="list-nav-title">公司组织架构</h3>
      <div class="list-nav-menu">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item name="1">
            <template slot="title">
              <i class="header-icon el-icon-tickets"></i>研发部
            </template>
            <ul class="list-nav-subMenu">
              <li>研发一部</li>
              <li>研发二部</li>
            </ul>
          </el-collapse-item>
          <el-collapse-item title="产品部" name="2">
            <template slot="title">
              <i class="header-icon el-icon-tickets"></i>产品部
            </template>
            <ul class="list-nav-subMenu">
              <li>金融产品部</li>
              <li>新零售产品部</li>
            </ul>
          </el-collapse-item>
          <el-collapse-item title="财务部" name="3">
            <template slot="title">
              <i class="header-icon el-icon-tickets"></i>财务部
            </template>
            <ul class="list-nav-subMenu">
              <li>预算</li>
              <li>审计</li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="list-content">
      <!-- 查询框 -->
      <div class="list-content-filter">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="用户ID：">
                <el-input v-model="form.userID" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="姓名：">
                <el-input v-model="form.userName" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="部门：">
                <el-select v-model="form.department" placeholder="全部" size="small">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="手机号：">
                <el-input v-model="form.phoneNum" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="btn-item">
              <el-form-item>
                <el-button type="primary" size="small" @click="subCondition">搜索</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 用户列表 -->
      <div class="list-content-main">
        <div class="add-user">
          <el-button type="primary" plain icon="el-icon-plus" @click="userEdit(null,false)">添加</el-button>
        </div>
        <div class="list-content-table">
          <el-table :data="processList" stripe style="width: 100%">
            <el-table-column prop="proId" label="UID"></el-table-column>
            <el-table-column prop="eventId" label="姓名"></el-table-column>
            <el-table-column prop="eventName" label="性别"></el-table-column>
            <el-table-column prop="status" label="组织架构"></el-table-column>
            <el-table-column prop="auditor" label="电话"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  class="c-blue"
                  size="small"
                  @click="userEdit(scope.row,true)"
                >编辑</el-button>
                <el-button type="text" class="c-blue" size="small" @click="userDist(scope.row)">分配角色</el-button>
                <el-button type="text" class="c-red" size="small" @click="userDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="list-content-pagenation">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 添加角色 -->
    <el-dialog
      :title="title"
      :visible.sync="createRoleFormVisible"
      width="750px"
      class="create-role dialog-style"
    >
      <el-form :model="createRoleForm" class="create-role-form">
        <el-form-item label="UID：" :label-width="formLabelWidth">
          <el-input v-model="createRoleForm.UID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" :label-width="formLabelWidth">
          <el-input v-model="createRoleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别：" :label-width="formLabelWidth">
          <el-radio v-model="createRoleForm.sex" label="1">男</el-radio>
          <el-radio v-model="createRoleForm.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="所属组织：" :label-width="formLabelWidth">
          <!-- <el-input v-model="createRoleForm.organ" autocomplete="off"></el-input> -->
          <el-cascader :options="optionsList" clearable v-model="createRoleForm.organ"></el-cascader>
        </el-form-item>
        <el-form-item label="用户名：" :label-width="formLabelWidth">
          <el-input v-model="createRoleForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="formLabelWidth">
          <el-input v-model="createRoleForm.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createRoleConfirmMsg(true)">确 定</el-button>
        <el-button @click="createRoleConfirmMsg(false)">取消</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 dialog -->
    <el-dialog
      title="分配角色"
      :visible.sync="disRoleFormVisible"
      width="750px"
      class="dis-role dialog-style"
    >
      <el-form :model="disRoleForm" class="dis-role-form">
        <el-form-item label="所属应用：" :label-width="formLabelWidth">
          <el-cascader :options="optionsList" clearable v-model="disRoleForm.app"></el-cascader>
        </el-form-item>
        <el-form-item label="选择角色：" :label-width="formLabelWidth">
          <el-cascader :options="optionsList" clearable v-model="disRoleForm.role"></el-cascader>
        </el-form-item>
        <el-form-item label="描述：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="disRoleForm.describe" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="disRoleConfirmMsg(true)">确 定</el-button>
        <el-button @click="disRoleConfirmMsg(false)">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "user-list",
  data() {
    return {
      title: "创建角色",
      activeNames: ["1"],
      // 查询框字段
      form: {
        userID: "",
        userName: "",
        department: "",
        phoneNum: ""
      },
      currentPage: 4,
      createRoleFormVisible: false,
      disRoleFormVisible: false,
      formLabelWidth: "100px",
      // 创建用户字段
      createRoleForm: {
        UID: "",
        name: "",
        sex: "1",
        organ: "",
        userName: "",
        password: ""
      },
      // 分配用户字段
      disRoleForm: {
        describe: "",
        app: "",
        role: ""
      }
      // 下拉列表
    };
  },
  computed: {
    optionsList() {
      return this.$store.state.Process.options;
    },
    processList() {
      return this.$store.state.Process.processList;
    }
  },
  mounted() {},
  methods: {
    // 导航
    handleChange(val) {
      console.log(val);
    },
    // 搜索
    subCondition() {
      alert("查询");
    },
    // 用户编辑
    userEdit(id, flag) {
      flag ? (this.title = "用户编辑") : "创建角色";
      this.createRoleFormVisible = true;
      return;
      const payload = {
        id
      };
      // 根据ID去查询该条数据
      this.$store.dispatch(
        "Process/getProcessListDetal",
        payload
      ); /*.then((res) => {
          // 成功后的处理
          this.createRoleFormVisible = true;
          // 将数据显示到框里
        });*/
    },
    // 资源分配
    userDist(rows) {
      console.log(rows);
      this.disRoleFormVisible = true;
    },
    // 用户删除
    userDelete(rows) {
      console.log(rows);
      this.$confirm(`确定要删除${rows.eventId}, 是否继续?`, "删除用户", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("Process/userDelete", rows);
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
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 弹框事件
    createRoleConfirmMsg(code) {
      this.createRoleFormVisible = false;
      if (code) {
        const payload = {
          eventId: this.form.eventId,
          id: this.form.id,
          currentNode: this.form.currentNode,
          status: 1,
          auditCode: code, //1：通过，2：驳回
          auditMsg: this.form.auditMsg
        };
        this.$store.dispatch("Process/confirmProcessNode", payload);
      }
    },
    disRoleConfirmMsg(code) {
      this.disRoleFormVisible = false;
      if (code) {
        const payload = {
          eventId: this.form.eventId,
          id: this.form.id,
          currentNode: this.form.currentNode,
          status: 1,
          auditCode: code, //1：通过，2：驳回
          auditMsg: this.form.auditMsg
        };
        this.$store.dispatch("Process/confirmProcessNode", payload);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.list {
  display: flex;
  height: 100%;
  .list-nav {
    flex: 175px;
    background: #fff;
    margin-right: 20px;
    padding: 25px;
    box-sizing: border-box;
    overflow-y: auto;
    .list-nav-title {
      font-weight: 800;
      font-size: 14px;
    }
    .list-nav-menu {
      .list-nav-subMenu {
        list-style: none;
        cursor: pointer;
      }
    }
  }
  .list-content {
    flex: 9;
    position: relative;
    .list-content-filter {
      background: #ffffff;
      text-align: left;
      padding: 10px 20px;
      margin-bottom: 20px;
    }
    .list-content-main {
      padding: 10px 30px;
      background: #fff;
      position: absolute;
      left: 0;
      bottom: 0;
      top: 80px;
      right: 0;
      .add-user {
        margin-bottom: 10px;
      }
      .list-content-pagenation {
        margin-top: 35px;
        text-align: right;
        padding: 0 60px;
      }
    }
  }
}
.c-red {
  color: #e02020;
}
.c-blue {
  color: #1890ff;
}
.dialog-style {
  .el-form {
    padding: 0 150px 0 100px;
  }
}
</style>
<style >
/* 
 * 重置elementUI样式[用户列表&用户角色]
 */
.public-nav-style .el-collapse {
  border: none !important;
}
.public-nav-style .el-collapse-item__header {
  font-size: 14px !important;
  font-weight: 500 !important;
  border-bottom: none !important;
}
.public-nav-style .el-collapse-item__wrap {
  border-bottom: none !important;
}
.public-nav-style .el-collapse-item__header .header-icon {
  margin-right: 10px !important;
}
.public-nav-style .el-collapse-item__content {
  padding-bottom: 0 !important;
}
.public-nav-style .list-nav-subMenu li {
  margin-bottom: 5px !important;
}
.public-nav-style .el-form-item {
  margin-bottom: 0 !important;
}
.btn-item .el-form-item__content {
  margin-left: 0 !important;
}
</style>
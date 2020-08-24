<template>
  <div class="roles">
    <!-- 用户角色导航 -->
    <div class="roles-nav public-nav-style">
      <h3 class="roles-nav-title">公司组织架构</h3>
      <div class="roles-nav-menu">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item name="1">
            <template slot="title">
              <i class="header-icon el-icon-tickets"></i>财务类
            </template>
            <ul class="roles-nav-subMenu">
              <li>报账系统</li>
              <li>预算管理</li>
            </ul>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template slot="title">
              <i class="header-icon el-icon-tickets"></i>供应链
            </template>
            <ul class="roles-nav-subMenu">
              <li>采购系统</li>
              <li>物流系统</li>
            </ul>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template slot="title">
              <i class="header-icon el-icon-tickets"></i>人事管理
            </template>
            <ul class="roles-nav-subMenu">
              <li>招聘系统</li>
              <li>员工管理系统</li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="roles-content">
      <!-- 查询框 -->
      <div class="roles-content-filter">
        <el-form ref="form" :model="form" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="角色名称：">
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
      <div class="roles-content-main">
        <div class="add-user">
          <el-button type="primary" plain icon="el-icon-plus" @click="userEdit(null,false)">添加</el-button>
        </div>
        <div class="roles-content-table">
          <el-table :data="processroles" stripe style="width: 100%">
            <el-table-column prop="proId" label="角色ID"></el-table-column>
            <el-table-column prop="eventId" label="角色名称"></el-table-column>
            <el-table-column prop="eventName" label="创建者"></el-table-column>
            <el-table-column prop="status" label="创建时间"></el-table-column>
            <el-table-column prop="auditor" label="修改人"></el-table-column>
            <el-table-column prop="auditor" label="修改时间"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  class="c-blue"
                  size="small"
                  @click="userEdit(scope.row,true)"
                >编辑</el-button>
                <el-button type="text" class="c-blue" size="small" @click="userDist(scope.row)">分配资源</el-button>
                <el-button type="text" class="c-red" size="small" @click="userDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="roles-content-pagenation">
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
        <el-form-item label="所属应用：" :label-width="formLabelWidth">
          <el-cascader :options="optionsList" clearable v-model="createRoleForm.app"></el-cascader>
        </el-form-item>
        <el-form-item label="选择角色：" :label-width="formLabelWidth">
          <el-cascader :options="optionsList" clearable v-model="createRoleForm.role"></el-cascader>
        </el-form-item>
        <el-form-item label="描述：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="createRoleForm.describe" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="reateRoleConfirmMsg(true)">确 定</el-button>
        <el-button @click="reateRoleConfirmMsg(false)">取消</el-button>
      </div>
    </el-dialog>
    <!-- 分配资源 -->
    <el-dialog
      title="分配资源"
      :visible.sync="disResourcesFormVisible"
      width="750px"
      class="dis-resources dialog-style"
    >
      <div class="dis-resources-content">
        <el-tree
          :data="treeData"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :props="defaultProps"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>
              <i :class="data.icon" class="icon"></i>
              {{ node.label }}
            </span>
          </span>
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="disResourcesConfirmMsg(true)">确 定</el-button>
        <el-button @click="disResourcesConfirmMsg(false)">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "user-roles",
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
      disResourcesFormVisible: false,
      formLabelWidth: "100px",
      // 创建用户字段
      createRoleForm: {
        app: "",
        describe: "",
        role: ""
      },
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  computed: {
    treeData() {
      return this.$store.state.Process.treeData;
    },
    optionsList() {
      return this.$store.state.Process.options;
    },
    processroles() {
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
        "Process/getProcessrolesDetal",
        payload
      ); /*.then((res) => {
          // 成功后的处理
          this.createRoleFormVisible = true;
          // 将数据显示到框里
        });*/
    },
    // 资源分配
    userDist(id) {
      this.disResourcesFormVisible = true;
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
    reateRoleConfirmMsg(code) {
      this.createRoleFormVisible = false;
      return;
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
    disResourcesConfirmMsg(code) {
      this.disResourcesFormVisible = false;
      return;
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
.roles {
  display: flex;
  height: 100%;
  .roles-nav {
    flex: 175px;
    background: #fff;
    margin-right: 20px;
    padding: 25px;
    box-sizing: border-box;
    overflow-y: auto;
    .roles-nav-title {
      font-weight: 800;
      font-size: 14px;
    }
    .roles-nav-menu {
      .roles-nav-subMenu {
        list-style: none;
        cursor: pointer;
      }
    }
  }
  .roles-content {
    flex: 9;
    position: relative;
    .roles-content-filter {
      background: #ffffff;
      text-align: left;
      padding: 10px 20px;
      margin-bottom: 20px;
    }
    .roles-content-main {
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
      .roles-content-pagenation {
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
  .create-role-form {
    padding: 0 150px 0 100px;
  }
  .dis-resources-content {
    padding: 0 150px 0 100px;
    .custom-tree-node {
      .icon {
        margin-right: 10px;
      }
    }
  }
}
</style>

<template>
  <div id="user-management" class="user-management">
    <div class="search-container">
      <el-form :inline="true" :model="formInline" class="demo-form-inline hidden" size="small">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="登录账号">
              <el-input v-model="formInline.userName" placeholder="请输入登录账号" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单位名称">
              <el-input v-model="formInline.accountInfo" placeholder="请输入单位名称" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号">
              <el-input v-model="formInline.accountInfo" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="账户状态">
              <el-select v-model="formInline.accountStatus" clearable placeholder="请选择账户状态">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="tc">
            <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
            <el-button size="small">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="operate-container">
      <el-button type="primary" size="small" @click="ctrlDialog(true)">新建用户</el-button>
      <el-input class="fr" v-model="search" size="mini" placeholder="输入单位名称搜索" />
    </div>
    <div class="table-container">
      <el-table
        :height="height"
        :data="pageTable"
        size="small"
        header-cell-class-name="custom-grey"
      >
        <el-table-column
          prop="secondCompany"
          label="单位名称"
          show-overflow-tooltip
          sortable
          align="center"
        />
        <el-table-column
          prop="loginName"
          label="登录账号"
          show-overflow-tooltip
          sortable
          align="center"
        />
        <el-table-column prop="phone" label="手机号" show-overflow-tooltip sortable align="center" />
        <el-table-column label="状态" sortable align="center" width="200">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="UpdateUserStatus(scope.row)"
              active-color="#5D77E4"
              inactive-color="#f85955"
              :active-value="0"
              :inactive-value="1"
            />
          </template>
        </el-table-column>
        <el-table-column label="创建时间" show-overflow-tooltip sortable align="center">
          <template slot-scope="scope">{{scope.row.createTime.slice(0,10)}}</template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip sortable align="center" />
        <el-table-column label="操作" align="center" width="130">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="resPassword(scope.row)">重置</el-button>
            <el-button type="text" size="small" @click="editInfo(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="delUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      :current-page="currentPage"
      :total="totalArr.length"
      :page-size="pagesize"
      class="pagination"
      background
      layout="total, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <div class="pop-container" v-if="dialogFlag">
      <el-dialog
        :visible.sync="dialogVisible"
        :title="dialogTxt"
        width="50%"
        @close="closed"
        :before-close="handleClose"
        :close-on-click-modal="false"
      >
        <div class="content">
          <newUser
            ref="ctrlUser"
            @ctrlDialog="ctrlDialog"
            @getList="getList"
            :deviceData="deviceData"
            :dialogTxt="dialogTxt"
            :baseInfo="baseInfo"
            v-bind="$attrs"
          />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import newUser from "./newUser";
import {
  GetChild,
  ResetPWD,
  DelUser,
  GetPersonList,
  UpdateStatus,
} from "../../../api/personalCenter";
export default {
  name: "UserManagement",
  components: {
    newUser,
  },
  data() {
    return {
      formInline: {
        accountInfo: "",
        accountStatus: "",
        userName: "",
      },
      tableData: [],
      totalArr: [],
      dialogVisible: false,
      dialogFlag: false,
      dialogTxt: "新建用户",
      height: null,
      deviceData: {},
      baseInfo: {},
      currentPage: 1,
      pagesize: 8,
      search: "",
    };
  },
  computed: {
    pageTable() {
      // 数据前端分页及查询
      if (this.search) {
        this.totalArr = this.tableData.filter(
          (data) =>
            !this.search ||
            data.secondCompany.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        this.totalArr = this.tableData;
      }
      return this.totalArr.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
  },
  mounted() {
    this.resetHeight();
    window.addEventListener(
      "resize",
      () => {
        this.height =
          document.body.offsetHeight < 900
            ? document.body.offsetHeight * 0.42
            : null;
        this.resetHeight();
      },
      false
    );
    this.getList();
  },
  methods: {
    getList() {
      // 获取用户列表
      GetChild({ uid: this.$cookie.get("Admin-ID") })
        .then((res) => {
          this.tableData = res.data || [];
        })
        .catch((e) => {
          console.log(e);
        });
    },
    ctrlDialog(flag) {
      // 弹出框关闭 新建用户
      this.dialogFlag = flag;
      this.dialogVisible = flag;
      if (flag) {
        this.dialogTxt = "新建用户";
        this.$store.commit("CLEAR_FORM_INFO", true);
        GetPersonList({ uid: this.$cookie.get("Admin-ID") })
          .then((res) => {
            const data = res.data;
            this.deviceData = data.deviceBindMap;
            this.baseInfo = {};
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    onSubmit() {
      // 查询功能 暂时没有规划
      console.log("submit!");
    },
    editInfo(row) {
      // 用户编辑
      this.dialogVisible = true;
      this.dialogFlag = true;
      this.dialogTxt = "用户编辑";
      this.$store.commit("CLEAR_FORM_INFO", true);
      GetPersonList({ uid: row.id })
        .then((res) => {
          const data = res.data;
          this.deviceData = data.deviceBindMap;
          this.baseInfo = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetHeight() {
      // 根据窗口重置表格高度
      this.height =
        document.body.offsetHeight < 900
          ? document.body.offsetHeight * 0.42
          : null;
    },
    resPassword(row) {
      // 重置密码
      this.$confirm("此操作将重置密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ResetPWD({ uid: row.id })
            .then((res) => {
              this.$message.success("重置密码成功");
              this.getList();
            })
            .catch((e) => {
              console.log(e);
              this.$message.error("重置密码失败");
            });
        })
        .catch(() => {});
    },
    delUser(row) {
      // 删除用户
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          DelUser({ uid: row.id })
            .then((res) => {
              this.$message.success("删除用户成功");
              this.getList();
            })
            .catch((e) => {
              this.$message.success("删除用户失败");
            });
        })
        .catch(() => {});
    },
    UpdateUserStatus(row) {
      // 更新用户状态
      UpdateStatus({ status: +row.status, uid: row.id })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    closed() {
      // 防止点弹出框 × 文字不清空
      this.$store.commit("CLEAR_FORM_INFO", false);
    },
    handleSizeChange(val) {
      // 分页相关
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      // 分页相关
      this.currentPage = val;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>
<style lang='scss' scoped>
.user-management {
  .operate-container {
    margin-bottom: 10px;
    .fr {
      width: 250px;
    }
  }
}
</style>

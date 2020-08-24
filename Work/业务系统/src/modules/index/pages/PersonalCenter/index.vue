<template>
  <div class="personal-center">
    <!-- 个人中心 -->
    <headers />
    <main class="container">
      <div class="base-info">
        <h2 class="title">个人信息</h2>
        <div class="base-img">
          <el-avatar :size="65" :src="circleUrl"></el-avatar>
        </div>
        <el-form :model="ruleForm" label-width="100px" class="base-form" label-position="left">
          <el-form-item label="类别">
            <el-input v-model="ruleForm.category" disabled />
          </el-form-item>
          <el-form-item label="单位名称">
            <el-input v-model="ruleForm.unitName" disabled />
          </el-form-item>
          <!-- <el-form-item label="单位地址">
            <el-input v-model="ruleForm.corporateAdd" disabled />
          </el-form-item>-->
          <el-form-item label="登陆名">
            <el-input v-model.number="ruleForm.loginName" disabled />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model.number="ruleForm.phoneNum" disabled />
          </el-form-item>
        </el-form>
      </div>
      <div class="ctrl-box">
        <h2 class="title">用户中心</h2>
        <div class="tabs-container">
          <el-tabs v-model="activeName">
            <el-tab-pane label="用户管理" name="first">
              <userManagement />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="second">
              <el-form ref="psdForm" :model="psdForm" :rules="psdRules" label-width="100px" class="psdForm">
                <el-form-item label="当前密码" prop="curPassword">
                  <el-input v-model="psdForm.curPassword" type="password" disabled />
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                  <el-input v-model="psdForm.newPassword" type="password" minlength="6" />
                </el-form-item>
                <el-form-item label="重复密码" prop="conPassword">
                  <el-input v-model="psdForm.conPassword" type="password" minlength="6" />
                </el-form-item>
                <el-form-item label>
                  <el-button type="primary" size="small" @click="editPassword('psdForm')">确 定</el-button>
                  <el-button type="danger" size="small" @click="close('psdForm')">关 闭</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import headers from "../views/header";
import userManagement from "./subView/userManagement";
import { GetPersonList, UpdatePWD } from "../../api/personalCenter";
export default {
  name: "PersonalCenter",
  components: {
    headers,
    userManagement,
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 6) {
          callback(new Error("密码位数过短,请修改后提交"));
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.psdForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        category: "朗信电子科技有限公司",
        unitName: "",
        corporateAdd: "",
        loginName: "",
        phoneNum: "",
      },
      psdForm: {
        curPassword: "1234567",
        newPassword: "",
        conPassword: "",
      },
      psdRules: {
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        conPassword: [{ validator: validatePass2, trigger: "blur" }],
      },
      activeName: "first",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  mounted() {
    this.getPersonList();
  },
  methods: {
    getPersonList() {
      // 获取左侧用户信息
      const param = {
        uid: this.$cookie.get("Admin-ID"),
      };
      GetPersonList(param)
        .then((res) => {
          const data = res.data;
          this.ruleForm.category = data.category == 1 ? "管理员" : "二级账户";
          this.ruleForm.unitName = data.company;
          this.ruleForm.loginName = data.loginName;
          this.ruleForm.phoneNum = data.phone;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    close(formName) {
      // 修改密码 关闭按钮
      this.activeName = "first";
      this.$refs[formName].resetFields();
    },
    editPassword(formName) {
      // 修改密码
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("是否确认修改密码?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              UpdatePWD({ newP: this.psdForm.newPassword }).then((res) => {
                if (res.code == 200) {
                  this.$message({
                    message: "修改密码成功",
                    type: "success",
                  });
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消",
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.personal-center {
  height: 100%;
  display: flex;
  flex-direction: column;
  .container {
    flex: 1 1 auto;
    min-height: 0;
    background: #f5f6f8;
    padding: 30px 40px 20px 40px;
    display: flex;
    overflow: hidden;
    .base-info {
      margin-right: 30px;
      background: #fff;
      box-shadow: 10px 10px 5px #ccc;
      width: 320px;
      height: 450px;
      border-radius: 5px;
      h2 {
        padding: 15px 20px;
        min-height: 40px;
        border-bottom: 1px solid #ccc;
        font-weight: 600;
      }
      .base-img {
        padding: 20px 0 10px 0;
        text-align: center;
      }
      .base-form {
        padding: 20px;
      }
    }
    .ctrl-box {
      flex: 1 1 auto;
      width: 0;
      min-width: 0;
      background: #fff;
      box-shadow: 10px 10px 5px #ccc;
      border-radius: 5px;
      h2 {
        padding: 15px 20px;
        min-height: 40px;
        border-bottom: 1px solid #ccc;
        font-weight: 600;
      }
      .tabs-container {
        padding: 10px 20px;
      }
    }
  }
}
</style>

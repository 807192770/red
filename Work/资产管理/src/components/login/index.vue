<template>
  <div class="login-page">
    <div class="logo-box">
      <div class="logo">
        <img src="@/assets/images/logo.png" alt="移动logo" />
        <span>资产定位管理系统</span>
      </div>
    </div>
    <div class="login-box">
      <div class="Illustration">
        <img src="@/assets/images/Illustration.png" alt />
      </div>
      <div class="login">
        <h2>平台登录</h2>
        <div class="login-center">
          <el-form :label-position="labelPosition" label-width="80px">
            <el-form-item label="账号：">
              <el-input v-model="account" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
              <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="login-btn" type="primary" @click="submitForm()">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginByUsername } from "../../api/login.js";
export default {
  data() {
    return {
      labelPosition: "top",
      account: "admin",
      password: "admin"
    };
  },
  components: {},

  computed: {},

  mounted() {},

  methods: {
    submitForm() {
      //  直接接入项目
       this.$router.push('/real-time-monitoring')
       return
      // 联调接口
      if (this.account === "") {
        this.$message.error("请输入账号。");
        return;
      } else if (this.password === "") {
        this.$message.error("请输入密码。");
      } else {
        var params = {
          username: this.account,
          password: this.password
        };
        loginByUsername(params).then(res => {
          const data = res.data;
          if (data.code == 0) {
            window.localStorage.setItem("TOKEN", data.data[0].token);
            this.$router.push("/real-time-monitoring");
          } else {
            this.$message.error(data.msg);
            this.$router.push("/real-time-monitoring");
          }
        });
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.login-page {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  .logo-box {
    height: 85px;
    background: #01141f;
    width: 100%;
    display: flex;
    justify-content: center;
    .logo {
      width: 80%;
      height: 100%;
      display: flex;
      align-items: center;
      span {
        font-size: 18px;
        margin-left: 15px;
        color: #969ea2;
      }
    }
  }
  .login-box {
    width: 1200px;
    min-height: 549px;
    margin-top: 85px;
    display: flex;
    justify-content: flex-end;
    .Illustration {
      width: 666px;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .login {
      width: 535px;
      //  height: 549px;
      background: white;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      h2 {
        font-size: 22px;
        text-align: center;
        font-weight: 900;
        margin: 30px 0;
      }
      .login-center /deep/ {
        width: 395px;
        .el-form-item {
          margin-bottom: 30px;
          .el-form-item__label {
            padding-bottom: 0;
            line-height: 2.5;
          }
          .login-btn {
            width: 100%;
            margin-top: 30px;
          }
        }
      }
    }
  }
}
</style>

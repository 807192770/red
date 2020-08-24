<template>
  <div class="login">
    <div class="loginBox">
      <h2 class="loginTitle">区域人口热图</h2>
      <div class="loginForm">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="110px" label-position='left'
          class="demo-ruleForm" hide-required-asterisk>
          <el-form-item label="登录账号" prop="userName" :error="errorUserName">
            <el-input type="text" v-model="ruleForm.userName" autocomplete="off" placeholder="请输入账户名称"></el-input>
          </el-form-item>
          <el-form-item label="输入密码" prop="pass" :error="errorPassword">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <div class="loginBtnBox">
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </div>
          <div class='loginBottomBox'>
            <a class="item" @click="register">注册账号</a>
            <a class="item" @click="forgetPassword">忘记密码</a>
          </div>
        </el-form>
      </div>
    </div>
    <div class="loginLogo">
      <img src="../../assets/images/logo.png" alt="">
    </div>
  </div>
</template>

<script>
  import {
    loginByUsername
  } from '../../api/login'
  export default {
    data() {
      return {
        ruleForm: {
          userName: 'admin',
          pass: '123456',
        },
        rules: {
          userName: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }],
          pass: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        },
        errorUserName: '',
        errorPassword: ''
      };
    },
    components: {},

    computed: {},

    mounted() {},

    methods: {
      submitForm(formName) {
        let that = this;
        that.errorUserName = ''
        that.errorPassword = ''
        that.$refs[formName].validate((valid) => {
          if (valid) {
            var params = {
              username: this.ruleForm.userName,
              password: this.ruleForm.pass,
            }
            loginByUsername(params).then(response => {
              var data = response.data
              if (data.code == 200) {
                // this.$message('登录成功');
                this.$router.push({
                  name: 'floatingPopulation'
                })
              } else if (data.code == 500) {
               that.errorPassword = that.errorUserName = data.message;
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      register() {
        this.$message('注册账号');
      },
      forgetPassword() {
        this.$message('忘记密码');
      }
    }
  }

</script>
<style lang='scss' scoped>
  .login {
    // display: flex;
    width: 100%;
    height: 100%;
    // justify-content: center;
    // align-items: center;
    // flex-direction: column;
    // background: url("./src/assets/images/bg.jpg") no-repeat;
    // background-size: 100% 100%;

    .loginBox {
      padding: 60px;

      .loginTitle {
        font-size: 72px;
        color: #fff;
        font-family: Noto Sans S Chinese;
        font-weight: bold;
        width: 622px;
        text-align: center;
      }

      .loginForm /deep/ {
        margin-top: 126px;
        display: inline-block;
        // justify-content: center;
        background: rgba(0, 12, 33, 0.6);
        padding: 80px 76px 42px 76px;
        border-radius: 4px;

        .el-form-item {
          margin-bottom: 40px;

          .el-form-item__content {
            .el-input__inner {
              height: 56px;
              width: 360px;
              background: #071333;
              border: 1px solid #3FD9FF;
              color: #fff;
              font-size: 24px;

              &::placeholder {
                color: #3D4E6A;
              }

              &::-webkit-input-placeholder {
                /* WebKit browsers 适配谷歌 */
                color: #3D4E6A;
              }

              &::-moz-placeholder {
                /* Mozilla Firefox 4 to 18 适配火狐 */
                color: #3D4E6A;
              }

              &::-moz-placeholder {
                /* Mozilla Firefox 19+ 适配火狐 */
                color: #3D4E6A;
              }

              &::-ms-input-placeholder {
                /* Internet Explorer 10+  适配ie*/
                color: #3D4E6A;
              }
            }

            .el-input__suffix {
              right: auto;
            }
          }

          .el-form-item__label {
            line-height: 56px;
            font-size: 24px;
            color: #fff;
            padding: 0 12px 0 0;


          }
        }

        .loginBtnBox {
          margin-top: 72px;
          border: 1px solid rgba(33, 129, 234, 0.2);
          box-sizing: border-box;
          border-radius: 93px;
          padding: 12px;

          button {
            width: 100%;
            background: #2181EA;
            border-radius: 32px;
            height: 64px;
            font-size: 32px;
            box-shadow: 0px 0px 8px rgba(17, 60, 107, 0.24);
            letter-spacing: 20px;
            text-indent: 20px;
            padding: 0;

            span {
              line-height: 64px;
            }
          }
        }

        .loginBottomBox {
          margin-top: 10px;
          display: flex;
          justify-content: center;

          .item {
            font-size: 14px;
            color: #3FD9FF;
            margin: 0 20px;
          }
        }
      }
    }

    .loginLogo {
      position: fixed;
      left: 80px;
      bottom: 80px;
    }
  }

</style>

<template>
  <div class="addUser">
    <!-- 新建用户 -->
    <div class="item">
      <h4 class="subTitle">账号信息</h4>
      <div class="form-content">
        <el-form
          :model="ruleForm"
          :label-position="labelPosition"
          ref="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="原始密码" prop="oldPassword">
            <el-input v-model="ruleForm.oldPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="ruleForm.newPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="ruleForm.confirmPassword" type="password"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="btnItem">
      <el-button type="primary" @click="submitForm('ruleForm')">修改完成</el-button>
    </div>
  </div>
</template>

<script>
import { changePsw } from '../../api/privilege-management'
export default {
  data () {
    return {
      labelPosition: 'top',
      checked: '',
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原始密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ]
      }
    }
  },

  components: {},

  mounted () {},

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            token: window.localStorage.getItem('TOKEN'),
            old_password: this.ruleForm.oldPassword,
            new_password: this.ruleForm.newPassword,
            new_re_password: this.ruleForm.confirmPassword
          }
          changePsw(params).then(res => {
            const data = res.data
            if (data.code === 0) {
              this.$message.success(data.msg)
              this.$refs[formName].resetFields()
            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          this.$message.error('请填写必要信息。')
          return false
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.addUser {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  .item {
    .subTitle {
      width: 100%;
      font-size: 22px;
      color: #a0a0a0;
      line-height: 55px;
      border-bottom: 1px solid #e2e2e2;
      padding-left: 25px;
    }
    .form-content /deep/ {
      width: 400px;
      margin: 45px auto 0;
      .el-form-item {
        margin-bottom: 15px;
        .el-form-item__label {
          padding-bottom: 0;
        }
        .children {
          margin-left: 30px;
        }
      }
    }
  }
  .btnItem {
    padding: 50px 0 140px 0;
    text-align: center;
    button {
      width: 400px;
    }
  }
}
</style>

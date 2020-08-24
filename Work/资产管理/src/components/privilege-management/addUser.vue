<template>
  <div class="addUser">
    <!-- 新建用户 -->
    <div class="item">
      <h4 class="subTitle">账号信息</h4>
      <div class="form-content">
        <el-form
          :model="ruleForm"
          :label-position="labelPosition"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="account">
            <el-input v-model="ruleForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="ruleForm.confirmPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phoneNum">
            <el-input v-model.number="ruleForm.phoneNum" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="工号" prop="ID">
            <el-input v-model="ruleForm.ID"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="item">
      <h4 class="subTitle">权限设置</h4>
      <div class="form-content">
        <Tree :data="dataTree" show-checkbox @on-check-change="choice()" ref="tree"></Tree>
      </div>
    </div>
    <div class="btnItem">
      <el-button type="primary" @click="submitForm('ruleForm')">完成</el-button>
    </div>
  </div>
</template>

<script>
import { registerUser } from "../../api/privilege-management";
export default {
  data() {
    return {
      labelPosition: "top",
      dataTree: [
        {
          title: "实时监控",
          expand: true
        },
        {
          title: "告警管理",
          expand: true,
          children: [
            {
              title: "告警日志",
              expand: true
            },
            {
              title: "告警设置",
              expand: true
            }
          ]
        },
        {
          title: "历史轨迹",
          expand: true
        },
        {
          title: "权限管理",
          expand: true,
          children: [
            {
              title: "新建用户",
              expand: true
            },
            {
              title: "管理用户",
              expand: true
            },
            {
              title: "信息维护",
              expand: true
            }
          ]
        },
        {
          title: "巡检管理",
          expand: true,
          children: [
            {
              title: "新建巡检",
              expand: true
            },
            {
              title: "已有巡检",
              expand: true
            }
          ]
        },
        {
          title: "全局盘点",
          expand: true
        }
      ],
      ruleForm: {
        account: "",
        password: "",
        confirmPassword: "",
        phoneNum: "",
        name: "",
        ID: ""
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        confirmPassword: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        ID: [{ required: true, message: "请输入工号", trigger: "blur" }],
        phoneNum: [
          { required: true, message: "请填写手机号码", trigger: "blur" },
          {
            type: "number",
            message: "手机号码长度为11位",
            trigger: ["blur", "change"]
          }
        ]
      },
      subdata: [], //用户半选和全选的数据
      choices: [], //在右边需展示出来的数据
      power: [] //用户全选的数据
    };
  },

  components: {},

  mounted() {},

  methods: {
    choice() {
      this.choices = this.init(this.$refs.tree.data);
      this.subdata = this.$refs.tree.getCheckedAndIndeterminateNodes(); //获取半选和全选的
      this.power = this.subdata.filter(item => {
        return !item.children; //因为filter只会返回true的布尔值，所以这里把没有子集的，也就是单个的权限返回出去，用this.power接收
      });
      console.log("power", this.power); //不含父级
      console.log("subdata", this.subdata); //含有父级
    },
    init(data) {
      let s = [];
      if (data.children != undefined) {
        for (let j = 0; j < data.children.length; j++) {
          if (data.children[j].checked || data.children[j].indeterminate) {
            //用到了递归，checked ,indeterminate这两个属性是组件上提供的，
            //在浏览器上调试时可见，这是所选控件有子集的时候，比如说方法下有望闻问切四个子集，这里是把半选的控件展示上去
            s.push({
              title: data.children[j].title,
              expand: true,
              children: this.init(data.children[j])
            });
          }
        }
      } else {
        for (let i = 0; i < data.length; i++) {
          if (data[i].checked || data[i].indeterminate) {
            s.push({
              title: data[i].title,
              expand: true,
              children: this.init(data[i])
            });
          }
        }
      }
      return s;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.subdata.length) {
            this.$message.error("请选择权限。");
            return;
          }
          var params = {
            staff_id: this.ruleForm.ID,
            phone: this.ruleForm.phoneNum,
            name: this.ruleForm.name,
            role_id: 5,
            // role_id: this.subdata,//待定
            username: this.ruleForm.account,
            password: this.ruleForm.password,
            re_password: this.ruleForm.confirmPassword,
            token: window.localStorage.getItem("TOKEN")
          };
          registerUser(params).then(res => {
            const data = res.data;
            if (data.code == 0) {
              this.$message.success(data.msg);
              this.$refs[formName].resetFields();
            } else {
              this.$message.error(data.msg);
            }
          });
        } else {
          this.$message.error("请填写必要信息。");
          return false;
        }
      });
    }
  }
};
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
      margin: 45px auto;
      .ivu-tree > {
        .ivu-tree-children {
          margin: 0 0 25px 0;
        }
      }
    }
  }
  .btnItem {
    border-top: 1px solid #e2e2e2;
    padding: 50px 0 120px 0;
    text-align: center;
    button {
      width: 400px;
    }
  }
}
</style>

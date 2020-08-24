<template>
  <div class="new-user">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      size="small"
      label-width="100px"
      class="demo-form"
    >
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="登录账号" prop="accountInfo">
            <el-input
              v-model="ruleForm.accountInfo"
              maxlength="10"
              :disabled="dialogTxt=='新建用户'?false:true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-form-item label="手机号" prop="phoneNum">
            <el-input v-model="ruleForm.phoneNum" type="tel" maxlength="11" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="单位名称" prop="subUnit">
            <el-input v-model="ruleForm.subUnit" maxlength="20" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="备注" prop="remarks">
            <el-input v-model="ruleForm.remarks" type="textarea" maxlength="100" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label prop="type">
            <el-collapse v-model="activeNames" accordion>
              <el-collapse-item
                v-for="(item,index) in this.deviceArr"
                :title="item.name"
                :name="index+1"
                :key="index"
              >
                <el-checkbox
                  v-for="(its,i) in item.value"
                  v-model="its.devStatus"
                  :key="i"
                  border
                >{{ its.devName }}</el-checkbox>
              </el-collapse-item>
            </el-collapse>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="tr">
        <el-button type="primary" size="small" @click="submitForm('ruleForm')">确 定</el-button>
        <el-button size="small" @click="ctrlDialog()">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { AddUser, CheckName, UpdateUser } from "../../../api/personalCenter";
import { validatePhone } from "@/utils/validate";
export default {
  name: "NewUser",
  data() {
    const validatePhoneNum = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        if (validatePhone(value)) {
          callback();
        } else {
          callback(new Error("手机号格式错误"));
        }
      }
    };
    const validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入登录账号"));
      } else {
        if (this.dialogTxt == "新建用户") {
          const param = {
            userName: this.ruleForm.accountInfo,
          };
          CheckName(param)
            .then((res) => {
              console.log(res);
              if (res.code == 500) {
                callback(new Error("登录账号已存在,请修改后提交"));
              } else {
                callback();
              }
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          callback();
        }
      }
    };
    return {
      ruleForm: {
        accountInfo: "",
        phoneNum: "",
        subUnit: "",
        remarks: "",
      },
      rules: {
        phoneNum: [
          {
            required: true,
            trigger: "blur",
            validator: validatePhoneNum,
          },
        ],
        accountInfo: [
          {
            required: true,
            trigger: "blur",
            validator: validateAccount,
          },
        ],
        subUnit: [
          { required: true, message: "请输入二级单位名称", trigger: "blur" },
        ],
      },
      activeNames: [1],
      deviceArr: [],
      subDevArr: [],
      deviceRestMap: {},
    };
  },
  computed: {
    clearForm() {
      return this.$store.state.index.clearNewUserForm;
    },
  },
  props: ["deviceData", "dialogTxt", "baseInfo"],
  watch: {
    clearForm(n, o) {
      // 清空表格
      this.$refs.ruleForm.resetFields();
    },
    deviceData(n, o) {
      // 接受父组件传递的设备型号及状态
      this.deviceDataInit();
    },
    baseInfo(n, o) {
      // 编辑时，回显的base字段；新建时 无
      this.ruleForm.phoneNum = n.phone || "";
      this.ruleForm.remarks = n.remark || "";
      this.ruleForm.accountInfo = n.loginName || "";
      this.ruleForm.subUnit = n.secondCompany || "";
    },
  },
  mounted() {},
  methods: {
    addUser() {
      // 新增用户
      const param = {
        loginName: this.ruleForm.accountInfo,
        phone: this.ruleForm.phoneNum,
        secondCompany: this.ruleForm.subUnit,
        remark: this.ruleForm.remarks,
        uid: this.$cookie.get("Admin-ID"),
        deviceBindMap: this.deviceRestMap,
      };
      AddUser(param)
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("新建用户成功!");
            this.$emit("ctrlDialog", false);
            this.$emit("getList");
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editUser() {
      // 编辑资料
      const param = {
        loginName: this.ruleForm.accountInfo,
        phone: this.ruleForm.phoneNum,
        secondCompany: this.ruleForm.subUnit,
        remark: this.ruleForm.remarks,
        id: this.baseInfo.id,
        deviceBindMap: this.deviceRestMap,
      };
      UpdateUser(param)
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("用户信息修改成功!");
            this.$emit("ctrlDialog", false);
            this.$emit("getList");
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ctrlDialog() {
      // 取消弹框
      this.$emit("ctrlDialog", false);
    },
    submitForm(formName) {
      // console.log(Object.keys(this.baseInfo).length);
      // 提交弹框
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.deviceDataRest();
          if (this.dialogTxt == "新建用户") {
            this.addUser();
          } else {
            this.editUser();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    deviceDataInit() {
      // 设备型号及状态数据处理
      this.deviceArr = [];
      for (const i in this.deviceData) {
        this.subDevArr = [];
        for (const o in this.deviceData[i]) {
          const subObj = {
            devName: o,
            devStatus: !!this.deviceData[i][o],
          };
          this.subDevArr.push(subObj);
        }
        const obj = {
          name: i,
          value: this.subDevArr,
        };
        this.deviceArr.push(obj);
      }
    },
    deviceDataRest() {
      // 设备型号及状态数据恢复
      this.deviceArr.forEach((element) => {
        this.deviceRestMap[element.name] = {};
        element.value.forEach((it) => {
          this.deviceRestMap[element.name][it.devName] = it.devStatus
            ? "1"
            : "0";
        });
      });
    },
  },
};
</script>
<style lang='scss' scoped>
</style>

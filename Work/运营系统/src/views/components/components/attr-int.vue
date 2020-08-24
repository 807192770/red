<template>
  <div class="int">
    <el-card shadow="hover">
      <el-form
        label-position="top"
        label-width="80px"
        :model="form"
        size="small"
        ref="form"
        :rules="rules"
      >
        <el-form-item :label="dataInfo.atitle" prop="text">
          <el-input v-model="form.text" clearable placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom:0">
          <el-button class="fr" type="primary" size="mini" @click="submitForm('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "int",
  data() {
    var reg = /^-?[1-9]\d*$/;
    var validateText = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入内容"));
      } else {
        if (!reg.test(this.form.text)) {
          callback(new Error("请输入整数"));
        } else {
          callback();
        }
      }
    };
    return {
      desc: "整数",
      form: {
        text: "",
      },
      rules: {
        text: [{ validator: validateText, trigger: "blur" }],
      },
    };
  },
  props: ["dataInfo"],
  watch: {
    dataInfo(n, o) {
      this.form.text = n.attributeValue;
    },
  },
  created() {
    this.form.text = this.dataInfo.attributeValue;
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let par = {
            attributeId: this.dataInfo.attributeId,
            id: this.dataInfo.id,
            attributeValue: this.form.text,
          };
          this.$emit("saveRow", par);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.int /deep/ {
  .el-form-item__label {
    font-size: 18px;
  }
}
</style>

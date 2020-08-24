<template>
  <div class="datas">
    <el-card shadow="hover">
      <el-form label-position="top" :model="form" size="small" ref="form">
        <el-form-item :label="dataInfo.atitle">
          <el-row :gutter="20" v-for="(item,index) in form.arr" :key="index" class="lists">
            <el-col :span="17">
              <el-row>
                <el-col :span="10">
                  <el-input v-model="item.key" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="2" class="tc">：</el-col>
                <el-col :span="12">
                  <el-input v-model="item.value" placeholder="请输入内容"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="7">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-plus"
                circle
                @click="addFormRow()"
              ></el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                circle
                @click="delFormRow(index)"
              ></el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="margin-bottom:0">
          <el-button class="fr" type="primary" size="mini" @click="submitForm()">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "datas",
  data() {
    return {
      desc: "json",
      form: {
        text: "",
        arr: [{ key: "name", value: "123456" }],
      },
    };
  },
  props: ["dataInfo"],
  watch: {
    dataInfo(n, o) {
      this.form.arr = JSON.parse(n.attributeValue);
    },
  },
  created() {
    this.form.arr = JSON.parse(this.dataInfo.attributeValue);
  },

  methods: {
    submitForm(formName) {
      let par = {
        attributeId: this.dataInfo.attributeId,
        id: this.dataInfo.id,
        attributeValue: JSON.stringify(this.form.arr),
      };
      this.$emit("saveRow", par);
    },
    addFormRow() {
      let obj = { key: "", value: "" };
      this.form.arr.push(obj);
    },
    delFormRow(index) {
      this.form.arr.splice(index, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
.datas /deep/ {
  .el-form-item__label {
    font-size: 18px;
  }
  .el-form-item__content {
    .lists {
      margin-bottom: 15px;
    }
  }
  .tc {
    text-align: center;
  }
}
</style>
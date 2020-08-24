<template>
  <div class="dialog-table">
    <!-- 新增数据 -->
    <el-form
      ref="dialogForm"
      class="details-form"
      :model="dialogData"
      label-position="left"
      size="small"
    >
      <el-row class="row-item">
        <el-col :span="24">
          <el-form-item label="计量种类">
            <el-input
              :value="dialogData.mesureMode?'高供低计':'高供高计'"
              disabled
              placeholder="请输入计量种类"
              style="width:100%"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row-item">
        <el-col :span="24">
          <el-form-item label="变压器类型" prop="taskName">
            <el-input
              v-model="dialogData.transfomerType"
              disabled
              placeholder="请输入变压器类型"
              style="width:100%"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row-item">
        <el-col :span="24">
          <el-form-item label="额定容量(kVA)" prop="taskName">
            <el-input
              v-model="dialogData.transformerVolume"
              disabled
              placeholder="请输入额定容量"
              style="width:100%"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row-item">
        <el-col :span="24">
          <el-form-item label="空载损耗(kW)" prop="taskStatus">
            <el-input
              v-model="dialogData.epmtyLoss"
              disabled
              placeholder="请输入空载损耗"
              style="width:100%"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row-item">
        <el-col :span="24">
          <el-form-item label="负载损耗(kW)" prop="platformName">
            <el-input
              v-model="dialogData.loadLoss"
              disabled
              placeholder="请输入负载损耗"
              style="width:100%"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row-item">
        <el-col :span="24">
          <el-form-item label="计量装置电流比" prop="platformName">
            <el-input v-model="dialogData.CT" disabled placeholder="请输入计量装置电流比" style="width:100%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row-item">
        <el-col :span="24">
          <el-form-item label="变压器电压比" prop="platformName">
            <el-input v-model="dialogData.gears" disabled placeholder="变压器电压比" style="width:100%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form
      ref="dialogForm"
      class="details-table"
      :model="form"
      label-position="left"
      size="small"
    >
      <ul class="row-item row-header">
        <li class="item">类别</li>
        <li class="item" v-for="(it,index) in this.keys.length" :key="index">{{keys[index]}}</li>
      </ul>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="瞬时读数 (00:00:00)" name="1">
          <ul class="row-item">
            <li class="key">
              正向有功读数
              <br />(kW·h)
            </li>
            <li v-for="it in this.keys.length" :key="it" class="value">
              <el-input
                v-model="form['form'+it].posEt"
                size="mini"
                placeholder="正向有功电能"
                @blur="validate(form['form'+it].posEt)"
              ></el-input>
            </li>
          </ul>
          <ul class="row-item">
            <li class="key">
              正向无功读数
              <br />(kW·h)
            </li>
            <li v-for="it in this.keys.length" :key="it" class="value">
              <el-input
                v-model="form['form'+it].posEnt"
                size="mini"
                placeholder="正向无功电能"
                @blur="validate(form['form'+it].posEnt)"
              ></el-input>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item title="当日统计 (00:00:00-23:59:59)" class="last-one" name="2">
          <ul class="row-item">
            <li class="key">
              {{dialogData.mesureMode?'最大电压':'平均电压'}}
              <br />(V)
            </li>
            <li v-for="it in this.keys.length" :key="it" class="value">
              <el-input
                v-model="form['form'+it].voltage"
                size="mini"
                :placeholder=" dialogData.mesureMode?'最大电压':'平均电压'"
                @blur="validate(form['form'+it].voltage)"
              ></el-input>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
      <div class="btn">
        <el-button class="fr" size="small" type="primary" @click="onSubmit">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { GetAnalyzeSave } from "../../../api/dataAnalysis";
export default {
  name: "dialog-table",
  data() {
    return {
      form: {
        form1: {
          voltage: "", //平均电压/最大电压
          posEt: "", //正向有功读数
          posEnt: "", //正向无功读数
        },
        form2: {
          voltage: "",
          posEt: "",
          posEnt: "",
        },
        form3: {
          voltage: "",
          posEt: "",
          posEnt: "",
        },
        form4: {
          voltage: "",
          posEt: "",
          posEnt: "",
        },
        form5: {
          voltage: "",
          posEt: "",
          posEnt: "",
        },
        form6: {
          voltage: "",
          posEt: "",
          posEnt: "",
        },
        form7: {
          voltage: "",
          posEt: "",
          posEnt: "",
        },
        form8: {
          voltage: "",
          posEt: "",
          posEnt: "",
        },
      },
      activeNames: ["1", "2"],
      keys: [],
      dataArr: [false, false, false, false, false, false, false, false],
    };
  },
  props: ["dialogData"],
  watch: {
    dialogData: {
      handler(n, o) {
        this.initData(n);
      },
      deep: true,
    },
  },
  mounted() {
    this.initData(this.dialogData);
  },
  methods: {
    initData(data) {
      // 回显
      var item = Object.values(data.dayMap).sort(this.compareValues("forDate"));
      item.forEach((el, index) => {
        this.form["form" + (index + 1)] = el;
      });
      this.keys = Object.keys(data.dayMap).sort(this.compareKeys());
      this.$emit("initWidth", this.keys.length);
    },
    getAnalyzeSave() {
      console.log(this.form); //原始表格
      var parArr = Object.values(this.form).slice(
        0,
        Object.keys(this.dialogData.dayMap).length
      );
      console.log(parArr); //处理后的表格
      GetAnalyzeSave(parArr)
        .then((r) => {
          console.log(r);
          if (r.code == 200) {
            this.$message.success("保存成功");
            this.$emit("getAnalyzeByQuery");
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    validate(data) {
      let patten = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
      if (!patten.test(data)) {
        this.$message.error("请输入大于0的数值（保留2位小数）");
        return false;
      }
    },
    onSubmit() {
      this.monData();
      let flag = this.dataArr.filter((it) => it == true);
      if (flag.length < 2) {
        this.$message.error("请确保有两天完整数据");
        return false;
      }
      if (flag.length < Object.keys(this.dialogData.dayMap).length) {
        this.$confirm("数据未输入完整，是否确认保存?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.getAnalyzeSave();
            this.$emit("closeDialog", false);
          })
          .catch(() => {
            this.$message.info("已取消");
          });
      }
      if (flag.length == Object.keys(this.dialogData.dayMap).length) {
        this.getAnalyzeSave();
        this.$emit("closeDialog", false);
      }
    },
    monData() {
      for (let index = 1; index <= 8; index++) {
        if (
          this.form["form" + index].posEt > 0 &&
          this.form["form" + index].posEnt > 0 &&
          this.form["form" + index].voltage > 0
        ) {
          this.dataArr[index - 1] = true;
        } else {
          this.dataArr[index - 1] = false;
        }
      }
    },
    compareKeys() {
      return function (obj1, obj2) {
        if (obj1 < obj2) {
          return -1;
        } else if (obj1 > obj2) {
          return 1;
        } else {
          return 0;
        }
      };
    },
    compareValues(prop) {
      return function (obj1, obj2) {
        var val1 = new Date(obj1[prop]);
        var val2 = new Date(obj2[prop]);
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-table {
  display: flex;
  .details-form {
    padding-right: 20px;
    border-right: 1px solid #ccc;
    width: 185px;
  }
  .details-table {
    padding-left: 10px;
    margin-top: 5px;
    flex: 1;
    position: relative;
    .row-item {
      overflow: hidden;
      line-height: 50px;
      &.row-header {
        li {
          line-height: 50px;
        }
      }
      li /deep/ {
        width: 85px;
        height: 50px;
        font-weight: 900;
        text-align: center;
        display: inline-block;
        vertical-align: middle;
        line-height: 22px;
        margin: 18px 10px;
        .el-input {
          margin-top: 11px;
          .el-input__inner {
            padding: 0 5px !important;
          }
        }
      }
    }
    .btn {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
    }
  }
}
.last-one /deep/ {
  .el-collapse-item__wrap {
    border: none;
  }
  .el-collapse-item__header {
    border: none;
  }
}
</style>
